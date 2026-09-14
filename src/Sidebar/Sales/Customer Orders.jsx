import { useMemo, useState } from "react";
import "./Customer Orders.css";
const customers = [
  {
    name: "ABC Engineering Pvt. Ltd.",
    code: "CUS-001",
    contact: "9876543210",
    address: "Pune, Maharashtra",
  },
  {
    name: "Shree Industries",
    code: "CUS-002",
    contact: "9823456712",
    address: "Nashik, Maharashtra",
  },
  {
    name: "Mahindra Components",
    code: "CUS-003",
    contact: "9812345678",
    address: "Aurangabad, Maharashtra",
  },
  {
    name: "Global Auto Parts",
    code: "CUS-004",
    contact: "9898989898",
    address: "Mumbai, Maharashtra",
  },
];

const products = [
  {
    name: "Gear Housing",
    code: "FG-001",
    unit: "Nos",
    price: 1850,
  },
  {
    name: "Motor Shaft",
    code: "FG-002",
    unit: "Nos",
    price: 1250,
  },
  {
    name: "Steel Bracket",
    code: "FG-003",
    unit: "Nos",
    price: 680,
  },
  {
    name: "Bearing 6205",
    code: "RM-003",
    unit: "Nos",
    price: 420,
  },
];

const initialOrders = [
  {
    id: 1,
    orderNo: "SO-0001",
    orderDate: "2026-09-08",
    customer: "ABC Engineering Pvt. Ltd.",
    customerCode: "CUS-001",
    contact: "9876543210",
    address: "Pune, Maharashtra",
    expectedDate: "2026-09-15",
    priority: "High",
    status: "Confirmed",
    paymentStatus: "Pending",
    createdBy: "Monika",
    notes: "Urgent customer requirement.",
    items: [
      {
        product: "Gear Housing",
        productCode: "FG-001",
        quantity: 20,
        unit: "Nos",
        rate: 1850,
        amount: 37000,
      },
      {
        product: "Motor Shaft",
        productCode: "FG-002",
        quantity: 10,
        unit: "Nos",
        rate: 1250,
        amount: 12500,
      },
    ],
  },
  {
    id: 2,
    orderNo: "SO-0002",
    orderDate: "2026-09-07",
    customer: "Shree Industries",
    customerCode: "CUS-002",
    contact: "9823456712",
    address: "Nashik, Maharashtra",
    expectedDate: "2026-09-18",
    priority: "Medium",
    status: "Pending",
    paymentStatus: "Pending",
    createdBy: "Rahul",
    notes: "Regular monthly order.",
    items: [
      {
        product: "Steel Bracket",
        productCode: "FG-003",
        quantity: 50,
        unit: "Nos",
        rate: 680,
        amount: 34000,
      },
    ],
  },
  {
    id: 3,
    orderNo: "SO-0003",
    orderDate: "2026-09-05",
    customer: "Mahindra Components",
    customerCode: "CUS-003",
    contact: "9812345678",
    address: "Aurangabad, Maharashtra",
    expectedDate: "2026-09-12",
    priority: "High",
    status: "Approved",
    paymentStatus: "Partial",
    createdBy: "Sneha",
    notes: "Partial payment received.",
    items: [
      {
        product: "Motor Shaft",
        productCode: "FG-002",
        quantity: 30,
        unit: "Nos",
        rate: 1250,
        amount: 37500,
      },
    ],
  },
  {
    id: 4,
    orderNo: "SO-0004",
    orderDate: "2026-09-03",
    customer: "Global Auto Parts",
    customerCode: "CUS-004",
    contact: "9898989898",
    address: "Mumbai, Maharashtra",
    expectedDate: "2026-09-10",
    priority: "Low",
    status: "Completed",
    paymentStatus: "Paid",
    createdBy: "Monika",
    notes: "Order completed successfully.",
    items: [
      {
        product: "Bearing 6205",
        productCode: "RM-003",
        quantity: 100,
        unit: "Nos",
        rate: 420,
        amount: 42000,
      },
    ],
  },
];

const emptyItem = {
  product: "",
  productCode: "",
  quantity: "",
  unit: "",
  rate: "",
  amount: 0,
};

const emptyForm = {
  orderDate: new Date().toISOString().split("T")[0],
  customer: "",
  customerCode: "",
  contact: "",
  address: "",
  expectedDate: "",
  priority: "Medium",
  status: "Pending",
  paymentStatus: "Pending",
  createdBy: "",
  notes: "",
  items: [{ ...emptyItem }],
};

function CustomerOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const calculateSubtotal = (items) => {
    return items.reduce(
      (total, item) => total + Number(item.amount || 0),
      0
    );
  };

  const calculateGST = (items) => {
    return calculateSubtotal(items) * 0.18;
  };

  const calculateGrandTotal = (items) => {
    return calculateSubtotal(items) + calculateGST(items);
  };

  const getOrderTotal = (order) => {
    return calculateGrandTotal(order.items);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        order.orderNo.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.customerCode.toLowerCase().includes(searchText);

      const matchesStatus =
        !statusFilter || order.status === statusFilter;

      const matchesPriority =
        !priorityFilter || order.priority === priorityFilter;

      const matchesPayment =
        !paymentFilter ||
        order.paymentStatus === paymentFilter;

      const matchesDate =
        !dateFilter || order.orderDate === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    priorityFilter,
    paymentFilter,
    dateFilter,
  ]);

  const summary = useMemo(() => {
    const totalValue = orders.reduce(
      (sum, order) => sum + getOrderTotal(order),
      0
    );

    return {
      total: orders.length,
      pending: orders.filter(
        (order) => order.status === "Pending"
      ).length,
      approved: orders.filter(
        (order) => order.status === "Approved"
      ).length,
      confirmed: orders.filter(
        (order) => order.status === "Confirmed"
      ).length,
      completed: orders.filter(
        (order) => order.status === "Completed"
      ).length,
      cancelled: orders.filter(
        (order) => order.status === "Cancelled"
      ).length,
      pendingPayment: orders.filter(
        (order) =>
          order.paymentStatus === "Pending" ||
          order.paymentStatus === "Partial"
      ).length,
      totalValue,
    };
  }, [orders]);

  const openAddModal = () => {
    setEditingOrder(null);
    setForm({
      ...emptyForm,
      items: [{ ...emptyItem }],
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);

    setForm({
      orderDate: order.orderDate,
      customer: order.customer,
      customerCode: order.customerCode,
      contact: order.contact,
      address: order.address,
      expectedDate: order.expectedDate,
      priority: order.priority,
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdBy: order.createdBy,
      notes: order.notes,
      items: order.items.map((item) => ({ ...item })),
    });

    setErrors({});
    setShowModal(true);
  };

  const openViewModal = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setEditingOrder(null);
    setSelectedOrder(null);
    setErrors({});
  };

  const handleCustomerChange = (value) => {
    const customer = customers.find(
      (item) => item.name === value
    );

    setForm((prev) => ({
      ...prev,
      customer: value,
      customerCode: customer?.code || "",
      contact: customer?.contact || "",
      address: customer?.address || "",
    }));

    setErrors((prev) => ({
      ...prev,
      customer: "",
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];

      if (field === "product") {
        const selectedProduct = products.find(
          (product) => product.name === value
        );

        items[index] = {
          ...items[index],
          product: value,
          productCode: selectedProduct?.code || "",
          unit: selectedProduct?.unit || "",
          rate: selectedProduct?.price || "",
        };
      } else {
        items[index] = {
          ...items[index],
          [field]: value,
        };
      }

      const quantity = Number(items[index].quantity || 0);
      const rate = Number(items[index].rate || 0);

      items[index].amount = quantity * rate;

      return {
        ...prev,
        items,
      };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { ...emptyItem }],
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.orderDate) {
      newErrors.orderDate = "Order date is required.";
    }

    if (!form.customer) {
      newErrors.customer = "Please select a customer.";
    }

    if (!form.expectedDate) {
      newErrors.expectedDate =
        "Expected delivery date is required.";
    }

    if (!form.createdBy.trim()) {
      newErrors.createdBy = "Created by is required.";
    }

    if (!form.items.length) {
      newErrors.items = "Add at least one item.";
    }

    form.items.forEach((item, index) => {
      if (!item.product) {
        newErrors[`product_${index}`] =
          "Select a product.";
      }

      if (!item.quantity || Number(item.quantity) <= 0) {
        newErrors[`quantity_${index}`] =
          "Enter valid quantity.";
      }

      if (!item.rate || Number(item.rate) <= 0) {
        newErrors[`rate_${index}`] =
          "Enter valid rate.";
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingOrder) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === editingOrder.id
            ? {
                ...order,
                ...form,
                items: form.items.map((item) => ({
                  ...item,
                  quantity: Number(item.quantity),
                  rate: Number(item.rate),
                  amount:
                    Number(item.quantity) *
                    Number(item.rate),
                })),
              }
            : order
        )
      );
    } else {
      const newOrder = {
        id: Date.now(),
        orderNo: `SO-${String(orders.length + 1).padStart(
          4,
          "0"
        )}`,
        ...form,
        items: form.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          rate: Number(item.rate),
          amount:
            Number(item.quantity) * Number(item.rate),
        })),
      };

      setOrders((prev) => [newOrder, ...prev]);
    }

    closeModal();
  };

  const deleteOrder = (id) => {
    const order = orders.find((item) => item.id === id);

    if (!order) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${order.orderNo}?`
    );

    if (!confirmed) return;

    setOrders((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateStatus = (id, newStatus) => {
    const order = orders.find((item) => item.id === id);

    if (!order) return;

    const confirmed = window.confirm(
      `Change ${order.orderNo} status to ${newStatus}?`
    );

    if (!confirmed) return;

    setOrders((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setPaymentFilter("");
    setDateFilter("");
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const formatCurrency = (value) => {
    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="customer-orders-page">
      {/* HEADER */}
      <div className="customer-orders-header">
        <div>
          <h1>Customer Orders</h1>
          <p>
            Manage customer orders, items, delivery dates and
            payment status.
          </p>
        </div>

        <button
          className="customer-orders-primary-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          New Customer Order
        </button>
      </div>

      {/* SUMMARY */}
      <div className="customer-orders-summary">
        <div className="customer-order-summary-card">
          <div className="customer-order-icon blue">▣</div>
          <div>
            <span>Total Orders</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card">
          <div className="customer-order-icon orange">◷</div>
          <div>
            <span>Pending</span>
            <strong>{summary.pending}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card">
          <div className="customer-order-icon purple">✓</div>
          <div>
            <span>Approved</span>
            <strong>{summary.approved}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card">
          <div className="customer-order-icon blue">●</div>
          <div>
            <span>Confirmed</span>
            <strong>{summary.confirmed}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card">
          <div className="customer-order-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card">
          <div className="customer-order-icon red">×</div>
          <div>
            <span>Cancelled</span>
            <strong>{summary.cancelled}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card">
          <div className="customer-order-icon warning">₹</div>
          <div>
            <span>Payment Pending</span>
            <strong>{summary.pendingPayment}</strong>
          </div>
        </div>

        <div className="customer-order-summary-card total-value">
          <div className="customer-order-icon teal">₹</div>
          <div>
            <span>Total Order Value</span>
            <strong>{formatCurrency(summary.totalValue)}</strong>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="customer-orders-filter-box">
        <div className="customer-orders-filter-header">
          <div>
            <h3>Search & Filters</h3>
            <span>
              Search and filter customer orders quickly.
            </span>
          </div>

          <button
            className="customer-orders-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div className="customer-orders-filter-grid">
          <div className="customer-orders-filter-group search-filter">
            <label>Search</label>
            <input
              type="text"
              placeholder="Order number, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="customer-orders-filter-group">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Dispatch Ready">
                Dispatch Ready
              </option>
            </select>
          </div>

          <div className="customer-orders-filter-group">
            <label>Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="customer-orders-filter-group">
            <label>Payment</label>
            <select
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value)
              }
            >
              <option value="">All Payment Status</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="customer-orders-filter-group">
            <label>Order Date</label>
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

      {/* TABLE */}
      <div className="customer-orders-table-card">
        <div className="customer-orders-table-header">
          <div>
            <h3>Customer Order List</h3>
            <span>
              Showing {filteredOrders.length} of{" "}
              {orders.length} orders
            </span>
          </div>
        </div>

        <div className="customer-orders-table-wrapper">
          <table className="customer-orders-table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Expected Date</th>
                <th>Items</th>
                <th>Order Value</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong className="customer-order-number">
                        {order.orderNo}
                      </strong>
                    </td>

                    <td>{order.orderDate}</td>

                    <td>
                      <div className="customer-order-customer">
                        <div className="customer-order-avatar">
                          {order.customer.charAt(0)}
                        </div>

                        <div>
                          <strong>{order.customer}</strong>
                          <span>{order.customerCode}</span>
                        </div>
                      </div>
                    </td>

                    <td>{order.expectedDate}</td>

                    <td>{order.items.length}</td>

                    <td>
                      <strong>
                        {formatCurrency(
                          getOrderTotal(order)
                        )}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`customer-order-priority ${order.priority.toLowerCase()}`}
                      >
                        {order.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`customer-order-status ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`customer-order-payment ${order.paymentStatus.toLowerCase()}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td>
                      <div className="customer-order-actions">
                        <button
                          className="order-action view"
                          onClick={() =>
                            openViewModal(order)
                          }
                        >
                          View
                        </button>

                        <button
                          className="order-action edit"
                          onClick={() =>
                            openEditModal(order)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="order-action delete"
                          onClick={() =>
                            deleteOrder(order.id)
                          }
                        >
                          Delete
                        </button>

                        {order.status === "Pending" && (
                          <button
                            className="order-action approve"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </button>
                        )}

                        {order.status === "Approved" && (
                          <button
                            className="order-action confirm"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "Confirmed"
                              )
                            }
                          >
                            Confirm
                          </button>
                        )}

                        {order.status === "Confirmed" && (
                          <button
                            className="order-action dispatch"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "Dispatch Ready"
                              )
                            }
                          >
                            Dispatch Ready
                          </button>
                        )}

                        {(order.status === "Pending" ||
                          order.status === "Approved") && (
                          <button
                            className="order-action cancel"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "Cancelled"
                              )
                            }
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">
                    <div className="customer-orders-empty">
                      <div className="customer-orders-empty-icon">
                        ⌕
                      </div>
                      <h3>No customer orders found</h3>
                      <p>
                        Try changing your search or filter
                        criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="customer-orders-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="customer-orders-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="customer-orders-modal-header">
              <div>
                <h2>
                  {editingOrder
                    ? "Edit Customer Order"
                    : "New Customer Order"}
                </h2>

                <p>
                  Enter customer order and item details.
                </p>
              </div>

              <button
                className="customer-orders-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="customer-orders-form-body">
                {/* BASIC DETAILS */}
                <div className="customer-orders-section-title">
                  <span>01</span>
                  Order Information
                </div>

                <div className="customer-orders-form-grid">
                  <div className="customer-orders-form-group">
                    <label>Order Date *</label>
                    <input
                      type="date"
                      name="orderDate"
                      value={form.orderDate}
                      onChange={handleFormChange}
                    />

                    {errors.orderDate && (
                      <small>{errors.orderDate}</small>
                    )}
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Customer *</label>
                    <select
                      value={form.customer}
                      onChange={(e) =>
                        handleCustomerChange(
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select Customer
                      </option>

                      {customers.map((customer) => (
                        <option
                          key={customer.code}
                          value={customer.name}
                        >
                          {customer.name}
                        </option>
                      ))}
                    </select>

                    {errors.customer && (
                      <small>{errors.customer}</small>
                    )}
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Customer Code</label>
                    <input
                      type="text"
                      value={form.customerCode}
                      readOnly
                      placeholder="Auto-filled"
                    />
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Contact</label>
                    <input
                      type="text"
                      value={form.contact}
                      readOnly
                      placeholder="Auto-filled"
                    />
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Expected Delivery Date *</label>
                    <input
                      type="date"
                      name="expectedDate"
                      value={form.expectedDate}
                      onChange={handleFormChange}
                    />

                    {errors.expectedDate && (
                      <small>{errors.expectedDate}</small>
                    )}
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleFormChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">
                        Medium
                      </option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                    >
                      <option value="Pending">
                        Pending
                      </option>
                      <option value="Approved">
                        Approved
                      </option>
                      <option value="Confirmed">
                        Confirmed
                      </option>
                      <option value="Dispatch Ready">
                        Dispatch Ready
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Payment Status</label>
                    <select
                      name="paymentStatus"
                      value={form.paymentStatus}
                      onChange={handleFormChange}
                    >
                      <option value="Pending">
                        Pending
                      </option>
                      <option value="Partial">
                        Partial
                      </option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>

                  <div className="customer-orders-form-group">
                    <label>Created By *</label>
                    <input
                      type="text"
                      name="createdBy"
                      value={form.createdBy}
                      onChange={handleFormChange}
                      placeholder="Employee name"
                    />

                    {errors.createdBy && (
                      <small>{errors.createdBy}</small>
                    )}
                  </div>

                  <div className="customer-orders-form-group full-width">
                    <label>Customer Address</label>
                    <textarea
                      value={form.address}
                      readOnly
                      rows="2"
                      placeholder="Auto-filled customer address"
                    />
                  </div>
                </div>

                {/* ITEMS */}
                <div className="customer-orders-section-title item-section-title">
                  <span>02</span>
                  Order Items
                </div>

                <div className="customer-orders-items-box">
                  <div className="customer-orders-items-header">
                    <h3>Products</h3>

                    <button
                      type="button"
                      className="customer-orders-add-item-btn"
                      onClick={addItem}
                    >
                      ＋ Add Item
                    </button>
                  </div>

                  <div className="customer-orders-items-table-wrapper">
                    <table className="customer-orders-items-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Code</th>
                          <th>Qty</th>
                          <th>Unit</th>
                          <th>Rate</th>
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
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "product",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">
                                  Select Product
                                </option>

                                {products.map(
                                  (product) => (
                                    <option
                                      key={
                                        product.code
                                      }
                                      value={
                                        product.name
                                      }
                                    >
                                      {product.name}
                                    </option>
                                  )
                                )}
                              </select>

                              {errors[
                                `product_${index}`
                              ] && (
                                <small>
                                  {
                                    errors[
                                      `product_${index}`
                                    ]
                                  }
                                </small>
                              )}
                            </td>

                            <td>
                              <input
                                type="text"
                                value={
                                  item.productCode
                                }
                                readOnly
                                placeholder="-"
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                min="1"
                                value={
                                  item.quantity
                                }
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                              />

                              {errors[
                                `quantity_${index}`
                              ] && (
                                <small>
                                  {
                                    errors[
                                      `quantity_${index}`
                                    ]
                                  }
                                </small>
                              )}
                            </td>

                            <td>
                              <input
                                type="text"
                                value={item.unit}
                                readOnly
                                placeholder="-"
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.rate}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "rate",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                              />

                              {errors[
                                `rate_${index}`
                              ] && (
                                <small>
                                  {
                                    errors[
                                      `rate_${index}`
                                    ]
                                  }
                                </small>
                              )}
                            </td>

                            <td>
                              <strong className="customer-orders-item-amount">
                                {formatCurrency(
                                  item.amount
                                )}
                              </strong>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="customer-orders-remove-item"
                                onClick={() =>
                                  removeItem(index)
                                }
                                disabled={
                                  form.items.length ===
                                  1
                                }
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {errors.items && (
                    <div className="customer-orders-items-error">
                      {errors.items}
                    </div>
                  )}

                  {/* TOTALS */}
                  <div className="customer-orders-total-box">
                    <div>
                      <span>Subtotal</span>
                      <strong>
                        {formatCurrency(
                          calculateSubtotal(form.items)
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>GST (18%)</span>
                      <strong>
                        {formatCurrency(
                          calculateGST(form.items)
                        )}
                      </strong>
                    </div>

                    <div className="grand-total">
                      <span>Grand Total</span>
                      <strong>
                        {formatCurrency(
                          calculateGrandTotal(
                            form.items
                          )
                        )}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="customer-orders-section-title">
                  <span>03</span>
                  Additional Information
                </div>

                <div className="customer-orders-form-grid">
                  <div className="customer-orders-form-group full-width">
                    <label>Notes</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleFormChange}
                      rows="4"
                      placeholder="Enter customer order notes..."
                    />
                  </div>
                </div>
              </div>

              <div className="customer-orders-modal-footer">
                <button
                  type="button"
                  className="customer-orders-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="customer-orders-save-btn"
                >
                  {editingOrder
                    ? "Update Order"
                    : "Save Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedOrder && (
        <div
          className="customer-orders-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="customer-orders-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="customer-orders-modal-header">
              <div>
                <h2>Customer Order Details</h2>
                <p>{selectedOrder.orderNo}</p>
              </div>

              <button
                className="customer-orders-close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <div className="customer-orders-view-body">
              <div className="customer-orders-view-top">
                <div>
                  <span>Order Number</span>
                  <strong>
                    {selectedOrder.orderNo}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    <span
                      className={`customer-order-status ${getStatusClass(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </strong>
                </div>

                <div>
                  <span>Order Value</span>
                  <strong>
                    {formatCurrency(
                      getOrderTotal(selectedOrder)
                    )}
                  </strong>
                </div>
              </div>

              <div className="customer-orders-detail-grid">
                <div>
                  <span>Order Date</span>
                  <strong>
                    {selectedOrder.orderDate}
                  </strong>
                </div>

                <div>
                  <span>Expected Delivery</span>
                  <strong>
                    {selectedOrder.expectedDate}
                  </strong>
                </div>

                <div>
                  <span>Customer</span>
                  <strong>
                    {selectedOrder.customer}
                  </strong>
                </div>

                <div>
                  <span>Customer Code</span>
                  <strong>
                    {selectedOrder.customerCode}
                  </strong>
                </div>

                <div>
                  <span>Contact</span>
                  <strong>
                    {selectedOrder.contact}
                  </strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>
                    {selectedOrder.priority}
                  </strong>
                </div>

                <div>
                  <span>Payment Status</span>
                  <strong>
                    {selectedOrder.paymentStatus}
                  </strong>
                </div>

                <div>
                  <span>Created By</span>
                  <strong>
                    {selectedOrder.createdBy}
                  </strong>
                </div>
              </div>

              <div className="customer-orders-address-box">
                <span>Customer Address</span>
                <p>{selectedOrder.address}</p>
              </div>

              <div className="customer-orders-view-items">
                <h3>Order Items</h3>

                <div className="customer-orders-view-items-wrapper">
                  <table className="customer-orders-view-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Code</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedOrder.items.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>{item.product}</td>
                            <td>{item.productCode}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unit}</td>
                            <td>
                              {formatCurrency(item.rate)}
                            </td>
                            <td>
                              {formatCurrency(
                                item.amount
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="customer-orders-view-total">
                <div>
                  <span>Subtotal</span>
                  <strong>
                    {formatCurrency(
                      calculateSubtotal(
                        selectedOrder.items
                      )
                    )}
                  </strong>
                </div>

                <div>
                  <span>GST (18%)</span>
                  <strong>
                    {formatCurrency(
                      calculateGST(selectedOrder.items)
                    )}
                  </strong>
                </div>

                <div className="grand-total">
                  <span>Grand Total</span>
                  <strong>
                    {formatCurrency(
                      getOrderTotal(selectedOrder)
                    )}
                  </strong>
                </div>
              </div>

              <div className="customer-orders-address-box">
                <span>Notes</span>
                <p>
                  {selectedOrder.notes ||
                    "No notes available."}
                </p>
              </div>
            </div>

            <div className="customer-orders-modal-footer">
              <button
                className="customer-orders-secondary-btn"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                className="customer-orders-save-btn"
                onClick={() => {
                  closeModal();
                  openEditModal(selectedOrder);
                }}
              >
                Edit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;