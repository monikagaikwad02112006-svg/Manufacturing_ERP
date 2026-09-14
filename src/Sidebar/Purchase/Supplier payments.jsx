import { useMemo, useState } from "react";
import "./Supplier Payments.css";

const initialPayments = [
  {
    id: 1,
    paymentNo: "SP-2026-001",
    supplier: "ABC Steel Suppliers",
    invoiceNo: "INV-ABC-1025",
    invoiceDate: "2026-08-20",
    dueDate: "2026-09-05",
    paymentDate: "2026-08-28",
    invoiceAmount: 125000,
    paidAmount: 125000,
    paymentMethod: "Bank Transfer",
    referenceNo: "TXN-982341",
    status: "Paid",
    notes: "Full payment completed.",
  },
  {
    id: 2,
    paymentNo: "SP-2026-002",
    supplier: "XYZ Industrial Components",
    invoiceNo: "INV-XYZ-2041",
    invoiceDate: "2026-08-22",
    dueDate: "2026-09-10",
    paymentDate: "2026-08-30",
    invoiceAmount: 85000,
    paidAmount: 40000,
    paymentMethod: "NEFT",
    referenceNo: "NEFT-452781",
    status: "Partially Paid",
    notes: "Part payment made.",
  },
  {
    id: 3,
    paymentNo: "SP-2026-003",
    supplier: "Maharashtra Packaging",
    invoiceNo: "INV-MP-3098",
    invoiceDate: "2026-08-25",
    dueDate: "2026-09-02",
    paymentDate: "",
    invoiceAmount: 56000,
    paidAmount: 0,
    paymentMethod: "Bank Transfer",
    referenceNo: "",
    status: "Pending",
    notes: "Payment pending approval.",
  },
  {
    id: 4,
    paymentNo: "SP-2026-004",
    supplier: "Prime Electricals",
    invoiceNo: "INV-PE-4512",
    invoiceDate: "2026-08-10",
    dueDate: "2026-08-25",
    paymentDate: "2026-08-27",
    invoiceAmount: 92000,
    paidAmount: 0,
    paymentMethod: "Cheque",
    referenceNo: "CHQ-7821",
    status: "Overdue",
    notes: "Cheque pending clearance.",
  },
  {
    id: 5,
    paymentNo: "SP-2026-005",
    supplier: "Global Engineering",
    invoiceNo: "INV-GE-5582",
    invoiceDate: "2026-08-28",
    dueDate: "2026-09-15",
    paymentDate: "",
    invoiceAmount: 74000,
    paidAmount: 0,
    paymentMethod: "UPI",
    referenceNo: "",
    status: "Pending",
    notes: "",
  },
];

const defaultForm = {
  paymentNo: "",
  supplier: "",
  invoiceNo: "",
  invoiceDate: "",
  dueDate: "",
  paymentDate: "",
  invoiceAmount: "",
  paidAmount: "",
  paymentMethod: "Bank Transfer",
  referenceNo: "",
  status: "Pending",
  notes: "",
};

function SupplierPayments() {
  const [payments, setPayments] = useState(initialPayments);

  const [search, setSearch] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [viewPayment, setViewPayment] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const suppliers = useMemo(() => {
    return [...new Set(payments.map((payment) => payment.supplier))];
  }, [payments]);

  const filteredPayments = payments.filter((payment) => {
    const searchValue = search.toLowerCase();

    const searchMatch =
      payment.paymentNo.toLowerCase().includes(searchValue) ||
      payment.supplier.toLowerCase().includes(searchValue) ||
      payment.invoiceNo.toLowerCase().includes(searchValue) ||
      payment.referenceNo.toLowerCase().includes(searchValue);

    const supplierMatch =
      supplierFilter === "All" ||
      payment.supplier === supplierFilter;

    const statusMatch =
      statusFilter === "All" ||
      payment.status === statusFilter;

    const methodMatch =
      methodFilter === "All" ||
      payment.paymentMethod === methodFilter;

    return (
      searchMatch &&
      supplierMatch &&
      statusMatch &&
      methodMatch
    );
  });

  /* =========================
     SUMMARY CALCULATIONS
  ========================= */

  const totalPayments = payments.length;

  const totalInvoiceAmount = payments.reduce(
    (total, payment) =>
      total + Number(payment.invoiceAmount || 0),
    0
  );

  const totalPaidAmount = payments.reduce(
    (total, payment) =>
      total + Number(payment.paidAmount || 0),
    0
  );

  const totalOutstanding = payments.reduce(
    (total, payment) =>
      total +
      Math.max(
        Number(payment.invoiceAmount || 0) -
          Number(payment.paidAmount || 0),
        0
      ),
    0
  );

  const pendingCount = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  /* =========================
     FORM HANDLERS
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const getBalance = () => {
    const invoiceAmount =
      Number(formData.invoiceAmount) || 0;

    const paidAmount =
      Number(formData.paidAmount) || 0;

    return Math.max(invoiceAmount - paidAmount, 0);
  };

  const calculateStatus = (invoiceAmount, paidAmount) => {
    const invoice = Number(invoiceAmount) || 0;
    const paid = Number(paidAmount) || 0;

    if (paid >= invoice && invoice > 0) {
      return "Paid";
    }

    if (paid > 0 && paid < invoice) {
      return "Partially Paid";
    }

    return "Pending";
  };

  /* =========================
     MODAL
  ========================= */

  const openAddModal = () => {
    setEditingPayment(null);

    setFormData({
      ...defaultForm,
      paymentNo: `SP-2026-${String(
        payments.length + 1
      ).padStart(3, "0")}`,
      invoiceDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (payment) => {
    setEditingPayment(payment);

    setFormData({
      paymentNo: payment.paymentNo,
      supplier: payment.supplier,
      invoiceNo: payment.invoiceNo,
      invoiceDate: payment.invoiceDate,
      dueDate: payment.dueDate,
      paymentDate: payment.paymentDate,
      invoiceAmount: String(payment.invoiceAmount),
      paidAmount: String(payment.paidAmount),
      paymentMethod: payment.paymentMethod,
      referenceNo: payment.referenceNo,
      status: payment.status,
      notes: payment.notes,
    });

    setErrors({});
    setShowModal(true);
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.paymentNo.trim()) {
      newErrors.paymentNo =
        "Payment No. is required.";
    }

    if (!formData.supplier) {
      newErrors.supplier =
        "Please select supplier.";
    }

    if (!formData.invoiceNo.trim()) {
      newErrors.invoiceNo =
        "Invoice No. is required.";
    }

    if (!formData.invoiceDate) {
      newErrors.invoiceDate =
        "Invoice date is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate =
        "Due date is required.";
    }

    const invoiceAmount =
      Number(formData.invoiceAmount) || 0;

    const paidAmount =
      Number(formData.paidAmount) || 0;

    if (invoiceAmount <= 0) {
      newErrors.invoiceAmount =
        "Enter a valid invoice amount.";
    }

    if (paidAmount < 0) {
      newErrors.paidAmount =
        "Paid amount cannot be negative.";
    }

    if (paidAmount > invoiceAmount) {
      newErrors.paidAmount =
        "Paid amount cannot exceed invoice amount.";
    }

    if (
      paidAmount > 0 &&
      !formData.paymentDate
    ) {
      newErrors.paymentDate =
        "Payment date is required when payment is made.";
    }

    if (
      paidAmount > 0 &&
      !formData.referenceNo.trim()
    ) {
      newErrors.referenceNo =
        "Reference / Transaction No. is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SAVE
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const invoiceAmount =
      Number(formData.invoiceAmount) || 0;

    const paidAmount =
      Number(formData.paidAmount) || 0;

    const calculatedStatus = calculateStatus(
      invoiceAmount,
      paidAmount
    );

    const paymentData = {
      ...formData,
      invoiceAmount,
      paidAmount,
      status:
        formData.status === "Cancelled"
          ? "Cancelled"
          : calculatedStatus,
    };

    if (editingPayment) {
      setPayments((previous) =>
        previous.map((payment) =>
          payment.id === editingPayment.id
            ? {
                ...paymentData,
                id: editingPayment.id,
              }
            : payment
        )
      );
    } else {
      setPayments((previous) => [
        ...previous,
        {
          ...paymentData,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
    setEditingPayment(null);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier payment?"
    );

    if (!confirmed) {
      return;
    }

    setPayments((previous) =>
      previous.filter(
        (payment) => payment.id !== id
      )
    );
  };

  /* =========================
     MARK AS PAID
  ========================= */

  const handleMarkAsPaid = (payment) => {
    const balance =
      Number(payment.invoiceAmount) -
      Number(payment.paidAmount);

    if (balance <= 0) {
      return;
    }

    const confirmed = window.confirm(
      `Mark ${payment.paymentNo} as fully paid?`
    );

    if (!confirmed) {
      return;
    }

    setPayments((previous) =>
      previous.map((item) =>
        item.id === payment.id
          ? {
              ...item,
              paidAmount: item.invoiceAmount,
              paymentDate: new Date()
                .toISOString()
                .split("T")[0],
              status: "Paid",
            }
          : item
      )
    );
  };

  /* =========================
     FORMAT CURRENCY
  ========================= */

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <div className="supplier-payments-page">

      {/* HEADER */}
      <div className="supplier-payments-header">
        <div>
          <h1>Supplier Payments</h1>
          <p>
            Track supplier invoices, payments and
            outstanding balances
          </p>
        </div>

        <button
          className="add-supplier-payment-btn"
          onClick={openAddModal}
        >
          + Add Supplier Payment
        </button>
      </div>

      {/* SUMMARY */}
      <div className="supplier-payment-summary">

        <div className="supplier-payment-card">
          <div className="payment-summary-icon blue">
            ₹
          </div>

          <div>
            <span>Total Invoice Value</span>
            <strong>
              {formatCurrency(totalInvoiceAmount)}
            </strong>
          </div>
        </div>

        <div className="supplier-payment-card">
          <div className="payment-summary-icon green">
            ✓
          </div>

          <div>
            <span>Total Paid</span>
            <strong>
              {formatCurrency(totalPaidAmount)}
            </strong>
          </div>
        </div>

        <div className="supplier-payment-card">
          <div className="payment-summary-icon orange">
            ₹
          </div>

          <div>
            <span>Outstanding</span>
            <strong>
              {formatCurrency(totalOutstanding)}
            </strong>
          </div>
        </div>

        <div className="supplier-payment-card">
          <div className="payment-summary-icon purple">
            #
          </div>

          <div>
            <span>Total Payments</span>
            <strong>{totalPayments}</strong>
          </div>
        </div>

        <div className="supplier-payment-card">
          <div className="payment-summary-icon red">
            !
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="supplier-payment-filter-box">

        <div className="supplier-payment-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search payment, supplier, invoice..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={supplierFilter}
          onChange={(e) =>
            setSupplierFilter(e.target.value)
          }
        >
          <option value="All">
            All Suppliers
          </option>

          {suppliers.map((supplier) => (
            <option
              key={supplier}
              value={supplier}
            >
              {supplier}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Partially Paid">
            Partially Paid
          </option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        <select
          value={methodFilter}
          onChange={(e) =>
            setMethodFilter(e.target.value)
          }
        >
          <option value="All">
            All Methods
          </option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">
            Bank Transfer
          </option>
          <option value="UPI">UPI</option>
          <option value="Cheque">Cheque</option>
          <option value="NEFT">NEFT</option>
          <option value="RTGS">RTGS</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="supplier-payments-table-container">
        <table className="supplier-payments-table">

          <thead>
            <tr>
              <th>Payment No.</th>
              <th>Supplier</th>
              <th>Invoice No.</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Invoice Amount</th>
              <th>Paid Amount</th>
              <th>Balance</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => {

                const balance =
                  Math.max(
                    Number(payment.invoiceAmount) -
                      Number(payment.paidAmount),
                    0
                  );

                return (
                  <tr key={payment.id}>

                    <td>
                      <strong className="payment-number">
                        {payment.paymentNo}
                      </strong>
                    </td>

                    <td>
                      <span className="supplier-name">
                        {payment.supplier}
                      </span>
                    </td>

                    <td>
                      <span className="invoice-number">
                        {payment.invoiceNo}
                      </span>
                    </td>

                    <td>
                      {payment.invoiceDate}
                    </td>

                    <td>
                      {payment.dueDate}
                    </td>

                    <td className="amount-text">
                      {formatCurrency(
                        payment.invoiceAmount
                      )}
                    </td>

                    <td className="paid-text">
                      {formatCurrency(
                        payment.paidAmount
                      )}
                    </td>

                    <td
                      className={
                        balance > 0
                          ? "balance-text"
                          : "paid-text"
                      }
                    >
                      {formatCurrency(balance)}
                    </td>

                    <td>
                      <span className="payment-method">
                        {payment.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`supplier-payment-status ${payment.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td>
                      <div className="supplier-payment-actions">

                        <button
                          onClick={() =>
                            setViewPayment(payment)
                          }
                          title="View"
                        >
                          👁
                        </button>

                        <button
                          onClick={() =>
                            openEditModal(payment)
                          }
                          title="Edit"
                        >
                          ✏️
                        </button>

                        {payment.status !==
                          "Paid" &&
                          payment.status !==
                            "Cancelled" && (
                            <button
                              className="mark-paid-action"
                              onClick={() =>
                                handleMarkAsPaid(
                                  payment
                                )
                              }
                              title="Mark as Paid"
                            >
                              ✓
                            </button>
                          )}

                        <button
                          onClick={() =>
                            handleDelete(payment.id)
                          }
                          title="Delete"
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
                  colSpan="11"
                  className="no-supplier-payments"
                >
                  No supplier payments found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="supplier-payment-modal-overlay">

          <div className="supplier-payment-modal">

            <div className="supplier-payment-modal-header">

              <div>
                <h2>
                  {editingPayment
                    ? "Edit Supplier Payment"
                    : "Add Supplier Payment"}
                </h2>

                <p>
                  Enter supplier invoice and payment
                  information
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>

            <form
              className="supplier-payment-form"
              onSubmit={handleSubmit}
            >

              {/* INVOICE DETAILS */}
              <div className="payment-form-section">

                <div className="section-heading">
                  <h3>Invoice Details</h3>
                  <span>
                    Basic supplier invoice information
                  </span>
                </div>

                <div className="supplier-payment-form-grid">

                  <div className="form-group">
                    <label>Payment No. *</label>

                    <input
                      name="paymentNo"
                      value={formData.paymentNo}
                      onChange={handleChange}
                      placeholder="SP-2026-006"
                    />

                    {errors.paymentNo && (
                      <small className="form-error">
                        {errors.paymentNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Supplier *</label>

                    <select
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Supplier
                      </option>

                      <option value="ABC Steel Suppliers">
                        ABC Steel Suppliers
                      </option>

                      <option value="XYZ Industrial Components">
                        XYZ Industrial Components
                      </option>

                      <option value="Maharashtra Packaging">
                        Maharashtra Packaging
                      </option>

                      <option value="Prime Electricals">
                        Prime Electricals
                      </option>

                      <option value="Global Engineering">
                        Global Engineering
                      </option>
                    </select>

                    {errors.supplier && (
                      <small className="form-error">
                        {errors.supplier}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Invoice No. *</label>

                    <input
                      name="invoiceNo"
                      value={formData.invoiceNo}
                      onChange={handleChange}
                      placeholder="INV-2026-001"
                    />

                    {errors.invoiceNo && (
                      <small className="form-error">
                        {errors.invoiceNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Invoice Date *</label>

                    <input
                      type="date"
                      name="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={handleChange}
                    />

                    {errors.invoiceDate && (
                      <small className="form-error">
                        {errors.invoiceDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Due Date *</label>

                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />

                    {errors.dueDate && (
                      <small className="form-error">
                        {errors.dueDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Invoice Amount *</label>

                    <div className="amount-input">
                      <span>₹</span>

                      <input
                        type="number"
                        name="invoiceAmount"
                        value={
                          formData.invoiceAmount
                        }
                        onChange={handleChange}
                        min="0"
                        placeholder="0"
                      />
                    </div>

                    {errors.invoiceAmount && (
                      <small className="form-error">
                        {errors.invoiceAmount}
                      </small>
                    )}
                  </div>

                </div>

              </div>

              {/* PAYMENT DETAILS */}
              <div className="payment-form-section">

                <div className="section-heading">
                  <h3>Payment Details</h3>
                  <span>
                    Record payment and transaction
                    information
                  </span>
                </div>

                <div className="supplier-payment-form-grid">

                  <div className="form-group">
                    <label>Paid Amount</label>

                    <div className="amount-input">
                      <span>₹</span>

                      <input
                        type="number"
                        name="paidAmount"
                        value={
                          formData.paidAmount
                        }
                        onChange={handleChange}
                        min="0"
                        placeholder="0"
                      />
                    </div>

                    {errors.paidAmount && (
                      <small className="form-error">
                        {errors.paidAmount}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Balance Amount</label>

                    <div className="calculated-amount">
                      ₹
                      {getBalance().toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Payment Date</label>

                    <input
                      type="date"
                      name="paymentDate"
                      value={
                        formData.paymentDate
                      }
                      onChange={handleChange}
                    />

                    {errors.paymentDate && (
                      <small className="form-error">
                        {errors.paymentDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Payment Method</label>

                    <select
                      name="paymentMethod"
                      value={
                        formData.paymentMethod
                      }
                      onChange={handleChange}
                    >
                      <option value="Cash">
                        Cash
                      </option>
                      <option value="Bank Transfer">
                        Bank Transfer
                      </option>
                      <option value="UPI">
                        UPI
                      </option>
                      <option value="Cheque">
                        Cheque
                      </option>
                      <option value="NEFT">
                        NEFT
                      </option>
                      <option value="RTGS">
                        RTGS
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Reference / Transaction No.
                    </label>

                    <input
                      name="referenceNo"
                      value={
                        formData.referenceNo
                      }
                      onChange={handleChange}
                      placeholder="TXN-123456"
                    />

                    {errors.referenceNo && (
                      <small className="form-error">
                        {errors.referenceNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">
                        Pending
                      </option>
                      <option value="Partially Paid">
                        Partially Paid
                      </option>
                      <option value="Paid">
                        Paid
                      </option>
                      <option value="Overdue">
                        Overdue
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                </div>

              </div>

              {/* NOTES */}
              <div className="payment-form-section">

                <div className="form-group notes-group">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter payment notes or remarks..."
                  />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="supplier-payment-form-buttons">

                <button
                  type="button"
                  className="cancel-payment-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-payment-btn"
                >
                  {editingPayment
                    ? "Update Payment"
                    : "Save Payment"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {viewPayment && (
        <div className="supplier-payment-modal-overlay">

          <div className="supplier-payment-view-modal">

            <div className="supplier-payment-modal-header">

              <div>
                <h2>
                  Supplier Payment Details
                </h2>

                <p>
                  {viewPayment.paymentNo}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() =>
                  setViewPayment(null)
                }
              >
                ×
              </button>

            </div>

            <div className="supplier-payment-view-content">

              <div className="payment-view-grid">

                <div>
                  <span>Payment No.</span>
                  <strong>
                    {viewPayment.paymentNo}
                  </strong>
                </div>

                <div>
                  <span>Supplier</span>
                  <strong>
                    {viewPayment.supplier}
                  </strong>
                </div>

                <div>
                  <span>Invoice No.</span>
                  <strong>
                    {viewPayment.invoiceNo}
                  </strong>
                </div>

                <div>
                  <span>Invoice Date</span>
                  <strong>
                    {viewPayment.invoiceDate}
                  </strong>
                </div>

                <div>
                  <span>Due Date</span>
                  <strong>
                    {viewPayment.dueDate}
                  </strong>
                </div>

                <div>
                  <span>Payment Date</span>
                  <strong>
                    {viewPayment.paymentDate ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>Payment Method</span>
                  <strong>
                    {viewPayment.paymentMethod}
                  </strong>
                </div>

                <div>
                  <span>Reference No.</span>
                  <strong>
                    {viewPayment.referenceNo ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    <span
                      className={`supplier-payment-status ${viewPayment.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {viewPayment.status}
                    </span>
                  </strong>
                </div>

              </div>

              {/* AMOUNT BOXES */}
              <div className="payment-view-amounts">

                <div>
                  <span>Invoice Amount</span>
                  <strong>
                    {formatCurrency(
                      viewPayment.invoiceAmount
                    )}
                  </strong>
                </div>

                <div className="paid-box">
                  <span>Paid Amount</span>
                  <strong>
                    {formatCurrency(
                      viewPayment.paidAmount
                    )}
                  </strong>
                </div>

                <div className="balance-box">
                  <span>Outstanding Balance</span>
                  <strong>
                    {formatCurrency(
                      Math.max(
                        Number(
                          viewPayment.invoiceAmount
                        ) -
                          Number(
                            viewPayment.paidAmount
                          ),
                        0
                      )
                    )}
                  </strong>
                </div>

              </div>

              {/* NOTES */}
              {viewPayment.notes && (
                <div className="payment-view-notes">
                  <strong>Notes</strong>
                  <p>{viewPayment.notes}</p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SupplierPayments;