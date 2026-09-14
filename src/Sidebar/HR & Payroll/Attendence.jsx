import React, { useMemo, useState } from "react";
import "./Attendence.css";

const initialAttendance = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Aarav Sharma",
    department: "Production",
    designation: "Production Manager",
    date: "2026-09-11",
    status: "Present",
    checkIn: "08:55 AM",
    checkOut: "05:45 PM",
    workingHours: "8h 50m",
    remarks: "Regular attendance",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Patil",
    department: "HR",
    designation: "HR Executive",
    date: "2026-09-11",
    status: "Late",
    checkIn: "09:35 AM",
    checkOut: "06:00 PM",
    workingHours: "8h 25m",
    remarks: "Traffic delay",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Rahul Deshmukh",
    department: "Quality",
    designation: "Quality Engineer",
    date: "2026-09-11",
    status: "Present",
    checkIn: "08:48 AM",
    checkOut: "05:40 PM",
    workingHours: "8h 52m",
    remarks: "Regular attendance",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Sneha Kulkarni",
    department: "Finance",
    designation: "Accountant",
    date: "2026-09-11",
    status: "Half Day",
    checkIn: "09:05 AM",
    checkOut: "01:30 PM",
    workingHours: "4h 25m",
    remarks: "Personal work",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Vikram Jadhav",
    department: "Warehouse",
    designation: "Warehouse Supervisor",
    date: "2026-09-11",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    workingHours: "0h",
    remarks: "Not reported",
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Neha Joshi",
    department: "Sales",
    designation: "Sales Executive",
    date: "2026-09-11",
    status: "Present",
    checkIn: "08:58 AM",
    checkOut: "05:50 PM",
    workingHours: "8h 52m",
    remarks: "Regular attendance",
  },
  {
    id: 7,
    employeeId: "EMP007",
    name: "Aditya More",
    department: "IT",
    designation: "Software Developer",
    date: "2026-09-11",
    status: "Late",
    checkIn: "09:42 AM",
    checkOut: "06:15 PM",
    workingHours: "8h 33m",
    remarks: "Late arrival",
  },
  {
    id: 8,
    employeeId: "EMP008",
    name: "Kavita Pawar",
    department: "Production",
    designation: "Machine Operator",
    date: "2026-09-11",
    status: "Present",
    checkIn: "08:50 AM",
    checkOut: "05:35 PM",
    workingHours: "8h 45m",
    remarks: "Regular attendance",
  },
];

const emptyForm = {
  employeeId: "",
  name: "",
  department: "",
  designation: "",
  date: "2026-09-11",
  status: "Present",
  checkIn: "",
  checkOut: "",
  workingHours: "",
  remarks: "",
};

function Attendence() {
  const [attendance, setAttendance] = useState(initialAttendance);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("2026-09-11");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const departments = useMemo(() => {
    return [...new Set(attendance.map((item) => item.department))];
  }, [attendance]);

  const filteredAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      const matchesDate =
        !selectedDate || item.date === selectedDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesDate
      );
    });
  }, [
    attendance,
    search,
    statusFilter,
    departmentFilter,
    selectedDate,
  ]);

  const summary = useMemo(() => {
    return {
      total: attendance.filter((item) => item.date === selectedDate).length,
      present: attendance.filter(
        (item) =>
          item.date === selectedDate && item.status === "Present"
      ).length,
      absent: attendance.filter(
        (item) =>
          item.date === selectedDate && item.status === "Absent"
      ).length,
      late: attendance.filter(
        (item) =>
          item.date === selectedDate && item.status === "Late"
      ).length,
      halfDay: attendance.filter(
        (item) =>
          item.date === selectedDate && item.status === "Half Day"
      ).length,
    };
  }, [attendance, selectedDate]);

  const openAddModal = () => {
    setEditingRecord(null);
    setFormData({
      ...emptyForm,
      date: selectedDate,
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
      date: record.date,
      status: record.status,
      checkIn: record.checkIn === "-" ? "" : record.checkIn,
      checkOut: record.checkOut === "-" ? "" : record.checkOut,
      workingHours: record.workingHours,
      remarks: record.remarks,
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
      !formData.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const recordData = {
      ...formData,
      checkIn: formData.checkIn || "-",
      checkOut: formData.checkOut || "-",
      workingHours:
        formData.status === "Absent"
          ? "0h"
          : formData.workingHours || "8h",
      remarks: formData.remarks || "Regular attendance",
    };

    if (editingRecord) {
      setAttendance((prev) =>
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
      setAttendance((prev) => [
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
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmed) return;

    setAttendance((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateStatus = (id, status) => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (status === "Absent") {
          return {
            ...item,
            status,
            checkIn: "-",
            checkOut: "-",
            workingHours: "0h",
          };
        }

        return {
          ...item,
          status,
          workingHours:
            item.workingHours === "0h"
              ? "8h"
              : item.workingHours,
        };
      })
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "attendance-status present";

      case "Absent":
        return "attendance-status absent";

      case "Late":
        return "attendance-status late";

      case "Half Day":
        return "attendance-status half-day";

      default:
        return "attendance-status";
    }
  };

  return (
    <div className="attendance-page">

      {/* Header */}
      <div className="attendance-header">
        <div>
          <span className="attendance-eyebrow">
            HR & PAYROLL
          </span>

          <h1>Attendance Management</h1>

          <p>
            Track employee attendance, working hours,
            late arrivals and daily attendance records.
          </p>
        </div>

        <button
          className="attendance-primary-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Mark Attendance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="attendance-summary">

        <div className="attendance-card total-card">
          <div className="attendance-card-icon">👥</div>
          <div>
            <span>Total Employees</span>
            <strong>{summary.total}</strong>
            <small>For selected date</small>
          </div>
        </div>

        <div className="attendance-card present-card">
          <div className="attendance-card-icon">✓</div>
          <div>
            <span>Present</span>
            <strong>{summary.present}</strong>
            <small>Employees present</small>
          </div>
        </div>

        <div className="attendance-card absent-card">
          <div className="attendance-card-icon">×</div>
          <div>
            <span>Absent</span>
            <strong>{summary.absent}</strong>
            <small>Employees absent</small>
          </div>
        </div>

        <div className="attendance-card late-card">
          <div className="attendance-card-icon">⏰</div>
          <div>
            <span>Late</span>
            <strong>{summary.late}</strong>
            <small>Late arrivals</small>
          </div>
        </div>

        <div className="attendance-card half-card">
          <div className="attendance-card-icon">½</div>
          <div>
            <span>Half Day</span>
            <strong>{summary.halfDay}</strong>
            <small>Half-day attendance</small>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="attendance-filter-card">

        <div className="attendance-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search employee, ID or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="attendance-filter-group">

          <div className="attendance-filter-field">
            <label>Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />
          </div>

          <div className="attendance-filter-field">
            <label>Department</label>
            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
            >
              <option value="All">All Departments</option>

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

          <div className="attendance-filter-field">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      <div className="attendance-table-card">

        <div className="attendance-table-header">
          <div>
            <h2>Daily Attendance</h2>
            <p>
              {filteredAttendance.length} attendance records
              found
            </p>
          </div>

          <div className="attendance-date-label">
            {selectedDate
              ? new Date(
                  `${selectedDate}T00:00:00`
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "All Dates"}
          </div>
        </div>

        <div className="attendance-table-wrapper">

          <table className="attendance-table">

            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>CHECK IN</th>
                <th>CHECK OUT</th>
                <th>WORKING HOURS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (

                  <tr key={record.id}>

                    <td>
                      <div className="employee-cell">

                        <div className="employee-avatar">
                          {record.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{record.name}</strong>
                          <span>
                            {record.employeeId} •{" "}
                            {record.designation}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="department-badge">
                        {record.department}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        `${record.date}T00:00:00`
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
                      <span className="time-value">
                        {record.checkIn}
                      </span>
                    </td>

                    <td>
                      <span className="time-value">
                        {record.checkOut}
                      </span>
                    </td>

                    <td>
                      <strong className="working-hours">
                        {record.workingHours}
                      </strong>
                    </td>

                    <td>

                      <div className="attendance-actions">

                        <button
                          className="action-view"
                          title="View"
                          onClick={() => {
                            setViewingRecord(record);
                            setShowViewModal(true);
                          }}
                        >
                          👁
                        </button>

                        <button
                          className="action-edit"
                          title="Edit"
                          onClick={() =>
                            openEditModal(record)
                          }
                        >
                          ✎
                        </button>

                        <button
                          className="action-delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(record.id)
                          }
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
                    className="attendance-empty"
                  >
                    <div>
                      <span>📋</span>
                      <h3>No attendance records found</h3>
                      <p>
                        Try changing your filters or add
                        a new attendance record.
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
          className="attendance-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="attendance-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="attendance-modal-header">
              <div>
                <span className="attendance-modal-label">
                  ATTENDANCE
                </span>

                <h2>
                  {editingRecord
                    ? "Edit Attendance"
                    : "Mark Attendance"}
                </h2>

                <p>
                  Enter employee attendance details below.
                </p>
              </div>

              <button
                className="attendance-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form
              className="attendance-form"
              onSubmit={handleSubmit}
            >

              <div className="form-section-title">
                Employee Information
              </div>

              <div className="attendance-form-grid">

                <div className="attendance-form-group">
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

                <div className="attendance-form-group">
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

                <div className="attendance-form-group">
                  <label>Department</label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Production"
                  />
                </div>

                <div className="attendance-form-group">
                  <label>Designation</label>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                  />
                </div>

              </div>

              <div className="form-section-title">
                Attendance Details
              </div>

              <div className="attendance-form-grid">

                <div className="attendance-form-group">
                  <label>
                    Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="attendance-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Present">
                      Present
                    </option>

                    <option value="Absent">
                      Absent
                    </option>

                    <option value="Late">
                      Late
                    </option>

                    <option value="Half Day">
                      Half Day
                    </option>
                  </select>
                </div>

                <div className="attendance-form-group">
                  <label>Check In</label>

                  <input
                    type="text"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    placeholder="08:55 AM"
                  />
                </div>

                <div className="attendance-form-group">
                  <label>Check Out</label>

                  <input
                    type="text"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    placeholder="05:45 PM"
                  />
                </div>

                <div className="attendance-form-group">
                  <label>Working Hours</label>

                  <input
                    type="text"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    placeholder="8h 45m"
                  />
                </div>

                <div className="attendance-form-group">
                  <label>Remarks</label>

                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Regular attendance"
                  />
                </div>

              </div>

              <div className="attendance-form-footer">

                <button
                  type="button"
                  className="attendance-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="attendance-save-btn"
                >
                  {editingRecord
                    ? "Update Attendance"
                    : "Save Attendance"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingRecord && (
        <div
          className="attendance-modal-overlay"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="attendance-view-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="attendance-modal-header">

              <div>
                <span className="attendance-modal-label">
                  ATTENDANCE DETAILS
                </span>

                <h2>{viewingRecord.name}</h2>

                <p>
                  {viewingRecord.employeeId} •{" "}
                  {viewingRecord.designation}
                </p>
              </div>

              <button
                className="attendance-close-btn"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>

            </div>

            <div className="attendance-profile">

              <div className="large-employee-avatar">
                {viewingRecord.name.charAt(0)}
              </div>

              <div>
                <h3>{viewingRecord.name}</h3>

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

            <div className="attendance-detail-grid">

              <div>
                <span>Date</span>
                <strong>
                  {new Date(
                    `${viewingRecord.date}T00:00:00`
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </div>

              <div>
                <span>Employee ID</span>
                <strong>
                  {viewingRecord.employeeId}
                </strong>
              </div>

              <div>
                <span>Check In</span>
                <strong>
                  {viewingRecord.checkIn}
                </strong>
              </div>

              <div>
                <span>Check Out</span>
                <strong>
                  {viewingRecord.checkOut}
                </strong>
              </div>

              <div>
                <span>Working Hours</span>
                <strong>
                  {viewingRecord.workingHours}
                </strong>
              </div>

              <div>
                <span>Department</span>
                <strong>
                  {viewingRecord.department}
                </strong>
              </div>

            </div>

            <div className="attendance-remarks">
              <span>Remarks</span>
              <p>{viewingRecord.remarks}</p>
            </div>

            <div className="attendance-view-footer">
              <button
                className="attendance-cancel-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                className="attendance-save-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(viewingRecord);
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

export default Attendence;