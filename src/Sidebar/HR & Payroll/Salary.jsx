import React, { useMemo, useState } from "react";
import "./Salary.css";

const initialSalaryRecords = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Aarav Sharma",
    department: "Production",
    designation: "Production Manager",
    effectiveDate: "01 Apr 2026",
    basic: 52000,
    hra: 10400,
    conveyance: 3000,
    medical: 2000,
    specialAllowance: 5000,
    bonus: 3000,
    pf: 6240,
    professionalTax: 200,
    insurance: 1000,
    otherDeduction: 500,
    status: "Active",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Priya Patil",
    department: "HR",
    designation: "HR Executive",
    effectiveDate: "01 Apr 2026",
    basic: 38000,
    hra: 7600,
    conveyance: 2500,
    medical: 1500,
    specialAllowance: 4000,
    bonus: 1500,
    pf: 4560,
    professionalTax: 200,
    insurance: 700,
    otherDeduction: 300,
    status: "Active",
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Rahul Deshmukh",
    department: "Quality",
    designation: "Quality Engineer",
    effectiveDate: "01 May 2026",
    basic: 45000,
    hra: 9000,
    conveyance: 2800,
    medical: 1800,
    specialAllowance: 4500,
    bonus: 2000,
    pf: 5400,
    professionalTax: 200,
    insurance: 800,
    otherDeduction: 400,
    status: "Active",
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "Sneha Kulkarni",
    department: "Finance",
    designation: "Accountant",
    effectiveDate: "01 Apr 2026",
    basic: 41000,
    hra: 8200,
    conveyance: 2500,
    medical: 1500,
    specialAllowance: 4200,
    bonus: 1800,
    pf: 4920,
    professionalTax: 200,
    insurance: 700,
    otherDeduction: 300,
    status: "Active",
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "Vikram Jadhav",
    department: "Warehouse",
    designation: "Warehouse Supervisor",
    effectiveDate: "01 Jun 2026",
    basic: 35000,
    hra: 7000,
    conveyance: 2200,
    medical: 1200,
    specialAllowance: 3500,
    bonus: 1200,
    pf: 4200,
    professionalTax: 200,
    insurance: 600,
    otherDeduction: 300,
    status: "Active",
  },
  {
    id: 6,
    employeeId: "EMP006",
    employeeName: "Neha Joshi",
    department: "Sales",
    designation: "Sales Executive",
    effectiveDate: "01 Apr 2026",
    basic: 39000,
    hra: 7800,
    conveyance: 2500,
    medical: 1500,
    specialAllowance: 4300,
    bonus: 2500,
    pf: 4680,
    professionalTax: 200,
    insurance: 700,
    otherDeduction: 400,
    status: "Active",
  },
  {
    id: 7,
    employeeId: "EMP007",
    employeeName: "Aditya More",
    department: "IT",
    designation: "Software Developer",
    effectiveDate: "01 Jul 2026",
    basic: 58000,
    hra: 11600,
    conveyance: 3000,
    medical: 2000,
    specialAllowance: 6000,
    bonus: 3500,
    pf: 6960,
    professionalTax: 200,
    insurance: 900,
    otherDeduction: 500,
    status: "Active",
  },
];

const emptyForm = {
  employeeId: "",
  employeeName: "",
  department: "",
  designation: "",
  effectiveDate: "",
  basic: "",
  hra: "",
  conveyance: "",
  medical: "",
  specialAllowance: "",
  bonus: "",
  pf: "",
  professionalTax: "",
  insurance: "",
  otherDeduction: "",
  status: "Active",
};

const numberValue = (value) => Number(value || 0);

const calculateEarnings = (record) => {
  return (
    numberValue(record.basic) +
    numberValue(record.hra) +
    numberValue(record.conveyance) +
    numberValue(record.medical) +
    numberValue(record.specialAllowance) +
    numberValue(record.bonus)
  );
};

const calculateDeductions = (record) => {
  return (
    numberValue(record.pf) +
    numberValue(record.professionalTax) +
    numberValue(record.insurance) +
    numberValue(record.otherDeduction)
  );
};

const calculateNetSalary = (record) => {
  return calculateEarnings(record) - calculateDeductions(record);
};

const calculateAnnualCTC = (record) => {
  return calculateEarnings(record) * 12;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

function Salary() {
  const [salaryRecords, setSalaryRecords] = useState(
    initialSalaryRecords
  );

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] =
    useState(false);
  const [showRevisionModal, setShowRevisionModal] =
    useState(false);

  const [editingRecord, setEditingRecord] =
    useState(null);

  const [viewingRecord, setViewingRecord] =
    useState(null);

  const [revisionRecord, setRevisionRecord] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  const [revisionAmount, setRevisionAmount] =
    useState("");

  const departments = useMemo(() => {
    return [
      ...new Set(
        salaryRecords.map(
          (record) => record.department
        )
      ),
    ];
  }, [salaryRecords]);

  const filteredRecords = useMemo(() => {
    return salaryRecords.filter((record) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        record.employeeName
          .toLowerCase()
          .includes(searchValue) ||
        record.employeeId
          .toLowerCase()
          .includes(searchValue) ||
        record.department
          .toLowerCase()
          .includes(searchValue) ||
        record.designation
          .toLowerCase()
          .includes(searchValue);

      const matchesDepartment =
        departmentFilter === "All" ||
        record.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    salaryRecords,
    search,
    departmentFilter,
    statusFilter,
  ]);

  const summary = useMemo(() => {
    const activeRecords = salaryRecords.filter(
      (record) => record.status === "Active"
    );

    const monthlyGross = activeRecords.reduce(
      (total, record) =>
        total + calculateEarnings(record),
      0
    );

    const monthlyNet = activeRecords.reduce(
      (total, record) =>
        total + calculateNetSalary(record),
      0
    );

    const annualCTC = activeRecords.reduce(
      (total, record) =>
        total + calculateAnnualCTC(record),
      0
    );

    const monthlyDeductions = activeRecords.reduce(
      (total, record) =>
        total + calculateDeductions(record),
      0
    );

    return {
      employees: activeRecords.length,
      monthlyGross,
      monthlyNet,
      annualCTC,
      monthlyDeductions,
    };
  }, [salaryRecords]);

  const openAddModal = () => {
    setEditingRecord(null);

    setFormData({
      ...emptyForm,
      effectiveDate: "01 Sep 2026",
    });

    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setFormData({
      employeeId: record.employeeId,
      employeeName: record.employeeName,
      department: record.department,
      designation: record.designation,
      effectiveDate: record.effectiveDate,
      basic: record.basic,
      hra: record.hra,
      conveyance: record.conveyance,
      medical: record.medical,
      specialAllowance: record.specialAllowance,
      bonus: record.bonus,
      pf: record.pf,
      professionalTax: record.professionalTax,
      insurance: record.insurance,
      otherDeduction: record.otherDeduction,
      status: record.status,
    });

    setShowModal(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.employeeId ||
      !formData.employeeName ||
      !formData.department ||
      !formData.basic
    ) {
      alert(
        "Please fill Employee ID, Employee Name, Department and Basic Salary."
      );
      return;
    }

    const newRecord = {
      ...formData,
      basic: numberValue(formData.basic),
      hra: numberValue(formData.hra),
      conveyance: numberValue(
        formData.conveyance
      ),
      medical: numberValue(formData.medical),
      specialAllowance: numberValue(
        formData.specialAllowance
      ),
      bonus: numberValue(formData.bonus),
      pf: numberValue(formData.pf),
      professionalTax: numberValue(
        formData.professionalTax
      ),
      insurance: numberValue(
        formData.insurance
      ),
      otherDeduction: numberValue(
        formData.otherDeduction
      ),
    };

    if (editingRecord) {
      setSalaryRecords((previous) =>
        previous.map((record) =>
          record.id === editingRecord.id
            ? {
                ...record,
                ...newRecord,
              }
            : record
        )
      );
    } else {
      setSalaryRecords((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...newRecord,
        },
      ]);
    }

    closeModal();
  };

  const deleteRecord = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this salary record?"
    );

    if (!confirmed) return;

    setSalaryRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setSalaryRecords((previous) =>
      previous.map((record) =>
        record.id === id
          ? {
              ...record,
              status:
                record.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : record
      )
    );
  };

  const openRevisionModal = (record) => {
    setRevisionRecord(record);
    setRevisionAmount("");
    setShowRevisionModal(true);
  };

  const closeRevisionModal = () => {
    setShowRevisionModal(false);
    setRevisionRecord(null);
    setRevisionAmount("");
  };

  const applyRevision = (event) => {
    event.preventDefault();

    const increment = Number(revisionAmount);

    if (!increment || increment <= 0) {
      alert("Please enter a valid revision amount.");
      return;
    }

    if (!revisionRecord) return;

    setSalaryRecords((previous) =>
      previous.map((record) => {
        if (record.id !== revisionRecord.id) {
          return record;
        }

        const newBasic =
          numberValue(record.basic) + increment;

        const newPF = Math.round(newBasic * 0.12);

        return {
          ...record,
          basic: newBasic,
          pf: newPF,
          effectiveDate: "01 Sep 2026",
        };
      })
    );

    closeRevisionModal();
  };

  const handleResetFilters = () => {
    setSearch("");
    setDepartmentFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="salary-page">

      {/* ================= HEADER ================= */}

      <div className="salary-header">

        <div>
          <span className="salary-eyebrow">
            HR & PAYROLL
          </span>

          <h1>Salary Management</h1>

          <p>
            Manage employee salary structures,
            compensation components and salary revisions.
          </p>
        </div>

        <button
          className="salary-primary-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add Salary Structure
        </button>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="salary-summary">

        <div className="salary-summary-card">
          <div className="salary-summary-icon employees">
            👥
          </div>

          <div>
            <span>Active Employees</span>

            <strong>
              {summary.employees}
            </strong>

            <small>
              Salary structures
            </small>
          </div>
        </div>

        <div className="salary-summary-card">
          <div className="salary-summary-icon gross">
            ₹
          </div>

          <div>
            <span>Monthly Gross</span>

            <strong>
              {formatCurrency(
                summary.monthlyGross
              )}
            </strong>

            <small>
              Total monthly earnings
            </small>
          </div>
        </div>

        <div className="salary-summary-card">
          <div className="salary-summary-icon deduction">
            −
          </div>

          <div>
            <span>Monthly Deductions</span>

            <strong>
              {formatCurrency(
                summary.monthlyDeductions
              )}
            </strong>

            <small>
              Employee deductions
            </small>
          </div>
        </div>

        <div className="salary-summary-card">
          <div className="salary-summary-icon net">
            ✓
          </div>

          <div>
            <span>Monthly Net Salary</span>

            <strong>
              {formatCurrency(
                summary.monthlyNet
              )}
            </strong>

            <small>
              Estimated payable salary
            </small>
          </div>
        </div>

        <div className="salary-summary-card">
          <div className="salary-summary-icon ctc">
            ◈
          </div>

          <div>
            <span>Annual CTC</span>

            <strong>
              {formatCurrency(
                summary.annualCTC
              )}
            </strong>

            <small>
              Estimated annual cost
            </small>
          </div>
        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="salary-filter-card">

        <div className="salary-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search employee, ID, department..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <div className="salary-filter-group">

          <div className="salary-filter-field">

            <label>Department</label>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(
                  event.target.value
                )
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

          <div className="salary-filter-field">

            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

          <button
            className="salary-reset-btn"
            onClick={handleResetFilters}
          >
            Reset
          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="salary-table-card">

        <div className="salary-table-header">

          <div>
            <h2>Employee Salary Structures</h2>

            <p>
              {filteredRecords.length} records found
            </p>
          </div>

          <div className="salary-active-badge">
            Salary Master
          </div>

        </div>

        <div className="salary-table-wrapper">

          <table className="salary-table">

            <thead>

              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>BASIC SALARY</th>
                <th>GROSS SALARY</th>
                <th>DEDUCTIONS</th>
                <th>NET SALARY</th>
                <th>ANNUAL CTC</th>
                <th>EFFECTIVE FROM</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>

            </thead>

            <tbody>

              {filteredRecords.length > 0 ? (

                filteredRecords.map((record) => {

                  const gross =
                    calculateEarnings(record);

                  const deductions =
                    calculateDeductions(record);

                  const net =
                    calculateNetSalary(record);

                  const ctc =
                    calculateAnnualCTC(record);

                  return (
                    <tr key={record.id}>

                      <td>

                        <div className="salary-employee">

                          <div className="salary-avatar">
                            {record.employeeName.charAt(
                              0
                            )}
                          </div>

                          <div>
                            <strong>
                              {record.employeeName}
                            </strong>

                            <span>
                              {record.employeeId}
                            </span>

                            <small>
                              {record.designation}
                            </small>
                          </div>

                        </div>

                      </td>

                      <td>

                        <span className="salary-department">
                          {record.department}
                        </span>

                      </td>

                      <td>

                        <strong className="basic-amount">
                          {formatCurrency(
                            record.basic
                          )}
                        </strong>

                      </td>

                      <td>

                        <strong className="gross-amount">
                          {formatCurrency(gross)}
                        </strong>

                      </td>

                      <td>

                        <span className="deduction-amount">
                          {formatCurrency(
                            deductions
                          )}
                        </span>

                      </td>

                      <td>

                        <strong className="net-amount">
                          {formatCurrency(net)}
                        </strong>

                      </td>

                      <td>

                        <strong className="ctc-amount">
                          {formatCurrency(ctc)}
                        </strong>

                      </td>

                      <td>

                        <span className="effective-date">
                          {record.effectiveDate}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`salary-status ${
                            record.status ===
                            "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <i></i>
                          {record.status}
                        </span>

                      </td>

                      <td>

                        <div className="salary-actions">

                          <button
                            className="view"
                            title="View Salary"
                            onClick={() => {
                              setViewingRecord(
                                record
                              );
                              setShowViewModal(true);
                            }}
                          >
                            👁
                          </button>

                          <button
                            className="edit"
                            title="Edit Salary"
                            onClick={() =>
                              openEditModal(
                                record
                              )
                            }
                          >
                            ✎
                          </button>

                          <button
                            className="revision"
                            title="Salary Revision"
                            onClick={() =>
                              openRevisionModal(
                                record
                              )
                            }
                          >
                            ↑
                          </button>

                          <button
                            className="toggle"
                            title="Change Status"
                            onClick={() =>
                              toggleStatus(
                                record.id
                              )
                            }
                          >
                            {record.status ===
                            "Active"
                              ? "⏸"
                              : "▶"}
                          </button>

                          <button
                            className="delete"
                            title="Delete"
                            onClick={() =>
                              deleteRecord(
                                record.id
                              )
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
                    colSpan="10"
                    className="salary-empty"
                  >

                    <div>

                      <span>₹</span>

                      <h3>
                        No salary records found
                      </h3>

                      <p>
                        Try changing the filters or
                        add a new salary structure.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (

        <div
          className="salary-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="salary-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="salary-modal-header">

              <div>

                <span>
                  SALARY MASTER
                </span>

                <h2>
                  {editingRecord
                    ? "Edit Salary Structure"
                    : "Add Salary Structure"}
                </h2>

                <p>
                  Configure employee compensation
                  and deduction components.
                </p>

              </div>

              <button
                className="salary-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="salary-form"
              onSubmit={handleSubmit}
            >

              {/* EMPLOYEE */}

              <div className="salary-form-section">
                Employee Information
              </div>

              <div className="salary-form-grid">

                <div className="salary-form-group">
                  <label>
                    Employee ID <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    value={
                      formData.employeeId
                    }
                    onChange={handleChange}
                    placeholder="EMP001"
                    required
                  />
                </div>

                <div className="salary-form-group">
                  <label>
                    Employee Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="employeeName"
                    value={
                      formData.employeeName
                    }
                    onChange={handleChange}
                    placeholder="Employee name"
                    required
                  />
                </div>

                <div className="salary-form-group">
                  <label>
                    Department <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={
                      formData.department
                    }
                    onChange={handleChange}
                    placeholder="Production"
                    required
                  />
                </div>

                <div className="salary-form-group">
                  <label>Designation</label>

                  <input
                    type="text"
                    name="designation"
                    value={
                      formData.designation
                    }
                    onChange={handleChange}
                    placeholder="Designation"
                  />
                </div>

                <div className="salary-form-group">
                  <label>
                    Effective Date
                  </label>

                  <input
                    type="text"
                    name="effectiveDate"
                    value={
                      formData.effectiveDate
                    }
                    onChange={handleChange}
                    placeholder="01 Sep 2026"
                  />
                </div>

                <div className="salary-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
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

              {/* EARNINGS */}

              <div className="salary-form-section">
                Earnings & Allowances
              </div>

              <div className="salary-form-grid">

                <SalaryInput
                  label="Basic Salary *"
                  name="basic"
                  value={formData.basic}
                  onChange={handleChange}
                  placeholder="50000"
                  required
                />

                <SalaryInput
                  label="HRA"
                  name="hra"
                  value={formData.hra}
                  onChange={handleChange}
                  placeholder="10000"
                />

                <SalaryInput
                  label="Conveyance Allowance"
                  name="conveyance"
                  value={formData.conveyance}
                  onChange={handleChange}
                  placeholder="3000"
                />

                <SalaryInput
                  label="Medical Allowance"
                  name="medical"
                  value={formData.medical}
                  onChange={handleChange}
                  placeholder="2000"
                />

                <SalaryInput
                  label="Special Allowance"
                  name="specialAllowance"
                  value={
                    formData.specialAllowance
                  }
                  onChange={handleChange}
                  placeholder="5000"
                />

                <SalaryInput
                  label="Bonus"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleChange}
                  placeholder="3000"
                />

              </div>

              <div className="salary-live-calculation">

                <div>
                  <span>
                    Gross Monthly Salary
                  </span>

                  <strong>
                    {formatCurrency(
                      calculateEarnings(
                        formData
                      )
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Estimated Annual CTC
                  </span>

                  <strong>
                    {formatCurrency(
                      calculateAnnualCTC(
                        formData
                      )
                    )}
                  </strong>
                </div>

              </div>

              {/* DEDUCTIONS */}

              <div className="salary-form-section">
                Deductions
              </div>

              <div className="salary-form-grid">

                <SalaryInput
                  label="Provident Fund (PF)"
                  name="pf"
                  value={formData.pf}
                  onChange={handleChange}
                  placeholder="5000"
                />

                <SalaryInput
                  label="Professional Tax"
                  name="professionalTax"
                  value={
                    formData.professionalTax
                  }
                  onChange={handleChange}
                  placeholder="200"
                />

                <SalaryInput
                  label="Insurance"
                  name="insurance"
                  value={
                    formData.insurance
                  }
                  onChange={handleChange}
                  placeholder="1000"
                />

                <SalaryInput
                  label="Other Deductions"
                  name="otherDeduction"
                  value={
                    formData.otherDeduction
                  }
                  onChange={handleChange}
                  placeholder="500"
                />

              </div>

              <div className="salary-net-preview">

                <div>
                  <span>
                    Total Deductions
                  </span>

                  <strong>
                    {formatCurrency(
                      calculateDeductions(
                        formData
                      )
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Estimated Net Salary
                  </span>

                  <strong>
                    {formatCurrency(
                      calculateNetSalary(
                        formData
                      )
                    )}
                  </strong>
                </div>

              </div>

              {/* FOOTER */}

              <div className="salary-form-footer">

                <button
                  type="button"
                  className="salary-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="salary-save"
                >
                  {editingRecord
                    ? "Update Salary"
                    : "Save Salary"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================= VIEW MODAL ================= */}

      {showViewModal &&
        viewingRecord && (

          <div
            className="salary-modal-overlay"
            onClick={() =>
              setShowViewModal(false)
            }
          >

            <div
              className="salary-view-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="salary-modal-header">

                <div>

                  <span>
                    SALARY DETAILS
                  </span>

                  <h2>
                    {viewingRecord.employeeName}
                  </h2>

                  <p>
                    {viewingRecord.employeeId} •{" "}
                    {viewingRecord.designation}
                  </p>

                </div>

                <button
                  className="salary-close"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  ×
                </button>

              </div>

              <div className="salary-profile">

                <div className="salary-large-avatar">
                  {viewingRecord.employeeName.charAt(
                    0
                  )}
                </div>

                <div>

                  <h3>
                    {viewingRecord.employeeName}
                  </h3>

                  <span>
                    {viewingRecord.department}
                  </span>

                </div>

                <span
                  className={`salary-status ${
                    viewingRecord.status ===
                    "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <i></i>
                  {viewingRecord.status}
                </span>

              </div>

              <div className="salary-view-content">

                {/* SUMMARY */}

                <div className="salary-view-summary">

                  <div>
                    <span>
                      Basic Salary
                    </span>

                    <strong>
                      {formatCurrency(
                        viewingRecord.basic
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Gross Salary
                    </span>

                    <strong>
                      {formatCurrency(
                        calculateEarnings(
                          viewingRecord
                        )
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Net Salary
                    </span>

                    <strong>
                      {formatCurrency(
                        calculateNetSalary(
                          viewingRecord
                        )
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Annual CTC
                    </span>

                    <strong>
                      {formatCurrency(
                        calculateAnnualCTC(
                          viewingRecord
                        )
                      )}
                    </strong>
                  </div>

                </div>

                {/* EARNINGS */}

                <div className="salary-detail-title">
                  Earnings Breakdown
                </div>

                <div className="salary-breakdown">

                  <SalaryDetail
                    label="Basic Salary"
                    value={viewingRecord.basic}
                  />

                  <SalaryDetail
                    label="HRA"
                    value={viewingRecord.hra}
                  />

                  <SalaryDetail
                    label="Conveyance"
                    value={
                      viewingRecord.conveyance
                    }
                  />

                  <SalaryDetail
                    label="Medical"
                    value={
                      viewingRecord.medical
                    }
                  />

                  <SalaryDetail
                    label="Special Allowance"
                    value={
                      viewingRecord.specialAllowance
                    }
                  />

                  <SalaryDetail
                    label="Bonus"
                    value={
                      viewingRecord.bonus
                    }
                  />

                  <div className="salary-breakdown-total">
                    <span>
                      Gross Salary
                    </span>

                    <strong>
                      {formatCurrency(
                        calculateEarnings(
                          viewingRecord
                        )
                      )}
                    </strong>
                  </div>

                </div>

                {/* DEDUCTIONS */}

                <div className="salary-detail-title">
                  Deduction Breakdown
                </div>

                <div className="salary-breakdown">

                  <SalaryDetail
                    label="Provident Fund"
                    value={
                      viewingRecord.pf
                    }
                  />

                  <SalaryDetail
                    label="Professional Tax"
                    value={
                      viewingRecord.professionalTax
                    }
                  />

                  <SalaryDetail
                    label="Insurance"
                    value={
                      viewingRecord.insurance
                    }
                  />

                  <SalaryDetail
                    label="Other Deductions"
                    value={
                      viewingRecord.otherDeduction
                    }
                  />

                  <div className="salary-breakdown-total net">
                    <span>
                      Net Salary
                    </span>

                    <strong>
                      {formatCurrency(
                        calculateNetSalary(
                          viewingRecord
                        )
                      )}
                    </strong>
                  </div>

                </div>

                <div className="salary-effective-info">

                  <span>
                    Effective From
                  </span>

                  <strong>
                    {viewingRecord.effectiveDate}
                  </strong>

                </div>

              </div>

              <div className="salary-view-footer">

                <button
                  className="salary-cancel"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>

                <button
                  className="salary-revision-btn"
                  onClick={() => {
                    setShowViewModal(false);
                    openRevisionModal(
                      viewingRecord
                    );
                  }}
                >
                  ↑ Salary Revision
                </button>

                <button
                  className="salary-save"
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(
                      viewingRecord
                    );
                  }}
                >
                  Edit Salary
                </button>

              </div>

            </div>

          </div>
        )}

      {/* ================= REVISION MODAL ================= */}

      {showRevisionModal &&
        revisionRecord && (

          <div
            className="salary-modal-overlay"
            onClick={closeRevisionModal}
          >

            <div
              className="salary-revision-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="salary-modal-header">

                <div>

                  <span>
                    SALARY REVISION
                  </span>

                  <h2>
                    Revise Salary
                  </h2>

                  <p>
                    Update the employee's basic
                    salary structure.
                  </p>

                </div>

                <button
                  className="salary-close"
                  onClick={closeRevisionModal}
                >
                  ×
                </button>

              </div>

              <form
                className="salary-revision-form"
                onSubmit={applyRevision}
              >

                <div className="revision-employee">

                  <div className="salary-large-avatar">
                    {revisionRecord.employeeName.charAt(
                      0
                    )}
                  </div>

                  <div>

                    <strong>
                      {revisionRecord.employeeName}
                    </strong>

                    <span>
                      {revisionRecord.employeeId} •{" "}
                      {revisionRecord.designation}
                    </span>

                  </div>

                </div>

                <div className="revision-current">

                  <div>
                    <span>
                      Current Basic
                    </span>

                    <strong>
                      {formatCurrency(
                        revisionRecord.basic
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Current Gross
                    </span>

                    <strong>
                      {formatCurrency(
                        calculateEarnings(
                          revisionRecord
                        )
                      )}
                    </strong>
                  </div>

                </div>

                <div className="salary-form-group">

                  <label>
                    Salary Increase Amount
                  </label>

                  <div className="salary-money-input">

                    <span>₹</span>

                    <input
                      type="number"
                      min="1"
                      value={revisionAmount}
                      onChange={(event) =>
                        setRevisionAmount(
                          event.target.value
                        )
                      }
                      placeholder="5000"
                      required
                    />

                  </div>

                </div>

                <div className="revision-preview">

                  <span>
                    New Basic Salary
                  </span>

                  <strong>
                    {formatCurrency(
                      numberValue(
                        revisionRecord.basic
                      ) +
                        numberValue(
                          revisionAmount
                        )
                    )}
                  </strong>

                </div>

                <div className="salary-revision-footer">

                  <button
                    type="button"
                    className="salary-cancel"
                    onClick={
                      closeRevisionModal
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="salary-save"
                  >
                    Apply Revision
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

    </div>
  );
}

/* =========================
   REUSABLE COMPONENTS
========================= */

function SalaryInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="salary-form-group">

      <label>
        {label}
      </label>

      <div className="salary-money-input">

        <span>₹</span>

        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min="0"
          required={required}
        />

      </div>

    </div>
  );
}

function SalaryDetail({ label, value }) {
  return (
    <div className="salary-detail-row">

      <span>
        {label}
      </span>

      <strong>
        {formatCurrency(value)}
      </strong>

    </div>
  );
}

export default Salary;