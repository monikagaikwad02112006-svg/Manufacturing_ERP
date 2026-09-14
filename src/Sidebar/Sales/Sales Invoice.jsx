import React, { useMemo, useState } from "react";
import "./Sales Invoice.css";

const today = new Date().toISOString().split("T")[0];

const customers = [
  {
    code: "CUS-001",
    name: "Tata Motors Ltd.",
    address: "Pimpri-Chinchwad, Pune, Maharashtra",
    gstin: "27AAACT2727Q1ZV",
  },
  {
    code: "CUS-002",
    name: "Mahindra & Mahindra",
    address: "Nashik Road, Nashik, Maharashtra",
    gstin: "27AAACM3025E1Z8",
  },
  {
    code: "CUS-003",
    name: "Bajaj Auto Ltd.",
    address: "Akurdi, Pune, Maharashtra",
    gstin: "27AAACB2904G1ZX",
  },
  {
    code: "CUS-004",
    name: "Kirloskar Industries",
    address: "Khadki, Pune, Maharashtra",
    gstin: "27AAACK1922H1Z5",
  },
];

const products = [
  {
    code: "PRD-001",
    name: "Hydraulic Pump",
    unit: "Nos",
    rate: 18500,
    gst: 18,
  },
  {
    code: "PRD-002",
    name: "Industrial Motor",
    unit: "Nos",
    rate: 24500,
    gst: 18,
  },
  {
    code: "PRD-003",
    name: "Steel Shaft",
    unit: "Nos",
    rate: 6200,
    gst: 18,
  },
  {
    code: "PRD-004",
    name: "Bearing Assembly",
    unit: "Nos",
    rate: 3500,
    gst: 18,
  },
  {
    code: "PRD-005",
    name: "Control Panel",
    unit: "Nos",
    rate: 15800,
    gst: 18,
  },
  {
    code: "PRD-006",
    name: "Conveyor Belt",
    unit: "Mtr",
    rate: 2800,
    gst: 18,
  },
];

const salesOrders = [
  {
    number: "SO-2026-001",
    customer: "Tata Motors Ltd.",
    address: "Pimpri-Chinchwad, Pune, Maharashtra",
  },
  {
    number: "SO-2026-002",
    customer: "Mahindra & Mahindra",
    address: "Nashik Road, Nashik, Maharashtra",
  },
  {
    number: "SO-2026-003",
    customer: "Bajaj Auto Ltd.",
    address: "Akurdi, Pune, Maharashtra",
  },
  {
    number: "SO-2026-004",
    customer: "Kirloskar Industries",
    address: "Khadki, Pune, Maharashtra",
  },
];

const emptyItem = {
  product: "",
  description: "",
  quantity: "",
  unit: "",
  rate: "",
  gst: 18,
  amount: 0,
};

const emptyForm = {
  invoiceNumber: "",
  salesOrder: "",
  customer: "",
  invoiceDate: today,
  dueDate: "",
  paymentTerms: "30 Days",
  paymentMethod: "Bank Transfer",
  paymentStatus: "Pending",
  invoiceStatus: "Draft",
  billingAddress: "",
  shippingAddress: "",
  gstin: "",
  notes: "",
  items: [{ ...emptyItem }],
};

const initialInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2026-001",
    salesOrder: "SO-2026-001",
    customer: "Tata Motors Ltd.",
    invoiceDate: "2026-09-02",
    dueDate: "2026-10-02",
    paymentTerms: "30 Days",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    invoiceStatus: "Issued",
    billingAddress: "Pimpri-Chinchwad, Pune, Maharashtra",
    shippingAddress: "Pimpri-Chinchwad, Pune, Maharashtra",
    gstin: "27AAACT2727Q1ZV",
    items: [
      {
        product: "Hydraulic Pump",
        description: "Industrial Hydraulic Pump",
        quantity: 4,
        unit: "Nos",
        rate: 18500,
        gst: 18,
        amount: 74000,
      },
    ],
    notes: "Payment received through bank transfer.",
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-002",
    salesOrder: "SO-2026-002",
    customer: "Mahindra & Mahindra",
    invoiceDate: "2026-09-04",
    dueDate: "2026-10-04",
    paymentTerms: "30 Days",
    paymentMethod: "UPI",
    paymentStatus: "Partial",
    invoiceStatus: "Issued",
    billingAddress: "Nashik Road, Nashik, Maharashtra",
    shippingAddress: "Nashik Road, Nashik, Maharashtra",
    gstin: "27AAACM3025E1Z8",
    items: [
      {
        product: "Industrial Motor",
        description: "High Efficiency Industrial Motor",
        quantity: 2,
        unit: "Nos",
        rate: 24500,
        gst: 18,
        amount: 49000,
      },
    ],
    notes: "50% advance received.",
  },
  {
    id: 3,
    invoiceNumber: "INV-2026-003",
    salesOrder: "SO-2026-003",
    customer: "Bajaj Auto Ltd.",
    invoiceDate: "2026-09-06",
    dueDate: "2026-10-06",
    paymentTerms: "30 Days",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Pending",
    invoiceStatus: "Issued",
    billingAddress: "Akurdi, Pune, Maharashtra",
    shippingAddress: "Akurdi, Pune, Maharashtra",
    gstin: "27AAACB2904G1ZX",
    items: [
      {
        product: "Steel Shaft",
        description: "Precision Steel Shaft",
        quantity: 8,
        unit: "Nos",
        rate: 6200,
        gst: 18,
        amount: 49600,
      },
      {
        product: "Bearing Assembly",
        description: "Heavy Duty Bearing Assembly",
        quantity: 6,
        unit: "Nos",
        rate: 3500,
        gst: 18,
        amount: 21000,
      },
    ],
    notes: "",
  },
  {
    id: 4,
    invoiceNumber: "INV-2026-004",
    salesOrder: "SO-2026-004",
    customer: "Kirloskar Industries",
    invoiceDate: "2026-09-07",
    dueDate: "2026-09-22",
    paymentTerms: "15 Days",
    paymentMethod: "Cheque",
    paymentStatus: "Overdue",
    invoiceStatus: "Issued",
    billingAddress: "Khadki, Pune, Maharashtra",
    shippingAddress: "Khadki, Pune, Maharashtra",
    gstin: "27AAACK1922H1Z5",
    items: [
      {
        product: "Control Panel",
        description: "Industrial Electrical Control Panel",
        quantity: 3,
        unit: "Nos",
        rate: 15800,
        gst: 18,
        amount: 47400,
      },
    ],
    notes: "Follow up required for payment.",
  },
];

function SalesInvoice() {
  const [invoices, setInvoices] = useState(initialInvoices);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [customerFilter, setCustomerFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingInvoice, setEditingInvoice] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [itemsError, setItemsError] = useState("");

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);

  const getStatusClass = (value) =>
    value.toLowerCase().replace(/\s+/g, "-");

  const getCustomer = (name) =>
    customers.find((customer) => customer.name === name);

  const getProduct = (name) =>
    products.find((product) => product.name === name);

  const calculateTotals = (items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const gstAmount = items.reduce(
      (sum, item) =>
        sum +
        Number(item.amount || 0) * (Number(item.gst || 0) / 100),
      0
    );

    return {
      subtotal,
      gstAmount,
      grandTotal: subtotal + gstAmount,
    };
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(search.toLowerCase()) ||
        invoice.salesOrder.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || invoice.invoiceStatus === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        invoice.paymentStatus === paymentFilter;

      const matchesCustomer =
        customerFilter === "All" ||
        invoice.customer === customerFilter;

      const matchesDate =
        !dateFilter || invoice.invoiceDate === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesCustomer &&
        matchesDate
      );
    });
  }, [
    invoices,
    search,
    statusFilter,
    paymentFilter,
    customerFilter,
    dateFilter,
  ]);

  const summary = useMemo(() => {
    const totalValue = invoices.reduce(
      (sum, invoice) => sum + calculateTotals(invoice.items).grandTotal,
      0
    );

    const paid = invoices.filter(
      (invoice) => invoice.paymentStatus === "Paid"
    ).length;

    const pending = invoices.filter(
      (invoice) => invoice.paymentStatus === "Pending"
    ).length;

    const partial = invoices.filter(
      (invoice) => invoice.paymentStatus === "Partial"
    ).length;

    const overdue = invoices.filter(
      (invoice) => invoice.paymentStatus === "Overdue"
    ).length;

    const issued = invoices.filter(
      (invoice) => invoice.invoiceStatus === "Issued"
    ).length;

    const draft = invoices.filter(
      (invoice) => invoice.invoiceStatus === "Draft"
    ).length;

    return {
      total: invoices.length,
      issued,
      draft,
      paid,
      pending,
      partial,
      overdue,
      totalValue,
    };
  }, [invoices]);

  const generateInvoiceNumber = () => {
    const nextNumber = invoices.length + 1;
    return `INV-2026-${String(nextNumber).padStart(3, "0")}`;
  };

  const openAddModal = () => {
    setEditingInvoice(null);

    setForm({
      ...emptyForm,
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: today,
      items: [{ ...emptyItem }],
    });

    setItemsError("");
    setShowModal(true);
  };

  const openEditModal = (invoice) => {
    setEditingInvoice(invoice);

    setForm({
      ...invoice,
      items: invoice.items.map((item) => ({ ...item })),
    });

    setItemsError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingInvoice(null);
    setItemsError("");
  };

  const handleCustomerChange = (customerName) => {
    const customer = getCustomer(customerName);

    setForm((prev) => ({
      ...prev,
      customer: customerName,
      billingAddress: customer?.address || "",
      shippingAddress: customer?.address || "",
      gstin: customer?.gstin || "",
    }));
  };

  const handleOrderChange = (orderNumber) => {
    const order = salesOrders.find(
      (item) => item.number === orderNumber
    );

    if (!order) {
      setForm((prev) => ({
        ...prev,
        salesOrder: orderNumber,
      }));
      return;
    }

    const customer = getCustomer(order.customer);

    setForm((prev) => ({
      ...prev,
      salesOrder: orderNumber,
      customer: order.customer,
      billingAddress: order.address,
      shippingAddress: order.address,
      gstin: customer?.gstin || "",
    }));
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const updatedItems = [...prev.items];
      const currentItem = {
        ...updatedItems[index],
        [field]: value,
      };

      if (field === "product") {
        const product = getProduct(value);

        if (product) {
          currentItem.description = product.name;
          currentItem.unit = product.unit;
          currentItem.rate = product.rate;
          currentItem.gst = product.gst;
        } else {
          currentItem.description = "";
          currentItem.unit = "";
          currentItem.rate = "";
          currentItem.gst = 18;
        }
      }

      const quantity = Number(currentItem.quantity) || 0;
      const rate = Number(currentItem.rate) || 0;

      currentItem.amount = quantity * rate;

      updatedItems[index] = currentItem;

      return {
        ...prev,
        items: updatedItems,
      };
    });

    setItemsError("");
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { ...emptyItem }],
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) {
      setItemsError("At least one invoice item is required.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));

    setItemsError("");
  };

  const validateForm = () => {
    if (!form.customer) {
      alert("Please select a customer.");
      return false;
    }

    if (!form.salesOrder) {
      alert("Please select a sales order.");
      return false;
    }

    if (!form.invoiceDate) {
      alert("Please select invoice date.");
      return false;
    }

    if (form.dueDate && form.dueDate < form.invoiceDate) {
      alert("Due date cannot be before invoice date.");
      return false;
    }

    if (!form.billingAddress.trim()) {
      alert("Please enter billing address.");
      return false;
    }

    if (!form.shippingAddress.trim()) {
      alert("Please enter shipping address.");
      return false;
    }

    if (form.items.length === 0) {
      setItemsError("At least one invoice item is required.");
      return false;
    }

    for (const item of form.items) {
      if (!item.product) {
        setItemsError("Please select a product for every item.");
        return false;
      }

      if (Number(item.quantity) <= 0) {
        setItemsError("Quantity must be greater than zero.");
        return false;
      }

      if (Number(item.rate) < 0) {
        setItemsError("Rate cannot be negative.");
        return false;
      }
    }

    return true;
  };

  const saveInvoice = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const cleanedItems = form.items.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
      rate: Number(item.rate),
      gst: Number(item.gst),
      amount: Number(item.amount),
    }));

    const invoiceData = {
      ...form,
      items: cleanedItems,
    };

    if (editingInvoice) {
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.id === editingInvoice.id
            ? {
                ...invoice,
                ...invoiceData,
              }
            : invoice
        )
      );
    } else {
      setInvoices((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...invoiceData,
        },
      ]);
    }

    closeModal();
  };

  const deleteInvoice = (invoice) => {
    const confirmed = window.confirm(
      `Delete invoice ${invoice.invoiceNumber}?`
    );

    if (!confirmed) return;

    setInvoices((prev) =>
      prev.filter((item) => item.id !== invoice.id)
    );
  };

  const updateInvoiceStatus = (invoice, newStatus) => {
    if (
      !window.confirm(
        `Change ${invoice.invoiceNumber} status to ${newStatus}?`
      )
    ) {
      return;
    }

    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoice.id
          ? {
              ...item,
              invoiceStatus: newStatus,
            }
          : item
      )
    );
  };

  const updatePaymentStatus = (invoice, newStatus) => {
    if (
      !window.confirm(
        `Mark ${invoice.invoiceNumber} payment as ${newStatus}?`
      )
    ) {
      return;
    }

    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoice.id
          ? {
              ...item,
              paymentStatus: newStatus,
            }
          : item
      )
    );
  };

  const openViewModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setSelectedInvoice(null);
    setShowViewModal(false);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setCustomerFilter("All");
    setDateFilter("");
  };

  const printInvoice = (invoice) => {
    const totals = calculateTotals(invoice.items);

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print the invoice.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${invoice.invoiceNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #222;
            }
            h1 {
              margin-bottom: 5px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #222;
              padding-bottom: 15px;
              margin-bottom: 25px;
            }
            .details {
              margin-bottom: 25px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: left;
            }
            th {
              background: #f3f4f6;
            }
            .total {
              text-align: right;
              margin-top: 20px;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Sales Invoice</h1>
              <div>Manufacturing ERP</div>
            </div>
            <div>
              <strong>${invoice.invoiceNumber}</strong><br/>
              Date: ${invoice.invoiceDate}
            </div>
          </div>

          <div class="details">
            <strong>Customer:</strong> ${invoice.customer}<br/>
            <strong>GSTIN:</strong> ${invoice.gstin || "-"}<br/>
            <strong>Sales Order:</strong> ${invoice.salesOrder}<br/>
            <strong>Billing Address:</strong> ${invoice.billingAddress}<br/>
            <strong>Shipping Address:</strong> ${invoice.shippingAddress}
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items
                .map(
                  (item) => `
                    <tr>
                      <td>${item.product}</td>
                      <td>${item.description || "-"}</td>
                      <td>${item.quantity}</td>
                      <td>${item.unit}</td>
                      <td>${formatCurrency(item.rate)}</td>
                      <td>${formatCurrency(item.amount)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>

          <div class="total">
            Subtotal: ${formatCurrency(totals.subtotal)}<br/>
            GST: ${formatCurrency(totals.gstAmount)}<br/>
            <strong>Grand Total: ${formatCurrency(
              totals.grandTotal
            )}</strong>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="sales-invoice-page">
      {/* Header */}
      <div className="sales-invoice-header">
        <div>
          <span className="sales-invoice-eyebrow">
            SALES MANAGEMENT
          </span>

          <h1>Sales Invoices</h1>

          <p>
            Create, manage and track customer invoices and payments.
          </p>
        </div>

        <button
          className="sales-invoice-primary-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          New Invoice
        </button>
      </div>

      {/* Summary */}
      <div className="sales-invoice-summary">
        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-icon blue">▣</div>
          <div>
            <span>Total Invoices</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-icon purple">◫</div>
          <div>
            <span>Issued</span>
            <strong>{summary.issued}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-icon orange">◷</div>
          <div>
            <span>Pending</span>
            <strong>{summary.pending}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-icon green">✓</div>
          <div>
            <span>Paid</span>
            <strong>{summary.paid}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-icon red">!</div>
          <div>
            <span>Overdue</span>
            <strong>{summary.overdue}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-icon teal">₹</div>
          <div>
            <span>Total Value</span>
            <strong>{formatCurrency(summary.totalValue)}</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sales-invoice-filter-box">
        <div className="sales-invoice-filter-header">
          <div>
            <h3>Filter Invoices</h3>
            <span>
              Showing {filteredInvoices.length} of {invoices.length}{" "}
              invoices
            </span>
          </div>

          <button
            className="sales-invoice-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div className="sales-invoice-filter-grid">
          <div className="sales-invoice-filter-group search-filter">
            <label>Search</label>
            <input
              type="text"
              placeholder="Invoice, customer or order..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="sales-invoice-filter-group">
            <label>Invoice Status</label>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Issued">Issued</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="sales-invoice-filter-group">
            <label>Payment Status</label>
            <select
              value={paymentFilter}
              onChange={(event) =>
                setPaymentFilter(event.target.value)
              }
            >
              <option value="All">All Payments</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="sales-invoice-filter-group">
            <label>Customer</label>
            <select
              value={customerFilter}
              onChange={(event) =>
                setCustomerFilter(event.target.value)
              }
            >
              <option value="All">All Customers</option>

              {customers.map((customer) => (
                <option key={customer.code} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sales-invoice-filter-group">
            <label>Invoice Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="sales-invoice-table-card">
        <div className="sales-invoice-table-header">
          <div>
            <h2>Invoice Register</h2>
            <p>Manage all sales invoices from one place.</p>
          </div>

          <div className="sales-invoice-record-count">
            {filteredInvoices.length} Records
          </div>
        </div>

        <div className="sales-invoice-table-wrapper">
          <table className="sales-invoice-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Order</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => {
                  const totals = calculateTotals(invoice.items);

                  return (
                    <tr key={invoice.id}>
                      <td>
                        <div className="sales-invoice-number">
                          {invoice.invoiceNumber}
                        </div>

                        <small>
                          {invoice.items.length} item
                          {invoice.items.length !== 1 ? "s" : ""}
                        </small>
                      </td>

                      <td>
                        <div className="sales-invoice-customer">
                          <div className="sales-invoice-avatar">
                            {invoice.customer.charAt(0)}
                          </div>

                          <div>
                            <strong>{invoice.customer}</strong>
                            <small>
                              {invoice.gstin || "GSTIN not added"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="sales-invoice-order">
                          {invoice.salesOrder}
                        </span>
                      </td>

                      <td>{invoice.invoiceDate}</td>

                      <td>{invoice.dueDate || "-"}</td>

                      <td>
                        <strong className="sales-invoice-amount">
                          {formatCurrency(totals.grandTotal)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`sales-invoice-payment ${getStatusClass(
                            invoice.paymentStatus
                          )}`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`sales-invoice-status ${getStatusClass(
                            invoice.invoiceStatus
                          )}`}
                        >
                          {invoice.invoiceStatus}
                        </span>
                      </td>

                      <td>
                        <div className="sales-invoice-actions">
                          <button
                            className="invoice-action view"
                            title="View"
                            onClick={() => openViewModal(invoice)}
                          >
                            View
                          </button>

                          <button
                            className="invoice-action edit"
                            title="Edit"
                            onClick={() => openEditModal(invoice)}
                          >
                            Edit
                          </button>

                          <button
                            className="invoice-action print"
                            title="Print"
                            onClick={() => printInvoice(invoice)}
                          >
                            Print
                          </button>

                          {invoice.paymentStatus !== "Paid" && (
                            <button
                              className="invoice-action paid"
                              title="Mark Paid"
                              onClick={() =>
                                updatePaymentStatus(
                                  invoice,
                                  "Paid"
                                )
                              }
                            >
                              Paid
                            </button>
                          )}

                          {invoice.invoiceStatus === "Draft" && (
                            <button
                              className="invoice-action issue"
                              title="Issue Invoice"
                              onClick={() =>
                                updateInvoiceStatus(
                                  invoice,
                                  "Issued"
                                )
                              }
                            >
                              Issue
                            </button>
                          )}

                          <button
                            className="invoice-action delete"
                            title="Delete"
                            onClick={() => deleteInvoice(invoice)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="sales-invoice-empty">
                      <div className="sales-invoice-empty-icon">
                        ▤
                      </div>

                      <h3>No invoices found</h3>

                      <p>
                        Try changing your filters or create a new
                        invoice.
                      </p>

                      <button
                        className="sales-invoice-primary-btn"
                        onClick={openAddModal}
                      >
                        ＋ New Invoice
                      </button>
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
        <div className="sales-invoice-modal-overlay">
          <div className="sales-invoice-modal">
            <div className="sales-invoice-modal-header">
              <div>
                <span>SALES MANAGEMENT</span>

                <h2>
                  {editingInvoice
                    ? "Edit Sales Invoice"
                    : "Create Sales Invoice"}
                </h2>

                <p>
                  Enter customer, item and payment information.
                </p>
              </div>

              <button
                className="sales-invoice-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form
              className="sales-invoice-form-body"
              onSubmit={saveInvoice}
            >
              {/* Invoice Information */}
              <div className="sales-invoice-section-title">
                <span>01</span>
                Invoice Information
              </div>

              <div className="sales-invoice-form-grid">
                <div className="sales-invoice-form-group">
                  <label>Invoice Number</label>

                  <input
                    type="text"
                    value={form.invoiceNumber}
                    readOnly
                  />
                </div>

                <div className="sales-invoice-form-group">
                  <label>
                    Sales Order <span>*</span>
                  </label>

                  <select
                    value={form.salesOrder}
                    onChange={(event) =>
                      handleOrderChange(event.target.value)
                    }
                    required
                  >
                    <option value="">Select sales order</option>

                    {salesOrders.map((order) => (
                      <option
                        key={order.number}
                        value={order.number}
                      >
                        {order.number} - {order.customer}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sales-invoice-form-group">
                  <label>Invoice Date *</label>

                  <input
                    type="date"
                    value={form.invoiceDate}
                    onChange={(event) =>
                      handleFormChange(
                        "invoiceDate",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="sales-invoice-form-group">
                  <label>Due Date</label>

                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(event) =>
                      handleFormChange(
                        "dueDate",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="sales-invoice-form-group">
                  <label>Invoice Status</label>

                  <select
                    value={form.invoiceStatus}
                    onChange={(event) =>
                      handleFormChange(
                        "invoiceStatus",
                        event.target.value
                      )
                    }
                  >
                    <option value="Draft">Draft</option>
                    <option value="Issued">Issued</option>
                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div className="sales-invoice-form-group">
                  <label>Payment Status</label>

                  <select
                    value={form.paymentStatus}
                    onChange={(event) =>
                      handleFormChange(
                        "paymentStatus",
                        event.target.value
                      )
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Customer */}
              <div className="sales-invoice-section-title">
                <span>02</span>
                Customer Information
              </div>

              <div className="sales-invoice-form-grid">
                <div className="sales-invoice-form-group">
                  <label>
                    Customer <span>*</span>
                  </label>

                  <select
                    value={form.customer}
                    onChange={(event) =>
                      handleCustomerChange(event.target.value)
                    }
                    required
                  >
                    <option value="">Select customer</option>

                    {customers.map((customer) => (
                      <option
                        key={customer.code}
                        value={customer.name}
                      >
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sales-invoice-form-group">
                  <label>GSTIN</label>

                  <input
                    type="text"
                    value={form.gstin}
                    onChange={(event) =>
                      handleFormChange(
                        "gstin",
                        event.target.value
                      )
                    }
                    placeholder="Customer GSTIN"
                  />
                </div>

                <div className="sales-invoice-form-group full-width">
                  <label>
                    Billing Address <span>*</span>
                  </label>

                  <textarea
                    rows="3"
                    value={form.billingAddress}
                    onChange={(event) =>
                      handleFormChange(
                        "billingAddress",
                        event.target.value
                      )
                    }
                    placeholder="Enter billing address"
                    required
                  />
                </div>

                <div className="sales-invoice-form-group full-width">
                  <label>
                    Shipping Address <span>*</span>
                  </label>

                  <textarea
                    rows="3"
                    value={form.shippingAddress}
                    onChange={(event) =>
                      handleFormChange(
                        "shippingAddress",
                        event.target.value
                      )
                    }
                    placeholder="Enter shipping address"
                    required
                  />
                </div>
              </div>

              {/* Items */}
              <div className="sales-invoice-section-title">
                <span>03</span>
                Invoice Items
              </div>

              <div className="sales-invoice-items-box">
                <div className="sales-invoice-items-header">
                  <div>
                    <h3>Products & Services</h3>
                    <p>
                      Add all products included in this invoice.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="sales-invoice-add-item-btn"
                    onClick={addItem}
                  >
                    ＋ Add Item
                  </button>
                </div>

                <div className="sales-invoice-items-table-wrapper">
                  <table className="sales-invoice-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>GST %</th>
                        <th>Amount</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              value={item.product}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "product",
                                  event.target.value
                                )
                              }
                            >
                              <option value="">
                                Select product
                              </option>

                              {products.map((product) => (
                                <option
                                  key={product.code}
                                  value={product.name}
                                >
                                  {product.name}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "description",
                                  event.target.value
                                )
                              }
                              placeholder="Description"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "quantity",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "unit",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.rate}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "rate",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.gst}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "gst",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <strong className="sales-invoice-item-amount">
                              {formatCurrency(item.amount)}
                            </strong>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="sales-invoice-remove-item"
                              onClick={() => removeItem(index)}
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {itemsError && (
                  <div className="sales-invoice-items-error">
                    {itemsError}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="sales-invoice-total-box">
                {(() => {
                  const totals = calculateTotals(form.items);

                  return (
                    <>
                      <div>
                        <span>Subtotal</span>
                        <strong>
                          {formatCurrency(totals.subtotal)}
                        </strong>
                      </div>

                      <div>
                        <span>GST</span>
                        <strong>
                          {formatCurrency(totals.gstAmount)}
                        </strong>
                      </div>

                      <div className="grand-total">
                        <span>Grand Total</span>
                        <strong>
                          {formatCurrency(totals.grandTotal)}
                        </strong>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Payment */}
              <div className="sales-invoice-section-title">
                <span>04</span>
                Payment Information
              </div>

              <div className="sales-invoice-form-grid">
                <div className="sales-invoice-form-group">
                  <label>Payment Terms</label>

                  <select
                    value={form.paymentTerms}
                    onChange={(event) =>
                      handleFormChange(
                        "paymentTerms",
                        event.target.value
                      )
                    }
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="45 Days">45 Days</option>
                    <option value="60 Days">60 Days</option>
                  </select>
                </div>

                <div className="sales-invoice-form-group">
                  <label>Payment Method</label>

                  <select
                    value={form.paymentMethod}
                    onChange={(event) =>
                      handleFormChange(
                        "paymentMethod",
                        event.target.value
                      )
                    }
                  >
                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Card">Card</option>
                  </select>
                </div>

                <div className="sales-invoice-form-group full-width">
                  <label>Notes / Remarks</label>

                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={(event) =>
                      handleFormChange(
                        "notes",
                        event.target.value
                      )
                    }
                    placeholder="Enter payment notes or remarks..."
                  />
                </div>
              </div>

              <div className="sales-invoice-modal-footer">
                <button
                  type="button"
                  className="sales-invoice-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="sales-invoice-save-btn"
                >
                  {editingInvoice
                    ? "Update Invoice"
                    : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedInvoice && (
        <div className="sales-invoice-modal-overlay">
          <div className="sales-invoice-modal sales-invoice-view-modal">
            <div className="sales-invoice-modal-header">
              <div>
                <span>INVOICE DETAILS</span>

                <h2>{selectedInvoice.invoiceNumber}</h2>

                <p>
                  Complete invoice and payment information.
                </p>
              </div>

              <button
                className="sales-invoice-close-btn"
                onClick={closeViewModal}
              >
                ×
              </button>
            </div>

            <div className="sales-invoice-view-body">
              <div className="sales-invoice-view-top">
                <div>
                  <span>Customer</span>
                  <strong>{selectedInvoice.customer}</strong>
                </div>

                <div>
                  <span>Invoice Status</span>
                  <b
                    className={`sales-invoice-status ${getStatusClass(
                      selectedInvoice.invoiceStatus
                    )}`}
                  >
                    {selectedInvoice.invoiceStatus}
                  </b>
                </div>

                <div>
                  <span>Payment Status</span>
                  <b
                    className={`sales-invoice-payment ${getStatusClass(
                      selectedInvoice.paymentStatus
                    )}`}
                  >
                    {selectedInvoice.paymentStatus}
                  </b>
                </div>
              </div>

              <div className="sales-invoice-detail-grid">
                <div>
                  <span>Invoice Number</span>
                  <strong>
                    {selectedInvoice.invoiceNumber}
                  </strong>
                </div>

                <div>
                  <span>Sales Order</span>
                  <strong>{selectedInvoice.salesOrder}</strong>
                </div>

                <div>
                  <span>Invoice Date</span>
                  <strong>{selectedInvoice.invoiceDate}</strong>
                </div>

                <div>
                  <span>Due Date</span>
                  <strong>
                    {selectedInvoice.dueDate || "-"}
                  </strong>
                </div>

                <div>
                  <span>GSTIN</span>
                  <strong>
                    {selectedInvoice.gstin || "-"}
                  </strong>
                </div>

                <div>
                  <span>Payment Method</span>
                  <strong>
                    {selectedInvoice.paymentMethod}
                  </strong>
                </div>
              </div>

              <div className="sales-invoice-address-grid">
                <div className="sales-invoice-address-box">
                  <h3>Billing Address</h3>
                  <p>{selectedInvoice.billingAddress}</p>
                </div>

                <div className="sales-invoice-address-box">
                  <h3>Shipping Address</h3>
                  <p>{selectedInvoice.shippingAddress}</p>
                </div>
              </div>

              <div className="sales-invoice-view-items">
                <div className="sales-invoice-section-title">
                  <span>01</span>
                  Invoice Items
                </div>

                <div className="sales-invoice-view-items-wrapper">
                  <table className="sales-invoice-view-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>GST</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.description || "-"}</td>
                          <td>
                            {item.quantity} {item.unit}
                          </td>
                          <td>{formatCurrency(item.rate)}</td>
                          <td>{item.gst}%</td>
                          <td>
                            <strong>
                              {formatCurrency(item.amount)}
                            </strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sales-invoice-view-total">
                {(() => {
                  const totals = calculateTotals(
                    selectedInvoice.items
                  );

                  return (
                    <>
                      <div>
                        <span>Subtotal</span>
                        <strong>
                          {formatCurrency(totals.subtotal)}
                        </strong>
                      </div>

                      <div>
                        <span>GST</span>
                        <strong>
                          {formatCurrency(totals.gstAmount)}
                        </strong>
                      </div>

                      <div className="grand-total">
                        <span>Grand Total</span>
                        <strong>
                          {formatCurrency(totals.grandTotal)}
                        </strong>
                      </div>
                    </>
                  );
                })()}
              </div>

              {selectedInvoice.notes && (
                <div className="sales-invoice-notes-box">
                  <h3>Notes</h3>
                  <p>{selectedInvoice.notes}</p>
                </div>
              )}

              <div className="sales-invoice-view-footer">
                <button
                  className="sales-invoice-secondary-btn"
                  onClick={closeViewModal}
                >
                  Close
                </button>

                <button
                  className="sales-invoice-save-btn"
                  onClick={() => printInvoice(selectedInvoice)}
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesInvoice;