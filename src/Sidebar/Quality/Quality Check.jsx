import { useMemo, useState } from "react";
import "./Quality Check.css";

const productOptions = [
  {
    name: "Steel Gear",
    code: "PRD-001",
    unit: "Nos",
  },
  {
    name: "Aluminium Bracket",
    code: "PRD-002",
    unit: "Nos",
  },
  {
    name: "Copper Wire",
    code: "PRD-003",
    unit: "Meter",
  },
  {
    name: "Motor Housing",
    code: "PRD-004",
    unit: "Nos",
  },
];

const productionOrders = [
  "PO-2026-001",
  "PO-2026-002",
  "PO-2026-003",
  "PO-2026-004",
];

const inspectors = [
  "Priya Sharma",
  "Rahul Patil",
  "Amit Joshi",
  "Sneha Kulkarni",
];

const initialChecks = [
  {
    id: 1,
    inspectionNo: "QC-2026-001",
    productionOrder: "PO-2026-001",
    product: "Steel Gear",
    productCode: "PRD-001",
    batchNo: "BATCH-SG-001",
    inspectionType: "Final Inspection",
    inspectionDate: "2026-09-01",
    inspector: "Priya Sharma",
    sampleQty: 100,
    acceptedQty: 96,
    rejectedQty: 4,
    rejectionReason: "Surface scratches",
    defectDetails: "Minor scratches found on outer surface.",
    status: "Completed",
    result: "Passed",
    remarks: "Accepted for dispatch.",
    parameters: [
      {
        name: "Diameter",
        specification: "50 ± 0.5 mm",
        actualValue: "50.2 mm",
        result: "Pass",
      },
      {
        name: "Surface Finish",
        specification: "Smooth",
        actualValue: "Smooth",
        result: "Pass",
      },
    ],
  },
  {
    id: 2,
    inspectionNo: "QC-2026-002",
    productionOrder: "PO-2026-002",
    product: "Aluminium Bracket",
    productCode: "PRD-002",
    batchNo: "BATCH-AB-002",
    inspectionType: "In-Process Inspection",
    inspectionDate: "2026-09-02",
    inspector: "Rahul Patil",
    sampleQty: 50,
    acceptedQty: 45,
    rejectedQty: 5,
    rejectionReason: "Dimension mismatch",
    defectDetails: "Bracket width outside tolerance.",
    status: "Completed",
    result: "Failed",
    remarks: "Batch sent for review.",
    parameters: [
      {
        name: "Width",
        specification: "25 ± 0.2 mm",
        actualValue: "25.6 mm",
        result: "Fail",
      },
      {
        name: "Weight",
        specification: "120 ± 5 g",
        actualValue: "121 g",
        result: "Pass",
      },
    ],
  },
  {
    id: 3,
    inspectionNo: "QC-2026-003",
    productionOrder: "PO-2026-003",
    product: "Copper Wire",
    productCode: "PRD-003",
    batchNo: "BATCH-CW-003",
    inspectionType: "Raw Material Inspection",
    inspectionDate: "2026-09-03",
    inspector: "Amit Joshi",
    sampleQty: 200,
    acceptedQty: 200,
    rejectedQty: 0,
    rejectionReason: "",
    defectDetails: "",
    status: "Completed",
    result: "Passed",
    remarks: "Material meets quality standards.",
    parameters: [
      {
        name: "Thickness",
        specification: "2 ± 0.1 mm",
        actualValue: "2.02 mm",
        result: "Pass",
      },
    ],
  },
  {
    id: 4,
    inspectionNo: "QC-2026-004",
    productionOrder: "PO-2026-004",
    product: "Motor Housing",
    productCode: "PRD-004",
    batchNo: "BATCH-MH-004",
    inspectionType: "Final Inspection",
    inspectionDate: "2026-09-04",
    inspector: "Sneha Kulkarni",
    sampleQty: 75,
    acceptedQty: 0,
    rejectedQty: 0,
    rejectionReason: "",
    defectDetails: "",
    status: "Pending",
    result: "Pending",
    remarks: "Inspection not started.",
    parameters: [
      {
        name: "Diameter",
        specification: "100 ± 1 mm",
        actualValue: "",
        result: "Pending",
      },
      {
        name: "Surface Finish",
        specification: "Smooth",
        actualValue: "",
        result: "Pending",
      },
    ],
  },
  {
    id: 5,
    inspectionNo: "QC-2026-005",
    productionOrder: "PO-2026-002",
    product: "Aluminium Bracket",
    productCode: "PRD-002",
    batchNo: "BATCH-AB-005",
    inspectionType: "In-Process Inspection",
    inspectionDate: "2026-09-05",
    inspector: "Priya Sharma",
    sampleQty: 40,
    acceptedQty: 38,
    rejectedQty: 2,
    rejectionReason: "Minor burrs",
    defectDetails: "Burrs found on two pieces.",
    status: "On Hold",
    result: "Hold",
    remarks: "Awaiting supervisor decision.",
    parameters: [
      {
        name: "Edge Finish",
        specification: "No burrs",
        actualValue: "Minor burrs",
        result: "Fail",
      },
    ],
  },
];

const emptyParameter = {
  name: "",
  specification: "",
  actualValue: "",
  result: "Pending",
};

const emptyForm = {
  inspectionNo: "",
  productionOrder: "",
  product: "",
  productCode: "",
  batchNo: "",
  inspectionType: "Final Inspection",
  inspectionDate: new Date().toISOString().split("T")[0],
  inspector: "",
  sampleQty: "",
  acceptedQty: "",
  rejectedQty: "",
  rejectionReason: "",
  defectDetails: "",
  status: "Pending",
  result: "Pending",
  remarks: "",
  parameters: [{ ...emptyParameter }],
};

function QualityCheck() {
  const [checks, setChecks] = useState(initialChecks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingCheck, setEditingCheck] = useState(null);
  const [viewingCheck, setViewingCheck] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredChecks = useMemo(() => {
    return checks.filter((check) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        check.inspectionNo.toLowerCase().includes(searchText) ||
        check.product.toLowerCase().includes(searchText) ||
        check.productCode.toLowerCase().includes(searchText) ||
        check.batchNo.toLowerCase().includes(searchText) ||
        check.productionOrder.toLowerCase().includes(searchText) ||
        check.inspector.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || check.status === statusFilter;

      const matchesResult =
        resultFilter === "All" || check.result === resultFilter;

      const matchesType =
        typeFilter === "All" || check.inspectionType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesResult &&
        matchesType
      );
    });
  }, [checks, search, statusFilter, resultFilter, typeFilter]);

  const summary = useMemo(() => {
    const totalSample = checks.reduce(
      (sum, check) => sum + Number(check.sampleQty || 0),
      0
    );

    const totalAccepted = checks.reduce(
      (sum, check) => sum + Number(check.acceptedQty || 0),
      0
    );

    const totalRejected = checks.reduce(
      (sum, check) => sum + Number(check.rejectedQty || 0),
      0
    );

    return {
      total: checks.length,
      pending: checks.filter((c) => c.status === "Pending").length,
      inProgress: checks.filter((c) => c.status === "In Progress").length,
      completed: checks.filter((c) => c.status === "Completed").length,
      passed: checks.filter((c) => c.result === "Passed").length,
      failed: checks.filter((c) => c.result === "Failed").length,
      onHold: checks.filter((c) => c.status === "On Hold").length,
      totalSample,
      totalAccepted,
      totalRejected,
    };
  }, [checks]);

  const generateInspectionNo = () => {
    const nextNumber = checks.length + 1;
    return `QC-2026-${String(nextNumber).padStart(3, "0")}`;
  };

  const openAddModal = () => {
    setEditingCheck(null);
    setErrors({});

    setForm({
      ...emptyForm,
      inspectionNo: generateInspectionNo(),
      inspectionDate: new Date().toISOString().split("T")[0],
      parameters: [{ ...emptyParameter }],
    });

    setShowModal(true);
  };

  const openEditModal = (check) => {
    setEditingCheck(check);
    setErrors({});
    setForm({
      ...check,
      parameters:
        check.parameters?.length > 0
          ? check.parameters.map((parameter) => ({ ...parameter }))
          : [{ ...emptyParameter }],
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCheck(null);
    setErrors({});
  };

  const openViewModal = (check) => {
    setViewingCheck(check);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setViewingCheck(null);
    setShowViewModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

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

  const handleProductChange = (e) => {
    const productName = e.target.value;
    const selectedProduct = productOptions.find(
      (product) => product.name === productName
    );

    setForm((prev) => ({
      ...prev,
      product: productName,
      productCode: selectedProduct?.code || "",
    }));
  };

  const handleParameterChange = (index, field, value) => {
    setForm((prev) => {
      const updatedParameters = [...prev.parameters];

      updatedParameters[index] = {
        ...updatedParameters[index],
        [field]: value,
      };

      return {
        ...prev,
        parameters: updatedParameters,
      };
    });
  };

  const addParameter = () => {
    setForm((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { ...emptyParameter }],
    }));
  };

  const removeParameter = (index) => {
    if (form.parameters.length === 1) return;

    setForm((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.productionOrder) {
      newErrors.productionOrder = "Production order is required.";
    }

    if (!form.product) {
      newErrors.product = "Product is required.";
    }

    if (!form.batchNo.trim()) {
      newErrors.batchNo = "Batch number is required.";
    }

    if (!form.inspectionDate) {
      newErrors.inspectionDate = "Inspection date is required.";
    }

    if (!form.inspector) {
      newErrors.inspector = "Inspector is required.";
    }

    if (!form.sampleQty || Number(form.sampleQty) <= 0) {
      newErrors.sampleQty = "Enter a valid sample quantity.";
    }

    const sampleQty = Number(form.sampleQty || 0);
    const acceptedQty = Number(form.acceptedQty || 0);
    const rejectedQty = Number(form.rejectedQty || 0);

    if (acceptedQty + rejectedQty > sampleQty) {
      newErrors.acceptedQty =
        "Accepted + rejected quantity cannot exceed sample quantity.";
    }

    if (rejectedQty > 0 && !form.rejectionReason.trim()) {
      newErrors.rejectionReason =
        "Rejection reason is required when rejected quantity is greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const checkData = {
      ...form,
      id: editingCheck ? editingCheck.id : Date.now(),
      sampleQty: Number(form.sampleQty || 0),
      acceptedQty: Number(form.acceptedQty || 0),
      rejectedQty: Number(form.rejectedQty || 0),
      parameters: form.parameters.map((parameter) => ({
        ...parameter,
      })),
    };

    if (editingCheck) {
      setChecks((prev) =>
        prev.map((check) =>
          check.id === editingCheck.id ? checkData : check
        )
      );
    } else {
      setChecks((prev) => [checkData, ...prev]);
    }

    closeModal();
  };

  const deleteCheck = (id) => {
    const check = checks.find((item) => item.id === id);

    if (!check) return;

    const confirmed = window.confirm(
      `Delete quality check ${check.inspectionNo}?`
    );

    if (!confirmed) return;

    setChecks((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStatus = (id, newStatus, newResult = null) => {
    setChecks((prev) =>
      prev.map((check) =>
        check.id === id
          ? {
              ...check,
              status: newStatus,
              result: newResult || check.result,
            }
          : check
      )
    );
  };

  const startInspection = (check) => {
    const confirmed = window.confirm(
      `Start inspection for ${check.inspectionNo}?`
    );

    if (!confirmed) return;

    updateStatus(check.id, "In Progress", "Pending");
  };

  const completeInspection = (check) => {
    const confirmed = window.confirm(
      `Mark ${check.inspectionNo} as completed?`
    );

    if (!confirmed) return;

    const result =
      Number(check.rejectedQty || 0) > 0 ? "Failed" : "Passed";

    updateStatus(check.id, "Completed", result);
  };

  const holdInspection = (check) => {
    const confirmed = window.confirm(
      `Put ${check.inspectionNo} on hold?`
    );

    if (!confirmed) return;

    updateStatus(check.id, "On Hold", "Hold");
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setResultFilter("All");
    setTypeFilter("All");
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const getResultClass = (result) => {
    return result.toLowerCase();
  };

  return (
    <div className="quality-page">
      <div className="quality-header">
        <div>
          <h1>Quality Check</h1>
          <p>
            Inspect production and incoming materials, record defects,
            and maintain quality results.
          </p>
        </div>

        <button className="add-quality-btn" onClick={openAddModal}>
          <span>＋</span>
          New Quality Check
        </button>
      </div>

      {/* Summary Cards */}
      <div className="quality-summary">
        <div className="quality-card">
          <div className="quality-card-icon">QC</div>
          <div>
            <span>Total Checks</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon pending-icon">◷</div>
          <div>
            <span>Pending</span>
            <strong>{summary.pending}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon progress-icon">↻</div>
          <div>
            <span>In Progress</span>
            <strong>{summary.inProgress}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon completed-icon">✓</div>
          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon passed-icon">✓</div>
          <div>
            <span>Passed</span>
            <strong>{summary.passed}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon failed-icon">!</div>
          <div>
            <span>Failed</span>
            <strong>{summary.failed}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon hold-icon">Ⅱ</div>
          <div>
            <span>On Hold</span>
            <strong>{summary.onHold}</strong>
          </div>
        </div>

        <div className="quality-card">
          <div className="quality-card-icon sample-icon">#</div>
          <div>
            <span>Sample Qty</span>
            <strong>{summary.totalSample}</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="quality-filter-panel">
        <div className="quality-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search inspection, product, batch..."
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
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>

        <select
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
        >
          <option value="All">All Results</option>
          <option value="Pending">Pending</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Hold">Hold</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Inspection Types</option>
          <option value="Incoming Inspection">
            Incoming Inspection
          </option>
          <option value="Raw Material Inspection">
            Raw Material Inspection
          </option>
          <option value="In-Process Inspection">
            In-Process Inspection
          </option>
          <option value="Final Inspection">Final Inspection</option>
        </select>

        <button className="clear-quality-btn" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className="quality-table-top">
        <div>
          <h2>Quality Inspections</h2>
          <span>{filteredChecks.length} records found</span>
        </div>
      </div>

      {/* Table */}
      <div className="quality-table-container">
        <table className="quality-table">
          <thead>
            <tr>
              <th>Inspection No.</th>
              <th>Production Order</th>
              <th>Product</th>
              <th>Batch</th>
              <th>Inspection Type</th>
              <th>Inspector</th>
              <th>Sample</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Status</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredChecks.length > 0 ? (
              filteredChecks.map((check) => (
                <tr key={check.id}>
                  <td>
                    <strong className="inspection-number">
                      {check.inspectionNo}
                    </strong>
                    <small>{check.inspectionDate}</small>
                  </td>

                  <td>
                    <span className="production-order">
                      {check.productionOrder}
                    </span>
                  </td>

                  <td>
                    <div className="product-cell">
                      <div className="product-avatar">
                        {check.product.charAt(0)}
                      </div>

                      <div>
                        <strong>{check.product}</strong>
                        <small>{check.productCode}</small>
                      </div>
                    </div>
                  </td>

                  <td>{check.batchNo}</td>

                  <td>
                    <span className="inspection-type">
                      {check.inspectionType}
                    </span>
                  </td>

                  <td>{check.inspector}</td>

                  <td>{check.sampleQty}</td>

                  <td className="accepted-number">
                    {check.acceptedQty}
                  </td>

                  <td className="rejected-number">
                    {check.rejectedQty}
                  </td>

                  <td>
                    <span
                      className={`quality-status ${getStatusClass(
                        check.status
                      )}`}
                    >
                      {check.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`quality-result ${getResultClass(
                        check.result
                      )}`}
                    >
                      {check.result}
                    </span>
                  </td>

                  <td>
                    <div className="quality-actions">
                      <button
                        className="view-action"
                        title="View"
                        onClick={() => openViewModal(check)}
                      >
                        View
                      </button>

                      <button
                        className="edit-action"
                        title="Edit"
                        onClick={() => openEditModal(check)}
                      >
                        Edit
                      </button>

                      {check.status === "Pending" && (
                        <button
                          className="start-action"
                          onClick={() => startInspection(check)}
                        >
                          Start
                        </button>
                      )}

                      {check.status === "In Progress" && (
                        <>
                          <button
                            className="complete-action"
                            onClick={() => completeInspection(check)}
                          >
                            Complete
                          </button>

                          <button
                            className="hold-action"
                            onClick={() => holdInspection(check)}
                          >
                            Hold
                          </button>
                        </>
                      )}

                      <button
                        className="delete-action"
                        title="Delete"
                        onClick={() => deleteCheck(check.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">
                  <div className="quality-empty">
                    <div className="empty-icon">QC</div>
                    <h3>No quality checks found</h3>
                    <p>
                      Try changing your filters or create a new
                      quality check.
                    </p>
                    <button onClick={openAddModal}>
                      + New Quality Check
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="quality-modal-overlay">
          <div className="quality-modal">
            <div className="quality-modal-header">
              <div>
                <h2>
                  {editingCheck
                    ? "Edit Quality Check"
                    : "New Quality Check"}
                </h2>
                <p>
                  Record inspection details and quality parameters.
                </p>
              </div>

              <button onClick={closeModal}>×</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="quality-modal-body">
                {/* Basic Information */}
                <div className="form-section">
                  <div className="form-section-title">
                    <h3>Inspection Information</h3>
                    <span>Basic inspection details</span>
                  </div>

                  <div className="quality-form-grid">
                    <div className="form-group">
                      <label>Inspection No.</label>
                      <input
                        type="text"
                        value={form.inspectionNo}
                        readOnly
                        className="readonly-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Production Order <span>*</span>
                      </label>
                      <select
                        name="productionOrder"
                        value={form.productionOrder}
                        onChange={handleFormChange}
                      >
                        <option value="">
                          Select production order
                        </option>

                        {productionOrders.map((order) => (
                          <option key={order} value={order}>
                            {order}
                          </option>
                        ))}
                      </select>

                      {errors.productionOrder && (
                        <small className="form-error">
                          {errors.productionOrder}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        Product <span>*</span>
                      </label>

                      <select
                        value={form.product}
                        onChange={handleProductChange}
                      >
                        <option value="">Select product</option>

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
                        value={form.productCode}
                        readOnly
                        className="readonly-input"
                        placeholder="Auto-filled"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Batch Number <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="batchNo"
                        value={form.batchNo}
                        onChange={handleFormChange}
                        placeholder="Enter batch number"
                      />

                      {errors.batchNo && (
                        <small className="form-error">
                          {errors.batchNo}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Inspection Type</label>

                      <select
                        name="inspectionType"
                        value={form.inspectionType}
                        onChange={handleFormChange}
                      >
                        <option value="Incoming Inspection">
                          Incoming Inspection
                        </option>
                        <option value="Raw Material Inspection">
                          Raw Material Inspection
                        </option>
                        <option value="In-Process Inspection">
                          In-Process Inspection
                        </option>
                        <option value="Final Inspection">
                          Final Inspection
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        Inspection Date <span>*</span>
                      </label>

                      <input
                        type="date"
                        name="inspectionDate"
                        value={form.inspectionDate}
                        onChange={handleFormChange}
                      />

                      {errors.inspectionDate && (
                        <small className="form-error">
                          {errors.inspectionDate}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        Inspector <span>*</span>
                      </label>

                      <select
                        name="inspector"
                        value={form.inspector}
                        onChange={handleFormChange}
                      >
                        <option value="">Select inspector</option>

                        {inspectors.map((inspector) => (
                          <option key={inspector} value={inspector}>
                            {inspector}
                          </option>
                        ))}
                      </select>

                      {errors.inspector && (
                        <small className="form-error">
                          {errors.inspector}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="form-section">
                  <div className="form-section-title">
                    <h3>Inspection Quantity</h3>
                    <span>Record sample and inspection results</span>
                  </div>

                  <div className="quality-form-grid quantity-grid">
                    <div className="form-group">
                      <label>
                        Sample Quantity <span>*</span>
                      </label>

                      <input
                        type="number"
                        min="0"
                        name="sampleQty"
                        value={form.sampleQty}
                        onChange={handleFormChange}
                        placeholder="0"
                      />

                      {errors.sampleQty && (
                        <small className="form-error">
                          {errors.sampleQty}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Accepted Quantity</label>

                      <input
                        type="number"
                        min="0"
                        name="acceptedQty"
                        value={form.acceptedQty}
                        onChange={handleFormChange}
                        placeholder="0"
                      />

                      {errors.acceptedQty && (
                        <small className="form-error">
                          {errors.acceptedQty}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Rejected Quantity</label>

                      <input
                        type="number"
                        min="0"
                        name="rejectedQty"
                        value={form.rejectedQty}
                        onChange={handleFormChange}
                        placeholder="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Result</label>

                      <select
                        name="result"
                        value={form.result}
                        onChange={handleFormChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                        <option value="Hold">Hold</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Status</label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleFormChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">
                          In Progress
                        </option>
                        <option value="Completed">
                          Completed
                        </option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Rejection Reason</label>

                      <input
                        type="text"
                        name="rejectionReason"
                        value={form.rejectionReason}
                        onChange={handleFormChange}
                        placeholder="Enter rejection reason"
                      />

                      {errors.rejectionReason && (
                        <small className="form-error">
                          {errors.rejectionReason}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Parameters */}
                <div className="form-section">
                  <div className="form-section-title parameter-title">
                    <div>
                      <h3>Inspection Parameters</h3>
                      <span>
                        Define quality parameters and actual results
                      </span>
                    </div>

                    <button
                      type="button"
                      className="add-parameter-btn"
                      onClick={addParameter}
                    >
                      + Add Parameter
                    </button>
                  </div>

                  <div className="parameter-table-wrapper">
                    <table className="parameter-table">
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Specification</th>
                          <th>Actual Value</th>
                          <th>Result</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {form.parameters.map((parameter, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                value={parameter.name}
                                onChange={(e) =>
                                  handleParameterChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Parameter name"
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                value={parameter.specification}
                                onChange={(e) =>
                                  handleParameterChange(
                                    index,
                                    "specification",
                                    e.target.value
                                  )
                                }
                                placeholder="Specification"
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                value={parameter.actualValue}
                                onChange={(e) =>
                                  handleParameterChange(
                                    index,
                                    "actualValue",
                                    e.target.value
                                  )
                                }
                                placeholder="Actual value"
                              />
                            </td>

                            <td>
                              <select
                                value={parameter.result}
                                onChange={(e) =>
                                  handleParameterChange(
                                    index,
                                    "result",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="Pending">
                                  Pending
                                </option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                              </select>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="remove-parameter-btn"
                                onClick={() =>
                                  removeParameter(index)
                                }
                                disabled={
                                  form.parameters.length === 1
                                }
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Remarks */}
                <div className="form-section">
                  <div className="form-section-title">
                    <h3>Quality Remarks</h3>
                    <span>Record defects and additional information</span>
                  </div>

                  <div className="quality-textarea-grid">
                    <div className="form-group">
                      <label>Defect Details</label>

                      <textarea
                        name="defectDetails"
                        value={form.defectDetails}
                        onChange={handleFormChange}
                        rows="4"
                        placeholder="Describe defects or quality issues..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Remarks</label>

                      <textarea
                        name="remarks"
                        value={form.remarks}
                        onChange={handleFormChange}
                        rows="4"
                        placeholder="Enter additional remarks..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="quality-modal-footer">
                <button
                  type="button"
                  className="cancel-quality-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-quality-btn"
                >
                  {editingCheck
                    ? "Update Quality Check"
                    : "Save Quality Check"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingCheck && (
        <div className="quality-modal-overlay">
          <div className="quality-view-modal">
            <div className="quality-modal-header">
              <div>
                <h2>{viewingCheck.inspectionNo}</h2>
                <p>Quality inspection details</p>
              </div>

              <button onClick={closeViewModal}>×</button>
            </div>

            <div className="quality-view-body">
              <div className="view-status-row">
                <span
                  className={`quality-status ${getStatusClass(
                    viewingCheck.status
                  )}`}
                >
                  {viewingCheck.status}
                </span>

                <span
                  className={`quality-result ${getResultClass(
                    viewingCheck.result
                  )}`}
                >
                  {viewingCheck.result}
                </span>
              </div>

              <div className="view-details-grid">
                <div>
                  <span>Production Order</span>
                  <strong>{viewingCheck.productionOrder}</strong>
                </div>

                <div>
                  <span>Product</span>
                  <strong>{viewingCheck.product}</strong>
                </div>

                <div>
                  <span>Product Code</span>
                  <strong>{viewingCheck.productCode}</strong>
                </div>

                <div>
                  <span>Batch Number</span>
                  <strong>{viewingCheck.batchNo}</strong>
                </div>

                <div>
                  <span>Inspection Type</span>
                  <strong>{viewingCheck.inspectionType}</strong>
                </div>

                <div>
                  <span>Inspection Date</span>
                  <strong>{viewingCheck.inspectionDate}</strong>
                </div>

                <div>
                  <span>Inspector</span>
                  <strong>{viewingCheck.inspector}</strong>
                </div>

                <div>
                  <span>Sample Quantity</span>
                  <strong>{viewingCheck.sampleQty}</strong>
                </div>

                <div>
                  <span>Accepted Quantity</span>
                  <strong className="view-accepted">
                    {viewingCheck.acceptedQty}
                  </strong>
                </div>

                <div>
                  <span>Rejected Quantity</span>
                  <strong className="view-rejected">
                    {viewingCheck.rejectedQty}
                  </strong>
                </div>
              </div>

              <div className="view-section">
                <div className="view-section-heading">
                  <h3>Inspection Parameters</h3>
                </div>

                <div className="view-parameter-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Specification</th>
                        <th>Actual Value</th>
                        <th>Result</th>
                      </tr>
                    </thead>

                    <tbody>
                      {viewingCheck.parameters?.map(
                        (parameter, index) => (
                          <tr key={index}>
                            <td>{parameter.name}</td>
                            <td>{parameter.specification}</td>
                            <td>{parameter.actualValue || "-"}</td>
                            <td>
                              <span
                                className={`parameter-result ${parameter.result
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {parameter.result}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {viewingCheck.rejectionReason && (
                <div className="view-section rejection-box">
                  <h3>Rejection Reason</h3>
                  <p>{viewingCheck.rejectionReason}</p>
                </div>
              )}

              {viewingCheck.defectDetails && (
                <div className="view-section">
                  <h3>Defect Details</h3>
                  <p>{viewingCheck.defectDetails}</p>
                </div>
              )}

              <div className="view-section">
                <h3>Remarks</h3>
                <p>{viewingCheck.remarks || "No remarks available."}</p>
              </div>
            </div>

            <div className="quality-modal-footer">
              <button
                className="cancel-quality-btn"
                onClick={closeViewModal}
              >
                Close
              </button>

              <button
                className="save-quality-btn"
                onClick={() => {
                  closeViewModal();
                  openEditModal(viewingCheck);
                }}
              >
                Edit Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QualityCheck;