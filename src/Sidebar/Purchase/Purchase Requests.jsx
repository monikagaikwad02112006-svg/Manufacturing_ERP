import { useState } from "react";
import "./Purchase Requests.css";

const initialRequests = [
  {
    id: 1,
    requestNo: "PR-2026-001",
    requestDate: "2026-08-28",
    department: "Production",
    requestedBy: "Rahul Patil",
    items: 5,
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    requestNo: "PR-2026-002",
    requestDate: "2026-08-29",
    department: "Maintenance",
    requestedBy: "Amit Shinde",
    items: 3,
    priority: "Medium",
    status: "Approved",
  },
  {
    id: 3,
    requestNo: "PR-2026-003",
    requestDate: "2026-08-30",
    department: "Production",
    requestedBy: "Sagar More",
    items: 8,
    priority: "Low",
    status: "Draft",
  },
];

function PurchaseRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [viewRequest, setViewRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);

  const [formData, setFormData] = useState({
    requestNo: "",
    requestDate: "",
    department: "",
    requestedBy: "",
    items: "",
    priority: "Medium",
    status: "Draft",
  });

  // Filter Requests
  const filteredRequests = requests.filter((request) => {
    const searchMatch =
      request.requestNo.toLowerCase().includes(search.toLowerCase()) ||
      request.department.toLowerCase().includes(search.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || request.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || request.priority === priorityFilter;

    return searchMatch && statusMatch && priorityMatch;
  });

  // Summary Counts
  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const draftCount = requests.filter(
    (request) => request.status === "Draft"
  ).length;

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingRequest(null);

    setFormData({
      requestNo: "",
      requestDate: new Date().toISOString().split("T")[0],
      department: "",
      requestedBy: "",
      items: "",
      priority: "Medium",
      status: "Draft",
    });

    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (request) => {
    setEditingRequest(request);

    setFormData({
      ...request,
      items: String(request.items),
    });

    setShowModal(true);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.requestNo ||
      !formData.requestDate ||
      !formData.department ||
      !formData.requestedBy
    ) {
      alert(
        "Please fill Request No, Request Date, Department and Requested By."
      );
      return;
    }

    if (editingRequest) {
      setRequests(
        requests.map((request) =>
          request.id === editingRequest.id
            ? {
                ...formData,
                id: editingRequest.id,
                items: Number(formData.items) || 0,
              }
            : request
        )
      );
    } else {
      const newRequest = {
        ...formData,
        id: Date.now(),
        items: Number(formData.items) || 0,
      };

      setRequests([...requests, newRequest]);
    }

    setShowModal(false);
  };

  // Delete Request
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this purchase request?"
    );

    if (confirmDelete) {
      setRequests(
        requests.filter((request) => request.id !== id)
      );
    }
  };

  return (
    <div className="purchase-requests-page">

      {/* ================= HEADER ================= */}

      <div className="purchase-request-header">
        <div>
          <h1>Purchase Requests</h1>
          <p>Create and manage internal purchase requests</p>
        </div>

        <button
          className="add-purchase-request-btn"
          onClick={openAddModal}
        >
          + Add Purchase Request
        </button>
      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="purchase-request-summary">

        <div className="purchase-request-card">
          <span>Total Requests</span>
          <strong>{requests.length}</strong>
        </div>

        <div className="purchase-request-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="purchase-request-card">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

        <div className="purchase-request-card">
          <span>Draft</span>
          <strong>{draftCount}</strong>
        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="purchase-request-filters">

        <input
          type="text"
          placeholder="Search request..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

      </div>

      {/* ================= TABLE ================= */}

      <div className="purchase-requests-table-container">

        <table className="purchase-requests-table">

          <thead>
            <tr>
              <th>Request No.</th>
              <th>Date</th>
              <th>Department</th>
              <th>Requested By</th>
              <th>Items</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id}>

                  <td>
                    <strong>{request.requestNo}</strong>
                  </td>

                  <td>{request.requestDate}</td>

                  <td>{request.department}</td>

                  <td>{request.requestedBy}</td>

                  <td>{request.items}</td>

                  <td>
                    <span
                      className={`request-priority ${request.priority.toLowerCase()}`}
                    >
                      {request.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`request-status ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td>

                    <div className="purchase-request-actions">

                      <button
                        onClick={() => setViewRequest(request)}
                        title="View"
                      >
                        👁
                      </button>

                      <button
                        onClick={() => openEditModal(request)}
                        title="Edit"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(request.id)}
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
                <td
                  colSpan="8"
                  className="no-purchase-requests"
                >
                  No purchase requests found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (
        <div className="purchase-request-modal-overlay">

          <div className="purchase-request-modal">

            <div className="purchase-request-modal-header">

              <h2>
                {editingRequest
                  ? "Edit Purchase Request"
                  : "Add Purchase Request"}
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="purchase-request-form-grid">

                {/* Request Number */}

                <div className="form-group">
                  <label>Request No. *</label>

                  <input
                    name="requestNo"
                    value={formData.requestNo}
                    onChange={handleChange}
                    placeholder="PR-2026-004"
                  />
                </div>

                {/* Request Date */}

                <div className="form-group">
                  <label>Request Date *</label>

                  <input
                    type="date"
                    name="requestDate"
                    value={formData.requestDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Department */}

                <div className="form-group">
                  <label>Department *</label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Department
                    </option>

                    <option value="Production">
                      Production
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Quality">
                      Quality
                    </option>

                    <option value="Purchase">
                      Purchase
                    </option>

                    <option value="Stores">
                      Stores
                    </option>
                  </select>
                </div>

                {/* Requested By */}

                <div className="form-group">
                  <label>Requested By *</label>

                  <input
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleChange}
                    placeholder="Employee name"
                  />
                </div>

                {/* Items */}

                <div className="form-group">
                  <label>No. of Items</label>

                  <input
                    type="number"
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                    min="1"
                    placeholder="Enter number of items"
                  />
                </div>

                {/* Priority */}

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="High">
                      High
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Low">
                      Low
                    </option>
                  </select>
                </div>

                {/* Status */}

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Draft">
                      Draft
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

              </div>

              {/* Buttons */}

              <div className="purchase-request-form-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-purchase-request-btn"
                >
                  {editingRequest
                    ? "Update Request"
                    : "Save Request"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ================= VIEW MODAL ================= */}

      {viewRequest && (
        <div className="purchase-request-modal-overlay">

          <div className="purchase-request-view-modal">

            <div className="purchase-request-modal-header">

              <h2>Purchase Request Details</h2>

              <button
                type="button"
                onClick={() => setViewRequest(null)}
              >
                ×
              </button>

            </div>

            <div className="purchase-request-details">

              <p>
                <strong>Request No.:</strong>
                <span>{viewRequest.requestNo}</span>
              </p>

              <p>
                <strong>Request Date:</strong>
                <span>{viewRequest.requestDate}</span>
              </p>

              <p>
                <strong>Department:</strong>
                <span>{viewRequest.department}</span>
              </p>

              <p>
                <strong>Requested By:</strong>
                <span>{viewRequest.requestedBy}</span>
              </p>

              <p>
                <strong>No. of Items:</strong>
                <span>{viewRequest.items}</span>
              </p>

              <p>
                <strong>Priority:</strong>
                <span>{viewRequest.priority}</span>
              </p>

              <p>
                <strong>Status:</strong>
                <span>{viewRequest.status}</span>
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default PurchaseRequests;