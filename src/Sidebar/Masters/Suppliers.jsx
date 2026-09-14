import { useMemo, useState } from "react";
import "./Suppliers.css";

const initialSuppliers = [
  {
    id: 1,
    code: "SUP-001",
    name: "Tata Steel Ltd",
    contact: "9876543210",
    email: "purchase@tatasteel.com",
    address: "Jamshedpur Industrial Area",
    city: "Jamshedpur",
    state: "Jharkhand",
    gst: "20AAAAA0000A1Z5",
    pan: "AAAAA0000A",
    paymentTerms: "30 Days",
    bankName: "HDFC Bank",
    accountNumber: "XXXXXX4521",
    ifsc: "HDFC0001234",
    status: "Active",
  },
  {
    id: 2,
    code: "SUP-002",
    name: "Hindalco Industries",
    contact: "9876501234",
    email: "sales@hindalco.com",
    address: "MIDC Industrial Area",
    city: "Pune",
    state: "Maharashtra",
    gst: "27BBBBB1111B2Z6",
    pan: "BBBBB1111B",
    paymentTerms: "45 Days",
    bankName: "ICICI Bank",
    accountNumber: "XXXXXX7823",
    ifsc: "ICIC0002345",
    status: "Active",
  },
  {
    id: 3,
    code: "SUP-003",
    name: "ABC Components",
    contact: "9988776655",
    email: "info@abccomponents.com",
    address: "Waluj MIDC",
    city: "Aurangabad",
    state: "Maharashtra",
    gst: "27CCCCC2222C3Z7",
    pan: "CCCCC2222C",
    paymentTerms: "15 Days",
    bankName: "SBI",
    accountNumber: "XXXXXX1198",
    ifsc: "SBIN0003456",
    status: "Inactive",
  },
];

const emptyForm = {
  code: "",
  name: "",
  contact: "",
  email: "",
  address: "",
  city: "",
  state: "",
  gst: "",
  pan: "",
  paymentTerms: "30 Days",
  bankName: "",
  accountNumber: "",
  ifsc: "",
  status: "Active",
};

function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* =========================================
     FILTER SUPPLIERS
     ========================================= */

  const filteredSuppliers = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.code.toLowerCase().includes(searchText) ||
        supplier.name.toLowerCase().includes(searchText) ||
        supplier.contact.includes(searchText) ||
        supplier.city.toLowerCase().includes(searchText) ||
        supplier.gst.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        supplier.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, statusFilter]);

  /* =========================================
     SUMMARY
     ========================================= */

  const totalSuppliers = suppliers.length;

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "Active"
  ).length;

  const inactiveSuppliers = suppliers.filter(
    (supplier) => supplier.status === "Inactive"
  ).length;

  const locations = new Set(
    suppliers.map((supplier) => supplier.city).filter(Boolean)
  ).size;

  /* =========================================
     OPEN ADD FORM
     ========================================= */

  const handleAddSupplier = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
    setShowForm(true);
  };

  /* =========================================
     OPEN EDIT FORM
     ========================================= */

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);

    setFormData({
      code: supplier.code,
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      address: supplier.address,
      city: supplier.city,
      state: supplier.state,
      gst: supplier.gst,
      pan: supplier.pan,
      paymentTerms: supplier.paymentTerms,
      bankName: supplier.bankName,
      accountNumber: supplier.accountNumber,
      ifsc: supplier.ifsc,
      status: supplier.status,
    });

    setErrors({});
    setShowForm(true);
  };

  /* =========================================
     INPUT CHANGE
     ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* =========================================
     VALIDATION
     ========================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Supplier code is required.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Supplier name is required.";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.contact.trim())) {
      newErrors.contact = "Enter a valid 10-digit mobile number.";
    }

    if (formData.email.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(formData.email.trim())) {
        newErrors.email = "Enter a valid email address.";
      }
    }

    if (formData.gst.trim()) {
      const gstPattern =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

      if (!gstPattern.test(formData.gst.trim().toUpperCase())) {
        newErrors.gst = "Enter a valid GST number.";
      }
    }

    if (formData.pan.trim()) {
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

      if (!panPattern.test(formData.pan.trim().toUpperCase())) {
        newErrors.pan = "Enter a valid PAN number.";
      }
    }

    if (formData.ifsc.trim()) {
      const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

      if (!ifscPattern.test(formData.ifsc.trim().toUpperCase())) {
        newErrors.ifsc = "Enter a valid IFSC code.";
      }
    }

    const duplicateCode = suppliers.some(
      (supplier) =>
        supplier.code.toLowerCase() ===
          formData.code.trim().toLowerCase() &&
        supplier.id !== editingId
    );

    if (duplicateCode) {
      newErrors.code = "This supplier code already exists.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================
     SAVE SUPPLIER
     ========================================= */

  const handleSave = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const supplierData = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      gst: formData.gst.trim().toUpperCase(),
      pan: formData.pan.trim().toUpperCase(),
      bankName: formData.bankName.trim(),
      accountNumber: formData.accountNumber.trim(),
      ifsc: formData.ifsc.trim().toUpperCase(),
    };

    if (editingId) {
      setSuppliers((previous) =>
        previous.map((supplier) =>
          supplier.id === editingId
            ? {
                ...supplier,
                ...supplierData,
              }
            : supplier
        )
      );
    } else {
      setSuppliers((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...supplierData,
        },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
  };

  /* =========================================
     VIEW SUPPLIER
     ========================================= */

  const handleView = (supplier) => {
    setSelectedSupplier(supplier);
    setShowView(true);
  };

  /* =========================================
     DELETE SUPPLIER
     ========================================= */

  const handleDelete = (supplier) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${supplier.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setSuppliers((previous) =>
      previous.filter((item) => item.id !== supplier.id)
    );
  };

  /* =========================================
     TOGGLE STATUS
     ========================================= */

  const handleToggleStatus = (supplier) => {
    const newStatus =
      supplier.status === "Active" ? "Inactive" : "Active";

    setSuppliers((previous) =>
      previous.map((item) =>
        item.id === supplier.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  return (
    <div className="suppliers-page">

      {/* =====================================
          PAGE HEADER
          ===================================== */}

      <div className="page-header">
        <div>
          <h1>Suppliers</h1>
          <p>Manage supplier information, contacts and payment details</p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddSupplier}
        >
          + Add Supplier
        </button>
      </div>

      {/* =====================================
          SUMMARY CARDS
          ===================================== */}

      <div className="supplier-summary">

        <div className="summary-card">
          <div className="summary-card-icon">🏢</div>

          <div>
            <span>Total Suppliers</span>
            <strong>{totalSuppliers}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon">✓</div>

          <div>
            <span>Active Suppliers</span>
            <strong>{activeSuppliers}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon warning-icon">!</div>

          <div>
            <span>Inactive Suppliers</span>
            <strong className="danger-text">
              {inactiveSuppliers}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon">⌖</div>

          <div>
            <span>Supplier Locations</span>
            <strong>{locations}</strong>
          </div>
        </div>

      </div>

      {/* =====================================
          TABLE CARD
          ===================================== */}

      <div className="table-card">

        <div className="table-toolbar">

          <div>
            <h3>Supplier List</h3>
            <p>
              {filteredSuppliers.length} supplier
              {filteredSuppliers.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="table-actions">

            <input
              type="text"
              className="search-input"
              placeholder="Search code, name, city..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>

        {/* =================================
            TABLE
            ================================= */}

        <div className="table-wrapper">

          <table className="erp-table">

            <thead>
              <tr>
                <th>Code</th>
                <th>Supplier</th>
                <th>Contact</th>
                <th>Location</th>
                <th>GST Number</th>
                <th>Payment Terms</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>

                    <td>
                      <strong className="supplier-code">
                        {supplier.code}
                      </strong>
                    </td>

                    <td>
                      <div className="supplier-name">
                        <strong>{supplier.name}</strong>
                        <span>{supplier.email || "No email"}</span>
                      </div>
                    </td>

                    <td>{supplier.contact}</td>

                    <td>
                      <div className="location-text">
                        <strong>{supplier.city || "-"}</strong>
                        <span>{supplier.state || ""}</span>
                      </div>
                    </td>

                    <td>
                      {supplier.gst || "-"}
                    </td>

                    <td>
                      <span className="payment-term">
                        {supplier.paymentTerms}
                      </span>
                    </td>

                    <td>
                      <button
                        className={
                          supplier.status === "Active"
                            ? "status-badge status-success"
                            : "status-badge status-inactive"
                        }
                        onClick={() =>
                          handleToggleStatus(supplier)
                        }
                        title="Click to change status"
                      >
                        <span className="status-dot"></span>
                        {supplier.status}
                      </button>
                    </td>

                    <td>
                      <div className="action-group">

                        <button
                          className="action-button view-action"
                          onClick={() => handleView(supplier)}
                        >
                          View
                        </button>

                        <button
                          className="action-button"
                          onClick={() => handleEdit(supplier)}
                        >
                          Edit
                        </button>

                        <button
                          className="action-button delete-action"
                          onClick={() => handleDelete(supplier)}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <div className="empty-icon">⌕</div>
                    <strong>No suppliers found</strong>
                    <span>
                      Try changing your search or filter.
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================
          ADD / EDIT SUPPLIER MODAL
          ===================================== */}

      {showForm && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >

          <div className="supplier-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingId ? "Edit Supplier" : "Add Supplier"}
                </h2>

                <p>
                  {editingId
                    ? "Update supplier information"
                    : "Enter supplier information"}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>

            <form
              className="supplier-form"
              onSubmit={handleSave}
            >

              {/* BASIC INFORMATION */}

              <div className="form-section">

                <div className="section-heading">
                  <div className="section-number">01</div>

                  <div>
                    <h3>Basic Information</h3>
                    <p>Supplier identification and contact details</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Supplier Code <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="code"
                      placeholder="SUP-004"
                      value={formData.code}
                      onChange={handleChange}
                    />

                    {errors.code && (
                      <small className="error-text">
                        {errors.code}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label>
                      Supplier Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter supplier name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    {errors.name && (
                      <small className="error-text">
                        {errors.name}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label>
                      Contact Number <span>*</span>
                    </label>

                    <input
                      type="tel"
                      name="contact"
                      placeholder="9876543210"
                      maxLength="10"
                      value={formData.contact}
                      onChange={handleChange}
                    />

                    {errors.contact && (
                      <small className="error-text">
                        {errors.contact}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="supplier@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <small className="error-text">
                        {errors.email}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label>Supplier Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                  </div>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="form-section">

                <div className="section-heading">
                  <div className="section-number">02</div>

                  <div>
                    <h3>Address Details</h3>
                    <p>Supplier business location</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group full-width">

                    <label>Address</label>

                    <textarea
                      name="address"
                      placeholder="Enter complete supplier address"
                      value={formData.address}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

              {/* TAX DETAILS */}

              <div className="form-section">

                <div className="section-heading">
                  <div className="section-number">03</div>

                  <div>
                    <h3>Tax Information</h3>
                    <p>GST and PAN details</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group">

                    <label>GST Number</label>

                    <input
                      type="text"
                      name="gst"
                      placeholder="27AAAAA0000A1Z5"
                      maxLength="15"
                      value={formData.gst}
                      onChange={handleChange}
                    />

                    {errors.gst && (
                      <small className="error-text">
                        {errors.gst}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label>PAN Number</label>

                    <input
                      type="text"
                      name="pan"
                      placeholder="AAAAA0000A"
                      maxLength="10"
                      value={formData.pan}
                      onChange={handleChange}
                    />

                    {errors.pan && (
                      <small className="error-text">
                        {errors.pan}
                      </small>
                    )}

                  </div>

                </div>

              </div>

              {/* PAYMENT DETAILS */}

              <div className="form-section">

                <div className="section-heading">
                  <div className="section-number">04</div>

                  <div>
                    <h3>Payment Details</h3>
                    <p>Supplier payment and banking information</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group">

                    <label>Payment Terms</label>

                    <select
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={handleChange}
                    >
                      <option value="Immediate">
                        Immediate
                      </option>
                      <option value="15 Days">
                        15 Days
                      </option>
                      <option value="30 Days">
                        30 Days
                      </option>
                      <option value="45 Days">
                        45 Days
                      </option>
                      <option value="60 Days">
                        60 Days
                      </option>
                      <option value="90 Days">
                        90 Days
                      </option>
                    </select>

                  </div>

                  <div className="form-group">

                    <label>Bank Name</label>

                    <input
                      type="text"
                      name="bankName"
                      placeholder="Enter bank name"
                      value={formData.bankName}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>Account Number</label>

                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Enter account number"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>IFSC Code</label>

                    <input
                      type="text"
                      name="ifsc"
                      placeholder="HDFC0001234"
                      maxLength="11"
                      value={formData.ifsc}
                      onChange={handleChange}
                    />

                    {errors.ifsc && (
                      <small className="error-text">
                        {errors.ifsc}
                      </small>
                    )}

                  </div>

                </div>

              </div>

              {/* FORM FOOTER */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  {editingId ? "Update Supplier" : "Save Supplier"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================
          VIEW SUPPLIER MODAL
          ===================================== */}

      {showView && selectedSupplier && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowView(false);
            }
          }}
        >

          <div className="view-modal">

            <div className="modal-header">

              <div>
                <h2>{selectedSupplier.name}</h2>

                <p>
                  Supplier Code: {selectedSupplier.code}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowView(false)}
              >
                ×
              </button>

            </div>

            <div className="supplier-details">

              <div className="detail-status">
                <span
                  className={
                    selectedSupplier.status === "Active"
                      ? "status-badge status-success"
                      : "status-badge status-inactive"
                  }
                >
                  <span className="status-dot"></span>
                  {selectedSupplier.status}
                </span>
              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Contact Number</span>
                  <strong>
                    {selectedSupplier.contact || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Email</span>
                  <strong>
                    {selectedSupplier.email || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>City</span>
                  <strong>
                    {selectedSupplier.city || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>State</span>
                  <strong>
                    {selectedSupplier.state || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>GST Number</span>
                  <strong>
                    {selectedSupplier.gst || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>PAN Number</span>
                  <strong>
                    {selectedSupplier.pan || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Payment Terms</span>
                  <strong>
                    {selectedSupplier.paymentTerms || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Bank Name</span>
                  <strong>
                    {selectedSupplier.bankName || "-"}
                  </strong>
                </div>

              </div>

              <div className="detail-address">
                <span>Business Address</span>
                <p>
                  {selectedSupplier.address || "No address available"}
                </p>
              </div>

              <div className="view-footer">

                <button
                  className="cancel-button"
                  onClick={() => setShowView(false)}
                >
                  Close
                </button>

                <button
                  className="save-button"
                  onClick={() => {
                    setShowView(false);
                    handleEdit(selectedSupplier);
                  }}
                >
                  Edit Supplier
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Suppliers;