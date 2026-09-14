import { useMemo, useState } from "react";
import "./Customers.css";

const initialCustomers = [
  {
    id: 1,
    code: "CUS-001",
    name: "PREC engineering Pvt. Ltd.",
    contact: "9876543210",
    email: "Pranaliboarde@abcengineering.com",
    address: "chinchpur Road,sangmner",
    city: "sangmner",
    state: "Maharashtra",
    gst: "27AAAAA0000A1Z5",
    pan: "AAAAA0000A",
    creditLimit: "500000",
    paymentTerms: "30 Days",
    status: "Active",
  },
  {
    id: 2,
    code: "CUS-002",
    name: "PREC Engineering Pvt. Ltd.",
    contact: "9988776655",
    email: "mayurimatsagar@shreemotors.com",
    address: "Nashik  akola Road",
    city: "nashik",
    state: "Maharashtra",
    gst: "27BBBBB1111B2Z6",
    pan: "BBBBB1111B",
    creditLimit: "300000",
    paymentTerms: "45 Days",
    status: "Active",
  },
  {
    id: 3,
    code: "CUS-003",
    name: "Global Industrial Solutions",
    contact: "9123456789",
    email: "ShreyaDhobhi@globalindustrial.com",
    address: "Industrial state",
    city: "Nashik",
    state: "Maharashtra",
    gst: "27CCCCC2222C3Z7",
    pan: "CCCCC2222C",
    creditLimit: "200000",
    paymentTerms: "15 Days",
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
  creditLimit: "",
  paymentTerms: "30 Days",
  status: "Active",
};

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* ================================
     FILTER
     ================================ */

  const filteredCustomers = useMemo(() => {
    const text = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.code.toLowerCase().includes(text) ||
        customer.name.toLowerCase().includes(text) ||
        customer.contact.includes(text) ||
        customer.city.toLowerCase().includes(text) ||
        customer.gst.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  /* ================================
     SUMMARY
     ================================ */

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const locations = new Set(
    customers.map((customer) => customer.city).filter(Boolean)
  ).size;

  /* ================================
     ADD
     ================================ */

  const handleAddCustomer = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
    setShowForm(true);
  };

  /* ================================
     EDIT
     ================================ */

  const handleEdit = (customer) => {
    setEditingId(customer.id);

    setFormData({
      code: customer.code,
      name: customer.name,
      contact: customer.contact,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      gst: customer.gst,
      pan: customer.pan,
      creditLimit: customer.creditLimit,
      paymentTerms: customer.paymentTerms,
      status: customer.status,
    });

    setErrors({});
    setShowForm(true);
  };

  /* ================================
     CHANGE
     ================================ */

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

  /* ================================
     VALIDATION
     ================================ */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Customer code is required.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required.";
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

    if (
      formData.creditLimit.trim() &&
      Number(formData.creditLimit) < 0
    ) {
      newErrors.creditLimit = "Credit limit cannot be negative.";
    }

    const duplicateCode = customers.some(
      (customer) =>
        customer.code.toLowerCase() ===
          formData.code.trim().toLowerCase() &&
        customer.id !== editingId
    );

    if (duplicateCode) {
      newErrors.code = "This customer code already exists.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================================
     SAVE
     ================================ */

  const handleSave = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const customerData = {
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
      creditLimit: formData.creditLimit.trim(),
    };

    if (editingId) {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === editingId
            ? {
                ...customer,
                ...customerData,
              }
            : customer
        )
      );
    } else {
      setCustomers((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...customerData,
        },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
  };

  /* ================================
     VIEW
     ================================ */

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setShowView(true);
  };

  /* ================================
     DELETE
     ================================ */

  const handleDelete = (customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${customer.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setCustomers((previous) =>
      previous.filter((item) => item.id !== customer.id)
    );
  };

  /* ================================
     STATUS
     ================================ */

  const handleToggleStatus = (customer) => {
    const newStatus =
      customer.status === "Active" ? "Inactive" : "Active";

    setCustomers((previous) =>
      previous.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  return (
    <div className="customers-page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage customer information, contacts and sales details</p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddCustomer}
        >
          + Add Customer
        </button>
      </div>

      {/* SUMMARY */}

      <div className="customer-summary">

        <div className="summary-card">
          <div className="summary-card-icon">👥</div>

          <div>
            <span>Total Customers</span>
            <strong>{totalCustomers}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon">✓</div>

          <div>
            <span>Active Customers</span>
            <strong>{activeCustomers}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon warning-icon">!</div>

          <div>
            <span>Inactive Customers</span>
            <strong className="danger-text">
              {inactiveCustomers}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon">⌖</div>

          <div>
            <span>Customer Locations</span>
            <strong>{locations}</strong>
          </div>
        </div>

      </div>

      {/* TABLE */}

      <div className="table-card">

        <div className="table-toolbar">

          <div>
            <h3>Customer List</h3>

            <p>
              {filteredCustomers.length} customer
              {filteredCustomers.length !== 1 ? "s" : ""} found
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

        <div className="table-wrapper">

          <table className="erp-table">

            <thead>
              <tr>
                <th>Code</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Location</th>
                <th>GST Number</th>
                <th>Credit Limit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>

                    <td>
                      <strong className="customer-code">
                        {customer.code}
                      </strong>
                    </td>

                    <td>
                      <div className="customer-name">
                        <strong>{customer.name}</strong>

                        <span>
                          {customer.email || "No email"}
                        </span>
                      </div>
                    </td>

                    <td>{customer.contact}</td>

                    <td>
                      <div className="location-text">
                        <strong>
                          {customer.city || "-"}
                        </strong>

                        <span>
                          {customer.state || ""}
                        </span>
                      </div>
                    </td>

                    <td>{customer.gst || "-"}</td>

                    <td>
                      ₹
                      {customer.creditLimit
                        ? Number(customer.creditLimit).toLocaleString("en-IN")
                        : "0"}
                    </td>

                    <td>

                      <button
                        className={
                          customer.status === "Active"
                            ? "status-badge status-success"
                            : "status-badge status-inactive"
                        }
                        onClick={() =>
                          handleToggleStatus(customer)
                        }
                      >
                        <span className="status-dot"></span>
                        {customer.status}
                      </button>

                    </td>

                    <td>

                      <div className="action-group">

                        <button
                          className="action-button view-action"
                          onClick={() => handleView(customer)}
                        >
                          View
                        </button>

                        <button
                          className="action-button"
                          onClick={() => handleEdit(customer)}
                        >
                          Edit
                        </button>

                        <button
                          className="action-button delete-action"
                          onClick={() => handleDelete(customer)}
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

                    <strong>No customers found</strong>

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

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >

          <div className="customer-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingId
                    ? "Edit Customer"
                    : "Add Customer"}
                </h2>

                <p>
                  {editingId
                    ? "Update customer information"
                    : "Enter customer information"}
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
              className="customer-form"
              onSubmit={handleSave}
            >

              {/* BASIC */}

              <div className="form-section">

                <div className="section-heading">

                  <div className="section-number">
                    01
                  </div>

                  <div>
                    <h3>Basic Information</h3>
                    <p>Customer identification and contact details</p>
                  </div>

                </div>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Customer Code <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="code"
                      placeholder="CUS-004"
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
                      Customer Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter customer name"
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
                      placeholder="customer@example.com"
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

                    <label>Customer Status</label>

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

                  <div className="section-number">
                    02
                  </div>

                  <div>
                    <h3>Address Details</h3>
                    <p>Customer business location</p>
                  </div>

                </div>

                <div className="form-grid">

                  <div className="form-group full-width">

                    <label>Address</label>

                    <textarea
                      name="address"
                      placeholder="Enter complete customer address"
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

              {/* TAX */}

              <div className="form-section">

                <div className="section-heading">

                  <div className="section-number">
                    03
                  </div>

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

              {/* SALES */}

              <div className="form-section">

                <div className="section-heading">

                  <div className="section-number">
                    04
                  </div>

                  <div>
                    <h3>Sales & Payment</h3>
                    <p>Credit and payment settings</p>
                  </div>

                </div>

                <div className="form-grid">

                  <div className="form-group">

                    <label>Credit Limit</label>

                    <input
                      type="number"
                      name="creditLimit"
                      min="0"
                      placeholder="500000"
                      value={formData.creditLimit}
                      onChange={handleChange}
                    />

                    {errors.creditLimit && (
                      <small className="error-text">
                        {errors.creditLimit}
                      </small>
                    )}

                  </div>

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

                </div>

              </div>

              {/* FOOTER */}

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
                  {editingId
                    ? "Update Customer"
                    : "Save Customer"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}

      {showView && selectedCustomer && (
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
                <h2>{selectedCustomer.name}</h2>

                <p>
                  Customer Code: {selectedCustomer.code}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowView(false)}
              >
                ×
              </button>

            </div>

            <div className="customer-details">

              <div className="detail-status">

                <span
                  className={
                    selectedCustomer.status === "Active"
                      ? "status-badge status-success"
                      : "status-badge status-inactive"
                  }
                >
                  <span className="status-dot"></span>
                  {selectedCustomer.status}
                </span>

              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Contact Number</span>
                  <strong>
                    {selectedCustomer.contact || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Email</span>
                  <strong>
                    {selectedCustomer.email || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>City</span>
                  <strong>
                    {selectedCustomer.city || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>State</span>
                  <strong>
                    {selectedCustomer.state || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>GST Number</span>
                  <strong>
                    {selectedCustomer.gst || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>PAN Number</span>
                  <strong>
                    {selectedCustomer.pan || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Credit Limit</span>
                  <strong>
                    ₹
                    {selectedCustomer.creditLimit
                      ? Number(
                          selectedCustomer.creditLimit
                        ).toLocaleString("en-IN")
                      : "0"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Payment Terms</span>
                  <strong>
                    {selectedCustomer.paymentTerms || "-"}
                  </strong>
                </div>

              </div>

              <div className="detail-address">

                <span>Business Address</span>

                <p>
                  {selectedCustomer.address ||
                    "No address available"}
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
                    handleEdit(selectedCustomer);
                  }}
                >
                  Edit Customer
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Customers;