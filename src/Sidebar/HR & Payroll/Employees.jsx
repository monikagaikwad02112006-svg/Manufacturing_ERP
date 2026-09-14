import React, { useMemo, useState } from "react";
import "./Employees.css";

const departments = [
  "Production",
  "Quality",
  "Sales",
  "Purchase",
  "Inventory",
  "HR",
  "Finance",
  "Maintenance",
  "IT",
];

const designations = [
  "Manager",
  "Assistant Manager",
  "Engineer",
  "Supervisor",
  "Executive",
  "Operator",
  "Accountant",
  "HR Executive",
  "Technician",
];

const initialEmployees = [
  {
    id: 1,
    employeeId: "EMP-001",
    name: "Rahul Patil",
    email: "rahul.patil@company.com",
    phone: "9876543210",
    department: "Production",
    designation: "Production Manager",
    joiningDate: "2024-01-15",
    salary: 65000,
    status: "Active",
    gender: "Male",
    address: "Pune, Maharashtra",
    emergencyContact: "9876501234",
  },
  {
    id: 2,
    employeeId: "EMP-002",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    phone: "9823456712",
    department: "Quality",
    designation: "Quality Engineer",
    joiningDate: "2024-03-10",
    salary: 52000,
    status: "Active",
    gender: "Female",
    address: "Nashik, Maharashtra",
    emergencyContact: "9823401122",
  },
  {
    id: 3,
    employeeId: "EMP-003",
    name: "Amit Kulkarni",
    email: "amit.kulkarni@company.com",
    phone: "9765432189",
    department: "Inventory",
    designation: "Inventory Supervisor",
    joiningDate: "2023-08-21",
    salary: 46000,
    status: "Active",
    gender: "Male",
    address: "Aurangabad, Maharashtra",
    emergencyContact: "9765409876",
  },
  {
    id: 4,
    employeeId: "EMP-004",
    name: "Sneha Joshi",
    email: "sneha.joshi@company.com",
    phone: "9898765432",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "2023-11-05",
    salary: 48000,
    status: "Active",
    gender: "Female",
    address: "Mumbai, Maharashtra",
    emergencyContact: "9898701234",
  },
  {
    id: 5,
    employeeId: "EMP-005",
    name: "Vikas More",
    email: "vikas.more@company.com",
    phone: "9812345678",
    department: "Maintenance",
    designation: "Technician",
    joiningDate: "2022-06-18",
    salary: 39000,
    status: "Inactive",
    gender: "Male",
    address: "Ahmednagar, Maharashtra",
    emergencyContact: "9812309876",
  },
  {
    id: 6,
    employeeId: "EMP-006",
    name: "Neha Deshmukh",
    email: "neha.deshmukh@company.com",
    phone: "9900123456",
    department: "HR",
    designation: "HR Executive",
    joiningDate: "2025-01-08",
    salary: 45000,
    status: "Active",
    gender: "Female",
    address: "Pune, Maharashtra",
    emergencyContact: "9900105678",
  },
];

const emptyForm = {
  employeeId: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
  status: "Active",
  gender: "",
  address: "",
  emergencyContact: "",
};

function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);

  const generateEmployeeId = () => {
    const nextNumber = employees.length + 1;

    return `EMP-${String(nextNumber).padStart(3, "0")}`;
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        employee.employeeId.toLowerCase().includes(searchText) ||
        employee.name.toLowerCase().includes(searchText) ||
        employee.email.toLowerCase().includes(searchText) ||
        employee.phone.includes(searchText);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesDesignation =
        designationFilter === "All" ||
        employee.designation === designationFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesDesignation &&
        matchesStatus
      );
    });
  }, [
    employees,
    search,
    departmentFilter,
    designationFilter,
    statusFilter,
  ]);

  const summary = useMemo(() => {
    const active = employees.filter(
      (employee) => employee.status === "Active"
    ).length;

    const inactive = employees.filter(
      (employee) => employee.status === "Inactive"
    ).length;

    const female = employees.filter(
      (employee) => employee.gender === "Female"
    ).length;

    const male = employees.filter(
      (employee) => employee.gender === "Male"
    ).length;

    const totalSalary = employees.reduce(
      (sum, employee) => sum + Number(employee.salary || 0),
      0
    );

    return {
      total: employees.length,
      active,
      inactive,
      female,
      male,
      totalSalary,
    };
  }, [employees]);

  const openAddModal = () => {
    setEditingEmployee(null);

    setForm({
      ...emptyForm,
      employeeId: generateEmployeeId(),
    });

    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);

    setForm({
      ...employee,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      alert("Please enter employee name.");
      return false;
    }

    if (!form.email.trim()) {
      alert("Please enter email address.");
      return false;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    if (!form.department) {
      alert("Please select department.");
      return false;
    }

    if (!form.designation) {
      alert("Please select designation.");
      return false;
    }

    if (!form.joiningDate) {
      alert("Please select joining date.");
      return false;
    }

    if (Number(form.salary) < 0 || form.salary === "") {
      alert("Please enter a valid salary.");
      return false;
    }

    return true;
  };

  const saveEmployee = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const employeeData = {
      ...form,
      salary: Number(form.salary),
    };

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                ...employeeData,
              }
            : employee
        )
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...employeeData,
        },
      ]);
    }

    closeModal();
  };

  const deleteEmployee = (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.filter((item) => item.id !== employee.id)
    );
  };

  const toggleStatus = (employee) => {
    const newStatus =
      employee.status === "Active" ? "Inactive" : "Active";

    const confirmed = window.confirm(
      `Change ${employee.name}'s status to ${newStatus}?`
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.map((item) =>
        item.id === employee.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setSelectedEmployee(null);
    setShowViewModal(false);
  };

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter("All");
    setDesignationFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="employees-page">
      {/* Header */}
      <div className="employees-header">
        <div>
          <span className="employees-eyebrow">
            HR & PAYROLL
          </span>

          <h1>Employees</h1>

          <p>
            Manage employee profiles, departments, roles and
            employment status.
          </p>
        </div>

        <button
          className="employees-primary-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          Add Employee
        </button>
      </div>

      {/* Summary Cards */}
      <div className="employees-summary">
        <div className="employees-summary-card">
          <div className="employees-icon blue">◉</div>

          <div>
            <span>Total Employees</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="employees-summary-card">
          <div className="employees-icon green">✓</div>

          <div>
            <span>Active</span>
            <strong>{summary.active}</strong>
          </div>
        </div>

        <div className="employees-summary-card">
          <div className="employees-icon orange">◷</div>

          <div>
            <span>Inactive</span>
            <strong>{summary.inactive}</strong>
          </div>
        </div>

        <div className="employees-summary-card">
          <div className="employees-icon purple">♀</div>

          <div>
            <span>Female</span>
            <strong>{summary.female}</strong>
          </div>
        </div>

        <div className="employees-summary-card">
          <div className="employees-icon teal">♂</div>

          <div>
            <span>Male</span>
            <strong>{summary.male}</strong>
          </div>
        </div>

        <div className="employees-summary-card">
          <div className="employees-icon salary">₹</div>

          <div>
            <span>Monthly Payroll</span>
            <strong>
              {formatCurrency(summary.totalSalary)}
            </strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="employees-filter-box">
        <div className="employees-filter-header">
          <div>
            <h3>Filter Employees</h3>

            <span>
              Showing {filteredEmployees.length} of{" "}
              {employees.length} employees
            </span>
          </div>

          <button
            className="employees-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div className="employees-filter-grid">
          <div className="employees-filter-group search-filter">
            <label>Search</label>

            <input
              type="text"
              value={search}
              placeholder="Employee ID, name, email or phone..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="employees-filter-group">
            <label>Department</label>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
            >
              <option value="All">All Departments</option>

              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="employees-filter-group">
            <label>Designation</label>

            <select
              value={designationFilter}
              onChange={(event) =>
                setDesignationFilter(event.target.value)
              }
            >
              <option value="All">All Designations</option>

              {designations.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>

          <div className="employees-filter-group">
            <label>Status</label>

            <select
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
      </div>

      {/* Employee Table */}
      <div className="employees-table-card">
        <div className="employees-table-header">
          <div>
            <h2>Employee Directory</h2>

            <p>
              View and manage your organization's workforce.
            </p>
          </div>

          <div className="employees-record-count">
            {filteredEmployees.length} Records
          </div>
        </div>

        <div className="employees-table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-profile">
                        <div className="employee-avatar">
                          {employee.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{employee.name}</strong>

                          <small>
                            {employee.employeeId}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="employee-contact">
                        <span>{employee.email}</span>
                        <small>{employee.phone}</small>
                      </div>
                    </td>

                    <td>
                      <span className="employee-department">
                        {employee.department}
                      </span>
                    </td>

                    <td>
                      <span className="employee-designation">
                        {employee.designation}
                      </span>
                    </td>

                    <td>{employee.joiningDate}</td>

                    <td>
                      <strong className="employee-salary">
                        {formatCurrency(employee.salary)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`employee-status ${
                          employee.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td>
                      <div className="employees-actions">
                        <button
                          className="employee-action view"
                          onClick={() =>
                            openViewModal(employee)
                          }
                        >
                          View
                        </button>

                        <button
                          className="employee-action edit"
                          onClick={() =>
                            openEditModal(employee)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="employee-action status"
                          onClick={() =>
                            toggleStatus(employee)
                          }
                        >
                          {employee.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        <button
                          className="employee-action delete"
                          onClick={() =>
                            deleteEmployee(employee)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="employees-empty">
                      <div className="employees-empty-icon">
                        ◉
                      </div>

                      <h3>No employees found</h3>

                      <p>
                        Try changing your filters or add a new
                        employee.
                      </p>

                      <button
                        className="employees-primary-btn"
                        onClick={openAddModal}
                      >
                        ＋ Add Employee
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
        <div className="employees-modal-overlay">
          <div className="employees-modal">
            <div className="employees-modal-header">
              <div>
                <span>HR & PAYROLL</span>

                <h2>
                  {editingEmployee
                    ? "Edit Employee"
                    : "Add Employee"}
                </h2>

                <p>
                  Enter employee personal and employment
                  information.
                </p>
              </div>

              <button
                className="employees-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form
              className="employees-form-body"
              onSubmit={saveEmployee}
            >
              {/* Basic Information */}
              <div className="employees-section-title">
                <span>01</span>
                Basic Information
              </div>

              <div className="employees-form-grid">
                <div className="employees-form-group">
                  <label>Employee ID</label>

                  <input
                    type="text"
                    value={form.employeeId}
                    readOnly
                  />
                </div>

                <div className="employees-form-group">
                  <label>
                    Full Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    placeholder="Enter full name"
                    onChange={(event) =>
                      handleChange(
                        "name",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="employees-form-group">
                  <label>
                    Email <span>*</span>
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    placeholder="employee@company.com"
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="employees-form-group">
                  <label>
                    Phone <span>*</span>
                  </label>

                  <input
                    type="tel"
                    value={form.phone}
                    placeholder="10 digit mobile number"
                    maxLength="10"
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    required
                  />
                </div>

                <div className="employees-form-group">
                  <label>Gender</label>

                  <select
                    value={form.gender}
                    onChange={(event) =>
                      handleChange(
                        "gender",
                        event.target.value
                      )
                    }
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="employees-form-group">
                  <label>
                    Joining Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    value={form.joiningDate}
                    onChange={(event) =>
                      handleChange(
                        "joiningDate",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              {/* Employment Information */}
              <div className="employees-section-title">
                <span>02</span>
                Employment Information
              </div>

              <div className="employees-form-grid">
                <div className="employees-form-group">
                  <label>
                    Department <span>*</span>
                  </label>

                  <select
                    value={form.department}
                    onChange={(event) =>
                      handleChange(
                        "department",
                        event.target.value
                      )
                    }
                    required
                  >
                    <option value="">
                      Select department
                    </option>

                    {departments.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="employees-form-group">
                  <label>
                    Designation <span>*</span>
                  </label>

                  <select
                    value={form.designation}
                    onChange={(event) =>
                      handleChange(
                        "designation",
                        event.target.value
                      )
                    }
                    required
                  >
                    <option value="">
                      Select designation
                    </option>

                    {designations.map((designation) => (
                      <option
                        key={designation}
                        value={designation}
                      >
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="employees-form-group">
                  <label>
                    Monthly Salary <span>*</span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.salary}
                    placeholder="Enter monthly salary"
                    onChange={(event) =>
                      handleChange(
                        "salary",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="employees-form-group">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value
                      )
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="employees-section-title">
                <span>03</span>
                Contact Information
              </div>

              <div className="employees-form-grid">
                <div className="employees-form-group full-width">
                  <label>Address</label>

                  <textarea
                    rows="3"
                    value={form.address}
                    placeholder="Enter residential address"
                    onChange={(event) =>
                      handleChange(
                        "address",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="employees-form-group">
                  <label>Emergency Contact</label>

                  <input
                    type="tel"
                    value={form.emergencyContact}
                    maxLength="10"
                    placeholder="Emergency contact number"
                    onChange={(event) =>
                      handleChange(
                        "emergencyContact",
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                  />
                </div>
              </div>

              <div className="employees-modal-footer">
                <button
                  type="button"
                  className="employees-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="employees-save-btn"
                >
                  {editingEmployee
                    ? "Update Employee"
                    : "Save Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <div className="employees-modal-overlay">
          <div className="employees-modal employees-view-modal">
            <div className="employees-modal-header">
              <div>
                <span>EMPLOYEE PROFILE</span>

                <h2>{selectedEmployee.name}</h2>

                <p>
                  Employee ID: {selectedEmployee.employeeId}
                </p>
              </div>

              <button
                className="employees-close-btn"
                onClick={closeViewModal}
              >
                ×
              </button>
            </div>

            <div className="employees-view-body">
              <div className="employees-profile-banner">
                <div className="employees-large-avatar">
                  {selectedEmployee.name.charAt(0)}
                </div>

                <div>
                  <h3>{selectedEmployee.name}</h3>

                  <p>
                    {selectedEmployee.designation} •{" "}
                    {selectedEmployee.department}
                  </p>

                  <span
                    className={`employee-status ${
                      selectedEmployee.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>

              <div className="employees-section-title">
                <span>01</span>
                Employee Details
              </div>

              <div className="employees-detail-grid">
                <div>
                  <span>Employee ID</span>
                  <strong>
                    {selectedEmployee.employeeId}
                  </strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>
                    {selectedEmployee.department}
                  </strong>
                </div>

                <div>
                  <span>Designation</span>
                  <strong>
                    {selectedEmployee.designation}
                  </strong>
                </div>

                <div>
                  <span>Joining Date</span>
                  <strong>
                    {selectedEmployee.joiningDate}
                  </strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>
                    {selectedEmployee.gender || "-"}
                  </strong>
                </div>

                <div>
                  <span>Monthly Salary</span>
                  <strong>
                    {formatCurrency(
                      selectedEmployee.salary
                    )}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedEmployee.email}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedEmployee.phone}
                  </strong>
                </div>
              </div>

              <div className="employees-address-grid">
                <div className="employees-address-box">
                  <h3>Residential Address</h3>
                  <p>
                    {selectedEmployee.address || "-"}
                  </p>
                </div>

                <div className="employees-address-box">
                  <h3>Emergency Contact</h3>
                  <p>
                    {selectedEmployee.emergencyContact ||
                      "-"}
                  </p>
                </div>
              </div>

              <div className="employees-view-footer">
                <button
                  className="employees-secondary-btn"
                  onClick={closeViewModal}
                >
                  Close
                </button>

                <button
                  className="employees-save-btn"
                  onClick={() => {
                    closeViewModal();
                    openEditModal(selectedEmployee);
                  }}
                >
                  Edit Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;