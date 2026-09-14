
import React, { useMemo, useState } from "react";
import "./Roles.css";

const permissionModules = [
  {
    category: "Masters",
    modules: [
      "Products",
      "Suppliers",
      "Customers",
      "Employees",
      "Warehouses",
      "Machines",
    ],
  },
  {
    category: "Purchase",
    modules: ["Purchase Requests", "Purchase Orders"],
  },
  {
    category: "Inventory",
    modules: [
      "Stock Overview",
      "Stock Movement",
      "Warehouse Transfer",
    ],
  },
  {
    category: "Production",
    modules: [
      "BOM",
      "Production Orders",
      "Production Tracking",
    ],
  },
  {
    category: "Quality",
    modules: ["Quality Check", "Rejected Quarantine"],
  },
  {
    category: "Sales",
    modules: [
      "Customer Orders",
      "Dispatch",
      "Sales Invoice",
      "Customer Payments",
    ],
  },
  {
    category: "HR & Payroll",
    modules: [
      "Employees",
      "Attendence",
      "Salary",
      "Payroll",
    ],
  },
  {
    category: "Reports",
    modules: ["All Reports"],
  },
  {
    category: "Maintenance",
    modules: ["Maintenance Records"],
  },
  {
    category: "Settings",
    modules: ["Users", "Roles"],
  },
];

const permissionTypes = [
  "View",
  "Create",
  "Edit",
  "Delete",
];

const getAllModules = () =>
  permissionModules.flatMap((group) => group.modules);

const createPermissions = (modules = [], fullAccess = false) => {
  const permissions = {};

  getAllModules().forEach((module) => {
    permissions[module] = {};

    permissionTypes.forEach((permission) => {
      permissions[module][permission] = fullAccess
        ? true
        : modules.includes(module);
    });
  });

  return permissions;
};

const initialRoles = [
  {
    id: 1,
    name: "Administrator",
    description:
      "Full system access with complete control over all ERP modules.",
    accessLevel: "Full Access",
    status: "Active",
    users: 1,
    createdDate: "12 Jan 2025",
    permissions: createPermissions([], true),
  },
  {
    id: 2,
    name: "Production Manager",
    description:
      "Manages production planning, BOMs, production orders and tracking.",
    accessLevel: "Advanced",
    status: "Active",
    users: 3,
    createdDate: "20 Feb 2025",
    permissions: createPermissions([
      "Products",
      "Machines",
      "BOM",
      "Production Orders",
      "Production Tracking",
      "Stock Overview",
      "Stock Movement",
      "Quality Check",
      "All Reports",
    ]),
  },
  {
    id: 3,
    name: "HR Manager",
    description:
      "Manages employees, attendance, salary and payroll operations.",
    accessLevel: "Advanced",
    status: "Active",
    users: 2,
    createdDate: "05 Mar 2025",
    permissions: createPermissions([
      "Employees",
      "Attendence",
      "Salary",
      "Payroll",
      "All Reports",
    ]),
  },
  {
    id: 4,
    name: "Inventory Manager",
    description:
      "Controls stock, warehouse transfers and inventory operations.",
    accessLevel: "Advanced",
    status: "Active",
    users: 2,
    createdDate: "18 Apr 2025",
    permissions: createPermissions([
      "Products",
      "Warehouses",
      "Stock Overview",
      "Stock Movement",
      "Warehouse Transfer",
      "All Reports",
    ]),
  },
  {
    id: 5,
    name: "Accountant",
    description:
      "Handles invoices, payments, financial records and reports.",
    accessLevel: "Standard",
    status: "Active",
    users: 1,
    createdDate: "10 May 2025",
    permissions: createPermissions([
      "Customers",
      "Suppliers",
      "Sales Invoice",
      "Customer Payments",
      "Purchase Orders",
      "All Reports",
    ]),
  },
  {
    id: 6,
    name: "Quality Manager",
    description:
      "Manages quality inspections, checks and rejected materials.",
    accessLevel: "Standard",
    status: "Active",
    users: 1,
    createdDate: "02 Jun 2025",
    permissions: createPermissions([
      "Products",
      "Production Orders",
      "Quality Check",
      "Rejected Quarantine",
      "All Reports",
    ]),
  },
  {
    id: 7,
    name: "Purchase Executive",
    description:
      "Handles supplier management, purchase requests and purchase orders.",
    accessLevel: "Basic",
    status: "Active",
    users: 2,
    createdDate: "15 Jul 2025",
    permissions: createPermissions([
      "Products",
      "Suppliers",
      "Purchase Requests",
      "Purchase Orders",
    ]),
  },
  {
    id: 8,
    name: "Sales Executive",
    description:
      "Manages customer orders, dispatches and customer payments.",
    accessLevel: "Basic",
    status: "Inactive",
    users: 1,
    createdDate: "08 Aug 2025",
    permissions: createPermissions([
      "Customers",
      "Customer Orders",
      "Dispatch",
      "Customer Payments",
    ]),
  },
];

function Roles() {
  const [roles, setRoles] = useState(initialRoles);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");
  const [accessFilter, setAccessFilter] =
    useState("All Access");

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingRole, setEditingRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [activePermissionCategory, setActivePermissionCategory] =
    useState("Masters");

  const emptyPermissions = createPermissions();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    accessLevel: "Standard",
    status: "Active",
    permissions: emptyPermissions,
  });

  const filteredRoles = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return roles.filter((role) => {
      const matchesSearch =
        !search ||
        role.name.toLowerCase().includes(search) ||
        role.description.toLowerCase().includes(search) ||
        role.accessLevel.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All Status" ||
        role.status === statusFilter;

      const matchesAccess =
        accessFilter === "All Access" ||
        role.accessLevel === accessFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAccess
      );
    });
  }, [
    roles,
    searchTerm,
    statusFilter,
    accessFilter,
  ]);

  const stats = useMemo(() => {
    const active = roles.filter(
      (role) => role.status === "Active"
    ).length;

    const inactive = roles.filter(
      (role) => role.status === "Inactive"
    ).length;

    const fullAccess = roles.filter(
      (role) => role.accessLevel === "Full Access"
    ).length;

    const assignedUsers = roles.reduce(
      (total, role) => total + role.users,
      0
    );

    return {
      total: roles.length,
      active,
      inactive,
      fullAccess,
      assignedUsers,
    };
  }, [roles]);

  const getPermissionCount = (permissions) => {
    return Object.values(permissions || {}).reduce(
      (total, modulePermissions) =>
        total +
        Object.values(modulePermissions).filter(Boolean)
          .length,
      0
    );
  };

  const openAddModal = () => {
    setEditingRole(null);

    setFormData({
      name: "",
      description: "",
      accessLevel: "Standard",
      status: "Active",
      permissions: createPermissions(),
    });

    setActivePermissionCategory("Masters");
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);

    setFormData({
      name: role.name,
      description: role.description,
      accessLevel: role.accessLevel,
      status: role.status,
      permissions: JSON.parse(
        JSON.stringify(role.permissions)
      ),
    });

    setActivePermissionCategory("Masters");
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const togglePermission = (module, permission) => {
    setFormData((previous) => ({
      ...previous,
      permissions: {
        ...previous.permissions,
        [module]: {
          ...previous.permissions[module],
          [permission]:
            !previous.permissions[module][permission],
        },
      },
    }));
  };

  const toggleModulePermissions = (module, checked) => {
    setFormData((previous) => ({
      ...previous,
      permissions: {
        ...previous.permissions,
        [module]: {
          View: checked,
          Create: checked,
          Edit: checked,
          Delete: checked,
        },
      },
    }));
  };

  const selectAllPermissions = () => {
    setFormData((previous) => ({
      ...previous,
      permissions: createPermissions([], true),
    }));
  };

  const clearAllPermissions = () => {
    setFormData((previous) => ({
      ...previous,
      permissions: createPermissions(),
    }));
  };

  const selectCategoryPermissions = (category) => {
    const categoryData = permissionModules.find(
      (group) => group.category === category
    );

    if (!categoryData) return;

    setFormData((previous) => {
      const updatedPermissions = {
        ...previous.permissions,
      };

      categoryData.modules.forEach((module) => {
        updatedPermissions[module] = {
          View: true,
          Create: true,
          Edit: true,
          Delete: true,
        };
      });

      return {
        ...previous,
        permissions: updatedPermissions,
      };
    });
  };

  const clearCategoryPermissions = (category) => {
    const categoryData = permissionModules.find(
      (group) => group.category === category
    );

    if (!categoryData) return;

    setFormData((previous) => {
      const updatedPermissions = {
        ...previous.permissions,
      };

      categoryData.modules.forEach((module) => {
        updatedPermissions[module] = {
          View: false,
          Create: false,
          Edit: false,
          Delete: false,
        };
      });

      return {
        ...previous,
        permissions: updatedPermissions,
      };
    });
  };

  const isModuleFullySelected = (module) => {
    const modulePermissions =
      formData.permissions[module];

    return permissionTypes.every(
      (permission) => modulePermissions?.[permission]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a role name.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter a role description.");
      return;
    }

    const duplicateRole = roles.some(
      (role) =>
        role.name.toLowerCase() ===
          formData.name.trim().toLowerCase() &&
        role.id !== editingRole?.id
    );

    if (duplicateRole) {
      alert("A role with this name already exists.");
      return;
    }

    if (editingRole) {
      setRoles((previous) =>
        previous.map((role) =>
          role.id === editingRole.id
            ? {
                ...role,
                name: formData.name.trim(),
                description:
                  formData.description.trim(),
                accessLevel: formData.accessLevel,
                status: formData.status,
                permissions: formData.permissions,
              }
            : role
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        accessLevel: formData.accessLevel,
        status: formData.status,
        users: 0,
        createdDate: new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
        permissions: formData.permissions,
      };

      setRoles((previous) => [newRole, ...previous]);
    }

    closeModal();
  };

  const deleteRole = (id) => {
    const role = roles.find(
      (item) => item.id === id
    );

    if (!role) return;

    if (role.users > 0) {
      const confirmed = window.confirm(
        `${role.name} is assigned to ${role.users} user(s). Are you sure you want to delete this role?`
      );

      if (!confirmed) return;
    } else {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${role.name}?`
      );

      if (!confirmed) return;
    }

    setRoles((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setRoles((previous) =>
      previous.map((role) =>
        role.id === id
          ? {
              ...role,
              status:
                role.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : role
      )
    );
  };

  const viewRole = (role) => {
    setSelectedRole(role);
    setShowDetails(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRole(null);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedRole(null);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setAccessFilter("All Access");
  };

  const activeCategory =
    permissionModules.find(
      (group) =>
        group.category === activePermissionCategory
    ) || permissionModules[0];

  return (
    <div className="roles-page">
      {/* HEADER */}
      <div className="roles-header">
        <div>
          <div className="roles-breadcrumb">
            Settings
            <span>/</span>
            Roles
          </div>

          <h1>Role Management</h1>

          <p>
            Create and manage access roles, permissions and
            security levels across your ERP system.
          </p>
        </div>

        <button
          type="button"
          className="roles-add-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Create Role
        </button>
      </div>

      {/* STATISTICS */}
      <div className="roles-stats">
        <div className="roles-stat-card">
          <div className="roles-stat-icon roles">
            ♡
          </div>

          <div>
            <span>Total Roles</span>
            <strong>{stats.total}</strong>
            <small>Configured roles</small>
          </div>
        </div>

        <div className="roles-stat-card">
          <div className="roles-stat-icon active">
            ✓
          </div>

          <div>
            <span>Active Roles</span>
            <strong>{stats.active}</strong>
            <small>Currently available</small>
          </div>
        </div>

        <div className="roles-stat-card">
          <div className="roles-stat-icon users">
            ♧
          </div>

          <div>
            <span>Assigned Users</span>
            <strong>{stats.assignedUsers}</strong>
            <small>Across all roles</small>
          </div>
        </div>

        <div className="roles-stat-card">
          <div className="roles-stat-icon admin">
            ♛
          </div>

          <div>
            <span>Full Access</span>
            <strong>{stats.fullAccess}</strong>
            <small>Administrative roles</small>
          </div>
        </div>
      </div>

      {/* FILTER CARD */}
      <div className="roles-filter-card">
        <div className="roles-filter-header">
          <div>
            <h2>Roles Directory</h2>
            <p>
              Search and filter configured ERP access
              roles.
            </p>
          </div>

          <span>
            {filteredRoles.length} roles found
          </span>
        </div>

        <div className="roles-filter-row">
          <div className="roles-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <select
            value={accessFilter}
            onChange={(event) =>
              setAccessFilter(event.target.value)
            }
          >
            <option value="All Access">
              All Access Levels
            </option>
            <option value="Full Access">
              Full Access
            </option>
            <option value="Advanced">
              Advanced
            </option>
            <option value="Standard">
              Standard
            </option>
            <option value="Basic">
              Basic
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All Status">
              All Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="button"
            className="roles-reset-btn"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ROLES TABLE */}
      <div className="roles-table-card">
        <div className="roles-table-wrapper">
          <table className="roles-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Access Level</th>
                <th>Permissions</th>
                <th>Users</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td>
                    <div className="role-profile">
                      <div className="role-avatar">
                        {role.name
                          .split(" ")
                          .map((word) =>
                            word.charAt(0)
                          )
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{role.name}</strong>
                        <span>
                          {role.description}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`access-badge ${role.accessLevel
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {role.accessLevel}
                    </span>
                  </td>

                  <td>
                    <span className="permission-count">
                      {getPermissionCount(
                        role.permissions
                      )}{" "}
                      permissions
                    </span>
                  </td>

                  <td>
                    <span className="role-users">
                      {role.users}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`role-status ${
                        role.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                      onClick={() =>
                        toggleStatus(role.id)
                      }
                    >
                      <i></i>
                      {role.status}
                    </button>
                  </td>

                  <td>
                    <span className="role-created">
                      {role.createdDate}
                    </span>
                  </td>

                  <td>
                    <div className="role-actions">
                      <button
                        type="button"
                        title="View Role"
                        onClick={() =>
                          viewRole(role)
                        }
                      >
                        👁
                      </button>

                      <button
                        type="button"
                        title="Edit Role"
                        onClick={() =>
                          openEditModal(role)
                        }
                      >
                        ✎
                      </button>

                      <button
                        type="button"
                        title="Delete Role"
                        className="delete"
                        onClick={() =>
                          deleteRole(role.id)
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

          {filteredRoles.length === 0 && (
            <div className="roles-empty">
              <div className="roles-empty-icon">
                ♡
              </div>

              <h3>No roles found</h3>

              <p>
                Try changing your search or filter
                options.
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

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="roles-overlay"
          onClick={closeModal}
        >
          <div
            className="roles-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="roles-modal-header">
              <div>
                <span>SETTINGS</span>

                <h2>
                  {editingRole
                    ? "Edit Role"
                    : "Create New Role"}
                </h2>

                <p>
                  Define role information and module
                  permissions.
                </p>
              </div>

              <button
                type="button"
                className="roles-close"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="roles-form">
                <div className="roles-form-grid">
                  <div className="roles-form-group">
                    <label>
                      Role Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Sales Manager"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="roles-form-group">
                    <label>Access Level</label>

                    <select
                      name="accessLevel"
                      value={
                        formData.accessLevel
                      }
                      onChange={handleInputChange}
                    >
                      <option value="Full Access">
                        Full Access
                      </option>
                      <option value="Advanced">
                        Advanced
                      </option>
                      <option value="Standard">
                        Standard
                      </option>
                      <option value="Basic">
                        Basic
                      </option>
                    </select>
                  </div>

                  <div className="roles-form-group">
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

                  <div className="roles-form-group">
                    <label>Selected Permissions</label>

                    <div className="roles-permission-summary">
                      <strong>
                        {getPermissionCount(
                          formData.permissions
                        )}
                      </strong>
                      <span>
                        permissions enabled
                      </span>
                    </div>
                  </div>

                  <div className="roles-form-group full">
                    <label>
                      Description <span>*</span>
                    </label>

                    <textarea
                      name="description"
                      rows="3"
                      placeholder="Describe what this role is responsible for..."
                      value={
                        formData.description
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* PERMISSION HEADER */}
                <div className="permissions-header">
                  <div>
                    <h3>Module Permissions</h3>

                    <p>
                      Control what this role can view,
                      create, edit and delete.
                    </p>
                  </div>

                  <div className="permissions-actions">
                    <button
                      type="button"
                      onClick={
                        selectAllPermissions
                      }
                    >
                      Select All
                    </button>

                    <button
                      type="button"
                      onClick={
                        clearAllPermissions
                      }
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* PERMISSION BODY */}
                <div className="permissions-panel">
                  <div className="permission-categories">
                    {permissionModules.map(
                      (group) => (
                        <button
                          type="button"
                          key={group.category}
                          className={
                            activePermissionCategory ===
                            group.category
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setActivePermissionCategory(
                              group.category
                            )
                          }
                        >
                          <span>
                            {group.category}
                          </span>

                          <small>
                            {group.modules.length}
                          </small>
                        </button>
                      )
                    )}
                  </div>

                  <div className="permission-content">
                    <div className="permission-content-header">
                      <div>
                        <h4>
                          {
                            activeCategory.category
                          }
                        </h4>

                        <span>
                          {
                            activeCategory.modules
                              .length
                          }{" "}
                          modules
                        </span>
                      </div>

                      <div className="category-actions">
                        <button
                          type="button"
                          onClick={() =>
                            selectCategoryPermissions(
                              activeCategory.category
                            )
                          }
                        >
                          Select Category
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            clearCategoryPermissions(
                              activeCategory.category
                            )
                          }
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="permission-table">
                      <div className="permission-table-head">
                        <span>Module</span>
                        <span>View</span>
                        <span>Create</span>
                        <span>Edit</span>
                        <span>Delete</span>
                      </div>

                      {activeCategory.modules.map(
                        (module) => (
                          <div
                            className="permission-row"
                            key={module}
                          >
                            <div className="permission-module">
                              <button
                                type="button"
                                className={`module-select ${
                                  isModuleFullySelected(
                                    module
                                  )
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleModulePermissions(
                                    module,
                                    !isModuleFullySelected(
                                      module
                                    )
                                  )
                                }
                              >
                                {isModuleFullySelected(
                                  module
                                )
                                  ? "✓"
                                  : ""}
                              </button>

                              <span>
                                {module}
                              </span>
                            </div>

                            {permissionTypes.map(
                              (permission) => (
                                <label
                                  className="permission-checkbox"
                                  key={`${module}-${permission}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      formData
                                        .permissions[
                                        module
                                      ]?.[
                                        permission
                                      ] || false
                                    }
                                    onChange={() =>
                                      togglePermission(
                                        module,
                                        permission
                                      )
                                    }
                                  />

                                  <span></span>
                                </label>
                              )
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="roles-modal-footer">
                <button
                  type="button"
                  className="roles-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="roles-save-btn"
                >
                  {editingRole
                    ? "Update Role"
                    : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetails && selectedRole && (
        <div
          className="roles-overlay"
          onClick={closeDetails}
        >
          <div
            className="role-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="roles-close details-close"
              onClick={closeDetails}
            >
              ×
            </button>

            <div className="role-details-hero">
              <div className="role-details-avatar">
                {selectedRole.name
                  .split(" ")
                  .map((word) =>
                    word.charAt(0)
                  )
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <h2>{selectedRole.name}</h2>

              <p>{selectedRole.description}</p>

              <span
                className={`role-details-status ${
                  selectedRole.status === "Active"
                    ? "active"
                    : "inactive"
                }`}
              >
                <i></i>
                {selectedRole.status}
              </span>
            </div>

            <div className="role-details-info">
              <div>
                <span>Role ID</span>
                <strong>
                  ROLE-
                  {String(
                    selectedRole.id
                  ).padStart(4, "0")}
                </strong>
              </div>

              <div>
                <span>Access Level</span>
                <strong>
                  {selectedRole.accessLevel}
                </strong>
              </div>

              <div>
                <span>Assigned Users</span>
                <strong>
                  {selectedRole.users}
                </strong>
              </div>

              <div>
                <span>Created Date</span>
                <strong>
                  {selectedRole.createdDate}
                </strong>
              </div>

              <div>
                <span>Permissions</span>
                <strong>
                  {getPermissionCount(
                    selectedRole.permissions
                  )}
                </strong>
              </div>

              <div>
                <span>Security</span>
                <strong>
                  {selectedRole.accessLevel ===
                  "Full Access"
                    ? "Administrator"
                    : "Restricted"}
                </strong>
              </div>
            </div>

            <div className="details-permissions">
              <div className="details-permissions-header">
                <div>
                  <h3>Permission Overview</h3>
                  <p>
                    Access granted to this role.
                  </p>
                </div>

                <span>
                  {getPermissionCount(
                    selectedRole.permissions
                  )}{" "}
                  total
                </span>
              </div>

              <div className="details-permission-list">
                {permissionModules.map(
                  (group) => {
                    const enabledModules =
                      group.modules.filter(
                        (module) =>
                          selectedRole
                            .permissions[
                            module
                          ] &&
                          Object.values(
                            selectedRole
                              .permissions[
                              module
                            ]
                          ).some(Boolean)
                      );

                    if (
                      enabledModules.length === 0
                    ) {
                      return null;
                    }

                    return (
                      <div
                        className="details-permission-category"
                        key={group.category}
                      >
                        <span>
                          {group.category}
                        </span>

                        <div>
                          {enabledModules.map(
                            (module) => (
                              <small key={module}>
                                ✓ {module}
                              </small>
                            )
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="role-details-footer">
              <button
                type="button"
                className="roles-cancel-btn"
                onClick={closeDetails}
              >
                Close
              </button>

              <button
                type="button"
                className="roles-save-btn"
                onClick={() => {
                  closeDetails();
                  openEditModal(selectedRole);
                }}
              >
                Edit Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;
