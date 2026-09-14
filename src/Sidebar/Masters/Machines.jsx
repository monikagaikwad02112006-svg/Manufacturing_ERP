import { useState } from "react";
import "./Machines.css";

const initialMachines = [
  {
    id: 1,
    code: "MCH-001",
    name: "CNC Turning Machine",
    type: "CNC",
    department: "Production",
    manufacturer: "Haas",
    model: "ST-20",
    serial: "HS2024001",
    purchaseDate: "2024-01-15",
    capacity: "20 Units/Hour",
    location: "Main Plant",
    operator: "Rahul Patil",
    status: "Active",
  },
  {
    id: 2,
    code: "MCH-002",
    name: "Hydraulic Press",
    type: "Press",
    department: "Production",
    manufacturer: "Jindal",
    model: "HP-500",
    serial: "JD2024002",
    purchaseDate: "2024-03-10",
    capacity: "500 Ton",
    location: "Main Plant",
    operator: "Amit Shinde",
    status: "Active",
  },
  {
    id: 3,
    code: "MCH-003",
    name: "Grinding Machine",
    type: "Grinding",
    department: "Finishing",
    manufacturer: "Micromatic",
    model: "G-300",
    serial: "MM2023003",
    purchaseDate: "2023-08-20",
    capacity: "10 Units/Hour",
    location: "Finishing Section",
    operator: "Sagar More",
    status: "Maintenance",
  },
];

function Machines() {
  const [machines, setMachines] = useState(initialMachines);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [viewMachine, setViewMachine] = useState(null);
  const [editingMachine, setEditingMachine] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    department: "",
    manufacturer: "",
    model: "",
    serial: "",
    purchaseDate: "",
    capacity: "",
    location: "",
    operator: "",
    status: "Active",
  });

  const filteredMachines = machines.filter((machine) => {
    const searchMatch =
      machine.code.toLowerCase().includes(search.toLowerCase()) ||
      machine.name.toLowerCase().includes(search.toLowerCase()) ||
      machine.manufacturer.toLowerCase().includes(search.toLowerCase());

    const typeMatch =
      typeFilter === "All" || machine.type === typeFilter;

    const departmentMatch =
      departmentFilter === "All" ||
      machine.department === departmentFilter;

    const statusMatch =
      statusFilter === "All" ||
      machine.status === statusFilter;

    return searchMatch && typeMatch && departmentMatch && statusMatch;
  });

  const activeCount = machines.filter(
    (machine) => machine.status === "Active"
  ).length;

  const maintenanceCount = machines.filter(
    (machine) => machine.status === "Maintenance"
  ).length;

  const inactiveCount = machines.filter(
    (machine) => machine.status === "Inactive"
  ).length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openAddModal = () => {
    setEditingMachine(null);

    setFormData({
      code: "",
      name: "",
      type: "",
      department: "",
      manufacturer: "",
      model: "",
      serial: "",
      purchaseDate: "",
      capacity: "",
      location: "",
      operator: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (machine) => {
    setEditingMachine(machine);
    setFormData(machine);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code || !formData.name || !formData.type) {
      alert("Please fill Machine Code, Machine Name and Machine Type.");
      return;
    }

    if (editingMachine) {
      setMachines(
        machines.map((machine) =>
          machine.id === editingMachine.id
            ? { ...formData, id: editingMachine.id }
            : machine
        )
      );
    } else {
      const newMachine = {
        ...formData,
        id: Date.now(),
      };

      setMachines([...machines, newMachine]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this machine?"
    );

    if (confirmDelete) {
      setMachines(
        machines.filter((machine) => machine.id !== id)
      );
    }
  };

  const toggleStatus = (id) => {
    setMachines(
      machines.map((machine) =>
        machine.id === id
          ? {
              ...machine,
              status:
                machine.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : machine
      )
    );
  };

  return (
    <div className="machines-page">

      {/* Header */}
      <div className="machines-header">
        <div>
          <h1>Machines</h1>
          <p>Manage production and plant machines</p>
        </div>

        <button className="add-machine-btn" onClick={openAddModal}>
          + Add Machine
        </button>
      </div>

      {/* Summary Cards */}
      <div className="machine-summary">

        <div className="machine-card">
          <span>Total Machines</span>
          <strong>{machines.length}</strong>
        </div>

        <div className="machine-card">
          <span>Active</span>
          <strong>{activeCount}</strong>
        </div>

        <div className="machine-card">
          <span>Under Maintenance</span>
          <strong>{maintenanceCount}</strong>
        </div>

        <div className="machine-card">
          <span>Inactive</span>
          <strong>{inactiveCount}</strong>
        </div>

      </div>

      {/* Filters */}
      <div className="machine-filters">

        <input
          type="text"
          placeholder="Search machine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="CNC">CNC</option>
          <option value="Press">Press</option>
          <option value="Grinding">Grinding</option>
          <option value="Cutting">Cutting</option>
          <option value="Welding">Welding</option>
        </select>

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value)
          }
        >
          <option value="All">All Departments</option>
          <option value="Production">Production</option>
          <option value="Finishing">Finishing</option>
          <option value="Assembly">Assembly</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* Table */}
      <div className="machines-table-container">

        <table className="machines-table">

          <thead>
            <tr>
              <th>Machine Code</th>
              <th>Machine Name</th>
              <th>Type</th>
              <th>Department</th>
              <th>Location</th>
              <th>Operator</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredMachines.length > 0 ? (
              filteredMachines.map((machine) => (

                <tr key={machine.id}>

                  <td>
                    <strong>{machine.code}</strong>
                  </td>

                  <td>{machine.name}</td>

                  <td>{machine.type}</td>

                  <td>{machine.department}</td>

                  <td>{machine.location}</td>

                  <td>{machine.operator}</td>

                  <td>
                    <span
                      className={`machine-status ${machine.status.toLowerCase()}`}
                    >
                      {machine.status}
                    </span>
                  </td>

                  <td>

                    <div className="machine-actions">

                      <button
                        onClick={() => setViewMachine(machine)}
                        title="View"
                      >
                        👁
                      </button>

                      <button
                        onClick={() => openEditModal(machine)}
                        title="Edit"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => toggleStatus(machine.id)}
                        title="Change Status"
                      >
                        🔄
                      </button>

                      <button
                        onClick={() => handleDelete(machine.id)}
                        title="Delete"
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            ) : (

              <tr>
                <td colSpan="8" className="no-machine">
                  No machines found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="machine-modal-overlay">

          <div className="machine-modal">

            <div className="machine-modal-header">

              <h2>
                {editingMachine
                  ? "Edit Machine"
                  : "Add New Machine"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="machine-form-grid">

                <div className="form-group">
                  <label>Machine Code *</label>
                  <input
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="MCH-004"
                  />
                </div>

                <div className="form-group">
                  <label>Machine Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Machine name"
                  />
                </div>

                <div className="form-group">
                  <label>Machine Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    <option value="CNC">CNC</option>
                    <option value="Press">Press</option>
                    <option value="Grinding">Grinding</option>
                    <option value="Cutting">Cutting</option>
                    <option value="Welding">Welding</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Production">Production</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Assembly">Assembly</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Manufacturer</label>
                  <input
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="Manufacturer"
                  />
                </div>

                <div className="form-group">
                  <label>Model Number</label>
                  <input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Model number"
                  />
                </div>

                <div className="form-group">
                  <label>Serial Number</label>
                  <input
                    name="serial"
                    value={formData.serial}
                    onChange={handleChange}
                    placeholder="Serial number"
                  />
                </div>

                <div className="form-group">
                  <label>Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Capacity / Specification</label>
                  <input
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g. 20 Units/Hour"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Machine location"
                  />
                </div>

                <div className="form-group">
                  <label>Operator</label>
                  <input
                    name="operator"
                    value={formData.operator}
                    onChange={handleChange}
                    placeholder="Operator name"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">
                      Maintenance
                    </option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

              </div>

              <div className="machine-form-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-machine-btn"
                >
                  {editingMachine
                    ? "Update Machine"
                    : "Save Machine"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* View Modal */}
      {viewMachine && (
        <div className="machine-modal-overlay">

          <div className="machine-view-modal">

            <div className="machine-modal-header">

              <h2>Machine Details</h2>

              <button
                onClick={() => setViewMachine(null)}
              >
                ×
              </button>

            </div>

            <div className="machine-details">

              <p>
                <strong>Machine Code:</strong>{" "}
                {viewMachine.code}
              </p>

              <p>
                <strong>Machine Name:</strong>{" "}
                {viewMachine.name}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {viewMachine.type}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {viewMachine.department}
              </p>

              <p>
                <strong>Manufacturer:</strong>{" "}
                {viewMachine.manufacturer}
              </p>

              <p>
                <strong>Model:</strong>{" "}
                {viewMachine.model}
              </p>

              <p>
                <strong>Serial Number:</strong>{" "}
                {viewMachine.serial}
              </p>

              <p>
                <strong>Purchase Date:</strong>{" "}
                {viewMachine.purchaseDate}
              </p>

              <p>
                <strong>Capacity:</strong>{" "}
                {viewMachine.capacity}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {viewMachine.location}
              </p>

              <p>
                <strong>Operator:</strong>{" "}
                {viewMachine.operator}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {viewMachine.status}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Machines;