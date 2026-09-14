import { useMemo, useState } from "react";
import "./Production Tracking.css";

const initialTrackingData = [
  {
    id: 1,
    trackingNo: "PT-0001",
    orderNo: "PO-0001",
    product: "Steel Gear",
    productCode: "FG-001",
    bomVersion: "V1.0",
    machine: "CNC Machine 01",
    supervisor: "Rahul Patil",
    plannedQty: 500,
    producedQty: 380,
    rejectedQty: 12,
    unit: "Nos",
    startDate: "2026-09-01",
    expectedDate: "2026-09-05",
    actualDate: "",
    status: "In Progress",
    priority: "High",
    remarks: "Production running smoothly.",
  },
  {
    id: 2,
    trackingNo: "PT-0002",
    orderNo: "PO-0002",
    product: "Aluminium Bracket",
    productCode: "FG-002",
    bomVersion: "V2.0",
    machine: "CNC Machine 02",
    supervisor: "Amit Shinde",
    plannedQty: 300,
    producedQty: 300,
    rejectedQty: 5,
    unit: "Nos",
    startDate: "2026-08-28",
    expectedDate: "2026-09-02",
    actualDate: "2026-09-02",
    status: "Completed",
    priority: "Medium",
    remarks: "Production completed.",
  },
  {
    id: 3,
    trackingNo: "PT-0003",
    orderNo: "PO-0003",
    product: "Copper Pipe",
    productCode: "FG-003",
    bomVersion: "V1.1",
    machine: "Pipe Cutting Machine",
    supervisor: "Sneha Jadhav",
    plannedQty: 1000,
    producedQty: 450,
    rejectedQty: 20,
    unit: "Mtr",
    startDate: "2026-09-03",
    expectedDate: "2026-09-10",
    actualDate: "",
    status: "In Progress",
    priority: "High",
    remarks: "Raw material available.",
  },
  {
    id: 4,
    trackingNo: "PT-0004",
    orderNo: "PO-0004",
    product: "MS Sheet Panel",
    productCode: "FG-004",
    bomVersion: "V1.0",
    machine: "Press Machine 01",
    supervisor: "Vikas More",
    plannedQty: 800,
    producedQty: 0,
    rejectedQty: 0,
    unit: "Nos",
    startDate: "2026-09-06",
    expectedDate: "2026-09-12",
    actualDate: "",
    status: "Not Started",
    priority: "Low",
    remarks: "Waiting for production start.",
  },
  {
    id: 5,
    trackingNo: "PT-0005",
    orderNo: "PO-0005",
    product: "Industrial Shaft",
    productCode: "FG-005",
    bomVersion: "V1.2",
    machine: "Lathe Machine 01",
    supervisor: "Pranali Pawar",
    plannedQty: 250,
    producedQty: 100,
    rejectedQty: 3,
    unit: "Nos",
    startDate: "2026-09-04",
    expectedDate: "2026-09-09",
    actualDate: "",
    status: "On Hold",
    priority: "Medium",
    remarks: "Machine maintenance required.",
  },
  {
    id: 6,
    trackingNo: "PT-0006",
    orderNo: "PO-0006",
    product: "Motor Housing",
    productCode: "FG-006",
    bomVersion: "V2.1",
    machine: "Casting Machine 01",
    supervisor: "Rahul Patil",
    plannedQty: 600,
    producedQty: 0,
    rejectedQty: 0,
    unit: "Nos",
    startDate: "2026-09-07",
    expectedDate: "2026-09-14",
    actualDate: "",
    status: "Cancelled",
    priority: "Low",
    remarks: "Order cancelled by production manager.",
  },
];

const productOptions = [
  {
    name: "Steel Gear",
    code: "FG-001",
    unit: "Nos",
    bom: "V1.0",
  },
  {
    name: "Aluminium Bracket",
    code: "FG-002",
    unit: "Nos",
    bom: "V2.0",
  },
  {
    name: "Copper Pipe",
    code: "FG-003",
    unit: "Mtr",
    bom: "V1.1",
  },
  {
    name: "MS Sheet Panel",
    code: "FG-004",
    unit: "Nos",
    bom: "V1.0",
  },
  {
    name: "Industrial Shaft",
    code: "FG-005",
    unit: "Nos",
    bom: "V1.2",
  },
  {
    name: "Motor Housing",
    code: "FG-006",
    unit: "Nos",
    bom: "V2.1",
  },
];

const machineOptions = [
  "CNC Machine 01",
  "CNC Machine 02",
  "Pipe Cutting Machine",
  "Press Machine 01",
  "Lathe Machine 01",
  "Casting Machine 01",
];

const supervisorOptions = [
  "Rahul Patil",
  "Amit Shinde",
  "Sneha Jadhav",
  "Vikas More",
  "Pranali Pawar",
];

const emptyForm = {
  trackingNo: "",
  orderNo: "",
  product: "",
  productCode: "",
  bomVersion: "",
  machine: "",
  supervisor: "",
  plannedQty: "",
  producedQty: "",
  rejectedQty: "",
  unit: "",
  startDate: "",
  expectedDate: "",
  actualDate: "",
  status: "Not Started",
  priority: "Medium",
  remarks: "",
};

function ProductionTracking() {
  const [trackingData, setTrackingData] = useState(initialTrackingData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [machineFilter, setMachineFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedTracking, setSelectedTracking] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [confirmAction, setConfirmAction] = useState(null);

  const filteredData = useMemo(() => {
    return trackingData.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.trackingNo.toLowerCase().includes(searchText) ||
        item.orderNo.toLowerCase().includes(searchText) ||
        item.product.toLowerCase().includes(searchText) ||
        item.productCode.toLowerCase().includes(searchText) ||
        item.supervisor.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || item.priority === priorityFilter;

      const matchesMachine =
        machineFilter === "All" || item.machine === machineFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesMachine
      );
    });
  }, [
    trackingData,
    search,
    statusFilter,
    priorityFilter,
    machineFilter,
  ]);

  const summary = useMemo(() => {
    const total = trackingData.length;

    const notStarted = trackingData.filter(
      (item) => item.status === "Not Started"
    ).length;

    const inProgress = trackingData.filter(
      (item) => item.status === "In Progress"
    ).length;

    const completed = trackingData.filter(
      (item) => item.status === "Completed"
    ).length;

    const onHold = trackingData.filter(
      (item) => item.status === "On Hold"
    ).length;

    const cancelled = trackingData.filter(
      (item) => item.status === "Cancelled"
    ).length;

    const plannedQty = trackingData.reduce(
      (totalQty, item) => totalQty + Number(item.plannedQty || 0),
      0
    );

    const producedQty = trackingData.reduce(
      (totalQty, item) => totalQty + Number(item.producedQty || 0),
      0
    );

    const progress =
      plannedQty > 0
        ? Math.round((producedQty / plannedQty) * 100)
        : 0;

    return {
      total,
      notStarted,
      inProgress,
      completed,
      onHold,
      cancelled,
      plannedQty,
      producedQty,
      progress,
    };
  }, [trackingData]);

  const getProgress = (item) => {
    if (!item.plannedQty) return 0;

    return Math.min(
      100,
      Math.round((Number(item.producedQty) / Number(item.plannedQty)) * 100)
    );
  };

  const getRemainingQty = (item) => {
    return Math.max(
      0,
      Number(item.plannedQty || 0) - Number(item.producedQty || 0)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "product") {
      const selectedProduct = productOptions.find(
        (product) => product.name === value
      );

      setFormData((prev) => ({
        ...prev,
        product: value,
        productCode: selectedProduct?.code || "",
        unit: selectedProduct?.unit || "",
        bomVersion: selectedProduct?.bom || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.orderNo.trim()) {
      newErrors.orderNo = "Production order number is required.";
    }

    if (!formData.product) {
      newErrors.product = "Please select a product.";
    }

    if (!formData.machine) {
      newErrors.machine = "Please select a machine.";
    }

    if (!formData.supervisor) {
      newErrors.supervisor = "Please select a supervisor.";
    }

    if (!formData.plannedQty || Number(formData.plannedQty) <= 0) {
      newErrors.plannedQty = "Enter a valid planned quantity.";
    }

    if (Number(formData.producedQty || 0) < 0) {
      newErrors.producedQty = "Produced quantity cannot be negative.";
    }

    if (
      Number(formData.producedQty || 0) >
      Number(formData.plannedQty || 0)
    ) {
      newErrors.producedQty =
        "Produced quantity cannot exceed planned quantity.";
    }

    if (Number(formData.rejectedQty || 0) < 0) {
      newErrors.rejectedQty = "Rejected quantity cannot be negative.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.expectedDate) {
      newErrors.expectedDate = "Expected completion date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateTrackingNumber = () => {
    const nextNumber = trackingData.length + 1;

    return `PT-${String(nextNumber).padStart(4, "0")}`;
  };

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      trackingNo: generateTrackingNumber(),
      startDate: new Date().toISOString().split("T")[0],
    });

    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      trackingNo: item.trackingNo,
      orderNo: item.orderNo,
      product: item.product,
      productCode: item.productCode,
      bomVersion: item.bomVersion,
      machine: item.machine,
      supervisor: item.supervisor,
      plannedQty: item.plannedQty,
      producedQty: item.producedQty,
      rejectedQty: item.rejectedQty,
      unit: item.unit,
      startDate: item.startDate,
      expectedDate: item.expectedDate,
      actualDate: item.actualDate,
      status: item.status,
      priority: item.priority,
      remarks: item.remarks,
    });

    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const plannedQty = Number(formData.plannedQty);
    const producedQty = Number(formData.producedQty || 0);

    let finalStatus = formData.status;

    if (producedQty >= plannedQty && plannedQty > 0) {
      finalStatus = "Completed";
    }

    const newRecord = {
      ...formData,
      id: editingId || Date.now(),
      plannedQty,
      producedQty,
      rejectedQty: Number(formData.rejectedQty || 0),
      status: finalStatus,
      actualDate:
        finalStatus === "Completed"
          ? formData.actualDate ||
            new Date().toISOString().split("T")[0]
          : formData.actualDate,
    };

    if (editingId) {
      setTrackingData((prev) =>
        prev.map((item) =>
          item.id === editingId ? newRecord : item
        )
      );
    } else {
      setTrackingData((prev) => [newRecord, ...prev]);
    }

    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
  };

  const handleDelete = (item) => {
    setConfirmAction({
      title: "Delete Tracking Record",
      message: `Are you sure you want to delete ${item.trackingNo}?`,
      type: "delete",
      action: () => {
        setTrackingData((prev) =>
          prev.filter((record) => record.id !== item.id)
        );

        setConfirmAction(null);
      },
    });
  };

  const handleStart = (item) => {
    setConfirmAction({
      title: "Start Production",
      message: `Start production tracking for ${item.orderNo}?`,
      type: "start",
      action: () => {
        setTrackingData((prev) =>
          prev.map((record) =>
            record.id === item.id
              ? {
                  ...record,
                  status: "In Progress",
                  startDate:
                    record.startDate ||
                    new Date().toISOString().split("T")[0],
                }
              : record
          )
        );

        setConfirmAction(null);
      },
    });
  };

  const handleComplete = (item) => {
    setConfirmAction({
      title: "Complete Production",
      message: `Mark ${item.orderNo} as completed?`,
      type: "complete",
      action: () => {
        setTrackingData((prev) =>
          prev.map((record) =>
            record.id === item.id
              ? {
                  ...record,
                  producedQty: record.plannedQty,
                  status: "Completed",
                  actualDate: new Date()
                    .toISOString()
                    .split("T")[0],
                }
              : record
          )
        );

        setConfirmAction(null);
      },
    });
  };

  const handleHold = (item) => {
    setConfirmAction({
      title: "Put Production On Hold",
      message: `Put ${item.orderNo} on hold?`,
      type: "hold",
      action: () => {
        setTrackingData((prev) =>
          prev.map((record) =>
            record.id === item.id
              ? {
                  ...record,
                  status: "On Hold",
                }
              : record
          )
        );

        setConfirmAction(null);
      },
    });
  };

  const handleView = (item) => {
    setSelectedTracking(item);
    setShowViewModal(true);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setMachineFilter("All");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";

      case "In Progress":
        return "in-progress";

      case "Not Started":
        return "not-started";

      case "On Hold":
        return "on-hold";

      case "Cancelled":
        return "cancelled";

      default:
        return "";
    }
  };

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  return (
    <div className="production-tracking-page">
      {/* Header */}
      <div className="tracking-header">
        <div>
          <h1>Production Tracking</h1>
          <p>
            Monitor production progress, quantities, machines and
            completion status.
          </p>
        </div>

        <button
          className="add-tracking-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          New Tracking
        </button>
      </div>

      {/* Summary Cards */}
      <div className="tracking-summary">
        <div className="tracking-card">
          <div className="tracking-card-icon blue">📋</div>

          <div>
            <span>Total Orders</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon orange">⏳</div>

          <div>
            <span>Not Started</span>
            <strong>{summary.notStarted}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon purple">⚙️</div>

          <div>
            <span>In Progress</span>
            <strong>{summary.inProgress}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon green">✓</div>

          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon yellow">⏸</div>

          <div>
            <span>On Hold</span>
            <strong>{summary.onHold}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon red">✕</div>

          <div>
            <span>Cancelled</span>
            <strong>{summary.cancelled}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon teal">📦</div>

          <div>
            <span>Produced Qty</span>
            <strong>{summary.producedQty}</strong>
          </div>
        </div>

        <div className="tracking-card">
          <div className="tracking-card-icon indigo">📊</div>

          <div>
            <span>Overall Progress</span>
            <strong>{summary.progress}%</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="tracking-toolbar">
        <div className="tracking-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search tracking no, order, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
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
          value={machineFilter}
          onChange={(e) => setMachineFilter(e.target.value)}
        >
          <option value="All">All Machines</option>

          {machineOptions.map((machine) => (
            <option key={machine} value={machine}>
              {machine}
            </option>
          ))}
        </select>

        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="tracking-table-card">
        <div className="table-top">
          <div>
            <h2>Production Tracking Records</h2>

            <p>
              Showing {filteredData.length} of{" "}
              {trackingData.length} records
            </p>
          </div>
        </div>

        <div className="table-scroll">
          <table className="tracking-table">
            <thead>
              <tr>
                <th>Tracking No.</th>
                <th>Production Order</th>
                <th>Product</th>
                <th>Machine</th>
                <th>Supervisor</th>
                <th>Planned</th>
                <th>Produced</th>
                <th>Remaining</th>
                <th>Progress</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const progress = getProgress(item);

                  return (
                    <tr key={item.id}>
                      <td>
                        <strong className="tracking-number">
                          {item.trackingNo}
                        </strong>
                      </td>

                      <td>
                        <span className="order-number">
                          {item.orderNo}
                        </span>
                      </td>

                      <td>
                        <div className="product-cell">
                          <div className="product-avatar">
                            {item.product.charAt(0)}
                          </div>

                          <div>
                            <strong>{item.product}</strong>
                            <small>{item.productCode}</small>
                          </div>
                        </div>
                      </td>

                      <td>{item.machine}</td>

                      <td>{item.supervisor}</td>

                      <td>
                        {item.plannedQty} {item.unit}
                      </td>

                      <td>
                        <strong className="produced-value">
                          {item.producedQty} {item.unit}
                        </strong>
                      </td>

                      <td>
                        {getRemainingQty(item)} {item.unit}
                      </td>

                      <td>
                        <div className="progress-wrapper">
                          <div className="progress-bar">
                            <div
                              className={`progress-fill ${getStatusClass(
                                item.status
                              )}`}
                              style={{
                                width: `${progress}%`,
                              }}
                            ></div>
                          </div>

                          <span>{progress}%</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`priority-badge ${getPriorityClass(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`tracking-status ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <div className="tracking-actions">
                          <button
                            className="view-action"
                            title="View"
                            onClick={() => handleView(item)}
                          >
                            👁
                          </button>

                          <button
                            className="edit-action"
                            title="Edit"
                            onClick={() => openEditModal(item)}
                          >
                            ✎
                          </button>

                          {item.status === "Not Started" && (
                            <button
                              className="start-action"
                              title="Start"
                              onClick={() => handleStart(item)}
                            >
                              ▶
                            </button>
                          )}

                          {item.status === "In Progress" && (
                            <>
                              <button
                                className="complete-action"
                                title="Complete"
                                onClick={() =>
                                  handleComplete(item)
                                }
                              >
                                ✓
                              </button>

                              <button
                                className="hold-action"
                                title="Hold"
                                onClick={() => handleHold(item)}
                              >
                                ⏸
                              </button>
                            </>
                          )}

                          <button
                            className="delete-action"
                            title="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12">
                    <div className="no-tracking">
                      <div>📋</div>
                      <h3>No production tracking records found</h3>
                      <p>
                        Try changing your filters or create a new
                        tracking record.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="tracking-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="tracking-modal">
            <div className="tracking-modal-header">
              <div>
                <h2>
                  {editingId
                    ? "Edit Production Tracking"
                    : "New Production Tracking"}
                </h2>

                <p>
                  Enter production progress and tracking
                  information.
                </p>
              </div>

              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form
              className="tracking-form"
              onSubmit={handleSubmit}
            >
              {/* Basic Information */}
              <div className="form-section">
                <h3>Basic Information</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Tracking Number</label>

                    <input
                      type="text"
                      value={formData.trackingNo}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Production Order{" "}
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="orderNo"
                      placeholder="Example: PO-0007"
                      value={formData.orderNo}
                      onChange={handleInputChange}
                    />

                    {errors.orderNo && (
                      <small className="form-error">
                        {errors.orderNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Product <span>*</span>
                    </label>

                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select Product
                      </option>

                      {productOptions.map((product) => (
                        <option
                          key={product.code}
                          value={product.name}
                        >
                          {product.name}
                        </option>
                      ))}
                    </select>

                    {errors.product && (
                      <small className="form-error">
                        {errors.product}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Product Code</label>

                    <input
                      type="text"
                      value={formData.productCode}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>BOM Version</label>

                    <input
                      type="text"
                      value={formData.bomVersion}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Unit</label>

                    <input
                      type="text"
                      value={formData.unit}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Production Details */}
              <div className="form-section">
                <h3>Production Details</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Planned Quantity <span>*</span>
                    </label>

                    <input
                      type="number"
                      name="plannedQty"
                      min="0"
                      placeholder="Enter planned quantity"
                      value={formData.plannedQty}
                      onChange={handleInputChange}
                    />

                    {errors.plannedQty && (
                      <small className="form-error">
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
                      placeholder="Enter produced quantity"
                      value={formData.producedQty}
                      onChange={handleInputChange}
                    />

                    {errors.producedQty && (
                      <small className="form-error">
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
                      placeholder="Enter rejected quantity"
                      value={formData.rejectedQty}
                      onChange={handleInputChange}
                    />

                    {errors.rejectedQty && (
                      <small className="form-error">
                        {errors.rejectedQty}
                      </small>
                    )}
                  </div>

                  <div className="form-group calculated-field">
                    <label>Remaining Quantity</label>

                    <input
                      type="text"
                      value={`${Math.max(
                        0,
                        Number(formData.plannedQty || 0) -
                          Number(formData.producedQty || 0)
                      )} ${formData.unit || ""}`}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Machine & Supervisor */}
              <div className="form-section">
                <h3>Machine & Supervisor</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Machine <span>*</span>
                    </label>

                    <select
                      name="machine"
                      value={formData.machine}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select Machine
                      </option>

                      {machineOptions.map((machine) => (
                        <option key={machine} value={machine}>
                          {machine}
                        </option>
                      ))}
                    </select>

                    {errors.machine && (
                      <small className="form-error">
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
                      value={formData.supervisor}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select Supervisor
                      </option>

                      {supervisorOptions.map((supervisor) => (
                        <option
                          key={supervisor}
                          value={supervisor}
                        >
                          {supervisor}
                        </option>
                      ))}
                    </select>

                    {errors.supervisor && (
                      <small className="form-error">
                        {errors.supervisor}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Priority</label>

                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                    >
                      <option value="Not Started">
                        Not Started
                      </option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                      <option value="On Hold">
                        On Hold
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="form-section">
                <h3>Production Dates</h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Start Date <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />

                    {errors.startDate && (
                      <small className="form-error">
                        {errors.startDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Expected Completion <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="expectedDate"
                      value={formData.expectedDate}
                      onChange={handleInputChange}
                    />

                    {errors.expectedDate && (
                      <small className="form-error">
                        {errors.expectedDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Actual Completion</label>

                    <input
                      type="date"
                      name="actualDate"
                      value={formData.actualDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div className="form-section">
                <h3>Remarks</h3>

                <div className="form-group full-width">
                  <textarea
                    name="remarks"
                    rows="4"
                    placeholder="Enter production remarks..."
                    value={formData.remarks}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              {/* Buttons */}
              <div className="tracking-form-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-tracking-btn"
                >
                  {editingId
                    ? "Update Tracking"
                    : "Save Tracking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedTracking && (
        <div
          className="tracking-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowViewModal(false);
            }
          }}
        >
          <div className="tracking-view-modal">
            <div className="tracking-modal-header">
              <div>
                <h2>Production Tracking Details</h2>

                <p>
                  {selectedTracking.trackingNo} •{" "}
                  {selectedTracking.orderNo}
                </p>
              </div>

              <button
                className="close-modal-btn"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="view-content">
              <div className="view-status-row">
                <span
                  className={`tracking-status ${getStatusClass(
                    selectedTracking.status
                  )}`}
                >
                  {selectedTracking.status}
                </span>

                <span
                  className={`priority-badge ${getPriorityClass(
                    selectedTracking.priority
                  )}`}
                >
                  {selectedTracking.priority} Priority
                </span>
              </div>

              <div className="large-progress-section">
                <div className="large-progress-heading">
                  <strong>Production Progress</strong>

                  <span>
                    {getProgress(selectedTracking)}%
                  </span>
                </div>

                <div className="large-progress-bar">
                  <div
                    className={`large-progress-fill ${getStatusClass(
                      selectedTracking.status
                    )}`}
                    style={{
                      width: `${getProgress(
                        selectedTracking
                      )}%`,
                    }}
                  ></div>
                </div>

                <div className="progress-quantity">
                  <span>
                    Produced:{" "}
                    <strong>
                      {selectedTracking.producedQty}{" "}
                      {selectedTracking.unit}
                    </strong>
                  </span>

                  <span>
                    Planned:{" "}
                    <strong>
                      {selectedTracking.plannedQty}{" "}
                      {selectedTracking.unit}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span>Tracking Number</span>
                  <strong>
                    {selectedTracking.trackingNo}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Production Order</span>
                  <strong>
                    {selectedTracking.orderNo}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Product</span>
                  <strong>
                    {selectedTracking.product}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Product Code</span>
                  <strong>
                    {selectedTracking.productCode}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>BOM Version</span>
                  <strong>
                    {selectedTracking.bomVersion}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Machine</span>
                  <strong>
                    {selectedTracking.machine}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Supervisor</span>
                  <strong>
                    {selectedTracking.supervisor}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Remaining Quantity</span>
                  <strong>
                    {getRemainingQty(selectedTracking)}{" "}
                    {selectedTracking.unit}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Rejected Quantity</span>
                  <strong>
                    {selectedTracking.rejectedQty}{" "}
                    {selectedTracking.unit}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Start Date</span>
                  <strong>
                    {selectedTracking.startDate || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Expected Date</span>
                  <strong>
                    {selectedTracking.expectedDate || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Actual Completion</span>
                  <strong>
                    {selectedTracking.actualDate || "-"}
                  </strong>
                </div>
              </div>

              <div className="remarks-box">
                <span>Remarks</span>
                <p>
                  {selectedTracking.remarks ||
                    "No remarks added."}
                </p>
              </div>

              <div className="view-modal-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>

                <button
                  className="save-tracking-btn"
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedTracking);
                  }}
                >
                  Edit Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-icon">
              {confirmAction.type === "delete"
                ? "🗑"
                : confirmAction.type === "complete"
                ? "✓"
                : confirmAction.type === "hold"
                ? "⏸"
                : "▶"}
            </div>

            <h3>{confirmAction.title}</h3>

            <p>{confirmAction.message}</p>

            <div className="confirmation-buttons">
              <button
                className="cancel-btn"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>

              <button
                className={`confirm-btn ${confirmAction.type}`}
                onClick={confirmAction.action}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductionTracking;