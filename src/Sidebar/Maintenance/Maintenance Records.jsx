import React, { useMemo, useState } from "react";
import "./Maintenance Records.css";

const initialRecords = [
  {
    id: "MR-1001",
    machineId: "MCH-001",
    machineName: "CNC Turning Machine",
    maintenanceType: "Preventive",
    priority: "Medium",
    technician: "Rahul Patil",
    scheduledDate: "2026-09-05",
    completedDate: "2026-09-05",
    status: "Completed",
    cost: 8500,
    description: "Routine lubrication, alignment check and spindle inspection.",
    nextMaintenance: "2026-12-05",
  },
  {
    id: "MR-1002",
    machineId: "MCH-002",
    machineName: "Hydraulic Press",
    maintenanceType: "Corrective",
    priority: "High",
    technician: "Amit Jadhav",
    scheduledDate: "2026-09-10",
    completedDate: "",
    status: "In Progress",
    cost: 12500,
    description: "Hydraulic pressure issue and oil leakage inspection.",
    nextMaintenance: "2026-12-10",
  },
  {
    id: "MR-1003",
    machineId: "MCH-003",
    machineName: "CNC Milling Machine",
    maintenanceType: "Preventive",
    priority: "Low",
    technician: "Sneha More",
    scheduledDate: "2026-09-15",
    completedDate: "",
    status: "Scheduled",
    cost: 6500,
    description: "Preventive maintenance including coolant and belt inspection.",
    nextMaintenance: "2026-12-15",
  },
  {
    id: "MR-1004",
    machineId: "MCH-004",
    machineName: "Industrial Air Compressor",
    maintenanceType: "Breakdown",
    priority: "Critical",
    technician: "Vijay Shinde",
    scheduledDate: "2026-09-01",
    completedDate: "",
    status: "Overdue",
    cost: 18000,
    description: "Compressor stopped unexpectedly. Motor and pressure system require inspection.",
    nextMaintenance: "2026-10-01",
  },
  {
    id: "MR-1005",
    machineId: "MCH-005",
    machineName: "Assembly Line Machine",
    maintenanceType: "Inspection",
    priority: "Medium",
    technician: "Pooja Kale",
    scheduledDate: "2026-09-18",
    completedDate: "",
    status: "Scheduled",
    cost: 4200,
    description: "General machine inspection and safety component verification.",
    nextMaintenance: "2026-12-18",
  },
];

const machineOptions = [
  {
    id: "MCH-001",
    name: "CNC Turning Machine",
  },
  {
    id: "MCH-002",
    name: "Hydraulic Press",
  },
  {
    id: "MCH-003",
    name: "CNC Milling Machine",
  },
  {
    id: "MCH-004",
    name: "Industrial Air Compressor",
  },
  {
    id: "MCH-005",
    name: "Assembly Line Machine",
  },
];

const technicianOptions = [
  "Rahul Patil",
  "Amit Jadhav",
  "Sneha More",
  "Vijay Shinde",
  "Pooja Kale",
];

const emptyForm = {
  machineId: "",
  machineName: "",
  maintenanceType: "Preventive",
  priority: "Medium",
  technician: "",
  scheduledDate: "",
  completedDate: "",
  status: "Scheduled",
  cost: "",
  description: "",
  nextMaintenance: "",
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function MaintenanceRecords() {
  const [records, setRecords] = useState(initialRecords);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        record.id.toLowerCase().includes(search) ||
        record.machineId.toLowerCase().includes(search) ||
        record.machineName.toLowerCase().includes(search) ||
        record.technician.toLowerCase().includes(search) ||
        record.maintenanceType.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      const matchesType =
        typeFilter === "All" || record.maintenanceType === typeFilter;

      const matchesPriority =
        priorityFilter === "All" || record.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority
      );
    });
  }, [
    records,
    searchTerm,
    statusFilter,
    typeFilter,
    priorityFilter,
  ]);

  const statistics = useMemo(() => {
    const total = records.length;

    const scheduled = records.filter(
      (record) => record.status === "Scheduled"
    ).length;

    const inProgress = records.filter(
      (record) => record.status === "In Progress"
    ).length;

    const completed = records.filter(
      (record) => record.status === "Completed"
    ).length;

    const overdue = records.filter(
      (record) => record.status === "Overdue"
    ).length;

    const totalCost = records.reduce(
      (sum, record) => sum + Number(record.cost || 0),
      0
    );

    return {
      total,
      scheduled,
      inProgress,
      completed,
      overdue,
      totalCost,
    };
  }, [records]);

  const openAddModal = () => {
    setEditingRecord(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setFormData({
      machineId: record.machineId,
      machineName: record.machineName,
      maintenanceType: record.maintenanceType,
      priority: record.priority,
      technician: record.technician,
      scheduledDate: record.scheduledDate,
      completedDate: record.completedDate,
      status: record.status,
      cost: record.cost,
      description: record.description,
      nextMaintenance: record.nextMaintenance,
    });

    setShowModal(true);
  };

  const openViewModal = (record) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRecord(null);
    setFormData(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleMachineChange = (event) => {
    const machineId = event.target.value;

    const selectedMachine = machineOptions.find(
      (machine) => machine.id === machineId
    );

    setFormData((previous) => ({
      ...previous,
      machineId,
      machineName: selectedMachine ? selectedMachine.name : "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.machineId ||
      !formData.technician ||
      !formData.scheduledDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const cost = Number(formData.cost) || 0;

    if (editingRecord) {
      setRecords((previous) =>
        previous.map((record) =>
          record.id === editingRecord.id
            ? {
                ...record,
                ...formData,
                cost,
              }
            : record
        )
      );
    } else {
      const newRecord = {
        id: `MR-${1000 + records.length + 1}`,
        ...formData,
        cost,
      };

      setRecords((previous) => [newRecord, ...previous]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this maintenance record?"
    );

    if (!confirmDelete) return;

    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );
  };

  const updateStatus = (id, newStatus) => {
    setRecords((previous) =>
      previous.map((record) => {
        if (record.id !== id) return record;

        return {
          ...record,
          status: newStatus,
          completedDate:
            newStatus === "Completed"
              ? new Date().toISOString().split("T")[0]
              : record.completedDate,
        };
      })
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setTypeFilter("All");
    setPriorityFilter("All");
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  return (
    <div className="maintenance-page">
      {/* Page Header */}
      <div className="maintenance-page-header">
        <div>
          <div className="maintenance-breadcrumb">
            Maintenance <span>/</span> Maintenance Records
          </div>

          <h1>Maintenance Records</h1>

          <p>
            Manage preventive maintenance, breakdowns, inspections,
            schedules and maintenance costs.
          </p>
        </div>

        <button
          type="button"
          className="maintenance-primary-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add Maintenance Record
        </button>
      </div>

      {/* Statistics */}
      <div className="maintenance-stats-grid">
        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon total">🛠️</div>
          <div>
            <span>Total Records</span>
            <strong>{statistics.total}</strong>
            <small>All maintenance records</small>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon scheduled">📅</div>
          <div>
            <span>Scheduled</span>
            <strong>{statistics.scheduled}</strong>
            <small>Upcoming maintenance</small>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon progress">⚙️</div>
          <div>
            <span>In Progress</span>
            <strong>{statistics.inProgress}</strong>
            <small>Currently under service</small>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon completed">✓</div>
          <div>
            <span>Completed</span>
            <strong>{statistics.completed}</strong>
            <small>Successfully completed</small>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon overdue">!</div>
          <div>
            <span>Overdue</span>
            <strong>{statistics.overdue}</strong>
            <small>Requires attention</small>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon cost">₹</div>
          <div>
            <span>Total Cost</span>
            <strong>{formatCurrency(statistics.totalCost)}</strong>
            <small>Maintenance expenditure</small>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="maintenance-filter-card">
        <div className="maintenance-filter-title">
          <div>
            <h2>Maintenance Records</h2>
            <p>Search and filter maintenance activities</p>
          </div>

          <span className="maintenance-result-count">
            {filteredRecords.length} Records
          </span>
        </div>

        <div className="maintenance-filters">
          <div className="maintenance-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search record, machine or technician..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Preventive">Preventive</option>
            <option value="Corrective">Corrective</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Inspection">Inspection</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="button"
            className="maintenance-reset-btn"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="maintenance-table-card">
        <div className="maintenance-table-wrapper">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Machine</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Technician</th>
                <th>Scheduled</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="maintenance-record-id">
                        <strong>{record.id}</strong>
                        <small>{record.machineId}</small>
                      </div>
                    </td>

                    <td>
                      <div className="maintenance-machine">
                        <div className="maintenance-machine-icon">
                          ⚙
                        </div>

                        <div>
                          <strong>{record.machineName}</strong>
                          <small>{record.description}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="maintenance-type-badge">
                        {record.maintenanceType}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`maintenance-priority ${getPriorityClass(
                          record.priority
                        )}`}
                      >
                        {record.priority}
                      </span>
                    </td>

                    <td>
                      <span className="maintenance-technician">
                        {record.technician}
                      </span>
                    </td>

                    <td>
                      <div className="maintenance-date">
                        {formatDate(record.scheduledDate)}
                        {record.completedDate && (
                          <small>
                            Completed: {formatDate(record.completedDate)}
                          </small>
                        )}
                      </div>
                    </td>

                    <td>
                      <strong className="maintenance-cost">
                        {formatCurrency(record.cost)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`maintenance-status ${getStatusClass(
                          record.status
                        )}`}
                      >
                        <i></i>
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <div className="maintenance-actions">
                        <button
                          type="button"
                          title="View"
                          onClick={() => openViewModal(record)}
                        >
                          👁
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEditModal(record)}
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          className="delete-action"
                          onClick={() => handleDelete(record.id)}
                        >
                          🗑
                        </button>

                        {record.status === "Scheduled" && (
                          <button
                            type="button"
                            className="start-action"
                            title="Start Maintenance"
                            onClick={() =>
                              updateStatus(record.id, "In Progress")
                            }
                          >
                            ▶
                          </button>
                        )}

                        {record.status === "In Progress" && (
                          <button
                            type="button"
                            className="complete-action"
                            title="Complete Maintenance"
                            onClick={() =>
                              updateStatus(record.id, "Completed")
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
                  <td colSpan="9">
                    <div className="maintenance-empty">
                      <div>🔧</div>
                      <h3>No maintenance records found</h3>
                      <p>
                        Try changing your search or filter criteria.
                      </p>

                      <button
                        type="button"
                        onClick={handleResetFilters}
                      >
                        Clear Filters
                      </button>
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
        <div
          className="maintenance-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="maintenance-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="maintenance-modal-header">
              <div>
                <span className="maintenance-modal-label">
                  Maintenance
                </span>

                <h2>
                  {editingRecord
                    ? "Edit Maintenance Record"
                    : "Add Maintenance Record"}
                </h2>

                <p>
                  Enter complete maintenance information below.
                </p>
              </div>

              <button
                type="button"
                className="maintenance-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form
              className="maintenance-form"
              onSubmit={handleSubmit}
            >
              <div className="maintenance-form-section">
                <div className="maintenance-section-heading">
                  <span>01</span>
                  <div>
                    <h3>Machine Information</h3>
                    <p>Select the machine requiring maintenance.</p>
                  </div>
                </div>

                <div className="maintenance-form-grid">
                  <div className="maintenance-form-group">
                    <label>
                      Machine <em>*</em>
                    </label>

                    <select
                      name="machineId"
                      value={formData.machineId}
                      onChange={handleMachineChange}
                      required
                    >
                      <option value="">Select Machine</option>

                      {machineOptions.map((machine) => (
                        <option
                          key={machine.id}
                          value={machine.id}
                        >
                          {machine.id} - {machine.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="maintenance-form-group">
                    <label>Machine ID</label>

                    <input
                      type="text"
                      value={formData.machineId}
                      readOnly
                      placeholder="Auto selected"
                    />
                  </div>
                </div>
              </div>

              <div className="maintenance-form-section">
                <div className="maintenance-section-heading">
                  <span>02</span>
                  <div>
                    <h3>Maintenance Details</h3>
                    <p>Define the maintenance activity.</p>
                  </div>
                </div>

                <div className="maintenance-form-grid">
                  <div className="maintenance-form-group">
                    <label>
                      Maintenance Type <em>*</em>
                    </label>

                    <select
                      name="maintenanceType"
                      value={formData.maintenanceType}
                      onChange={handleChange}
                    >
                      <option value="Preventive">Preventive</option>
                      <option value="Corrective">Corrective</option>
                      <option value="Breakdown">Breakdown</option>
                      <option value="Inspection">Inspection</option>
                    </select>
                  </div>

                  <div className="maintenance-form-group">
                    <label>Priority</label>

                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="maintenance-form-group">
                    <label>
                      Technician <em>*</em>
                    </label>

                    <select
                      name="technician"
                      value={formData.technician}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Technician</option>

                      {technicianOptions.map((technician) => (
                        <option
                          key={technician}
                          value={technician}
                        >
                          {technician}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="maintenance-form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="maintenance-form-section">
                <div className="maintenance-section-heading">
                  <span>03</span>
                  <div>
                    <h3>Schedule & Cost</h3>
                    <p>Set maintenance dates and estimated cost.</p>
                  </div>
                </div>

                <div className="maintenance-form-grid">
                  <div className="maintenance-form-group">
                    <label>
                      Scheduled Date <em>*</em>
                    </label>

                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="maintenance-form-group">
                    <label>Completed Date</label>

                    <input
                      type="date"
                      name="completedDate"
                      value={formData.completedDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="maintenance-form-group">
                    <label>Next Maintenance</label>

                    <input
                      type="date"
                      name="nextMaintenance"
                      value={formData.nextMaintenance}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="maintenance-form-group">
                    <label>Maintenance Cost (₹)</label>

                    <input
                      type="number"
                      min="0"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      placeholder="Enter cost"
                    />
                  </div>
                </div>
              </div>

              <div className="maintenance-form-section">
                <div className="maintenance-section-heading">
                  <span>04</span>
                  <div>
                    <h3>Description</h3>
                    <p>Add service details or maintenance notes.</p>
                  </div>
                </div>

                <div className="maintenance-form-group">
                  <label>Maintenance Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter maintenance work details..."
                  />
                </div>
              </div>

              <div className="maintenance-modal-footer">
                <button
                  type="button"
                  className="maintenance-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="maintenance-save-btn"
                >
                  {editingRecord
                    ? "Update Record"
                    : "Save Maintenance Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedRecord && (
        <div
          className="maintenance-modal-overlay"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="maintenance-view-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="maintenance-view-header">
              <div>
                <span>Maintenance Record</span>
                <h2>{selectedRecord.id}</h2>
              </div>

              <button
                type="button"
                className="maintenance-close-btn"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="maintenance-view-status">
              <span
                className={`maintenance-status ${getStatusClass(
                  selectedRecord.status
                )}`}
              >
                <i></i>
                {selectedRecord.status}
              </span>

              <span
                className={`maintenance-priority ${getPriorityClass(
                  selectedRecord.priority
                )}`}
              >
                {selectedRecord.priority} Priority
              </span>
            </div>

            <div className="maintenance-view-machine">
              <div className="maintenance-large-machine-icon">
                ⚙
              </div>

              <div>
                <span>{selectedRecord.machineId}</span>
                <h3>{selectedRecord.machineName}</h3>
                <p>{selectedRecord.maintenanceType} Maintenance</p>
              </div>
            </div>

            <div className="maintenance-detail-grid">
              <div>
                <span>Technician</span>
                <strong>{selectedRecord.technician}</strong>
              </div>

              <div>
                <span>Scheduled Date</span>
                <strong>
                  {formatDate(selectedRecord.scheduledDate)}
                </strong>
              </div>

              <div>
                <span>Completed Date</span>
                <strong>
                  {formatDate(selectedRecord.completedDate)}
                </strong>
              </div>

              <div>
                <span>Next Maintenance</span>
                <strong>
                  {formatDate(selectedRecord.nextMaintenance)}
                </strong>
              </div>

              <div>
                <span>Maintenance Cost</span>
                <strong className="view-cost">
                  {formatCurrency(selectedRecord.cost)}
                </strong>
              </div>

              <div>
                <span>Maintenance Type</span>
                <strong>{selectedRecord.maintenanceType}</strong>
              </div>
            </div>

            <div className="maintenance-description-box">
              <span>Maintenance Description</span>
              <p>
                {selectedRecord.description ||
                  "No description available."}
              </p>
            </div>

            <div className="maintenance-view-footer">
              <button
                type="button"
                className="maintenance-cancel-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="maintenance-save-btn"
                onClick={() => {
                  setShowViewModal(false);
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

export default MaintenanceRecords;