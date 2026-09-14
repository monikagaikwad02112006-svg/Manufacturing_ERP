import { useMemo, useState } from "react";
import "./Customer Payments.css";

const customers = [
  {
    id: 1,
    code: "CUS-001",
    name: "Shree Industries",
  },
  {
    id: 2,
    code: "CUS-002",
    name: "Apex Manufacturing",
  },
  {
    id: 3,
    code: "CUS-003",
    name: "Global Engineering",
  },
  {
    id: 4,
    code: "CUS-004",
    name: "Sai Auto Parts",
  },
];

const initialPayments = [
  {
    id: 1,
    paymentNo: "CP-0001",
    paymentDate: "2026-09-01",
    customerCode: "CUS-001",
    customerName: "Shree Industries",
    invoiceNo: "INV-1001",
    paymentMethod: "Bank Transfer",
    referenceNo: "NEFT458921",
    amount: 45000,
    receivedBy: "Monika",
    status: "Received",
    remarks: "Full payment received",
  },
  {
    id: 2,
    paymentNo: "CP-0002",
    paymentDate: "2026-09-02",
    customerCode: "CUS-002",
    customerName: "Apex Manufacturing",
    invoiceNo: "INV-1002",
    paymentMethod: "UPI",
    referenceNo: "UPI785421",
    amount: 28000,
    receivedBy: "Rahul",
    status: "Received",
    remarks: "Payment against invoice",
  },
  {
    id: 3,
    paymentNo: "CP-0003",
    paymentDate: "2026-09-03",
    customerCode: "CUS-003",
    customerName: "Global Engineering",
    invoiceNo: "INV-1003",
    paymentMethod: "Cheque",
    referenceNo: "CHQ-45821",
    amount: 35000,
    receivedBy: "Pranali",
    status: "Pending",
    remarks: "Cheque deposited",
  },
  {
    id: 4,
    paymentNo: "CP-0004",
    paymentDate: "2026-09-04",
    customerCode: "CUS-004",
    customerName: "Sai Auto Parts",
    invoiceNo: "INV-1004",
    paymentMethod: "Cash",
    referenceNo: "CASH-004",
    amount: 15000,
    receivedBy: "Monika",
    status: "Received",
    remarks: "Cash received",
  },
  {
    id: 5,
    paymentNo: "CP-0005",
    paymentDate: "2026-09-05",
    customerCode: "CUS-001",
    customerName: "Shree Industries",
    invoiceNo: "INV-1005",
    paymentMethod: "Bank Transfer",
    referenceNo: "NEFT789452",
    amount: 52000,
    receivedBy: "Rahul",
    status: "Pending",
    remarks: "Awaiting bank confirmation",
  },
];

const emptyForm = {
  paymentNo: "",
  paymentDate: "",
  customerCode: "",
  customerName: "",
  invoiceNo: "",
  paymentMethod: "Bank Transfer",
  referenceNo: "",
  amount: "",
  receivedBy: "",
  status: "Pending",
  remarks: "",
};

function CustomerPayments() {
  const [payments, setPayments] = useState(initialPayments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [modalType, setModalType] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* =====================================================
     CALCULATIONS
     ===================================================== */

  const totalAmount = useMemo(
    () =>
      payments.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
      ),
    [payments]
  );

  const receivedAmount = useMemo(
    () =>
      payments
        .filter((payment) => payment.status === "Received")
        .reduce(
          (total, payment) => total + Number(payment.amount || 0),
          0
        ),
    [payments]
  );

  const pendingAmount = useMemo(
    () =>
      payments
        .filter((payment) => payment.status === "Pending")
        .reduce(
          (total, payment) => total + Number(payment.amount || 0),
          0
        ),
    [payments]
  );

  const cancelledAmount = useMemo(
    () =>
      payments
        .filter((payment) => payment.status === "Cancelled")
        .reduce(
          (total, payment) => total + Number(payment.amount || 0),
          0
        ),
    [payments]
  );

  /* =====================================================
     FILTER
     ===================================================== */

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        payment.paymentNo.toLowerCase().includes(searchText) ||
        payment.customerName.toLowerCase().includes(searchText) ||
        payment.customerCode.toLowerCase().includes(searchText) ||
        payment.invoiceNo.toLowerCase().includes(searchText) ||
        payment.referenceNo.toLowerCase().includes(searchText);

      const matchesStatus =
        !statusFilter || payment.status === statusFilter;

      const matchesMethod =
        !methodFilter || payment.paymentMethod === methodFilter;

      const matchesCustomer =
        !customerFilter ||
        payment.customerCode === customerFilter;

      const matchesDate =
        !dateFilter || payment.paymentDate === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesCustomer &&
        matchesDate
      );
    });
  }, [
    payments,
    search,
    statusFilter,
    methodFilter,
    customerFilter,
    dateFilter,
  ]);

  /* =====================================================
     MODAL
     ===================================================== */

  const openAddModal = () => {
    const nextNumber = `CP-${String(payments.length + 1).padStart(4, "0")}`;

    setForm({
      ...emptyForm,
      paymentNo: nextNumber,
      paymentDate: new Date().toISOString().split("T")[0],
    });

    setErrors({});
    setSelectedPayment(null);
    setModalType("add");
  };

  const openEditModal = (payment) => {
    setForm({
      paymentNo: payment.paymentNo,
      paymentDate: payment.paymentDate,
      customerCode: payment.customerCode,
      customerName: payment.customerName,
      invoiceNo: payment.invoiceNo,
      paymentMethod: payment.paymentMethod,
      referenceNo: payment.referenceNo,
      amount: payment.amount,
      receivedBy: payment.receivedBy,
      status: payment.status,
      remarks: payment.remarks,
    });

    setSelectedPayment(payment);
    setErrors({});
    setModalType("edit");
  };

  const openViewModal = (payment) => {
    setSelectedPayment(payment);
    setModalType("view");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedPayment(null);
    setErrors({});
    setForm(emptyForm);
  };

  /* =====================================================
     FORM HANDLERS
     ===================================================== */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const handleCustomerChange = (e) => {
    const customerCode = e.target.value;

    const customer = customers.find(
      (item) => item.code === customerCode
    );

    setForm((previous) => ({
      ...previous,
      customerCode,
      customerName: customer ? customer.name : "",
    }));

    if (errors.customerCode) {
      setErrors((previous) => ({
        ...previous,
        customerCode: "",
      }));
    }
  };

  /* =====================================================
     VALIDATION
     ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!form.paymentDate) {
      newErrors.paymentDate = "Payment date is required.";
    }

    if (!form.customerCode) {
      newErrors.customerCode = "Please select a customer.";
    }

    if (!form.invoiceNo.trim()) {
      newErrors.invoiceNo = "Invoice number is required.";
    }

    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required.";
    }

    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = "Enter a valid payment amount.";
    }

    if (!form.receivedBy.trim()) {
      newErrors.receivedBy = "Received by is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     SUBMIT
     ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const paymentData = {
      id:
        modalType === "edit"
          ? selectedPayment.id
          : Date.now(),
      paymentNo: form.paymentNo,
      paymentDate: form.paymentDate,
      customerCode: form.customerCode,
      customerName: form.customerName,
      invoiceNo: form.invoiceNo.trim(),
      paymentMethod: form.paymentMethod,
      referenceNo: form.referenceNo.trim(),
      amount: Number(form.amount),
      receivedBy: form.receivedBy.trim(),
      status: form.status,
      remarks: form.remarks.trim(),
    };

    if (modalType === "edit") {
      setPayments((previous) =>
        previous.map((payment) =>
          payment.id === selectedPayment.id
            ? paymentData
            : payment
        )
      );
    } else {
      setPayments((previous) => [paymentData, ...previous]);
    }

    closeModal();
  };

  /* =====================================================
     DELETE
     ===================================================== */

  const handleDelete = (payment) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete payment ${payment.paymentNo}?`
    );

    if (!confirmed) {
      return;
    }

    setPayments((previous) =>
      previous.filter((item) => item.id !== payment.id)
    );
  };

  /* =====================================================
     STATUS
     ===================================================== */

  const updateStatus = (payment, status) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark ${payment.paymentNo} as ${status}?`
    );

    if (!confirmed) {
      return;
    }

    setPayments((previous) =>
      previous.map((item) =>
        item.id === payment.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  /* =====================================================
     CLEAR FILTERS
     ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setMethodFilter("");
    setCustomerFilter("");
    setDateFilter("");
  };

  /* =====================================================
     HELPERS
     ===================================================== */

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="customer-payments-page">

      {/* ================= HEADER ================= */}

      <div className="customer-payments-header">
        <div>
          <h1>Customer Payments</h1>
          <p>
            Track and manage customer payment receipts
          </p>
        </div>

        <button
          className="customer-payments-primary-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          New Payment
        </button>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="customer-payments-summary">

        <div className="customer-payment-summary-card">
          <div className="customer-payment-icon blue">
            ₹
          </div>

          <div>
            <h3>Total Payments</h3>
            <strong>{formatCurrency(totalAmount)}</strong>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-icon green">
            ✓
          </div>

          <div>
            <h3>Received</h3>
            <strong>{formatCurrency(receivedAmount)}</strong>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-icon orange">
            ⏳
          </div>

          <div>
            <h3>Pending</h3>
            <strong>{formatCurrency(pendingAmount)}</strong>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-icon red">
            ✕
          </div>

          <div>
            <h3>Cancelled</h3>
            <strong>{formatCurrency(cancelledAmount)}</strong>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-icon purple">
            #
          </div>

          <div>
            <h3>Total Transactions</h3>
            <strong>{payments.length}</strong>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-icon teal">
            ✓
          </div>

          <div>
            <h3>Filtered Records</h3>
            <strong>{filteredPayments.length}</strong>
          </div>
        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="customer-payments-filter-box">

        <div className="customer-payments-filter-header">
          <div>
            <h3>Search & Filters</h3>
            <p>Find customer payment transactions quickly</p>
          </div>

          <button
            className="customer-payments-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div className="customer-payments-filter-grid">

          <div className="customer-payments-filter-group search-filter">
            <label>Search</label>

            <input
              type="text"
              placeholder="Payment no, customer, invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="customer-payments-filter-group">
            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="">All Status</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="customer-payments-filter-group">
            <label>Payment Method</label>

            <select
              value={methodFilter}
              onChange={(e) =>
                setMethodFilter(e.target.value)
              }
            >
              <option value="">All Methods</option>
              <option value="Bank Transfer">
                Bank Transfer
              </option>
              <option value="UPI">UPI</option>
              <option value="Cheque">Cheque</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="customer-payments-filter-group">
            <label>Customer</label>

            <select
              value={customerFilter}
              onChange={(e) =>
                setCustomerFilter(e.target.value)
              }
            >
              <option value="">All Customers</option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.code}
                >
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="customer-payments-filter-group">
            <label>Payment Date</label>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
            />
          </div>

        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="customer-payments-table-card">

        <div className="customer-payments-table-header">
          <div>
            <h3>Payment Transactions</h3>
            <p>
              Showing {filteredPayments.length} payment
              {filteredPayments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="customer-payments-table-wrapper">

          {filteredPayments.length === 0 ? (
            <div className="customer-payments-empty">
              <div className="customer-payments-empty-icon">
                ₹
              </div>

              <h3>No payments found</h3>

              <p>
                Try changing your search or filter criteria.
              </p>
            </div>
          ) : (
            <table className="customer-payments-table">

              <thead>
                <tr>
                  <th>Payment No.</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Invoice</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Received By</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>

                    <td>
                      <span className="customer-payment-number">
                        {payment.paymentNo}
                      </span>
                    </td>

                    <td>{payment.paymentDate}</td>

                    <td>
                      <div className="customer-payment-customer">
                        <div className="customer-payment-avatar">
                          {payment.customerName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {payment.customerName}
                          </strong>

                          <small>
                            {payment.customerCode}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>{payment.invoiceNo}</td>

                    <td>
                      <span className="payment-method-badge">
                        {payment.paymentMethod}
                      </span>
                    </td>

                    <td>
                      {payment.referenceNo || "—"}
                    </td>

                    <td>
                      <strong className="payment-amount">
                        {formatCurrency(payment.amount)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`customer-payment-status ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td>{payment.receivedBy}</td>

                    <td>
                      <div className="customer-payment-actions">

                        <button
                          className="payment-action view"
                          title="View"
                          onClick={() =>
                            openViewModal(payment)
                          }
                        >
                          👁
                        </button>

                        <button
                          className="payment-action edit"
                          title="Edit"
                          onClick={() =>
                            openEditModal(payment)
                          }
                        >
                          ✎
                        </button>

                        {payment.status === "Pending" && (
                          <button
                            className="payment-action receive"
                            title="Mark Received"
                            onClick={() =>
                              updateStatus(
                                payment,
                                "Received"
                              )
                            }
                          >
                            ✓
                          </button>
                        )}

                        {payment.status !== "Cancelled" && (
                          <button
                            className="payment-action cancel"
                            title="Cancel"
                            onClick={() =>
                              updateStatus(
                                payment,
                                "Cancelled"
                              )
                            }
                          >
                            ×
                          </button>
                        )}

                        <button
                          className="payment-action delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(payment)
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
          )}

        </div>
      </div>

      {/* =================================================
          ADD / EDIT MODAL
          ================================================= */}

      {(modalType === "add" ||
        modalType === "edit") && (
        <div className="customer-payments-modal-overlay">

          <div className="customer-payments-modal">

            <div className="customer-payments-modal-header">

              <div>
                <h2>
                  {modalType === "add"
                    ? "New Customer Payment"
                    : "Edit Customer Payment"}
                </h2>

                <p>
                  Enter payment receipt details below
                </p>
              </div>

              <button
                className="customer-payments-close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="customer-payments-form"
              onSubmit={handleSubmit}
            >

              <div className="customer-payments-form-body">

                {/* BASIC DETAILS */}

                <h3 className="customer-payments-section-title">
                  Payment Details
                </h3>

                <div className="customer-payments-form-grid">

                  <div className="customer-payments-form-group">
                    <label>Payment Number</label>

                    <input
                      type="text"
                      name="paymentNo"
                      value={form.paymentNo}
                      disabled
                    />
                  </div>

                  <div className="customer-payments-form-group">
                    <label>
                      Payment Date <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="paymentDate"
                      value={form.paymentDate}
                      onChange={handleFormChange}
                    />

                    {errors.paymentDate && (
                      <small className="form-error">
                        {errors.paymentDate}
                      </small>
                    )}
                  </div>

                  <div className="customer-payments-form-group">
                    <label>
                      Customer <span>*</span>
                    </label>

                    <select
                      value={form.customerCode}
                      onChange={handleCustomerChange}
                    >
                      <option value="">
                        Select Customer
                      </option>

                      {customers.map((customer) => (
                        <option
                          key={customer.id}
                          value={customer.code}
                        >
                          {customer.name}
                        </option>
                      ))}
                    </select>

                    {errors.customerCode && (
                      <small className="form-error">
                        {errors.customerCode}
                      </small>
                    )}
                  </div>

                  <div className="customer-payments-form-group">
                    <label>Customer Code</label>

                    <input
                      type="text"
                      value={form.customerCode}
                      disabled
                      placeholder="Auto filled"
                    />
                  </div>

                  <div className="customer-payments-form-group">
                    <label>
                      Invoice Number <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="invoiceNo"
                      value={form.invoiceNo}
                      onChange={handleFormChange}
                      placeholder="e.g. INV-1001"
                    />

                    {errors.invoiceNo && (
                      <small className="form-error">
                        {errors.invoiceNo}
                      </small>
                    )}
                  </div>

                  <div className="customer-payments-form-group">
                    <label>
                      Payment Method <span>*</span>
                    </label>

                    <select
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleFormChange}
                    >
                      <option value="Bank Transfer">
                        Bank Transfer
                      </option>
                      <option value="UPI">UPI</option>
                      <option value="Cheque">
                        Cheque
                      </option>
                      <option value="Cash">Cash</option>
                    </select>

                    {errors.paymentMethod && (
                      <small className="form-error">
                        {errors.paymentMethod}
                      </small>
                    )}
                  </div>

                  <div className="customer-payments-form-group">
                    <label>Reference Number</label>

                    <input
                      type="text"
                      name="referenceNo"
                      value={form.referenceNo}
                      onChange={handleFormChange}
                      placeholder="Transaction / cheque no."
                    />
                  </div>

                  <div className="customer-payments-form-group">
                    <label>
                      Amount <span>*</span>
                    </label>

                    <div className="amount-input">
                      <span>₹</span>

                      <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleFormChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {errors.amount && (
                      <small className="form-error">
                        {errors.amount}
                      </small>
                    )}
                  </div>

                  <div className="customer-payments-form-group">
                    <label>
                      Received By <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="receivedBy"
                      value={form.receivedBy}
                      onChange={handleFormChange}
                      placeholder="Employee name"
                    />

                    {errors.receivedBy && (
                      <small className="form-error">
                        {errors.receivedBy}
                      </small>
                    )}
                  </div>

                  <div className="customer-payments-form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                    >
                      <option value="Pending">
                        Pending
                      </option>
                      <option value="Received">
                        Received
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                  <div className="customer-payments-form-group full-width">
                    <label>Remarks</label>

                    <textarea
                      name="remarks"
                      value={form.remarks}
                      onChange={handleFormChange}
                      placeholder="Enter payment remarks..."
                      rows="3"
                    />
                  </div>

                </div>
              </div>

              <div className="customer-payments-modal-footer">

                <button
                  type="button"
                  className="customer-payments-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="customer-payments-save-btn"
                >
                  {modalType === "add"
                    ? "Save Payment"
                    : "Update Payment"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* =================================================
          VIEW MODAL
          ================================================= */}

      {modalType === "view" &&
        selectedPayment && (
          <div className="customer-payments-modal-overlay">

            <div className="customer-payments-view-modal">

              <div className="customer-payments-modal-header">

                <div>
                  <h2>Payment Details</h2>

                  <p>
                    {selectedPayment.paymentNo}
                  </p>
                </div>

                <button
                  className="customer-payments-close-btn"
                  onClick={closeModal}
                >
                  ×
                </button>

              </div>

              <div className="customer-payments-view-body">

                <div className="payment-view-status-row">

                  <div>
                    <span className="view-label">
                      Payment Number
                    </span>

                    <strong>
                      {selectedPayment.paymentNo}
                    </strong>
                  </div>

                  <span
                    className={`customer-payment-status ${getStatusClass(
                      selectedPayment.status
                    )}`}
                  >
                    {selectedPayment.status}
                  </span>

                </div>

                <div className="customer-payments-detail-grid">

                  <div className="payment-detail-card">
                    <span>Payment Date</span>
                    <strong>
                      {selectedPayment.paymentDate}
                    </strong>
                  </div>

                  <div className="payment-detail-card">
                    <span>Customer</span>
                    <strong>
                      {selectedPayment.customerName}
                    </strong>
                  </div>

                  <div className="payment-detail-card">
                    <span>Customer Code</span>
                    <strong>
                      {selectedPayment.customerCode}
                    </strong>
                  </div>

                  <div className="payment-detail-card">
                    <span>Invoice Number</span>
                    <strong>
                      {selectedPayment.invoiceNo}
                    </strong>
                  </div>

                  <div className="payment-detail-card">
                    <span>Payment Method</span>
                    <strong>
                      {selectedPayment.paymentMethod}
                    </strong>
                  </div>

                  <div className="payment-detail-card">
                    <span>Reference Number</span>
                    <strong>
                      {selectedPayment.referenceNo || "—"}
                    </strong>
                  </div>

                  <div className="payment-detail-card amount-card">
                    <span>Payment Amount</span>
                    <strong>
                      {formatCurrency(
                        selectedPayment.amount
                      )}
                    </strong>
                  </div>

                  <div className="payment-detail-card">
                    <span>Received By</span>
                    <strong>
                      {selectedPayment.receivedBy}
                    </strong>
                  </div>

                </div>

                <div className="payment-remarks-box">

                  <h3>Remarks</h3>

                  <p>
                    {selectedPayment.remarks ||
                      "No remarks added."}
                  </p>

                </div>

              </div>

              <div className="customer-payments-modal-footer">

                <button
                  className="customer-payments-secondary-btn"
                  onClick={closeModal}
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        )}
    </div>
  );
}

export default CustomerPayments;