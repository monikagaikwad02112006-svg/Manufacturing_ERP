import { useMemo, useState } from "react";
import "./Purchase Orders.css";

const initialOrders = [
  {
    id: 1,
    poNo: "PO-2026-001",
    poDate: "2026-08-25",
    supplier: "Shree Industrial Suppliers",
    expectedDate: "2026-09-05",
    items: 6,
    subtotal: 118000,
    tax: 21240,
    total: 139240,
    priority: "High",
    status: "Pending",
    paymentStatus: "Unpaid",
    createdBy: "Rahul Patil",
    notes: "Required for production batch.",
  },
  {
    id: 2,
    poNo: "PO-2026-002",
    poDate: "2026-08-27",
    supplier: "Maharashtra Steel Works",
    expectedDate: "2026-09-08",
    items: 4,
    subtotal: 85000,
    tax: 15300,
    total: 100300,
    priority: "Medium",
    status: "Approved",
    paymentStatus: "Partially Paid",
    createdBy: "Amit Shinde",
    notes: "Steel sheets and rods.",
  },
  {
    id: 3,
    poNo: "PO-2026-003",
    poDate: "2026-08-29",
    supplier: "Perfect Electricals",
    expectedDate: "2026-09-03",
    items: 8,
    subtotal: 42000,
    tax: 7560,
    total: 49560,
    priority: "Low",
    status: "Completed",
    paymentStatus: "Paid",
    createdBy: "Sagar More",
    notes: "Electrical components.",
  },
];

const emptyForm = {
  poNo: "",
  poDate: "",
  supplier: "",
  expectedDate: "",
  priority: "Medium",
  status: "Draft",
  paymentStatus: "Unpaid",
  createdBy: "",
  notes: "",
};

function PurchaseOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [items, setItems] = useState([
    {
      id: 1,
      product: "",
      description: "",
      quantity: 1,
      unit: "Nos",
      rate: 0,
      amount: 0,
    },
  ]);

  const [errors, setErrors] = useState({});

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase().trim();

      const searchMatch =
        !searchText ||
        order.poNo.toLowerCase().includes(searchText) ||
        order.supplier.toLowerCase().includes(searchText) ||
        order.createdBy.toLowerCase().includes(searchText);

      const statusMatch =
        statusFilter === "All" || order.status === statusFilter;

      const priorityMatch =
        priorityFilter === "All" || order.priority === priorityFilter;

      const paymentMatch =
        paymentFilter === "All" ||
        order.paymentStatus === paymentFilter;

      return (
        searchMatch &&
        statusMatch &&
        priorityMatch &&
        paymentMatch
      );
    });
  }, [orders, search, statusFilter, priorityFilter, paymentFilter]);

  const summary = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      approved: orders.filter((o) => o.status === "Approved").length,
      completed: orders.filter((o) => o.status === "Completed").length,
      value: orders.reduce((sum, o) => sum + Number(o.total || 0), 0),
    };
  }, [orders]);

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const calculateItemAmount = (quantity, rate) => {
    return Number(quantity || 0) * Number(rate || 0);
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      poDate: new Date().toISOString().split("T")[0],
    });

    setItems([
      {
        id: Date.now(),
        product: "",
        description: "",
        quantity: 1,
        unit: "Nos",
        rate: 0,
        amount: 0,
      },
    ]);

    setErrors({});
  };

  const openAddModal = () => {
    setEditingOrder(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);

    setFormData({
      poNo: order.poNo,
      poDate: order.poDate,
      supplier: order.supplier,
      expectedDate: order.expectedDate,
      priority: order.priority,
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdBy: order.createdBy,
      notes: order.notes || "",
    });

    setItems([
      {
        id: Date.now(),
        product: "Sample Product",
        description: "Purchase order item",
        quantity: order.items || 1,
        unit: "Nos",
        rate: order.subtotal / (order.items || 1),
        amount: order.subtotal,
      },
    ]);

    setErrors({});
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = {
          ...item,
          [field]: value,
        };

        if (field === "quantity" || field === "rate") {
          updatedItem.amount = calculateItemAmount(
            field === "quantity" ? value : item.quantity,
            field === "rate" ? value : item.rate
          );
        }

        return updatedItem;
      })
    );
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        product: "",
        description: "",
        quantity: 1,
        unit: "Nos",
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const removeItemRow = (id) => {
    if (items.length === 1) {
      alert("At least one item is required.");
      return;
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.poNo.trim()) {
      newErrors.poNo = "PO number is required.";
    }

    if (!formData.poDate) {
      newErrors.poDate = "PO date is required.";
    }

    if (!formData.supplier) {
      newErrors.supplier = "Please select supplier.";
    }

    if (!formData.expectedDate) {
      newErrors.expectedDate = "Expected date is required.";
    }

    if (!formData.createdBy.trim()) {
      newErrors.createdBy = "Created by is required.";
    }

    const invalidItem = items.some(
      (item) =>
        !item.product.trim() ||
        Number(item.quantity) <= 0 ||
        Number(item.rate) < 0
    );

    if (invalidItem) {
      newErrors.items = "Please enter valid product, quantity and rate.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();

    const orderData = {
      ...formData,
      items: items.length,
      subtotal,
      tax,
      total,
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
          ...orderData,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
    setEditingOrder(null);
    resetForm();
  };

  const handleDelete = (id) => {
    const order = orders.find((item) => item.id === id);

    const confirmed = window.confirm(
      `Are you sure you want to delete ${order?.poNo || "this purchase order"}?`
    );

    if (confirmed) {
      setOrders((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  };

  return (
    <div className="purchase-orders-page">

      {/* HEADER */}

      <div className="purchase-orders-header">
        <div>
          <h1>Purchase Orders</h1>
          <p>Create, approve and manage supplier purchase orders</p>
        </div>

        <button
          className="add-purchase-order-btn"
          onClick={openAddModal}
        >
          + Create Purchase Order
        </button>
      </div>


      {/* SUMMARY */}

      <div className="purchase-order-summary">

        <div className="purchase-order-card">
          <div>
            <span>Total Orders</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="summary-icon blue">
            PO
          </div>
        </div>

        <div className="purchase-order-card">
          <div>
            <span>Pending</span>
            <strong>{summary.pending}</strong>
          </div>
          <div className="summary-icon orange">
            P
          </div>
        </div>

        <div className="purchase-order-card">
          <div>
            <span>Approved</span>
            <strong>{summary.approved}</strong>
          </div>
          <div className="summary-icon green">
            A
          </div>
        </div>

        <div className="purchase-order-card">
          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
          <div className="summary-icon purple">
            C
          </div>
        </div>

        <div className="purchase-order-card value-card">
          <div>
            <span>Total PO Value</span>
            <strong>{formatCurrency(summary.value)}</strong>
          </div>
          <div className="summary-icon blue">
            ₹
          </div>
        </div>

      </div>


      {/* FILTERS */}

      <div className="purchase-order-filter-box">

        <div className="purchase-order-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search PO number, supplier or creator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="All">All Payments</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Paid">Paid</option>
        </select>

      </div>


      {/* TABLE */}

      <div className="purchase-orders-table-container">

        <table className="purchase-orders-table">

          <thead>
            <tr>
              <th>PO Number</th>
              <th>PO Date</th>
              <th>Supplier</th>
              <th>Expected Delivery</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (

                <tr key={order.id}>

                  <td>
                    <div className="po-number-cell">
                      <strong>{order.poNo}</strong>
                      <small>{order.createdBy}</small>
                    </div>
                  </td>

                  <td>{order.poDate}</td>

                  <td>
                    <span className="supplier-name">
                      {order.supplier}
                    </span>
                  </td>

                  <td>{order.expectedDate}</td>

                  <td>
                    <span className="item-count">
                      {order.items} Items
                    </span>
                  </td>

                  <td>
                    <strong className="amount-text">
                      {formatCurrency(order.total)}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`po-priority ${order.priority.toLowerCase()}`}
                    >
                      {order.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`po-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`po-payment ${order.paymentStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td>

                    <div className="purchase-order-actions">

                      <button
                        title="View"
                        onClick={() => setViewOrder(order)}
                      >
                        👁
                      </button>

                      <button
                        title="Edit"
                        onClick={() => openEditModal(order)}
                      >
                        ✏️
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleDelete(order.id)}
                      >
                        🗑
                      </button>

                      {order.status === "Pending" && (
                        <button
                          className="approve-action"
                          title="Approve"
                          onClick={() =>
                            updateStatus(order.id, "Approved")
                          }
                        >
                          ✓
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))
            ) : (

              <tr>
                <td
                  colSpan="10"
                  className="no-purchase-orders"
                >
                  No purchase orders found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="purchase-order-modal-overlay">

          <div className="purchase-order-modal">

            <div className="purchase-order-modal-header">

              <div>
                <h2>
                  {editingOrder
                    ? "Edit Purchase Order"
                    : "Create Purchase Order"}
                </h2>

                <p>
                  Enter supplier and purchase order details
                </p>
              </div>

              <button
                className="modal-close-btn"
                type="button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="purchase-order-form">

                <div className="form-group">
                  <label>PO Number *</label>

                  <input
                    name="poNo"
                    value={formData.poNo}
                    onChange={handleFormChange}
                    placeholder="PO-2026-004"
                  />

                  {errors.poNo && (
                    <small className="form-error">
                      {errors.poNo}
                    </small>
                  )}
                </div>


                <div className="form-group">
                  <label>PO Date *</label>

                  <input
                    type="date"
                    name="poDate"
                    value={formData.poDate}
                    onChange={handleFormChange}
                  />

                  {errors.poDate && (
                    <small className="form-error">
                      {errors.poDate}
                    </small>
                  )}
                </div>


                <div className="form-group">
                  <label>Supplier *</label>

                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleFormChange}
                  >
                    <option value="">
                      Select Supplier
                    </option>

                    <option value="Shree Industrial Suppliers">
                      Shree Industrial Suppliers
                    </option>

                    <option value="Maharashtra Steel Works">
                      Maharashtra Steel Works
                    </option>

                    <option value="Perfect Electricals">
                      Perfect Electricals
                    </option>

                    <option value="ABC Raw Materials">
                      ABC Raw Materials
                    </option>

                    <option value="Global Engineering">
                      Global Engineering
                    </option>
                  </select>

                  {errors.supplier && (
                    <small className="form-error">
                      {errors.supplier}
                    </small>
                  )}
                </div>


                <div className="form-group">
                  <label>Expected Delivery *</label>

                  <input
                    type="date"
                    name="expectedDate"
                    value={formData.expectedDate}
                    onChange={handleFormChange}
                  />

                  {errors.expectedDate && (
                    <small className="form-error">
                      {errors.expectedDate}
                    </small>
                  )}
                </div>


                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleFormChange}
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
                    value={formData.status}
                    onChange={handleFormChange}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>Payment Status</label>

                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleFormChange}
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Partially Paid">
                      Partially Paid
                    </option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>Created By *</label>

                  <input
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleFormChange}
                    placeholder="Employee name"
                  />

                  {errors.createdBy && (
                    <small className="form-error">
                      {errors.createdBy}
                    </small>
                  )}
                </div>

              </div>


              {/* ITEMS */}

              <div className="purchase-items-section">

                <div className="section-heading">

                  <div>
                    <h3>Order Items</h3>
                    <p>Add products or materials to this purchase order</p>
                  </div>

                  <button
                    type="button"
                    className="add-item-btn"
                    onClick={addItemRow}
                  >
                    + Add Item
                  </button>

                </div>


                {errors.items && (
                  <div className="items-error">
                    {errors.items}
                  </div>
                )}


                <div className="items-table-wrapper">

                  <table className="items-table">

                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>

                      {items.map((item) => (

                        <tr key={item.id}>

                          <td>
                            <input
                              value={item.product}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "product",
                                  e.target.value
                                )
                              }
                              placeholder="Product name"
                            />
                          </td>

                          <td>
                            <input
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <select
                              value={item.unit}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "unit",
                                  e.target.value
                                )
                              }
                            >
                              <option value="Nos">Nos</option>
                              <option value="Kg">Kg</option>
                              <option value="Ltr">Ltr</option>
                              <option value="Mtr">Mtr</option>
                              <option value="Box">Box</option>
                            </select>
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.rate}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "rate",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td className="item-amount">
                            {formatCurrency(item.amount)}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="remove-item-btn"
                              onClick={() =>
                                removeItemRow(item.id)
                              }
                              title="Remove item"
                            >
                              ×
                            </button>
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>


                {/* TOTALS */}

                <div className="purchase-order-totals">

                  <div>
                    <span>Subtotal</span>
                    <strong>
                      {formatCurrency(calculateSubtotal())}
                    </strong>
                  </div>

                  <div>
                    <span>GST (18%)</span>
                    <strong>
                      {formatCurrency(calculateTax())}
                    </strong>
                  </div>

                  <div className="grand-total">
                    <span>Grand Total</span>
                    <strong>
                      {formatCurrency(calculateTotal())}
                    </strong>
                  </div>

                </div>

              </div>


              {/* NOTES */}

              <div className="form-group notes-group">

                <label>Notes</label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Add any additional purchase order notes..."
                  rows="3"
                />

              </div>


              {/* BUTTONS */}

              <div className="purchase-order-form-buttons">

                <button
                  type="button"
                  className="cancel-po-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-po-btn"
                >
                  {editingOrder
                    ? "Update Purchase Order"
                    : "Save Purchase Order"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* VIEW MODAL */}

      {viewOrder && (

        <div className="purchase-order-modal-overlay">

          <div className="purchase-order-view-modal">

            <div className="purchase-order-modal-header">

              <div>
                <h2>Purchase Order Details</h2>
                <p>{viewOrder.poNo}</p>
              </div>

              <button
                className="modal-close-btn"
                type="button"
                onClick={() => setViewOrder(null)}
              >
                ×
              </button>

            </div>


            <div className="po-view-content">

              <div className="po-view-grid">

                <div>
                  <span>PO Number</span>
                  <strong>{viewOrder.poNo}</strong>
                </div>

                <div>
                  <span>PO Date</span>
                  <strong>{viewOrder.poDate}</strong>
                </div>

                <div>
                  <span>Supplier</span>
                  <strong>{viewOrder.supplier}</strong>
                </div>

                <div>
                  <span>Expected Delivery</span>
                  <strong>{viewOrder.expectedDate}</strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{viewOrder.priority}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{viewOrder.status}</strong>
                </div>

                <div>
                  <span>Payment Status</span>
                  <strong>{viewOrder.paymentStatus}</strong>
                </div>

                <div>
                  <span>Created By</span>
                  <strong>{viewOrder.createdBy}</strong>
                </div>

              </div>


              <div className="view-total-box">

                <span>Total Purchase Order Value</span>

                <strong>
                  {formatCurrency(viewOrder.total)}
                </strong>

              </div>


              {viewOrder.notes && (
                <div className="view-notes">
                  <span>Notes</span>
                  <p>{viewOrder.notes}</p>
                </div>
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PurchaseOrders;