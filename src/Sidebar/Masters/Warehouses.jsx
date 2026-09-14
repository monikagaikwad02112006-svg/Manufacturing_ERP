import { useMemo, useState } from "react";
import "./Warehouses.css";

const initialWarehouses = [
  {
    id: 1,
    code: "WH-001",
    name: "Main Raw Material Store",
    type: "Raw Material",
    manager: "Rahul Patil",
    contact: "9876543210",
    address: "MIDC Industrial Area",
    city: "Nashik",
    state: "Maharashtra",
    capacity: "10000",
    unit: "Sq. Ft.",
    status: "Active",
  },
  {
    id: 2,
    code: "WH-002",
    name: "Finished Goods Store",
    type: "Finished Goods",
    manager: "Sneha Sharma",
    contact: "9988776655",
    address: "Factory Road",
    city: "Aurangabad",
    state: "Maharashtra",
    capacity: "7500",
    unit: "Sq. Ft.",
    status: "Active",
  },
  {
    id: 3,
    code: "WH-003",
    name: "Rejected Material Area",
    type: "Quarantine",
    manager: "Amit Jadhav",
    contact: "9123456789",
    address: "Production Block B",
    city: "Nashik",
    state: "Maharashtra",
    capacity: "2500",
    unit: "Sq. Ft.",
    status: "Inactive",
  },
];

const emptyForm = {
  code: "",
  name: "",
  type: "Raw Material",
  manager: "",
  contact: "",
  address: "",
  city: "",
  state: "Maharashtra",
  capacity: "",
  unit: "Sq. Ft.",
  status: "Active",
};

function Warehouses() {
  const [warehouses, setWarehouses] = useState(initialWarehouses);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const summary = useMemo(() => {
    const total = warehouses.length;

    const active = warehouses.filter(
      (warehouse) => warehouse.status === "Active"
    ).length;

    const inactive = warehouses.filter(
      (warehouse) => warehouse.status === "Inactive"
    ).length;

    const totalCapacity = warehouses.reduce(
      (total, warehouse) => total + Number(warehouse.capacity || 0),
      0
    );

    return {
      total,
      active,
      inactive,
      totalCapacity,
    };
  }, [warehouses]);

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((warehouse) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        warehouse.code.toLowerCase().includes(searchText) ||
        warehouse.name.toLowerCase().includes(searchText) ||
        warehouse.manager.toLowerCase().includes(searchText) ||
        warehouse.city.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || warehouse.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || warehouse.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [warehouses, search, typeFilter, statusFilter]);

  const openAddModal = () => {
    setEditingWarehouse(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (warehouse) => {
    setEditingWarehouse(warehouse);
    setForm(warehouse);
    setErrors({});
    setShowModal(true);
  };

  const openViewModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingWarehouse(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.code.trim()) {
      newErrors.code = "Warehouse code is required";
    }

    if (!form.name.trim()) {
      newErrors.name = "Warehouse name is required";
    }

    if (!form.manager.trim()) {
      newErrors.manager = "Manager name is required";
    }

    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.contact)) {
      newErrors.contact = "Enter a valid 10-digit mobile number";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (Number(form.capacity) <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    const duplicateCode = warehouses.some(
      (warehouse) =>
        warehouse.code.toLowerCase() === form.code.trim().toLowerCase() &&
        warehouse.id !== editingWarehouse?.id
    );

    if (duplicateCode) {
      newErrors.code = "Warehouse code already exists";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingWarehouse) {
      setWarehouses((previous) =>
        previous.map((warehouse) =>
          warehouse.id === editingWarehouse.id
            ? {
                ...form,
                id: editingWarehouse.id,
              }
            : warehouse
        )
      );
    } else {
      const newWarehouse = {
        ...form,
        id: Date.now(),
      };

      setWarehouses((previous) => [...previous, newWarehouse]);
    }

    closeModal();
  };

  const handleDelete = (warehouse) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${warehouse.name}?`
    );

    if (!confirmed) {
      return;
    }

    setWarehouses((previous) =>
      previous.filter((item) => item.id !== warehouse.id)
    );
  };

  const toggleStatus = (warehouse) => {
    const newStatus =
      warehouse.status === "Active" ? "Inactive" : "Active";

    setWarehouses((previous) =>
      previous.map((item) =>
        item.id === warehouse.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  return (
    <div className="warehouses-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Warehouses</h1>
          <p>Manage storage locations and warehouse information</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          + Add Warehouse
        </button>
      </div>

      {/* Summary */}
      <div className="warehouse-summary">
        <div className="summary-card">
          <div className="summary-card-icon">🏢</div>

          <div>
            <span>Total Warehouses</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon success-icon">✓</div>

          <div>
            <span>Active</span>
            <strong>{summary.active}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon warning-icon">!</div>

          <div>
            <span>Inactive</span>
            <strong>{summary.inactive}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon capacity-icon">▣</div>

          <div>
            <span>Total Capacity</span>
            <strong>
              {summary.totalCapacity.toLocaleString()} Sq.Ft.
            </strong>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search warehouse..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Raw Material">Raw Material</option>
              <option value="Finished Goods">Finished Goods</option>
              <option value="General">General</option>
              <option value="Quarantine">Quarantine</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
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
                <th>Warehouse</th>
                <th>Type</th>
                <th>Manager</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredWarehouses.length > 0 ? (
                filteredWarehouses.map((warehouse) => (
                  <tr key={warehouse.id}>
                    <td>
                      <div className="warehouse-info">
                        <div className="warehouse-avatar">▦</div>

                        <div>
                          <strong>{warehouse.name}</strong>
                          <span>{warehouse.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="type-badge">
                        {warehouse.type}
                      </span>
                    </td>

                    <td>
                      <div className="manager-info">
                        <strong>{warehouse.manager}</strong>
                        <span>{warehouse.contact}</span>
                      </div>
                    </td>

                    <td>
                      <div className="location-info">
                        <strong>{warehouse.city}</strong>
                        <span>{warehouse.state}</span>
                      </div>
                    </td>

                    <td>
                      <strong className="capacity-value">
                        {Number(warehouse.capacity).toLocaleString()}
                      </strong>

                      <span className="capacity-unit">
                        {" "}
                        {warehouse.unit}
                      </span>
                    </td>

                    <td>
                      <button
                        className={`status-badge ${
                          warehouse.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                        onClick={() => toggleStatus(warehouse)}
                      >
                        <span className="status-dot"></span>
                        {warehouse.status}
                      </button>
                    </td>

                    <td>
                      <div className="action-group">
                        <button
                          className="action-button view-action"
                          title="View"
                          onClick={() => openViewModal(warehouse)}
                        >
                          👁
                        </button>

                        <button
                          className="action-button edit-action"
                          title="Edit"
                          onClick={() => openEditModal(warehouse)}
                        >
                          ✎
                        </button>

                        <button
                          className="action-button delete-action"
                          title="Delete"
                          onClick={() => handleDelete(warehouse)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <div className="empty-icon">🏢</div>
                      <h3>No warehouses found</h3>
                      <p>Try changing your search or filters.</p>
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
        <div className="modal-overlay">
          <div className="warehouse-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingWarehouse
                    ? "Edit Warehouse"
                    : "Add Warehouse"}
                </h2>

                <p>
                  {editingWarehouse
                    ? "Update warehouse information"
                    : "Enter warehouse details"}
                </p>
              </div>

              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form className="warehouse-form" onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">01</span>

                  <div>
                    <h3>Basic Information</h3>
                    <p>Warehouse identification and classification</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Warehouse Code <span>*</span>
                    </label>

                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      placeholder="WH-004"
                    />

                    {errors.code && (
                      <small className="error-text">
                        {errors.code}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Warehouse Name <span>*</span>
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter warehouse name"
                    />

                    {errors.name && (
                      <small className="error-text">
                        {errors.name}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Warehouse Type</label>

                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                    >
                      <option value="Raw Material">
                        Raw Material
                      </option>

                      <option value="Finished Goods">
                        Finished Goods
                      </option>

                      <option value="General">General</option>

                      <option value="Quarantine">
                        Quarantine
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Manager */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">02</span>

                  <div>
                    <h3>Warehouse Contact</h3>
                    <p>Person responsible for warehouse operations</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Warehouse Manager <span>*</span>
                    </label>

                    <input
                      name="manager"
                      value={form.manager}
                      onChange={handleChange}
                      placeholder="Enter manager name"
                    />

                    {errors.manager && (
                      <small className="error-text">
                        {errors.manager}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Contact Number <span>*</span>
                    </label>

                    <input
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      placeholder="9876543210"
                      maxLength="10"
                    />

                    {errors.contact && (
                      <small className="error-text">
                        {errors.contact}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">03</span>

                  <div>
                    <h3>Location Details</h3>
                    <p>Physical warehouse address</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>
                      Address <span>*</span>
                    </label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter complete warehouse address"
                      rows="3"
                    ></textarea>

                    {errors.address && (
                      <small className="error-text">
                        {errors.address}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      City <span>*</span>
                    </label>

                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />

                    {errors.city && (
                      <small className="error-text">
                        {errors.city}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>State</label>

                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                    >
                      <option value="Maharashtra">
                        Maharashtra
                      </option>

                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Madhya Pradesh">
                        Madhya Pradesh
                      </option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">04</span>

                  <div>
                    <h3>Storage Capacity</h3>
                    <p>Define available warehouse storage capacity</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Capacity <span>*</span>
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                      placeholder="10000"
                      min="1"
                    />

                    {errors.capacity && (
                      <small className="error-text">
                        {errors.capacity}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Capacity Unit</label>

                    <select
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                    >
                      <option value="Sq. Ft.">Sq. Ft.</option>
                      <option value="Sq. M.">Sq. M.</option>
                      <option value="Cubic Ft.">Cubic Ft.</option>
                      <option value="Pallets">Pallets</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  {editingWarehouse
                    ? "Update Warehouse"
                    : "Save Warehouse"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedWarehouse && (
        <div className="modal-overlay">
          <div className="view-modal">
            <div className="modal-header">
              <div>
                <h2>Warehouse Details</h2>
                <p>{selectedWarehouse.code}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="warehouse-profile">
              <div className="large-avatar">▦</div>

              <div>
                <h3>{selectedWarehouse.name}</h3>

                <p>{selectedWarehouse.type}</p>

                <span
                  className={`status-badge ${
                    selectedWarehouse.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  <span className="status-dot"></span>
                  {selectedWarehouse.status}
                </span>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span>Warehouse Code</span>
                <strong>{selectedWarehouse.code}</strong>
              </div>

              <div className="detail-item">
                <span>Warehouse Type</span>
                <strong>{selectedWarehouse.type}</strong>
              </div>

              <div className="detail-item">
                <span>Manager</span>
                <strong>{selectedWarehouse.manager}</strong>
              </div>

              <div className="detail-item">
                <span>Contact</span>
                <strong>{selectedWarehouse.contact}</strong>
              </div>

              <div className="detail-item">
                <span>City</span>
                <strong>{selectedWarehouse.city}</strong>
              </div>

              <div className="detail-item">
                <span>State</span>
                <strong>{selectedWarehouse.state}</strong>
              </div>

              <div className="detail-item">
                <span>Capacity</span>
                <strong>
                  {Number(
                    selectedWarehouse.capacity
                  ).toLocaleString()}{" "}
                  {selectedWarehouse.unit}
                </strong>
              </div>

              <div className="detail-item full-width">
                <span>Address</span>
                <strong>{selectedWarehouse.address}</strong>
              </div>
            </div>

            <div className="view-footer">
              <button
                className="cancel-button"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                className="save-button"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedWarehouse);
                }}
              >
                Edit Warehouse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Warehouses;