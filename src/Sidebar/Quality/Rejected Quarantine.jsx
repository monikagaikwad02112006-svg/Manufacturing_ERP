import { useMemo, useState } from "react";
import "./Rejected Quarantine.css";

const products = [
  {
    name: "Steel Sheet",
    code: "RM-001",
    unit: "Kg",
  },
  {
    name: "Aluminium Rod",
    code: "RM-002",
    unit: "Kg",
  },
  {
    name: "Gear Housing",
    code: "FG-001",
    unit: "Nos",
  },
  {
    name: "Motor Shaft",
    code: "FG-002",
    unit: "Nos",
  },
  {
    name: "Bearing 6205",
    code: "RM-003",
    unit: "Nos",
  },
];

const warehouses = [
  "Raw Material Store",
  "Finished Goods Store",
  "Quarantine Store",
  "Production Store",
];

const reasons = [
  "Damaged",
  "Dimension Issue",
  "Surface Defect",
  "Quality Failure",
  "Wrong Specification",
  "Material Defect",
];

const initialRecords = [
  {
    id: 1,
    recordNo: "RQ-0001",
    date: "2026-09-08",
    product: "Steel Sheet",
    productCode: "RM-001",
    batch: "SS-B2401",
    quantity: 25,
    unit: "Kg",
    warehouse: "Quarantine Store",
    source: "GRN-1025",
    reason: "Surface Defect",
    status: "Quarantine",
    detectedBy: "Rahul Patil",
    inspectedBy: "Amit Sharma",
    location: "Q-01",
    remarks: "Surface scratches found during inspection.",
  },
  {
    id: 2,
    recordNo: "RQ-0002",
    date: "2026-09-07",
    product: "Gear Housing",
    productCode: "FG-001",
    batch: "GH-2607",
    quantity: 8,
    unit: "Nos",
    warehouse: "Quarantine Store",
    source: "PO-2045",
    reason: "Dimension Issue",
    status: "Rejected",
    detectedBy: "Sneha More",
    inspectedBy: "Amit Sharma",
    location: "Q-02",
    remarks: "Outer diameter is outside tolerance.",
  },
  {
    id: 3,
    recordNo: "RQ-0003",
    date: "2026-09-06",
    product: "Aluminium Rod",
    productCode: "RM-002",
    batch: "AR-1088",
    quantity: 40,
    unit: "Kg",
    warehouse: "Raw Material Store",
    source: "GRN-1022",
    reason: "Material Defect",
    status: "Rework",
    detectedBy: "Rahul Patil",
    inspectedBy: "Neha Joshi",
    location: "RM-04",
    remarks: "Material sent for rework and sorting.",
  },
  {
    id: 4,
    recordNo: "RQ-0004",
    date: "2026-09-05",
    product: "Motor Shaft",
    productCode: "FG-002",
    batch: "MS-3021",
    quantity: 5,
    unit: "Nos",
    warehouse: "Finished Goods Store",
    source: "PROD-5012",
    reason: "Quality Failure",
    status: "Released",
    detectedBy: "Sneha More",
    inspectedBy: "Neha Joshi",
    location: "FG-08",
    remarks: "Re-inspection completed successfully.",
  },
  {
    id: 5,
    recordNo: "RQ-0005",
    date: "2026-09-04",
    product: "Bearing 6205",
    productCode: "RM-003",
    batch: "BR-7702",
    quantity: 12,
    unit: "Nos",
    warehouse: "Quarantine Store",
    source: "GRN-1018",
    reason: "Damaged",
    status: "Scrapped",
    detectedBy: "Rahul Patil",
    inspectedBy: "Amit Sharma",
    location: "Q-03",
    remarks: "Bearing damage confirmed. Scrap approved.",
  },
];

const emptyForm = {
  date: new Date().toISOString().split("T")[0],
  product: "",
  productCode: "",
  batch: "",
  quantity: "",
  unit: "",
  warehouse: "",
  source: "",
  reason: "",
  status: "Quarantine",
  detectedBy: "",
  inspectedBy: "",
  location: "",
  remarks: "",
};

function RejectedQuarantine() {
  const [records, setRecords] = useState(initialRecords);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        record.recordNo.toLowerCase().includes(searchText) ||
        record.product.toLowerCase().includes(searchText) ||
        record.productCode.toLowerCase().includes(searchText) ||
        record.batch.toLowerCase().includes(searchText) ||
        record.source.toLowerCase().includes(searchText);

      const matchesStatus =
        !statusFilter || record.status === statusFilter;

      const matchesReason =
        !reasonFilter || record.reason === reasonFilter;

      const matchesWarehouse =
        !warehouseFilter || record.warehouse === warehouseFilter;

      const matchesDate =
        !dateFilter || record.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesReason &&
        matchesWarehouse &&
        matchesDate
      );
    });
  }, [
    records,
    search,
    statusFilter,
    reasonFilter,
    warehouseFilter,
    dateFilter,
  ]);

  const summary = useMemo(() => {
    const totalQuantity = records.reduce(
      (sum, record) => sum + Number(record.quantity || 0),
      0
    );

    return {
      total: records.length,
      quarantine: records.filter(
        (record) => record.status === "Quarantine"
      ).length,
      rejected: records.filter(
        (record) => record.status === "Rejected"
      ).length,
      released: records.filter(
        (record) => record.status === "Released"
      ).length,
      rework: records.filter(
        (record) => record.status === "Rework"
      ).length,
      scrapped: records.filter(
        (record) => record.status === "Scrapped"
      ).length,
      totalQuantity,
    };
  }, [records]);

  const openAddModal = () => {
    setEditingRecord(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setForm({
      date: record.date,
      product: record.product,
      productCode: record.productCode,
      batch: record.batch,
      quantity: record.quantity,
      unit: record.unit,
      warehouse: record.warehouse,
      source: record.source,
      reason: record.reason,
      status: record.status,
      detectedBy: record.detectedBy,
      inspectedBy: record.inspectedBy,
      location: record.location,
      remarks: record.remarks,
    });

    setErrors({});
    setShowModal(true);
  };

  const openViewModal = (record) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setEditingRecord(null);
    setSelectedRecord(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "product") {
      const selectedProduct = products.find(
        (product) => product.name === value
      );

      setForm((prev) => ({
        ...prev,
        product: value,
        productCode: selectedProduct?.code || "",
        unit: selectedProduct?.unit || "",
      }));

      return;
    }

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

    if (!form.date) {
      newErrors.date = "Date is required.";
    }

    if (!form.product) {
      newErrors.product = "Please select a product.";
    }

    if (!form.batch.trim()) {
      newErrors.batch = "Batch number is required.";
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      newErrors.quantity = "Enter a valid quantity.";
    }

    if (!form.warehouse) {
      newErrors.warehouse = "Please select a warehouse.";
    }

    if (!form.reason) {
      newErrors.reason = "Please select a rejection reason.";
    }

    if (!form.detectedBy.trim()) {
      newErrors.detectedBy = "Detected by is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === editingRecord.id
            ? {
                ...record,
                ...form,
                quantity: Number(form.quantity),
              }
            : record
        )
      );
    } else {
      const newRecord = {
        id: Date.now(),
        recordNo: `RQ-${String(records.length + 1).padStart(4, "0")}`,
        ...form,
        quantity: Number(form.quantity),
      };

      setRecords((prev) => [newRecord, ...prev]);
    }

    closeModal();
  };

  const deleteRecord = (id) => {
    const record = records.find((item) => item.id === id);

    if (!record) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${record.recordNo}?`
    );

    if (!confirmed) return;

    setRecords((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    const record = records.find((item) => item.id === id);

    if (!record) return;

    const confirmed = window.confirm(
      `Change ${record.recordNo} status to ${newStatus}?`
    );

    if (!confirmed) return;

    setRecords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setReasonFilter("");
    setWarehouseFilter("");
    setDateFilter("");
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="rejected-quarantine-page">
      {/* Header */}
      <div className="rq-header">
        <div>
          <h1>Rejected / Quarantine</h1>
          <p>
            Manage rejected, quarantined, rework, released and scrapped
            inventory items.
          </p>
        </div>

        <button className="rq-primary-btn" onClick={openAddModal}>
          <span>＋</span>
          New Record
        </button>
      </div>

      {/* Summary Cards */}
      <div className="rq-summary-grid">
        <div className="rq-summary-card">
          <div className="rq-card-icon blue">▣</div>
          <div>
            <span>Total Records</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="rq-summary-card">
          <div className="rq-card-icon orange">◷</div>
          <div>
            <span>Quarantine</span>
            <strong>{summary.quarantine}</strong>
          </div>
        </div>

        <div className="rq-summary-card">
          <div className="rq-card-icon red">!</div>
          <div>
            <span>Rejected</span>
            <strong>{summary.rejected}</strong>
          </div>
        </div>

        <div className="rq-summary-card">
          <div className="rq-card-icon green">✓</div>
          <div>
            <span>Released</span>
            <strong>{summary.released}</strong>
          </div>
        </div>

        <div className="rq-summary-card">
          <div className="rq-card-icon purple">↻</div>
          <div>
            <span>Rework</span>
            <strong>{summary.rework}</strong>
          </div>
        </div>

        <div className="rq-summary-card">
          <div className="rq-card-icon dark-red">×</div>
          <div>
            <span>Scrapped</span>
            <strong>{summary.scrapped}</strong>
          </div>
        </div>

        <div className="rq-summary-card quantity-card">
          <div className="rq-card-icon teal">#</div>
          <div>
            <span>Total Quantity</span>
            <strong>{summary.totalQuantity}</strong>
          </div>
        </div>

        <div className="rq-summary-card">
          <div className="rq-card-icon gray">≡</div>
          <div>
            <span>Filtered Records</span>
            <strong>{filteredRecords.length}</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rq-filter-box">
        <div className="rq-filter-header">
          <div>
            <h3>Search & Filters</h3>
            <span>Find rejected and quarantine records quickly.</span>
          </div>

          <button className="rq-clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="rq-filter-grid">
          <div className="rq-filter-group rq-search-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Record, product, batch, source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="rq-filter-group">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Quarantine">Quarantine</option>
              <option value="Rejected">Rejected</option>
              <option value="Rework">Rework</option>
              <option value="Released">Released</option>
              <option value="Scrapped">Scrapped</option>
            </select>
          </div>

          <div className="rq-filter-group">
            <label>Reason</label>
            <select
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
            >
              <option value="">All Reasons</option>

              {reasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          <div className="rq-filter-group">
            <label>Warehouse</label>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
            >
              <option value="">All Warehouses</option>

              {warehouses.map((warehouse) => (
                <option key={warehouse} value={warehouse}>
                  {warehouse}
                </option>
              ))}
            </select>
          </div>

          <div className="rq-filter-group">
            <label>Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rq-table-card">
        <div className="rq-table-header">
          <div>
            <h3>Rejected / Quarantine Records</h3>
            <span>
              Showing {filteredRecords.length} of {records.length} records
            </span>
          </div>
        </div>

        <div className="rq-table-wrapper">
          <table className="rq-table">
            <thead>
              <tr>
                <th>Record No.</th>
                <th>Date</th>
                <th>Product</th>
                <th>Batch</th>
                <th>Quantity</th>
                <th>Warehouse</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong className="rq-record-no">
                        {record.recordNo}
                      </strong>
                    </td>

                    <td>{record.date}</td>

                    <td>
                      <div className="rq-product-cell">
                        <div className="rq-product-icon">
                          {record.product.charAt(0)}
                        </div>

                        <div>
                          <strong>{record.product}</strong>
                          <span>{record.productCode}</span>
                        </div>
                      </div>
                    </td>

                    <td>{record.batch}</td>

                    <td>
                      <strong>{record.quantity}</strong>{" "}
                      <span className="rq-unit">{record.unit}</span>
                    </td>

                    <td>{record.warehouse}</td>

                    <td>
                      <span className="rq-reason-badge">
                        {record.reason}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`rq-status ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td>{record.source || "-"}</td>

                    <td>
                      <div className="rq-actions">
                        <button
                          className="rq-action view"
                          title="View"
                          onClick={() => openViewModal(record)}
                        >
                          View
                        </button>

                        <button
                          className="rq-action edit"
                          title="Edit"
                          onClick={() => openEditModal(record)}
                        >
                          Edit
                        </button>

                        <button
                          className="rq-action delete"
                          title="Delete"
                          onClick={() => deleteRecord(record.id)}
                        >
                          Delete
                        </button>

                        {record.status === "Quarantine" && (
                          <>
                            <button
                              className="rq-action release"
                              onClick={() =>
                                updateStatus(record.id, "Released")
                              }
                            >
                              Release
                            </button>

                            <button
                              className="rq-action rework"
                              onClick={() =>
                                updateStatus(record.id, "Rework")
                              }
                            >
                              Rework
                            </button>

                            <button
                              className="rq-action scrap"
                              onClick={() =>
                                updateStatus(record.id, "Scrapped")
                              }
                            >
                              Scrap
                            </button>
                          </>
                        )}

                        {record.status === "Rejected" && (
                          <>
                            <button
                              className="rq-action rework"
                              onClick={() =>
                                updateStatus(record.id, "Rework")
                              }
                            >
                              Rework
                            </button>

                            <button
                              className="rq-action scrap"
                              onClick={() =>
                                updateStatus(record.id, "Scrapped")
                              }
                            >
                              Scrap
                            </button>
                          </>
                        )}

                        {record.status === "Rework" && (
                          <button
                            className="rq-action release"
                            onClick={() =>
                              updateStatus(record.id, "Released")
                            }
                          >
                            Release
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">
                    <div className="rq-empty">
                      <div className="rq-empty-icon">⌕</div>
                      <h3>No records found</h3>
                      <p>
                        Try changing your search or filter criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="rq-modal-overlay" onClick={closeModal}>
          <div
            className="rq-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rq-modal-header">
              <div>
                <h2>
                  {editingRecord
                    ? "Edit Rejection / Quarantine Record"
                    : "New Rejection / Quarantine Record"}
                </h2>

                <p>
                  Enter quality rejection and quarantine details.
                </p>
              </div>

              <button
                className="rq-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="rq-form-body">
                <div className="rq-section-title">
                  <span>01</span>
                  Basic Information
                </div>

                <div className="rq-form-grid">
                  <div className="rq-form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                    {errors.date && (
                      <small>{errors.date}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Product *</label>
                    <select
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                    >
                      <option value="">Select Product</option>

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
                      <small>{errors.product}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Product Code</label>
                    <input
                      type="text"
                      value={form.productCode}
                      readOnly
                      placeholder="Auto-filled"
                    />
                  </div>

                  <div className="rq-form-group">
                    <label>Batch Number *</label>
                    <input
                      type="text"
                      name="batch"
                      value={form.batch}
                      onChange={handleChange}
                      placeholder="Enter batch number"
                    />

                    {errors.batch && (
                      <small>{errors.batch}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Quantity *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                    />

                    {errors.quantity && (
                      <small>{errors.quantity}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Unit</label>
                    <input
                      type="text"
                      value={form.unit}
                      readOnly
                      placeholder="Auto-filled"
                    />
                  </div>

                  <div className="rq-form-group">
                    <label>Warehouse *</label>
                    <select
                      name="warehouse"
                      value={form.warehouse}
                      onChange={handleChange}
                    >
                      <option value="">Select Warehouse</option>

                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse}
                          value={warehouse}
                        >
                          {warehouse}
                        </option>
                      ))}
                    </select>

                    {errors.warehouse && (
                      <small>{errors.warehouse}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Location / Bin</label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Example: Q-01"
                    />
                  </div>
                </div>

                <div className="rq-section-title">
                  <span>02</span>
                  Quality Details
                </div>

                <div className="rq-form-grid">
                  <div className="rq-form-group">
                    <label>Source / Reference</label>
                    <input
                      type="text"
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      placeholder="GRN / Production Order / PO"
                    />
                  </div>

                  <div className="rq-form-group">
                    <label>Issue / Rejection Reason *</label>
                    <select
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                    >
                      <option value="">Select Reason</option>

                      {reasons.map((reason) => (
                        <option
                          key={reason}
                          value={reason}
                        >
                          {reason}
                        </option>
                      ))}
                    </select>

                    {errors.reason && (
                      <small>{errors.reason}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="Quarantine">
                        Quarantine
                      </option>
                      <option value="Rejected">
                        Rejected
                      </option>
                      <option value="Rework">Rework</option>
                      <option value="Released">
                        Released
                      </option>
                      <option value="Scrapped">
                        Scrapped
                      </option>
                    </select>
                  </div>

                  <div className="rq-form-group">
                    <label>Detected By *</label>
                    <input
                      type="text"
                      name="detectedBy"
                      value={form.detectedBy}
                      onChange={handleChange}
                      placeholder="Employee name"
                    />

                    {errors.detectedBy && (
                      <small>{errors.detectedBy}</small>
                    )}
                  </div>

                  <div className="rq-form-group">
                    <label>Inspected By</label>
                    <input
                      type="text"
                      name="inspectedBy"
                      value={form.inspectedBy}
                      onChange={handleChange}
                      placeholder="Inspector name"
                    />
                  </div>

                  <div className="rq-form-group full-width">
                    <label>Remarks</label>
                    <textarea
                      name="remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      placeholder="Enter rejection / inspection remarks..."
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              <div className="rq-modal-footer">
                <button
                  type="button"
                  className="rq-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rq-save-btn"
                >
                  {editingRecord
                    ? "Update Record"
                    : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedRecord && (
        <div
          className="rq-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="rq-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rq-modal-header">
              <div>
                <h2>Record Details</h2>
                <p>{selectedRecord.recordNo}</p>
              </div>

              <button
                className="rq-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <div className="rq-view-body">
              <div className="rq-view-top">
                <div>
                  <span>Record Number</span>
                  <strong>{selectedRecord.recordNo}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    <span
                      className={`rq-status ${getStatusClass(
                        selectedRecord.status
                      )}`}
                    >
                      {selectedRecord.status}
                    </span>
                  </strong>
                </div>
              </div>

              <div className="rq-detail-grid">
                <div>
                  <span>Date</span>
                  <strong>{selectedRecord.date}</strong>
                </div>

                <div>
                  <span>Product</span>
                  <strong>{selectedRecord.product}</strong>
                </div>

                <div>
                  <span>Product Code</span>
                  <strong>{selectedRecord.productCode}</strong>
                </div>

                <div>
                  <span>Batch</span>
                  <strong>{selectedRecord.batch}</strong>
                </div>

                <div>
                  <span>Quantity</span>
                  <strong>
                    {selectedRecord.quantity}{" "}
                    {selectedRecord.unit}
                  </strong>
                </div>

                <div>
                  <span>Warehouse</span>
                  <strong>{selectedRecord.warehouse}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {selectedRecord.location || "-"}
                  </strong>
                </div>

                <div>
                  <span>Source</span>
                  <strong>
                    {selectedRecord.source || "-"}
                  </strong>
                </div>

                <div>
                  <span>Reason</span>
                  <strong>{selectedRecord.reason}</strong>
                </div>

                <div>
                  <span>Detected By</span>
                  <strong>{selectedRecord.detectedBy}</strong>
                </div>

                <div>
                  <span>Inspected By</span>
                  <strong>
                    {selectedRecord.inspectedBy || "-"}
                  </strong>
                </div>
              </div>

              <div className="rq-remarks-box">
                <span>Remarks</span>
                <p>
                  {selectedRecord.remarks ||
                    "No remarks available."}
                </p>
              </div>
            </div>

            <div className="rq-modal-footer">
              <button
                className="rq-secondary-btn"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                className="rq-save-btn"
                onClick={() => {
                  closeModal();
                  openEditModal(selectedRecord);
                }}
              >
                Edit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RejectedQuarantine;