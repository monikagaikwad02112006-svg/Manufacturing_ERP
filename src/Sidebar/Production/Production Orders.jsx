import { useMemo, useState } from "react";
import "./Production Orders.css";

const products = [
  {
    name: "Office Chair",
    code: "FG-001",
    bom: "BOM-001",
    version: "V1.0",
    unit: "PCS",
  },
  {
    name: "Wooden Table",
    code: "FG-002",
    bom: "BOM-002",
    version: "V1.1",
    unit: "PCS",
  },
  {
    name: "Storage Cabinet",
    code: "FG-003",
    bom: "BOM-003",
    version: "V1.0",
    unit: "PCS",
  },
  {
    name: "Metal Rack",
    code: "FG-004",
    bom: "BOM-004",
    version: "V2.0",
    unit: "PCS",
  },
];

const machines = [
  "Assembly Line 01",
  "Assembly Line 02",
  "CNC Machine 01",
  "CNC Machine 02",
  "Cutting Machine",
];

const supervisors = [
  "Rahul Patil",
  "Pranali Shinde",
  "Amit Joshi",
  "Sneha More",
];

const initialOrders = [
  {
    id: 1,
    orderNo: "PO-2026-001",
    product: "Office Chair",
    productCode: "FG-001",
    bom: "BOM-001",
    version: "V1.0",
    unit: "PCS",
    plannedQty: 500,
    producedQty: 350,
    rejectedQty: 8,
    plannedStart: "2026-09-05",
    expectedCompletion: "2026-09-12",
    actualCompletion: "",
    machine: "Assembly Line 01",
    supervisor: "Rahul Patil",
    priority: "High",
    status: "In Progress",
    notes: "Priority production for September order.",
  },
  {
    id: 2,
    orderNo: "PO-2026-002",
    product: "Wooden Table",
    productCode: "FG-002",
    bom: "BOM-002",
    version: "V1.1",
    unit: "PCS",
    plannedQty: 200,
    producedQty: 200,
    rejectedQty: 4,
    plannedStart: "2026-09-01",
    expectedCompletion: "2026-09-08",
    actualCompletion: "2026-09-08",
    machine: "Assembly Line 02",
    supervisor: "Pranali Shinde",
    priority: "Medium",
    status: "Completed",
    notes: "Production completed successfully.",
  },
  {
    id: 3,
    orderNo: "PO-2026-003",
    product: "Storage Cabinet",
    productCode: "FG-003",
    bom: "BOM-003",
    version: "V1.0",
    unit: "PCS",
    plannedQty: 150,
    producedQty: 0,
    rejectedQty: 0,
    plannedStart: "2026-09-15",
    expectedCompletion: "2026-09-22",
    actualCompletion: "",
    machine: "CNC Machine 01",
    supervisor: "Amit Joshi",
    priority: "Low",
    status: "Planned",
    notes: "",
  },
  {
    id: 4,
    orderNo: "PO-2026-004",
    product: "Metal Rack",
    productCode: "FG-004",
    bom: "BOM-004",
    version: "V2.0",
    unit: "PCS",
    plannedQty: 300,
    producedQty: 100,
    rejectedQty: 3,
    plannedStart: "2026-09-07",
    expectedCompletion: "2026-09-18",
    actualCompletion: "",
    machine: "CNC Machine 02",
    supervisor: "Sneha More",
    priority: "High",
    status: "In Progress",
    notes: "Check raw material availability regularly.",
  },
];

const emptyForm = {
  orderNo: "",
  product: "",
  productCode: "",
  bom: "",
  version: "",
  unit: "",
  plannedQty: "",
  producedQty: "0",
  rejectedQty: "0",
  plannedStart: "",
  expectedCompletion: "",
  actualCompletion: "",
  machine: "",
  supervisor: "",
  priority: "Medium",
  status: "Planned",
  notes: "",
};

function ProductionOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const getNextOrderNumber = () => {
    const nextNumber = orders.length + 1;
    return `PO-2026-${String(nextNumber).padStart(3, "0")}`;
  };

  const summary = useMemo(() => {
    const totalPlanned = orders.reduce(
      (sum, order) => sum + Number(order.plannedQty || 0),
      0
    );

    const totalProduced = orders.reduce(
      (sum, order) => sum + Number(order.producedQty || 0),
      0
    );

    return {
      total: orders.length,
      planned: orders.filter((order) => order.status === "Planned").length,
      inProgress: orders.filter(
        (order) => order.status === "In Progress"
      ).length,
      completed: orders.filter(
        (order) => order.status === "Completed"
      ).length,
      totalPlanned,
      totalProduced,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        order.orderNo.toLowerCase().includes(searchText) ||
        order.product.toLowerCase().includes(searchText) ||
        order.productCode.toLowerCase().includes(searchText) ||
        order.supervisor.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || order.priority === priorityFilter;

      const matchesProduct =
        productFilter === "All" || order.product === productFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProduct
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    priorityFilter,
    productFilter,
  ]);

  const getRemainingQty = (order) => {
    return Math.max(
      Number(order.plannedQty || 0) -
        Number(order.producedQty || 0) -
        Number(order.rejectedQty || 0),
      0
    );
  };

  const handleProductChange = (productName) => {
    const selectedProduct = products.find(
      (product) => product.name === productName
    );

    if (!selectedProduct) {
      setForm((prev) => ({
        ...prev,
        product: "",
        productCode: "",
        bom: "",
        version: "",
        unit: "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      product: selectedProduct.name,
      productCode: selectedProduct.code,
      bom: selectedProduct.bom,
      version: selectedProduct.version,
      unit: selectedProduct.unit,
    }));

    setErrors((prev) => ({
      ...prev,
      product: "",
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const plannedQty = Number(form.plannedQty || 0);
    const producedQty = Number(form.producedQty || 0);
    const rejectedQty = Number(form.rejectedQty || 0);

    if (!form.product) {
      newErrors.product = "Please select a finished product.";
    }

    if (plannedQty <= 0) {
      newErrors.plannedQty =
        "Planned quantity must be greater than 0.";
    }

    if (producedQty < 0) {
      newErrors.producedQty =
        "Produced quantity cannot be negative.";
    }

    if (rejectedQty < 0) {
      newErrors.rejectedQty =
        "Rejected quantity cannot be negative.";
    }

    if (producedQty + rejectedQty > plannedQty) {
      newErrors.producedQty =
        "Produced + rejected quantity cannot exceed planned quantity.";
    }

    if (!form.plannedStart) {
      newErrors.plannedStart =
        "Please select planned start date.";
    }

    if (!form.expectedCompletion) {
      newErrors.expectedCompletion =
        "Please select expected completion date.";
    }

    if (
      form.plannedStart &&
      form.expectedCompletion &&
      form.expectedCompletion < form.plannedStart
    ) {
      newErrors.expectedCompletion =
        "Expected completion cannot be before planned start.";
    }

    if (!form.machine) {
      newErrors.machine = "Please select a machine.";
    }

    if (!form.supervisor) {
      newErrors.supervisor = "Please select a supervisor.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const openAddModal = () => {
    setEditingOrder(null);
    setErrors({});

    setForm({
      ...emptyForm,
      orderNo: getNextOrderNumber(),
    });

    setShowModal(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setErrors({});

    setForm({
      orderNo: order.orderNo,
      product: order.product,
      productCode: order.productCode,
      bom: order.bom,
      version: order.version,
      unit: order.unit,
      plannedQty: order.plannedQty,
      producedQty: order.producedQty,
      rejectedQty: order.rejectedQty,
      plannedStart: order.plannedStart,
      expectedCompletion: order.expectedCompletion,
      actualCompletion: order.actualCompletion,
      machine: order.machine,
      supervisor: order.supervisor,
      priority: order.priority,
      status: order.status,
      notes: order.notes,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingOrder(null);
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderData = {
      ...form,
      plannedQty: Number(form.plannedQty),
      producedQty: Number(form.producedQty),
      rejectedQty: Number(form.rejectedQty),
    };

    if (editingOrder) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === editingOrder.id
            ? {
                ...order,
                ...orderData,
              }
            : order
        )
      );
    } else {
      setOrders((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...orderData,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const order = orders.find((item) => item.id === id);

    if (!order) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${order.orderNo}?`
    );

    if (!confirmed) {
      return;
    }

    setOrders((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleStart = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status: "In Progress",
            }
          : order
      )
    );
  };

  const handleComplete = (id) => {
    const order = orders.find((item) => item.id === id);

    if (!order) {
      return;
    }

    const confirmed = window.confirm(
      `Mark ${order.orderNo} as completed?`
    );

    if (!confirmed) {
      return;
    }

    setOrders((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Completed",
              actualCompletion:
                item.actualCompletion ||
                new Date().toISOString().split("T")[0],
              producedQty: item.plannedQty,
            }
          : item
      )
    );
  };

  const handleCancel = (id) => {
    const order = orders.find((item) => item.id === id);

    if (!order) {
      return;
    }

    const confirmed = window.confirm(
      `Cancel production order ${order.orderNo}?`
    );

    if (!confirmed) {
      return;
    }

    setOrders((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Cancelled",
            }
          : item
      )
    );
  };

  const openViewModal = (order) => {
    setViewingOrder(order);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setViewingOrder(null);
    setShowViewModal(false);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setProductFilter("All");
  };

  return (
    <div className="production-order-page">
      <div className="production-header">
        <div>
          <h1>Production Orders</h1>
          <p>
            Plan, monitor and manage your manufacturing
            production orders.
          </p>
        </div>

        <button
          type="button"
          className="add-production-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          New Production Order
        </button>
      </div>

      <div className="production-summary">
        <div className="production-card">
          <div className="production-card-icon">📋</div>
          <div>
            <span>Total Orders</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="production-card">
          <div className="production-card-icon planned-icon">
            ◷
          </div>
          <div>
            <span>Planned</span>
            <strong>{summary.planned}</strong>
          </div>
        </div>

        <div className="production-card">
          <div className="production-card-icon progress-icon">
            ⚙
          </div>
          <div>
            <span>In Progress</span>
            <strong>{summary.inProgress}</strong>
          </div>
        </div>

        <div className="production-card">
          <div className="production-card-icon completed-icon">
            ✓
          </div>
          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>

        <div className="production-card">
          <div className="production-card-icon quantity-icon">
            ▣
          </div>
          <div>
            <span>Planned Qty</span>
            <strong>
              {summary.totalPlanned.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="production-card">
          <div className="production-card-icon produced-icon">
            ↗
          </div>
          <div>
            <span>Produced Qty</span>
            <strong>
              {summary.totalProduced.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>

      <div className="production-toolbar">
        <div className="production-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search order, product, supervisor..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={productFilter}
          onChange={(event) =>
            setProductFilter(event.target.value)
          }
        >
          <option value="All">All Products</option>

          {products.map((product) => (
            <option
              key={product.code}
              value={product.name}
            >
              {product.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      <div className="production-table-card">
        <div className="table-top">
          <div>
            <h2>Production Order List</h2>
            <p>{filteredOrders.length} records found</p>
          </div>
        </div>

        <div className="production-table-wrapper">
          <table className="production-table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Product</th>
                <th>Planned Qty</th>
                <th>Produced</th>
                <th>Remaining</th>
                <th>Start Date</th>
                <th>Expected</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="order-number">
                        {order.orderNo}
                      </div>
                    </td>

                    <td>
                      <div className="product-cell">
                        <div className="product-avatar">
                          {order.product.charAt(0)}
                        </div>

                        <div>
                          <strong>{order.product}</strong>
                          <small>{order.productCode}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong>
                        {order.plannedQty.toLocaleString()}
                      </strong>{" "}
                      {order.unit}
                    </td>

                    <td>
                      <strong>
                        {order.producedQty.toLocaleString()}
                      </strong>
                    </td>

                    <td>
                      <strong>
                        {getRemainingQty(order).toLocaleString()}
                      </strong>
                    </td>

                    <td>{order.plannedStart}</td>

                    <td>{order.expectedCompletion}</td>

                    <td>
                      <span
                        className={`priority-badge ${order.priority.toLowerCase()}`}
                      >
                        {order.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`production-status ${order.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <div className="production-actions">
                        <button
                          type="button"
                          className="view-action"
                          onClick={() =>
                            openViewModal(order)
                          }
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="edit-action"
                          onClick={() =>
                            openEditModal(order)
                          }
                        >
                          Edit
                        </button>

                        {order.status === "Planned" && (
                          <button
                            type="button"
                            className="start-action"
                            onClick={() =>
                              handleStart(order.id)
                            }
                          >
                            Start
                          </button>
                        )}

                        {order.status === "In Progress" && (
                          <button
                            type="button"
                            className="complete-action"
                            onClick={() =>
                              handleComplete(order.id)
                            }
                          >
                            Complete
                          </button>
                        )}

                        {order.status !== "Completed" &&
                          order.status !== "Cancelled" && (
                            <button
                              type="button"
                              className="cancel-action"
                              onClick={() =>
                                handleCancel(order.id)
                              }
                            >
                              Cancel
                            </button>
                          )}

                        <button
                          type="button"
                          className="delete-action"
                          onClick={() =>
                            handleDelete(order.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">
                    <div className="no-production">
                      <div className="no-production-icon">
                        📋
                      </div>
                      <h3>No production orders found</h3>
                      <p>
                        Try changing your filters or create a
                        new production order.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="production-modal-overlay">
          <div className="production-modal">
            <div className="production-modal-header">
              <div>
                <h2>
                  {editingOrder
                    ? "Edit Production Order"
                    : "New Production Order"}
                </h2>

                <p>
                  Enter production planning and execution
                  details.
                </p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="production-form">
                <div className="form-section-title">
                  Basic Information
                </div>

                <div className="form-group">
                  <label>Order Number</label>

                  <input
                    type="text"
                    value={form.orderNo}
                    readOnly
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Finished Product <span>*</span>
                  </label>

                  <select
                    name="product"
                    value={form.product}
                    onChange={(event) =>
                      handleProductChange(
                        event.target.value
                      )
                    }
                    className={
                      errors.product ? "input-error" : ""
                    }
                  >
                    <option value="">
                      Select Product
                    </option>

                    {products.map((product) => (
                      <option
                        key={product.code}
                        value={product.name}
                      >
                        {product.name}
                      </option>
                    ))}
                  </select>

                  {errors.product && (
                    <small className="error-text">
                      {errors.product}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Product Code</label>

                  <input
                    type="text"
                    value={form.productCode}
                    readOnly
                    placeholder="Auto-filled"
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>BOM Number</label>

                  <input
                    type="text"
                    value={form.bom}
                    readOnly
                    placeholder="Auto-filled"
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>BOM Version</label>

                  <input
                    type="text"
                    value={form.version}
                    readOnly
                    placeholder="Auto-filled"
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Unit</label>

                  <input
                    type="text"
                    value={form.unit}
                    readOnly
                    placeholder="Auto-filled"
                    className="readonly-input"
                  />
                </div>

                <div className="form-section-title">
                  Production Quantity
                </div>

                <div className="form-group">
                  <label>
                    Planned Quantity <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="plannedQty"
                    min="1"
                    value={form.plannedQty}
                    onChange={handleChange}
                    placeholder="Enter planned quantity"
                    className={
                      errors.plannedQty
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.plannedQty && (
                    <small className="error-text">
                      {errors.plannedQty}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Produced Quantity</label>

                  <input
                    type="number"
                    name="producedQty"
                    min="0"
                    value={form.producedQty}
                    onChange={handleChange}
                    className={
                      errors.producedQty
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.producedQty && (
                    <small className="error-text">
                      {errors.producedQty}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Rejected Quantity</label>

                  <input
                    type="number"
                    name="rejectedQty"
                    min="0"
                    value={form.rejectedQty}
                    onChange={handleChange}
                    className={
                      errors.rejectedQty
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.rejectedQty && (
                    <small className="error-text">
                      {errors.rejectedQty}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Remaining Quantity</label>

                  <input
                    type="text"
                    value={Math.max(
                      Number(form.plannedQty || 0) -
                        Number(form.producedQty || 0) -
                        Number(form.rejectedQty || 0),
                      0
                    )}
                    readOnly
                    className="calculated-input"
                  />
                </div>

                <div className="form-section-title">
                  Production Schedule
                </div>

                <div className="form-group">
                  <label>
                    Planned Start <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="plannedStart"
                    value={form.plannedStart}
                    onChange={handleChange}
                    className={
                      errors.plannedStart
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.plannedStart && (
                    <small className="error-text">
                      {errors.plannedStart}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Expected Completion <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="expectedCompletion"
                    value={form.expectedCompletion}
                    onChange={handleChange}
                    className={
                      errors.expectedCompletion
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.expectedCompletion && (
                    <small className="error-text">
                      {errors.expectedCompletion}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Actual Completion</label>

                  <input
                    type="date"
                    name="actualCompletion"
                    value={form.actualCompletion}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Machine <span>*</span>
                  </label>

                  <select
                    name="machine"
                    value={form.machine}
                    onChange={handleChange}
                    className={
                      errors.machine
                        ? "input-error"
                        : ""
                    }
                  >
                    <option value="">
                      Select Machine
                    </option>

                    {machines.map((machine) => (
                      <option key={machine} value={machine}>
                        {machine}
                      </option>
                    ))}
                  </select>

                  {errors.machine && (
                    <small className="error-text">
                      {errors.machine}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Supervisor <span>*</span>
                  </label>

                  <select
                    name="supervisor"
                    value={form.supervisor}
                    onChange={handleChange}
                    className={
                      errors.supervisor
                        ? "input-error"
                        : ""
                    }
                  >
                    <option value="">
                      Select Supervisor
                    </option>

                    {supervisors.map((supervisor) => (
                      <option
                        key={supervisor}
                        value={supervisor}
                      >
                        {supervisor}
                      </option>
                    ))}
                  </select>

                  {errors.supervisor && (
                    <small className="error-text">
                      {errors.supervisor}
                    </small>
                  )}
                </div>

                <div className="form-section-title">
                  Order Status
                </div>

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter production notes..."
                  />
                </div>
              </div>

              <div className="production-form-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-production-btn"
                >
                  {editingOrder
                    ? "Update Production Order"
                    : "Create Production Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && viewingOrder && (
        <div className="production-modal-overlay">
          <div className="production-view-modal">
            <div className="production-modal-header">
              <div>
                <h2>Production Order Details</h2>
                <p>{viewingOrder.orderNo}</p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={closeViewModal}
              >
                ×
              </button>
            </div>

            <div className="view-order-body">
              <div className="view-order-top">
                <div className="view-product-avatar">
                  {viewingOrder.product.charAt(0)}
                </div>

                <div>
                  <h3>{viewingOrder.product}</h3>
                  <p>{viewingOrder.productCode}</p>
                </div>

                <span
                  className={`production-status ${viewingOrder.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {viewingOrder.status}
                </span>
              </div>

              <div className="view-progress">
                <div className="progress-heading">
                  <span>Production Progress</span>

                  <strong>
                    {viewingOrder.plannedQty > 0
                      ? Math.min(
                          Math.round(
                            (viewingOrder.producedQty /
                              viewingOrder.plannedQty) *
                              100
                          ),
                          100
                        )
                      : 0}
                    %
                  </strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        viewingOrder.plannedQty > 0
                          ? Math.min(
                              (viewingOrder.producedQty /
                                viewingOrder.plannedQty) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="view-details-grid">
                <div>
                  <span>Order Number</span>
                  <strong>
                    {viewingOrder.orderNo}
                  </strong>
                </div>

                <div>
                  <span>Product Code</span>
                  <strong>
                    {viewingOrder.productCode}
                  </strong>
                </div>

                <div>
                  <span>BOM</span>
                  <strong>
                    {viewingOrder.bom} (
                    {viewingOrder.version})
                  </strong>
                </div>

                <div>
                  <span>Planned Quantity</span>
                  <strong>
                    {viewingOrder.plannedQty}{" "}
                    {viewingOrder.unit}
                  </strong>
                </div>

                <div>
                  <span>Produced Quantity</span>
                  <strong>
                    {viewingOrder.producedQty}
                  </strong>
                </div>

                <div>
                  <span>Rejected Quantity</span>
                  <strong>
                    {viewingOrder.rejectedQty}
                  </strong>
                </div>

                <div>
                  <span>Remaining Quantity</span>
                  <strong>
                    {getRemainingQty(viewingOrder)}
                  </strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>
                    {viewingOrder.priority}
                  </strong>
                </div>

                <div>
                  <span>Planned Start</span>
                  <strong>
                    {viewingOrder.plannedStart}
                  </strong>
                </div>

                <div>
                  <span>Expected Completion</span>
                  <strong>
                    {viewingOrder.expectedCompletion}
                  </strong>
                </div>

                <div>
                  <span>Machine</span>
                  <strong>
                    {viewingOrder.machine}
                  </strong>
                </div>

                <div>
                  <span>Supervisor</span>
                  <strong>
                    {viewingOrder.supervisor}
                  </strong>
                </div>

                {viewingOrder.actualCompletion && (
                  <div>
                    <span>Actual Completion</span>
                    <strong>
                      {viewingOrder.actualCompletion}
                    </strong>
                  </div>
                )}
              </div>

              {viewingOrder.notes && (
                <div className="view-notes">
                  <span>Production Notes</span>
                  <p>{viewingOrder.notes}</p>
                </div>
              )}
            </div>

            <div className="production-form-footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={closeViewModal}
              >
                Close
              </button>

              <button
                type="button"
                className="save-production-btn"
                onClick={() => {
                  const orderToEdit = viewingOrder;

                  closeViewModal();
                  openEditModal(orderToEdit);
                }}
              >
                Edit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductionOrders;