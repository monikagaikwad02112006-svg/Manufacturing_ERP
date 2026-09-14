import { useMemo, useState } from "react";
import "./Employees.css";

const initialEmployees = [
  {
    id: 1,
    code: "EMP-001",
    name: "Rahul Patil",
    mobile: "9876543210",
    email: "rahul@company.com",
    department: "Production",
    designation: "Production Supervisor",
    joiningDate: "2024-01-15",
    employeeType: "Permanent",
    wageType: "Monthly",
    salary: "45000",
    shift: "General",
    address: "Nashik, Maharashtra",
    status: "Active",
  },
  {
    id: 2,
    code: "EMP-002",
    name: "Sneha Sharma",
    mobile: "9988776655",
    email: "sneha@company.com",
    department: "Quality",
    designation: "Quality Inspector",
    joiningDate: "2024-03-10",
    employeeType: "Permanent",
    wageType: "Monthly",
    salary: "35000",
    shift: "Morning",
    address: "Aurangabad, Maharashtra",
    status: "Active",
  },
  {
    id: 3,
    code: "EMP-003",
    name: "Amit Jadhav",
    mobile: "9123456789",
    email: "amit@company.com",
    department: "Maintenance",
    designation: "Machine Operator",
    joiningDate: "2023-08-20",
    employeeType: "Contract",
    wageType: "Daily",
    salary: "900",
    shift: "Night",
    address: "Pune, Maharashtra",
    status: "Inactive",
  },
];

const emptyForm = {
  code: "",
  name: "",
  mobile: "",
  email: "",
  department: "",
  designation: "",
  joiningDate: "",
  employeeType: "Permanent",
  wageType: "Monthly",
  salary: "",
  shift: "General",
  address: "",
  status: "Active",
};

function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const summary = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(
      (employee) => employee.status === "Active"
    ).length;
    const inactive = employees.filter(
      (employee) => employee.status === "Inactive"
    ).length;

    const departments = new Set(
      employees.map((employee) => employee.department)
    ).size;

    return {
      total,
      active,
      inactive,
      departments,
    };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        employee.code.toLowerCase().includes(searchText) ||
        employee.name.toLowerCase().includes(searchText) ||
        employee.mobile.includes(searchText) ||
        employee.designation.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || employee.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [employees, search, statusFilter, departmentFilter]);

  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  const openAddModal = () => {
    setEditingEmployee(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setForm(employee);
    setErrors({});
    setShowModal(true);
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
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
      newErrors.code = "Employee code is required";
    }

    if (!form.name.trim()) {
      newErrors.name = "Employee name is required";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.department) {
      newErrors.department = "Department is required";
    }

    if (!form.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!form.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    if (!form.salary) {
      newErrors.salary = "Salary / wage is required";
    } else if (Number(form.salary) < 0) {
      newErrors.salary = "Amount cannot be negative";
    }

    const duplicateCode = employees.some(
      (employee) =>
        employee.code.toLowerCase() === form.code.trim().toLowerCase() &&
        employee.id !== editingEmployee?.id
    );

    if (duplicateCode) {
      newErrors.code = "Employee code already exists";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingEmployee) {
      setEmployees((previous) =>
        previous.map((employee) =>
          employee.id === editingEmployee.id
            ? { ...form, id: editingEmployee.id }
            : employee
        )
      );
    } else {
      const newEmployee = {
        ...form,
        id: Date.now(),
      };

      setEmployees((previous) => [...previous, newEmployee]);
    }

    closeModal();
  };

  const handleDelete = (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmed) {
      return;
    }

    setEmployees((previous) =>
      previous.filter((item) => item.id !== employee.id)
    );
  };

  const toggleStatus = (employee) => {
    const newStatus = employee.status === "Active" ? "Inactive" : "Active";

    setEmployees((previous) =>
      previous.map((item) =>
        item.id === employee.id
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  return (
    <div className="employees-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage employees, staff and workforce information</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          + Add Employee
        </button>
      </div>

      {/* Summary */}
      <div className="employee-summary">
        <div className="summary-card">
          <div className="summary-card-icon">👥</div>
          <div>
            <span>Total Employees</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon success-icon">✓</div>
          <div>
            <span>Active Employees</span>
            <strong>{summary.active}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon warning-icon">!</div>
          <div>
            <span>Inactive Employees</span>
            <strong>{summary.inactive}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-icon department-icon">🏢</div>
          <div>
            <span>Departments</span>
            <strong>{summary.departments}</strong>
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
              placeholder="Search employee..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
            >
              <option value="All">All Departments</option>

              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
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
                <th>Employee</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Type</th>
                <th>Salary / Wage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-info">
                        <div className="employee-avatar">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="contact-info">
                        <span>{employee.mobile}</span>
                        <small>{employee.email || "No email"}</small>
                      </div>
                    </td>

                    <td>{employee.department}</td>

                    <td>{employee.designation}</td>

                    <td>{employee.joiningDate}</td>

                    <td>
                      <span className="type-badge">
                        {employee.employeeType}
                      </span>
                    </td>

                    <td>
                      <div className="salary-info">
                        <strong>₹ {Number(employee.salary).toLocaleString()}</strong>
                        <span>{employee.wageType}</span>
                      </div>
                    </td>

                    <td>
                      <button
                        className={`status-badge ${
                          employee.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                        onClick={() => toggleStatus(employee)}
                      >
                        <span className="status-dot"></span>
                        {employee.status}
                      </button>
                    </td>

                    <td>
                      <div className="action-group">
                        <button
                          className="action-button view-action"
                          title="View"
                          onClick={() => openViewModal(employee)}
                        >
                          👁
                        </button>

                        <button
                          className="action-button edit-action"
                          title="Edit"
                          onClick={() => openEditModal(employee)}
                        >
                          ✎
                        </button>

                        <button
                          className="action-button delete-action"
                          title="Delete"
                          onClick={() => handleDelete(employee)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="empty-state">
                      <div className="empty-icon">👤</div>
                      <h3>No employees found</h3>
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
          <div className="employee-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingEmployee ? "Edit Employee" : "Add Employee"}
                </h2>

                <p>
                  {editingEmployee
                    ? "Update employee information"
                    : "Enter employee details"}
                </p>
              </div>

              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form className="employee-form" onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">01</span>
                  <div>
                    <h3>Basic Information</h3>
                    <p>Employee identification and contact details</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Employee Code <span>*</span>
                    </label>

                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      placeholder="EMP-004"
                    />

                    {errors.code && (
                      <small className="error-text">{errors.code}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Full Name <span>*</span>
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter employee name"
                    />

                    {errors.name && (
                      <small className="error-text">{errors.name}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Mobile Number <span>*</span>
                    </label>

                    <input
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="9876543210"
                      maxLength="10"
                    />

                    {errors.mobile && (
                      <small className="error-text">{errors.mobile}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="employee@company.com"
                    />

                    {errors.email && (
                      <small className="error-text">{errors.email}</small>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">02</span>
                  <div>
                    <h3>Job Information</h3>
                    <p>Department, designation and employment details</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Department <span>*</span>
                    </label>

                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      <option value="Production">Production</option>
                      <option value="Quality">Quality</option>
                      <option value="Purchase">Purchase</option>
                      <option value="Sales">Sales</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="HR">HR</option>
                      <option value="Stores">Stores</option>
                      <option value="Finance">Finance</option>
                    </select>

                    {errors.department && (
                      <small className="error-text">
                        {errors.department}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Designation <span>*</span>
                    </label>

                    <input
                      name="designation"
                      value={form.designation}
                      onChange={handleChange}
                      placeholder="e.g. Machine Operator"
                    />

                    {errors.designation && (
                      <small className="error-text">
                        {errors.designation}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Joining Date <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="joiningDate"
                      value={form.joiningDate}
                      onChange={handleChange}
                    />

                    {errors.joiningDate && (
                      <small className="error-text">
                        {errors.joiningDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Employee Type</label>

                    <select
                      name="employeeType"
                      value={form.employeeType}
                      onChange={handleChange}
                    >
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">03</span>
                  <div>
                    <h3>Salary & Work Details</h3>
                    <p>Wage information and shift assignment</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Salary / Wage Type</label>

                    <select
                      name="wageType"
                      value={form.wageType}
                      onChange={handleChange}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Daily">Daily</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Salary / Wage <span>*</span>
                    </label>

                    <input
                      type="number"
                      name="salary"
                      value={form.salary}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      min="0"
                    />

                    {errors.salary && (
                      <small className="error-text">{errors.salary}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Shift</label>

                    <select
                      name="shift"
                      value={form.shift}
                      onChange={handleChange}
                    >
                      <option value="General">General</option>
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
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

              {/* Address */}
              <div className="form-section">
                <div className="section-heading">
                  <span className="section-number">04</span>
                  <div>
                    <h3>Address</h3>
                    <p>Employee residential address</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Address</label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter complete address"
                      rows="3"
                    ></textarea>
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
                  {editingEmployee ? "Update Employee" : "Save Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="view-modal">
            <div className="modal-header">
              <div>
                <h2>Employee Details</h2>
                <p>{selectedEmployee.code}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="employee-profile">
              <div className="large-avatar">
                {selectedEmployee.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{selectedEmployee.name}</h3>
                <p>{selectedEmployee.designation}</p>

                <span
                  className={`status-badge ${
                    selectedEmployee.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  <span className="status-dot"></span>
                  {selectedEmployee.status}
                </span>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span>Mobile</span>
                <strong>{selectedEmployee.mobile}</strong>
              </div>

              <div className="detail-item">
                <span>Email</span>
                <strong>{selectedEmployee.email || "—"}</strong>
              </div>

              <div className="detail-item">
                <span>Department</span>
                <strong>{selectedEmployee.department}</strong>
              </div>

              <div className="detail-item">
                <span>Employee Type</span>
                <strong>{selectedEmployee.employeeType}</strong>
              </div>

              <div className="detail-item">
                <span>Joining Date</span>
                <strong>{selectedEmployee.joiningDate}</strong>
              </div>

              <div className="detail-item">
                <span>Shift</span>
                <strong>{selectedEmployee.shift}</strong>
              </div>

              <div className="detail-item">
                <span>Wage Type</span>
                <strong>{selectedEmployee.wageType}</strong>
              </div>

              <div className="detail-item">
                <span>Salary / Wage</span>
                <strong>
                  ₹ {Number(selectedEmployee.salary).toLocaleString()}
                </strong>
              </div>

              <div className="detail-item full-width">
                <span>Address</span>
                <strong>{selectedEmployee.address || "—"}</strong>
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
                  openEditModal(selectedEmployee);
                }}
              >
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;