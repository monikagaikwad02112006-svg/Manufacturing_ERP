import React, { useMemo, useState } from "react";
import "./Payroll.css";

const initialPayroll = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Aarav Sharma",
    department: "Production",
    designation: "Production Manager",
    month: "September 2026",
    basicSalary: 52000,
    hra: 10400,
    allowance: 6500,
    bonus: 3000,
    pf: 6240,
    tax: 5200,
    otherDeduction: 1000,
    status: "Paid",
    paymentDate: "05 Sep 2026",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Patil",
    department: "HR",
    designation: "HR Executive",
    month: "September 2026",
    basicSalary: 38000,
    hra: 7600,
    allowance: 4500,
    bonus: 1500,
    pf: 4560,
    tax: 2800,
    otherDeduction: 500,
    status: "Paid",
    paymentDate: "05 Sep 2026",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Rahul Deshmukh",
    department: "Quality",
    designation: "Quality Engineer",
    month: "September 2026",
    basicSalary: 45000,
    hra: 9000,
    allowance: 5500,
    bonus: 2000,
    pf: 5400,
    tax: 3600,
    otherDeduction: 700,
    status: "Pending",
    paymentDate: "-",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Sneha Kulkarni",
    department: "Finance",
    designation: "Accountant",
    month: "September 2026",
    basicSalary: 41000,
    hra: 8200,
    allowance: 5000,
    bonus: 1800,
    pf: 4920,
    tax: 3100,
    otherDeduction: 600,
    status: "Paid",
    paymentDate: "05 Sep 2026",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Vikram Jadhav",
    department: "Warehouse",
    designation: "Warehouse Supervisor",
    month: "September 2026",
    basicSalary: 35000,
    hra: 7000,
    allowance: 4200,
    bonus: 1200,
    pf: 4200,
    tax: 2400,
    otherDeduction: 500,
    status: "Pending",
    paymentDate: "-",
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Neha Joshi",
    department: "Sales",
    designation: "Sales Executive",
    month: "September 2026",
    basicSalary: 39000,
    hra: 7800,
    allowance: 4800,
    bonus: 2500,
    pf: 4680,
    tax: 2900,
    otherDeduction: 400,
    status: "Paid",
    paymentDate: "05 Sep 2026",
  },
  {
    id: 7,
    employeeId: "EMP007",
    name: "Aditya More",
    department: "IT",
    designation: "Software Developer",
    month: "September 2026",
    basicSalary: 58000,
    hra: 11600,
    allowance: 7000,
    bonus: 3500,
    pf: 6960,
    tax: 6500,
    otherDeduction: 800,
    status: "Pending",
    paymentDate: "-",
  },
  {
    id: 8,
    employeeId: "EMP008",
    name: "Kavita Pawar",
    department: "Production",
    designation: "Machine Operator",
    month: "September 2026",
    basicSalary: 30000,
    hra: 6000,
    allowance: 3500,
    bonus: 1000,
    pf: 3600,
    tax: 1800,
    otherDeduction: 300,
    status: "Paid",
    paymentDate: "05 Sep 2026",
  },
];

const emptyForm = {
  employeeId: "",
  name: "",
  department: "",
  designation: "",
  month: "September 2026",
  basicSalary: "",
  hra: "",
  allowance: "",
  bonus: "",
  pf: "",
  tax: "",
  otherDeduction: "",
  status: "Pending",
  paymentDate: "",
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

const calculateGross = (record) => {
  return (
    Number(record.basicSalary || 0) +
    Number(record.hra || 0) +
    Number(record.allowance || 0) +
    Number(record.bonus || 0)
  );
};

const calculateDeductions = (record) => {
  return (
    Number(record.pf || 0) +
    Number(record.tax || 0) +
    Number(record.otherDeduction || 0)
  );
};

const calculateNet = (record) => {
  return calculateGross(record) - calculateDeductions(record);
};

function Payroll() {
  const [payroll, setPayroll] = useState(initialPayroll);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("September 2026");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const departments = useMemo(() => {
    return [...new Set(payroll.map((item) => item.department))];
  }, [payroll]);

  const months = useMemo(() => {
    return [...new Set(payroll.map((item) => item.month))];
  }, [payroll]);

  const filteredPayroll = useMemo(() => {
    return payroll.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesMonth =
        monthFilter === "All" ||
        item.month === monthFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesMonth
      );
    });
  }, [
    payroll,
    search,
    departmentFilter,
    statusFilter,
    monthFilter,
  ]);

  const summary = useMemo(() => {
    const monthRecords = payroll.filter(
      (item) =>
        monthFilter === "All" || item.month === monthFilter
    );

    const gross = monthRecords.reduce(
      (total, item) => total + calculateGross(item),
      0
    );

    const deductions = monthRecords.reduce(
      (total, item) => total + calculateDeductions(item),
      0
    );

    const net = monthRecords.reduce(
      (total, item) => total + calculateNet(item),
      0
    );

    return {
      employees: monthRecords.length,
      gross,
      deductions,
      net,
      paid: monthRecords.filter(
        (item) => item.status === "Paid"
      ).length,
      pending: monthRecords.filter(
        (item) => item.status === "Pending"
      ).length,
    };
  }, [payroll, monthFilter]);

  const openAddModal = () => {
    setEditingRecord(null);

    setFormData({
      ...emptyForm,
      month:
        monthFilter === "All"
          ? "September 2026"
          : monthFilter,
    });

    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setFormData({
      employeeId: record.employeeId,
      name: record.name,
      department: record.department,
      designation: record.designation,
      month: record.month,
      basicSalary: record.basicSalary,
      hra: record.hra,
      allowance: record.allowance,
      bonus: record.bonus,
      pf: record.pf,
      tax: record.tax,
      otherDeduction: record.otherDeduction,
      status: record.status,
      paymentDate:
        record.paymentDate === "-"
          ? ""
          : record.paymentDate,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRecord(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.employeeId ||
      !formData.name ||
      !formData.department ||
      !formData.month ||
      !formData.basicSalary
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const recordData = {
      ...formData,

      basicSalary: Number(formData.basicSalary || 0),
      hra: Number(formData.hra || 0),
      allowance: Number(formData.allowance || 0),
      bonus: Number(formData.bonus || 0),
      pf: Number(formData.pf || 0),
      tax: Number(formData.tax || 0),
      otherDeduction: Number(
        formData.otherDeduction || 0
      ),

      paymentDate:
        formData.status === "Paid"
          ? formData.paymentDate || "11 Sep 2026"
          : "-",
    };

    if (editingRecord) {
      setPayroll((prev) =>
        prev.map((item) =>
          item.id === editingRecord.id
            ? {
                ...item,
                ...recordData,
              }
            : item
        )
      );
    } else {
      setPayroll((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...recordData,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payroll record?"
    );

    if (!confirmed) return;

    setPayroll((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const markAsPaid = (id) => {
    setPayroll((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Paid",
              paymentDate: "11 Sep 2026",
            }
          : item
      )
    );
  };

  const getStatusClass = (status) => {
    if (status === "Paid") {
      return "payroll-status paid";
    }

    return "payroll-status pending";
  };

  return (
    <div className="payroll-page">

      {/* Header */}
      <div className="payroll-header">

        <div>
          <span className="payroll-eyebrow">
            HR & PAYROLL
          </span>

          <h1>Payroll Management</h1>

          <p>
            Manage employee salaries, deductions,
            payroll processing and payment records.
          </p>
        </div>

        <button
          className="payroll-primary-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Create Payroll
        </button>

      </div>

      {/* Summary Cards */}
      <div className="payroll-summary">

        <div className="payroll-card employees-card">
          <div className="payroll-card-icon">
            👥
          </div>

          <div>
            <span>Payroll Employees</span>
            <strong>{summary.employees}</strong>
            <small>Selected period</small>
          </div>
        </div>

        <div className="payroll-card gross-card">
          <div className="payroll-card-icon">
            ₹
          </div>

          <div>
            <span>Gross Payroll</span>
            <strong>
              {formatCurrency(summary.gross)}
            </strong>
            <small>Total earnings</small>
          </div>
        </div>

        <div className="payroll-card deduction-card">
          <div className="payroll-card-icon">
            −
          </div>

          <div>
            <span>Total Deductions</span>
            <strong>
              {formatCurrency(summary.deductions)}
            </strong>
            <small>PF, tax & other</small>
          </div>
        </div>

        <div className="payroll-card net-card">
          <div className="payroll-card-icon">
            ✓
          </div>

          <div>
            <span>Net Payroll</span>
            <strong>
              {formatCurrency(summary.net)}
            </strong>
            <small>Payable amount</small>
          </div>
        </div>

        <div className="payroll-card status-card">
          <div className="payroll-payment-progress">
            <div>
              <span>Paid</span>
              <strong>{summary.paid}</strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>{summary.pending}</strong>
            </div>
          </div>

          <small className="payment-status-text">
            Payroll status
          </small>
        </div>

      </div>

      {/* Filters */}
      <div className="payroll-filter-card">

        <div className="payroll-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search employee, ID or department..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="payroll-filter-group">

          <div className="payroll-filter-field">
            <label>Payroll Month</label>

            <select
              value={monthFilter}
              onChange={(e) =>
                setMonthFilter(e.target.value)
              }
            >
              <option value="All">
                All Months
              </option>

              {months.map((month) => (
                <option
                  key={month}
                  value={month}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="payroll-filter-field">
            <label>Department</label>

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
            >
              <option value="All">
                All Departments
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

          <div className="payroll-filter-field">
            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>
            </select>
          </div>

        </div>

      </div>

      {/* Payroll Table */}
      <div className="payroll-table-card">

        <div className="payroll-table-header">

          <div>
            <h2>Employee Payroll</h2>

            <p>
              {filteredPayroll.length} payroll records
              found
            </p>
          </div>

          <div className="payroll-period-badge">
            {monthFilter === "All"
              ? "All Months"
              : monthFilter}
          </div>

        </div>

        <div className="payroll-table-wrapper">

          <table className="payroll-table">

            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>GROSS SALARY</th>
                <th>DEDUCTIONS</th>
                <th>NET SALARY</th>
                <th>STATUS</th>
                <th>PAYMENT DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {filteredPayroll.length > 0 ? (
                filteredPayroll.map((record) => {

                  const gross =
                    calculateGross(record);

                  const deductions =
                    calculateDeductions(record);

                  const net =
                    calculateNet(record);

                  return (
                    <tr key={record.id}>

                      <td>
                        <div className="payroll-employee">

                          <div className="payroll-avatar">
                            {record.name.charAt(0)}
                          </div>

                          <div>
                            <strong>
                              {record.name}
                            </strong>

                            <span>
                              {record.employeeId} •{" "}
                              {record.designation}
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="payroll-department">
                          {record.department}
                        </span>
                      </td>

                      <td>
                        <strong className="salary-gross">
                          {formatCurrency(gross)}
                        </strong>
                      </td>

                      <td>
                        <span className="salary-deduction">
                          {formatCurrency(deductions)}
                        </span>
                      </td>

                      <td>
                        <strong className="salary-net">
                          {formatCurrency(net)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            record.status
                          )}
                        >
                          <i></i>
                          {record.status}
                        </span>
                      </td>

                      <td>
                        <span className="payment-date">
                          {record.paymentDate}
                        </span>
                      </td>

                      <td>

                        <div className="payroll-actions">

                          <button
                            className="action-view"
                            title="View Payroll"
                            onClick={() => {
                              setViewingRecord(record);
                              setShowViewModal(true);
                            }}
                          >
                            👁
                          </button>

                          <button
                            className="action-edit"
                            title="Edit Payroll"
                            onClick={() =>
                              openEditModal(record)
                            }
                          >
                            ✎
                          </button>

                          {record.status === "Pending" && (
                            <button
                              className="action-paid"
                              title="Mark as Paid"
                              onClick={() =>
                                markAsPaid(record.id)
                              }
                            >
                              ✓
                            </button>
                          )}

                          <button
                            className="action-delete"
                            title="Delete Payroll"
                            onClick={() =>
                              handleDelete(record.id)
                            }
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="payroll-empty"
                  >
                    <div>
                      <span>₹</span>

                      <h3>
                        No payroll records found
                      </h3>

                      <p>
                        Try changing your filters or
                        create a new payroll record.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="payroll-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="payroll-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="payroll-modal-header">

              <div>
                <span className="payroll-modal-label">
                  PAYROLL
                </span>

                <h2>
                  {editingRecord
                    ? "Edit Payroll"
                    : "Create Payroll"}
                </h2>

                <p>
                  Enter employee salary and deduction
                  details.
                </p>
              </div>

              <button
                className="payroll-close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="payroll-form"
              onSubmit={handleSubmit}
            >

              <div className="payroll-section-title">
                Employee Information
              </div>

              <div className="payroll-form-grid">

                <div className="payroll-form-group">
                  <label>
                    Employee ID <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="EMP001"
                    required
                  />
                </div>

                <div className="payroll-form-group">
                  <label>
                    Employee Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Employee name"
                    required
                  />
                </div>

                <div className="payroll-form-group">
                  <label>
                    Department <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Production"
                    required
                  />
                </div>

                <div className="payroll-form-group">
                  <label>Designation</label>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                  />
                </div>

                <div className="payroll-form-group">
                  <label>
                    Payroll Month <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    placeholder="September 2026"
                    required
                  />
                </div>

                <div className="payroll-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Paid">
                      Paid
                    </option>
                  </select>
                </div>

              </div>

              <div className="payroll-section-title">
                Earnings
              </div>

              <div className="payroll-form-grid">

                <div className="payroll-form-group">
                  <label>
                    Basic Salary <span>*</span>
                  </label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="basicSalary"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      placeholder="50000"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="payroll-form-group">
                  <label>HRA</label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="hra"
                      value={formData.hra}
                      onChange={handleChange}
                      placeholder="10000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="payroll-form-group">
                  <label>Allowances</label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="allowance"
                      value={formData.allowance}
                      onChange={handleChange}
                      placeholder="5000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="payroll-form-group">
                  <label>Bonus</label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="bonus"
                      value={formData.bonus}
                      onChange={handleChange}
                      placeholder="2000"
                      min="0"
                    />
                  </div>
                </div>

              </div>

              <div className="payroll-calculation-box">

                <div>
                  <span>Gross Salary</span>

                  <strong>
                    {formatCurrency(
                      calculateGross(formData)
                    )}
                  </strong>
                </div>

              </div>

              <div className="payroll-section-title">
                Deductions
              </div>

              <div className="payroll-form-grid">

                <div className="payroll-form-group">
                  <label>PF</label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="pf"
                      value={formData.pf}
                      onChange={handleChange}
                      placeholder="5000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="payroll-form-group">
                  <label>Income Tax</label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="tax"
                      value={formData.tax}
                      onChange={handleChange}
                      placeholder="3000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="payroll-form-group">
                  <label>Other Deductions</label>

                  <div className="salary-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="otherDeduction"
                      value={formData.otherDeduction}
                      onChange={handleChange}
                      placeholder="500"
                      min="0"
                    />
                  </div>
                </div>

                <div className="payroll-form-group">
                  <label>Payment Date</label>

                  <input
                    type="text"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    placeholder="11 Sep 2026"
                  />
                </div>

              </div>

              <div className="payroll-net-box">

                <div>
                  <span>Total Deductions</span>

                  <strong>
                    {formatCurrency(
                      calculateDeductions(formData)
                    )}
                  </strong>
                </div>

                <div>
                  <span>Net Salary</span>

                  <strong>
                    {formatCurrency(
                      calculateNet(formData)
                    )}
                  </strong>
                </div>

              </div>

              <div className="payroll-form-footer">

                <button
                  type="button"
                  className="payroll-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="payroll-save-btn"
                >
                  {editingRecord
                    ? "Update Payroll"
                    : "Save Payroll"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* View Payroll Modal */}
      {showViewModal && viewingRecord && (
        <div
          className="payroll-modal-overlay"
          onClick={() =>
            setShowViewModal(false)
          }
        >
          <div
            className="payroll-view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="payroll-modal-header">

              <div>
                <span className="payroll-modal-label">
                  PAYROLL DETAILS
                </span>

                <h2>
                  {viewingRecord.name}
                </h2>

                <p>
                  {viewingRecord.employeeId} •{" "}
                  {viewingRecord.designation}
                </p>
              </div>

              <button
                className="payroll-close-btn"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                ×
              </button>

            </div>

            <div className="payroll-profile">

              <div className="payroll-large-avatar">
                {viewingRecord.name.charAt(0)}
              </div>

              <div>
                <h3>
                  {viewingRecord.name}
                </h3>

                <span>
                  {viewingRecord.department}
                </span>
              </div>

              <span
                className={getStatusClass(
                  viewingRecord.status
                )}
              >
                <i></i>
                {viewingRecord.status}
              </span>

            </div>

            <div className="payroll-detail-section">

              <div className="payroll-detail-heading">
                Salary Information
              </div>

              <div className="payroll-detail-grid">

                <div>
                  <span>Payroll Month</span>
                  <strong>
                    {viewingRecord.month}
                  </strong>
                </div>

                <div>
                  <span>Employee ID</span>
                  <strong>
                    {viewingRecord.employeeId}
                  </strong>
                </div>

                <div>
                  <span>Basic Salary</span>
                  <strong>
                    {formatCurrency(
                      viewingRecord.basicSalary
                    )}
                  </strong>
                </div>

                <div>
                  <span>HRA</span>
                  <strong>
                    {formatCurrency(
                      viewingRecord.hra
                    )}
                  </strong>
                </div>

                <div>
                  <span>Allowances</span>
                  <strong>
                    {formatCurrency(
                      viewingRecord.allowance
                    )}
                  </strong>
                </div>

                <div>
                  <span>Bonus</span>
                  <strong>
                    {formatCurrency(
                      viewingRecord.bonus
                    )}
                  </strong>
                </div>

              </div>

            </div>

            <div className="payroll-breakdown">

              <div className="breakdown-row">
                <span>Gross Salary</span>

                <strong>
                  {formatCurrency(
                    calculateGross(viewingRecord)
                  )}
                </strong>
              </div>

              <div className="breakdown-row">
                <span>PF</span>

                <strong>
                  - {formatCurrency(
                    viewingRecord.pf
                  )}
                </strong>
              </div>

              <div className="breakdown-row">
                <span>Income Tax</span>

                <strong>
                  - {formatCurrency(
                    viewingRecord.tax
                  )}
                </strong>
              </div>

              <div className="breakdown-row">
                <span>Other Deductions</span>

                <strong>
                  - {formatCurrency(
                    viewingRecord.otherDeduction
                  )}
                </strong>
              </div>

              <div className="breakdown-total">
                <span>Net Salary</span>

                <strong>
                  {formatCurrency(
                    calculateNet(viewingRecord)
                  )}
                </strong>
              </div>

            </div>

            <div className="payroll-payment-info">

              <div>
                <span>Payment Status</span>

                <strong>
                  {viewingRecord.status}
                </strong>
              </div>

              <div>
                <span>Payment Date</span>

                <strong>
                  {viewingRecord.paymentDate}
                </strong>
              </div>

            </div>

            <div className="payroll-view-footer">

              <button
                className="payroll-cancel-btn"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                Close
              </button>

              {viewingRecord.status ===
                "Pending" && (
                <button
                  className="payroll-paid-btn"
                  onClick={() => {
                    markAsPaid(
                      viewingRecord.id
                    );
                    setShowViewModal(false);
                  }}
                >
                  ✓ Mark as Paid
                </button>
              )}

              <button
                className="payroll-save-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(viewingRecord);
                }}
              >
                Edit Payroll
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Payroll;