import { useMemo, useState } from "react";
import "./Warehouse Transfer.css";

const initialTransfers = [
  {
    id: 1,
    transferNo: "TRF-2026-001",
    transferDate: "2026-08-28",
    fromWarehouse: "Raw Material Store",
    toWarehouse: "Production Store",
    product: "Steel Sheet 2mm",
    productCode: "RM-001",
    batchNo: "BTH-260801",
    quantity: 50,
    unit: "Kg",
    reason: "Production Requirement",
    requestedBy: "Rahul Patil",
    approvedBy: "Amit Shinde",
    status: "Completed",
    remarks: "Transferred for production order PROD-2026-001",
  },
  {
    id: 2,
    transferNo: "TRF-2026-002",
    transferDate: "2026-08-29",
    fromWarehouse: "Raw Material Store",
    toWarehouse: "Production Store",
    product: "Copper Wire",
    productCode: "RM-002",
    batchNo: "BTH-CU-001",
    quantity: 25,
    unit: "Kg",
    reason: "Production Requirement",
    requestedBy: "Sagar More",
    approvedBy: "",
    status: "Pending",
    remarks: "Required for motor assembly",
  },
  {
    id: 3,
    transferNo: "TRF-2026-003",
    transferDate: "2026-08-30",
    fromWarehouse: "Production Store",
    toWarehouse: "Finished Goods Store",
    product: "Motor Assembly",
    productCode: "FG-001",
    batchNo: "FG-BTH-260830",
    quantity: 20,
    unit: "Nos",
    reason: "Production Completed",
    requestedBy: "Amit Shinde",
    approvedBy: "Rahul Patil",
    status: "Completed",
    remarks: "Finished production output transferred",
  },
  {
    id: 4,
    transferNo: "TRF-2026-004",
    transferDate: "2026-08-31",
    fromWarehouse: "Finished Goods Store",
    toWarehouse: "Quarantine Store",
    product: "Gear Box",
    productCode: "FG-002",
    batchNo: "GB-BTH-002",
    quantity: 3,
    unit: "Nos",
    reason: "Quality Inspection",
    requestedBy: "Priya Deshmukh",
    approvedBy: "",
    status: "Pending",
    remarks: "Moved for quality inspection",
  },
  {
    id: 5,
    transferNo: "TRF-2026-005",
    transferDate: "2026-08-31",
    fromWarehouse: "Raw Material Store",
    toWarehouse: "Production Store",
    product: "Aluminium Rod",
    productCode: "RM-003",
    batchNo: "AL-BTH-001",
    quantity: 40,
    unit: "Kg",
    reason: "Production Requirement",
    requestedBy: "Rahul Patil",
    approvedBy: "Amit Shinde",
    status: "Approved",
    remarks: "",
  },
  {
    id: 6,
    transferNo: "TRF-2026-006",
    transferDate: "2026-09-01",
    fromWarehouse: "Raw Material Store",
    toWarehouse: "Quarantine Store",
    product: "Steel Sheet 2mm",
    productCode: "RM-001",
    batchNo: "BTH-260901",
    quantity: 10,
    unit: "Kg",
    reason: "Damaged Material",
    requestedBy: "Sagar More",
    approvedBy: "",
    status: "Cancelled",
    remarks: "Material found damaged during inspection",
  },
];

const warehouseOptions = [
  "Raw Material Store",
  "Production Store",
  "Finished Goods Store",
  "Quarantine Store",
];

const productOptions = [
  {
    name: "Steel Sheet 2mm",
    code: "RM-001",
    unit: "Kg",
  },
  {
    name: "Copper Wire",
    code: "RM-002",
    unit: "Kg",
  },
  {
    name: "Aluminium Rod",
    code: "RM-003",
    unit: "Kg",
  },
  {
    name: "Motor Assembly",
    code: "FG-001",
    unit: "Nos",
  },
  {
    name: "Gear Box",
    code: "FG-002",
    unit: "Nos",
  },
];

function WarehouseTransfer() {
  const [transfers, setTransfers] = useState(initialTransfers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromWarehouseFilter, setFromWarehouseFilter] = useState("All");
  const [toWarehouseFilter, setToWarehouseFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [viewTransfer, setViewTransfer] = useState(null);
  const [editingTransfer, setEditingTransfer] = useState(null);

  const [formData, setFormData] = useState({
    transferNo: "",
    transferDate: "",
    fromWarehouse: "",
    toWarehouse: "",
    product: "",
    batchNo: "",
    quantity: "",
    unit: "Nos",
    reason: "Production Requirement",
    requestedBy: "",
    approvedBy: "",
    status: "Pending",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  const filteredTransfers = useMemo(() => {
    return transfers.filter((transfer) => {
      const searchText = search.toLowerCase();

      const searchMatch =
        transfer.transferNo.toLowerCase().includes(searchText) ||
        transfer.product.toLowerCase().includes(searchText) ||
        transfer.productCode.toLowerCase().includes(searchText) ||
        transfer.fromWarehouse.toLowerCase().includes(searchText) ||
        transfer.toWarehouse.toLowerCase().includes(searchText) ||
        transfer.requestedBy.toLowerCase().includes(searchText);

      const statusMatch =
        statusFilter === "All" || transfer.status === statusFilter;

      const fromWarehouseMatch =
        fromWarehouseFilter === "All" ||
        transfer.fromWarehouse === fromWarehouseFilter;

      const toWarehouseMatch =
        toWarehouseFilter === "All" ||
        transfer.toWarehouse === toWarehouseFilter;

      const productMatch =
        productFilter === "All" ||
        transfer.product === productFilter;

      const dateMatch =
        !dateFilter || transfer.transferDate === dateFilter;

      return (
        searchMatch &&
        statusMatch &&
        fromWarehouseMatch &&
        toWarehouseMatch &&
        productMatch &&
        dateMatch
      );
    });
  }, [
    transfers,
    search,
    statusFilter,
    fromWarehouseFilter,
    toWarehouseFilter,
    productFilter,
    dateFilter,
  ]);

  const totalTransfers = transfers.length;

  const pendingTransfers = transfers.filter(
    (transfer) => transfer.status === "Pending"
  ).length;

  const approvedTransfers = transfers.filter(
    (transfer) => transfer.status === "Approved"
  ).length;

  const completedTransfers = transfers.filter(
    (transfer) => transfer.status === "Completed"
  ).length;

  const cancelledTransfers = transfers.filter(
    (transfer) => transfer.status === "Cancelled"
  ).length;

  const totalQuantity = transfers
    .filter((transfer) => transfer.status !== "Cancelled")
    .reduce((total, transfer) => total + Number(transfer.quantity), 0);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setFromWarehouseFilter("All");
    setToWarehouseFilter("All");
    setProductFilter("All");
    setDateFilter("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "product") {
      const selectedProduct = productOptions.find(
        (product) => product.name === value
      );

      if (selectedProduct) {
        setFormData((previous) => ({
          ...previous,
          product: selectedProduct.name,
          unit: selectedProduct.unit,
        }));
      }
    }

    if (name === "status") {
      if (value !== "Approved" && value !== "Completed") {
        setFormData((previous) => ({
          ...previous,
          status: value,
          approvedBy: "",
        }));
      }
    }

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.transferNo.trim()) {
      newErrors.transferNo = "Transfer number is required.";
    }

    if (!formData.transferDate) {
      newErrors.transferDate = "Transfer date is required.";
    }

    if (!formData.fromWarehouse) {
      newErrors.fromWarehouse = "Select source warehouse.";
    }

    if (!formData.toWarehouse) {
      newErrors.toWarehouse = "Select destination warehouse.";
    }

    if (
      formData.fromWarehouse &&
      formData.toWarehouse &&
      formData.fromWarehouse === formData.toWarehouse
    ) {
      newErrors.toWarehouse =
        "Source and destination warehouses cannot be the same.";
    }

    if (!formData.product) {
      newErrors.product = "Select a product.";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required.";
    } else if (Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }

    if (!formData.requestedBy.trim()) {
      newErrors.requestedBy = "Requested by is required.";
    }

    if (
      (formData.status === "Approved" ||
        formData.status === "Completed") &&
      !formData.approvedBy.trim()
    ) {
      newErrors.approvedBy = "Approved by is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const openAddModal = () => {
    setEditingTransfer(null);

    setFormData({
      transferNo: "",
      transferDate: new Date().toISOString().split("T")[0],
      fromWarehouse: "",
      toWarehouse: "",
      product: "",
      batchNo: "",
      quantity: "",
      unit: "Nos",
      reason: "Production Requirement",
      requestedBy: "",
      approvedBy: "",
      status: "Pending",
      remarks: "",
    });

    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (transfer) => {
    setEditingTransfer(transfer);

    setFormData({
      transferNo: transfer.transferNo,
      transferDate: transfer.transferDate,
      fromWarehouse: transfer.fromWarehouse,
      toWarehouse: transfer.toWarehouse,
      product: transfer.product,
      batchNo: transfer.batchNo,
      quantity: String(transfer.quantity),
      unit: transfer.unit,
      reason: transfer.reason,
      requestedBy: transfer.requestedBy,
      approvedBy: transfer.approvedBy || "",
      status: transfer.status,
      remarks: transfer.remarks || "",
    });

    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedProduct = productOptions.find(
      (product) => product.name === formData.product
    );

    const transferData = {
      ...formData,
      productCode: selectedProduct?.code || "",
      quantity: Number(formData.quantity),
    };

    if (editingTransfer) {
      setTransfers((previous) =>
        previous.map((transfer) =>
          transfer.id === editingTransfer.id
            ? {
                ...transferData,
                id: editingTransfer.id,
              }
            : transfer
        )
      );
    } else {
      setTransfers((previous) => [
        ...previous,
        {
          ...transferData,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
    setErrors({});
  };

  const handleDelete = (id) => {
    const transfer = transfers.find((item) => item.id === id);

    if (!transfer) return;

    if (
      transfer.status === "Completed" ||
      transfer.status === "Approved"
    ) {
      alert(
        "Approved or completed transfers should not be deleted. Cancel the transfer instead."
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this warehouse transfer?"
    );

    if (confirmDelete) {
      setTransfers((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  const handleApprove = (id) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this warehouse transfer?"
    );

    if (!confirmApprove) return;

    setTransfers((previous) =>
      previous.map((transfer) =>
        transfer.id === id
          ? {
              ...transfer,
              status: "Approved",
              approvedBy: "Current User",
            }
          : transfer
      )
    );
  };

  const handleComplete = (id) => {
    const confirmComplete = window.confirm(
      "Are you sure you want to mark this warehouse transfer as completed?"
    );

    if (!confirmComplete) return;

    setTransfers((previous) =>
      previous.map((transfer) =>
        transfer.id === id
          ? {
              ...transfer,
              status: "Completed",
              approvedBy: transfer.approvedBy || "Current User",
            }
          : transfer
      )
    );
  };

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this warehouse transfer?"
    );

    if (!confirmCancel) return;

    setTransfers((previous) =>
      previous.map((transfer) =>
        transfer.id === id
          ? {
              ...transfer,
              status: "Cancelled",
            }
          : transfer
      )
    );
  };

  return (
    <div className="warehouse-transfer-page">

      {/* HEADER */}
      <div className="warehouse-transfer-header">
        <div>
          <h1>Warehouse Transfer</h1>
          <p>
            Transfer stock between warehouses and track inventory movement
          </p>
        </div>

        <button
          className="add-warehouse-transfer-btn"
          onClick={openAddModal}
        >
          + New Transfer
        </button>
      </div>

      {/* SUMMARY */}
      <div className="warehouse-transfer-summary">

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon blue">↔</div>
          <div>
            <span>Total Transfers</span>
            <strong>{totalTransfers}</strong>
          </div>
        </div>

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon orange">◷</div>
          <div>
            <span>Pending</span>
            <strong>{pendingTransfers}</strong>
          </div>
        </div>

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon purple">✓</div>
          <div>
            <span>Approved</span>
            <strong>{approvedTransfers}</strong>
          </div>
        </div>

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completedTransfers}</strong>
          </div>
        </div>

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon red">×</div>
          <div>
            <span>Cancelled</span>
            <strong>{cancelledTransfers}</strong>
          </div>
        </div>

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon blue">#</div>
          <div>
            <span>Total Quantity</span>
            <strong>{totalQuantity}</strong>
          </div>
        </div>

        <div className="warehouse-transfer-card">
          <div className="transfer-card-icon purple">⌕</div>
          <div>
            <span>Filtered Records</span>
            <strong>{filteredTransfers.length}</strong>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="warehouse-transfer-filter-box">

        <div className="warehouse-transfer-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search transfer, product or warehouse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={fromWarehouseFilter}
          onChange={(e) => setFromWarehouseFilter(e.target.value)}
        >
          <option value="All">All From Warehouses</option>

          {warehouseOptions.map((warehouse) => (
            <option key={warehouse} value={warehouse}>
              {warehouse}
            </option>
          ))}
        </select>

        <select
          value={toWarehouseFilter}
          onChange={(e) => setToWarehouseFilter(e.target.value)}
        >
          <option value="All">All To Warehouses</option>

          {warehouseOptions.map((warehouse) => (
            <option key={warehouse} value={warehouse}>
              {warehouse}
            </option>
          ))}
        </select>

        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        >
          <option value="All">All Products</option>

          {productOptions.map((product) => (
            <option key={product.code} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button
          className="clear-transfer-filter-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {/* TABLE */}
      <div className="warehouse-transfer-table-container">

        <table className="warehouse-transfer-table">

          <thead>
            <tr>
              <th>Transfer No.</th>
              <th>Date</th>
              <th>From Warehouse</th>
              <th>To Warehouse</th>
              <th>Product</th>
              <th>Batch No.</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Requested By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredTransfers.length > 0 ? (
              filteredTransfers.map((transfer) => (
                <tr key={transfer.id}>

                  <td>
                    <strong className="transfer-number">
                      {transfer.transferNo}
                    </strong>
                  </td>

                  <td>{transfer.transferDate}</td>

                  <td>
                    <div className="warehouse-cell">
                      <span className="warehouse-cell-icon">W</span>
                      <span>{transfer.fromWarehouse}</span>
                    </div>
                  </td>

                  <td>
                    <div className="warehouse-cell">
                      <span className="warehouse-cell-icon destination">
                        W
                      </span>
                      <span>{transfer.toWarehouse}</span>
                    </div>
                  </td>

                  <td>
                    <div className="transfer-product">
                      <strong>{transfer.product}</strong>
                      <small>{transfer.productCode}</small>
                    </div>
                  </td>

                  <td>
                    <span className="transfer-batch">
                      {transfer.batchNo || "-"}
                    </span>
                  </td>

                  <td>
                    <strong>
                      {transfer.quantity} {transfer.unit}
                    </strong>
                  </td>

                  <td>{transfer.reason}</td>

                  <td>{transfer.requestedBy}</td>

                  <td>
                    <span
                      className={`transfer-status ${transfer.status.toLowerCase()}`}
                    >
                      {transfer.status}
                    </span>
                  </td>

                  <td>
                    <div className="warehouse-transfer-actions">

                      <button
                        title="View"
                        onClick={() => setViewTransfer(transfer)}
                      >
                        👁
                      </button>

                      <button
                        title="Edit"
                        onClick={() => openEditModal(transfer)}
                        disabled={transfer.status === "Completed"}
                      >
                        ✏️
                      </button>

                      {transfer.status === "Pending" && (
                        <button
                          className="approve-transfer-action"
                          title="Approve"
                          onClick={() => handleApprove(transfer.id)}
                        >
                          ✓
                        </button>
                      )}

                      {transfer.status === "Approved" && (
                        <button
                          className="complete-transfer-action"
                          title="Complete"
                          onClick={() => handleComplete(transfer.id)}
                        >
                          ✓
                        </button>
                      )}

                      {transfer.status !== "Completed" &&
                        transfer.status !== "Cancelled" && (
                          <button
                            className="cancel-transfer-action"
                            title="Cancel"
                            onClick={() => handleCancel(transfer.id)}
                          >
                            ×
                          </button>
                        )}

                      {transfer.status !== "Approved" &&
                        transfer.status !== "Completed" && (
                          <button
                            title="Delete"
                            onClick={() => handleDelete(transfer.id)}
                          >
                            🗑
                          </button>
                        )}

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="no-warehouse-transfers"
                >
                  No warehouse transfers found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="warehouse-transfer-modal-overlay">

          <div className="warehouse-transfer-modal">

            <div className="warehouse-transfer-modal-header">

              <div>
                <h2>
                  {editingTransfer
                    ? "Edit Warehouse Transfer"
                    : "New Warehouse Transfer"}
                </h2>

                <p>
                  Enter stock transfer details below
                </p>
              </div>

              <button
                type="button"
                className="transfer-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form
              className="warehouse-transfer-form"
              onSubmit={handleSubmit}
            >

              <div className="warehouse-transfer-form-grid">

                <div className="form-group">
                  <label>Transfer No. *</label>

                  <input
                    name="transferNo"
                    value={formData.transferNo}
                    onChange={handleChange}
                    placeholder="TRF-2026-007"
                  />

                  {errors.transferNo && (
                    <small className="field-error">
                      {errors.transferNo}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Transfer Date *</label>

                  <input
                    type="date"
                    name="transferDate"
                    value={formData.transferDate}
                    onChange={handleChange}
                  />

                  {errors.transferDate && (
                    <small className="field-error">
                      {errors.transferDate}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>From Warehouse *</label>

                  <select
                    name="fromWarehouse"
                    value={formData.fromWarehouse}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Source Warehouse
                    </option>

                    {warehouseOptions.map((warehouse) => (
                      <option
                        key={warehouse}
                        value={warehouse}
                      >
                        {warehouse}
                      </option>
                    ))}
                  </select>

                  {errors.fromWarehouse && (
                    <small className="field-error">
                      {errors.fromWarehouse}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>To Warehouse *</label>

                  <select
                    name="toWarehouse"
                    value={formData.toWarehouse}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Destination Warehouse
                    </option>

                    {warehouseOptions.map((warehouse) => (
                      <option
                        key={warehouse}
                        value={warehouse}
                      >
                        {warehouse}
                      </option>
                    ))}
                  </select>

                  {errors.toWarehouse && (
                    <small className="field-error">
                      {errors.toWarehouse}
                    </small>
                  )}
                </div>

                <div className="transfer-direction-box">
                  <span>
                    {formData.fromWarehouse || "Source Warehouse"}
                  </span>

                  <strong>→</strong>

                  <span>
                    {formData.toWarehouse || "Destination Warehouse"}
                  </span>
                </div>

                <div className="form-group">
                  <label>Product *</label>

                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value="">Select Product</option>

                    {productOptions.map((product) => (
                      <option
                        key={product.code}
                        value={product.name}
                      >
                        {product.name} ({product.code})
                      </option>
                    ))}
                  </select>

                  {errors.product && (
                    <small className="field-error">
                      {errors.product}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Batch No.</label>

                  <input
                    name="batchNo"
                    value={formData.batchNo}
                    onChange={handleChange}
                    placeholder="Enter batch number"
                  />
                </div>

                <div className="form-group">
                  <label>Quantity *</label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    placeholder="Enter quantity"
                  />

                  {errors.quantity && (
                    <small className="field-error">
                      {errors.quantity}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Unit</label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="Nos">Nos</option>
                    <option value="Kg">Kg</option>
                    <option value="Gram">Gram</option>
                    <option value="Meter">Meter</option>
                    <option value="Liter">Liter</option>
                    <option value="Box">Box</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Reason</label>

                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  >
                    <option value="Production Requirement">
                      Production Requirement
                    </option>
                    <option value="Production Completed">
                      Production Completed
                    </option>
                    <option value="Quality Inspection">
                      Quality Inspection
                    </option>
                    <option value="Damaged Material">
                      Damaged Material
                    </option>
                    <option value="Warehouse Reorganization">
                      Warehouse Reorganization
                    </option>
                    <option value="Stock Balancing">
                      Stock Balancing
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Requested By *</label>

                  <input
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleChange}
                    placeholder="Employee name"
                  />

                  {errors.requestedBy && (
                    <small className="field-error">
                      {errors.requestedBy}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Approved By</label>

                  <input
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleChange}
                    placeholder="Approver name"
                  />

                  {errors.approvedBy && (
                    <small className="field-error">
                      {errors.approvedBy}
                    </small>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Remarks</label>

                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter transfer remarks..."
                    rows="3"
                  />
                </div>

              </div>

              <div className="warehouse-transfer-form-buttons">

                <button
                  type="button"
                  className="cancel-transfer-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-warehouse-transfer-btn"
                >
                  {editingTransfer
                    ? "Update Transfer"
                    : "Save Transfer"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {viewTransfer && (
        <div className="warehouse-transfer-modal-overlay">

          <div className="warehouse-transfer-view-modal">

            <div className="warehouse-transfer-modal-header">

              <div>
                <h2>Warehouse Transfer Details</h2>
                <p>{viewTransfer.transferNo}</p>
              </div>

              <button
                type="button"
                className="transfer-modal-close"
                onClick={() => setViewTransfer(null)}
              >
                ×
              </button>

            </div>

            <div className="transfer-view-content">

              <div className="transfer-view-top">

                <span
                  className={`transfer-status ${viewTransfer.status.toLowerCase()}`}
                >
                  {viewTransfer.status}
                </span>

                <strong>
                  {viewTransfer.transferNo}
                </strong>

              </div>

              <div className="warehouse-route-view">

                <div className="route-warehouse">
                  <small>FROM WAREHOUSE</small>
                  <strong>
                    {viewTransfer.fromWarehouse}
                  </strong>
                </div>

                <div className="route-arrow">
                  →
                </div>

                <div className="route-warehouse">
                  <small>TO WAREHOUSE</small>
                  <strong>
                    {viewTransfer.toWarehouse}
                  </strong>
                </div>

              </div>

              <div className="transfer-details-grid">

                <div>
                  <label>Transfer Date</label>
                  <strong>{viewTransfer.transferDate}</strong>
                </div>

                <div>
                  <label>Product</label>
                  <strong>{viewTransfer.product}</strong>
                </div>

                <div>
                  <label>Product Code</label>
                  <strong>{viewTransfer.productCode}</strong>
                </div>

                <div>
                  <label>Batch No.</label>
                  <strong>
                    {viewTransfer.batchNo || "-"}
                  </strong>
                </div>

                <div>
                  <label>Quantity</label>
                  <strong>
                    {viewTransfer.quantity} {viewTransfer.unit}
                  </strong>
                </div>

                <div>
                  <label>Reason</label>
                  <strong>{viewTransfer.reason}</strong>
                </div>

                <div>
                  <label>Requested By</label>
                  <strong>{viewTransfer.requestedBy}</strong>
                </div>

                <div>
                  <label>Approved By</label>
                  <strong>
                    {viewTransfer.approvedBy || "-"}
                  </strong>
                </div>

              </div>

              <div className="transfer-view-remarks">
                <label>Remarks</label>
                <p>
                  {viewTransfer.remarks || "No remarks added."}
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default WarehouseTransfer;