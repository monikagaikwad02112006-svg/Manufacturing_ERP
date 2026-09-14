
import React, { useMemo, useState } from "react";
import "./Users.css";

const initialUsers = [
  {
    id: 1,
    name: "Monika Gaikwad",
    email: "monika@manufacturing.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    department: "Management",
    status: "Active",
    lastLogin: "Today, 10:42 AM",
    joined: "12 Jan 2025",
    avatar: "MG",
  },
  {
    id: 2,
    name: "Rahul Patil",
    email: "rahul@manufacturing.com",
    phone: "+91 98234 56789",
    role: "Production Manager",
    department: "Production",
    status: "Active",
    lastLogin: "Today, 09:18 AM",
    joined: "20 Feb 2025",
    avatar: "RP",
  },
  {
    id: 3,
    name: "Pranali More",
    email: "pranali@manufacturing.com",
    phone: "+91 97654 32108",
    role: "HR Manager",
    department: "HR & Payroll",
    status: "Active",
    lastLogin: "Yesterday, 05:35 PM",
    joined: "05 Mar 2025",
    avatar: "PM",
  },
  {
    id: 4,
    name: "Amit Shinde",
    email: "amit@manufacturing.com",
    phone: "+91 98123 45670",
    role: "Inventory Manager",
    department: "Inventory",
    status: "Active",
    lastLogin: "Yesterday, 03:22 PM",
    joined: "18 Apr 2025",
    avatar: "AS",
  },
  {
    id: 5,
    name: "Sneha Kulkarni",
    email: "sneha@manufacturing.com",
    phone: "+91 98989 12345",
    role: "Accountant",
    department: "Finance",
    status: "Inactive",
    lastLogin: "28 Aug 2026, 11:10 AM",
    joined: "10 May 2025",
    avatar: "SK",
  },
  {
    id: 6,
    name: "Vishal Jadhav",
    email: "vishal@manufacturing.com",
    phone: "+91 99001 22334",
    role: "Quality Manager",
    department: "Quality",
    status: "Active",
    lastLogin: "Today, 08:45 AM",
    joined: "02 Jun 2025",
    avatar: "VJ",
  },
  {
    id: 7,
    name: "Neha Deshmukh",
    email: "neha@manufacturing.com",
    phone: "+91 99556 77889",
    role: "Purchase Executive",
    department: "Purchase",
    status: "Active",
    lastLogin: "Today, 08:12 AM",
    joined: "15 Jul 2025",
    avatar: "ND",
  },
  {
    id: 8,
    name: "Karan Pawar",
    email: "karan@manufacturing.com",
    phone: "+91 97876 55443",
    role: "Sales Executive",
    department: "Sales",
    status: "Inactive",
    lastLogin: "25 Aug 2026, 02:20 PM",
    joined: "08 Aug 2025",
    avatar: "KP",
  },
];

const roles = [
  "All Roles",
  "Administrator",
  "Production Manager",
  "HR Manager",
  "Inventory Manager",
  "Accountant",
  "Quality Manager",
  "Purchase Executive",
  "Sales Executive",
];

const departments = [
  "All Departments",
  "Management",
  "Production",
  "HR & Payroll",
  "Inventory",
  "Finance",
  "Quality",
  "Purchase",
  "Sales",
];

function Users() {
  const [users, setUsers] = useState(initialUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    role: "Administrator",
    department: "Management",
    status: "Active",
  };

  const [formData, setFormData] = useState(emptyForm);

  /* =========================================================
     FILTER USERS
     ========================================================= */

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search) ||
        user.department.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === "All Roles" ||
        user.role === roleFilter;

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        user.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    users,
    searchTerm,
    roleFilter,
    departmentFilter,
    statusFilter,
  ]);

  /* =========================================================
     STATISTICS
     ========================================================= */

  const statistics = useMemo(() => {
    const active = users.filter(
      (user) => user.status === "Active"
    ).length;

    const inactive = users.filter(
      (user) => user.status === "Inactive"
    ).length;

    const administrators = users.filter(
      (user) => user.role === "Administrator"
    ).length;

    return {
      total: users.length,
      active,
      inactive,
      administrators,
    };
  }, [users]);

  /* =========================================================
     FORM HANDLING
     ========================================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      status: user.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(emptyForm);
  };

  /* =========================================================
     ADD / UPDATE USER
     ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...formData,
                avatar: formData.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase(),
              }
            : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        avatar: formData.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        lastLogin: "Never",
        joined: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      setUsers((previous) => [newUser, ...previous]);
    }

    closeModal();
  };

  /* =========================================================
     DELETE USER
     ========================================================= */

  const handleDelete = (id) => {
    const user = users.find((item) => item.id === id);

    if (!user) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmDelete) return;

    setUsers((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  /* =========================================================
     TOGGLE STATUS
     ========================================================= */

  const toggleStatus = (id) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  };

  /* =========================================================
     VIEW USER
     ========================================================= */

  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setSelectedUser(null);
    setShowViewModal(false);
  };

  /* =========================================================
     RESET FILTERS
     ========================================================= */

  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("All Roles");
    setDepartmentFilter("All Departments");
    setStatusFilter("All Status");
  };

  return (
    <div className="users-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="users-page-header">

        <div>
          <div className="users-breadcrumb">
            Administration
            <span>/</span>
            Users
          </div>

          <h1>Users</h1>

          <p>
            Manage system users, roles, access and account
            status from one place.
          </p>
        </div>

        <button
          type="button"
          className="users-add-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add New User
        </button>

      </div>

      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <div className="users-stat-grid">

        <div className="users-stat-card">
          <div className="users-stat-icon total">
            👥
          </div>

          <div>
            <span>Total Users</span>
            <strong>{statistics.total}</strong>
            <small>Registered accounts</small>
          </div>
        </div>

        <div className="users-stat-card">
          <div className="users-stat-icon active">
            ✓
          </div>

          <div>
            <span>Active Users</span>
            <strong>{statistics.active}</strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="users-stat-card">
          <div className="users-stat-icon inactive">
            ◌
          </div>

          <div>
            <span>Inactive Users</span>
            <strong>{statistics.inactive}</strong>
            <small>Temporarily disabled</small>
          </div>
        </div>

        <div className="users-stat-card">
          <div className="users-stat-icon admin">
            ♛
          </div>

          <div>
            <span>Administrators</span>
            <strong>{statistics.administrators}</strong>
            <small>System administrators</small>
          </div>
        </div>

      </div>

      {/* =====================================================
          FILTER SECTION
          ===================================================== */}

      <div className="users-filter-card">

        <div className="users-filter-top">

          <div>
            <h2>User Directory</h2>
            <p>
              Search and manage all registered ERP users.
            </p>
          </div>

          <span className="users-result-count">
            {filteredUsers.length} users found
          </span>

        </div>

        <div className="users-filter-row">

          <div className="users-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value)
            }
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
          >
            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="button"
            className="users-reset-btn"
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>
      </div>

      {/* =====================================================
          USERS TABLE
          ===================================================== */}

      <div className="users-table-card">

        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user.id}>

                  <td>
                    <div className="user-profile">

                      <div className="user-avatar">
                        {user.avatar}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="user-role">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span className="user-department">
                      {user.department}
                    </span>
                  </td>

                  <td>
                    <span className="user-phone">
                      {user.phone}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`user-status ${
                        user.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                      onClick={() =>
                        toggleStatus(user.id)
                      }
                    >
                      <i></i>
                      {user.status}
                    </button>
                  </td>

                  <td>
                    <span className="last-login">
                      {user.lastLogin}
                    </span>
                  </td>

                  <td>

                    <div className="user-actions">

                      <button
                        type="button"
                        title="View"
                        onClick={() =>
                          openViewModal(user)
                        }
                      >
                        👁
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          openEditModal(user)
                        }
                      >
                        ✎
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        className="delete"
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {filteredUsers.length === 0 && (
            <div className="users-empty">

              <div className="users-empty-icon">
                👥
              </div>

              <h3>No users found</h3>

              <p>
                No users match your current search or
                filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
              >
                Clear Filters
              </button>

            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
          ===================================================== */}

      {showModal && (
        <div
          className="users-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="users-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="users-modal-header">

              <div>
                <span className="modal-label">
                  User Management
                </span>

                <h2>
                  {editingUser
                    ? "Edit User"
                    : "Create New User"}
                </h2>

                <p>
                  {editingUser
                    ? "Update user information and access details."
                    : "Add a new user to your manufacturing ERP."}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="users-form-body">

                <div className="form-group full">
                  <label>
                    Full Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="users-form-grid">

                  <div className="form-group">
                    <label>
                      Email Address <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Role</label>

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      {roles
                        .filter(
                          (role) => role !== "All Roles"
                        )
                        .map((role) => (
                          <option
                            key={role}
                            value={role}
                          >
                            {role}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Department</label>

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    >
                      {departments
                        .filter(
                          (department) =>
                            department !==
                            "All Departments"
                        )
                        .map((department) => (
                          <option
                            key={department}
                            value={department}
                          >
                            {department}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Account Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>

                </div>

              </div>

              <div className="users-modal-footer">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
                >
                  {editingUser
                    ? "Update User"
                    : "Create User"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          VIEW USER MODAL
          ===================================================== */}

      {showViewModal && selectedUser && (
        <div
          className="users-modal-overlay"
          onClick={closeViewModal}
        >

          <div
            className="user-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="user-details-top">

              <button
                type="button"
                className="modal-close"
                onClick={closeViewModal}
              >
                ×
              </button>

              <div className="large-user-avatar">
                {selectedUser.avatar}
              </div>

              <h2>{selectedUser.name}</h2>

              <p>{selectedUser.email}</p>

              <span
                className={`details-status ${
                  selectedUser.status === "Active"
                    ? "active"
                    : "inactive"
                }`}
              >
                <i></i>
                {selectedUser.status}
              </span>

            </div>

            <div className="user-details-body">

              <div className="details-item">
                <span>Role</span>
                <strong>{selectedUser.role}</strong>
              </div>

              <div className="details-item">
                <span>Department</span>
                <strong>
                  {selectedUser.department}
                </strong>
              </div>

              <div className="details-item">
                <span>Phone Number</span>
                <strong>{selectedUser.phone}</strong>
              </div>

              <div className="details-item">
                <span>Joined Date</span>
                <strong>{selectedUser.joined}</strong>
              </div>

              <div className="details-item">
                <span>Last Login</span>
                <strong>
                  {selectedUser.lastLogin}
                </strong>
              </div>

              <div className="details-item">
                <span>User ID</span>
                <strong>
                  USR-{String(selectedUser.id).padStart(
                    4,
                    "0"
                  )}
                </strong>
              </div>

            </div>

            <div className="user-details-footer">

              <button
                type="button"
                className="modal-cancel"
                onClick={closeViewModal}
              >
                Close
              </button>

              <button
                type="button"
                className="modal-save"
                onClick={() => {
                  closeViewModal();
                  openEditModal(selectedUser);
                }}
              >
                Edit User
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Users;

