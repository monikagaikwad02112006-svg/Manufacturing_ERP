import { useMemo, useState } from "react";
import "./Dispatch.css";

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

const products = [
  {
    id: 1,
    code: "PRD-001",
    name: "Steel Gear",
    unit: "Nos",
    rate: 850,
  },
  {
    id: 2,
    code: "PRD-002",
    name: "Aluminium Rod",
    unit: "Kg",
    rate: 420,
  },
  {
    id: 3,
    code: "PRD-003",
    name: "Industrial Bolt",
    unit: "Nos",
    rate: 35,
  },
  {
    id: 4,
    code: "PRD-004",
    name: "Machine Shaft",
    unit: "Nos",
    rate: 1850,
  },
];

const initialDispatches = [
  {
    id: 1,
    dispatchNo: "DSP-0001",
    dispatchDate: "2026-09-01",
    customerCode: "CUS-001",
    customerName: "Shree Industries",
    orderNo: "ORD-1001",
    vehicleNo: "MH-16-AB-1234",
    transporter: "Fast Logistics",
    driverName: "Rahul Patil",
    driverMobile: "9876543210",
    totalQty: 120,
    totalAmount: 102000,
    status: "Dispatched",
    dispatchType: "Customer Delivery",
    shippingAddress: "MIDC Area, Shirdi, Maharashtra",
    remarks: "Delivered as scheduled",
  },
  {
    id: 2,
    dispatchNo: "DSP-0002",
    dispatchDate: "2026-09-02",
    customerCode: "CUS-002",
    customerName: "Apex Manufacturing",
    orderNo: "ORD-1002",
    vehicleNo: "MH-15-CD-5678",
    transporter: "Express Transport",
    driverName: "Amit Shinde",
    driverMobile: "9823456712",
    totalQty: 75,
    totalAmount: 61500,
    status: "Approved",
    dispatchType: "Customer Delivery",
    shippingAddress: "Industrial Estate, Nashik, Maharashtra",
    remarks: "Ready for dispatch",
  },
  {
    id: 3,
    dispatchNo: "DSP-0003",
    dispatchDate: "2026-09-03",
    customerCode: "CUS-003",
    customerName: "Global Engineering",
    orderNo: "ORD-1003",
    vehicleNo: "",
    transporter: "",
    driverName: "",
    driverMobile: "",
    totalQty: 60,
    totalAmount: 111000,
    status: "Pending",
    dispatchType: "Customer Delivery",
    shippingAddress: "Waluj MIDC, Chhatrapati Sambhajinagar",
    remarks: "Awaiting vehicle assignment",
  },
  {
    id: 4,
    dispatchNo: "DSP-0004",
    dispatchDate: "2026-09-04",
    customerCode: "CUS-004",
    customerName: "Sai Auto Parts",
    orderNo: "ORD-1004",
    vehicleNo: "MH-12-EF-9012",
    transporter: "Sai Transport",
    driverName: "Sagar Jadhav",
    driverMobile: "9765432189",
    totalQty: 45,
    totalAmount: 83250,
    status: "Delivered",
    dispatchType: "Customer Delivery",
    shippingAddress: "Bhosari MIDC, Pune, Maharashtra",
    remarks: "Customer received material",
  },
  {
    id: 5,
    dispatchNo: "DSP-0005",
    dispatchDate: "2026-09-05",
    customerCode: "CUS-001",
    customerName: "Shree Industries",
    orderNo: "ORD-1005",
    vehicleNo: "",
    transporter: "",
    driverName: "",
    driverMobile: "",
    totalQty: 90,
    totalAmount: 76500,
    status: "Cancelled",
    dispatchType: "Customer Delivery",
    shippingAddress: "MIDC Area, Shirdi, Maharashtra",
    remarks: "Dispatch cancelled by customer",
  },
];

const emptyItem = {
  productCode: "",
  productName: "",
  quantity: "",
  unit: "",
  rate: "",
  amount: "",
};

const emptyForm = {
  dispatchNo: "",
  dispatchDate: "",
  customerCode: "",
  customerName: "",
  orderNo: "",
  dispatchType: "Customer Delivery",
  vehicleNo: "",
  transporter: "",
  driverName: "",
  driverMobile: "",
  shippingAddress: "",
  billingAddress: "",
  status: "Pending",
  remarks: "",
  items: [{ ...emptyItem }],
};

function Dispatch() {
  const [dispatches, setDispatches] = useState(initialDispatches);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [modalType, setModalType] = useState(null);
  const [selectedDispatch, setSelectedDispatch] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* =====================================================
     CALCULATIONS
     ===================================================== */

  const totalDispatches = dispatches.length;

  const pendingDispatches = dispatches.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedDispatches = dispatches.filter(
    (item) => item.status === "Approved"
  ).length;

  const dispatchedCount = dispatches.filter(
    (item) => item.status === "Dispatched"
  ).length;

  const deliveredCount = dispatches.filter(
    (item) => item.status === "Delivered"
  ).length;

  const totalValue = dispatches.reduce(
    (total, item) => total + Number(item.totalAmount || 0),
    0
  );

  const totalQuantity = dispatches.reduce(
    (total, item) => total + Number(item.totalQty || 0),
    0
  );

  /* =====================================================
     FILTERING
     ===================================================== */

  const filteredDispatches = useMemo(() => {
    return dispatches.filter((dispatch) => {
      const text = search.toLowerCase();

      const matchesSearch =
        dispatch.dispatchNo.toLowerCase().includes(text) ||
        dispatch.customerName.toLowerCase().includes(text) ||
        dispatch.customerCode.toLowerCase().includes(text) ||
        dispatch.orderNo.toLowerCase().includes(text) ||
        dispatch.vehicleNo.toLowerCase().includes(text);

      const matchesStatus =
        !statusFilter || dispatch.status === statusFilter;

      const matchesCustomer =
        !customerFilter ||
        dispatch.customerCode === customerFilter;

      const matchesDate =
        !dateFilter ||
        dispatch.dispatchDate === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCustomer &&
        matchesDate
      );
    });
  }, [
    dispatches,
    search,
    statusFilter,
    customerFilter,
    dateFilter,
  ]);

  /* =====================================================
     TOTAL CALCULATION
     ===================================================== */

  const calculateItemAmount = (item) => {
    return (
      Number(item.quantity || 0) *
      Number(item.rate || 0)
    );
  };

  const calculateTotalAmount = (items) => {
    return items.reduce(
      (total, item) =>
        total + calculateItemAmount(item),
      0
    );
  };

  const calculateTotalQty = (items) => {
    return items.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  };

  /* =====================================================
     MODAL
     ===================================================== */

  const openAddModal = () => {
    const nextNumber = `DSP-${String(
      dispatches.length + 1
    ).padStart(4, "0")}`;

    setForm({
      ...emptyForm,
      dispatchNo: nextNumber,
      dispatchDate: new Date()
        .toISOString()
        .split("T")[0],
      items: [{ ...emptyItem }],
    });

    setErrors({});
    setSelectedDispatch(null);
    setModalType("add");
  };

  const openEditModal = (dispatch) => {
    setForm({
      dispatchNo: dispatch.dispatchNo,
      dispatchDate: dispatch.dispatchDate,
      customerCode: dispatch.customerCode,
      customerName: dispatch.customerName,
      orderNo: dispatch.orderNo,
      dispatchType: dispatch.dispatchType,
      vehicleNo: dispatch.vehicleNo,
      transporter: dispatch.transporter,
      driverName: dispatch.driverName,
      driverMobile: dispatch.driverMobile,
      shippingAddress: dispatch.shippingAddress,
      billingAddress: dispatch.billingAddress || "",
      status: dispatch.status,
      remarks: dispatch.remarks,
      items: dispatch.items || [{ ...emptyItem }],
    });

    setSelectedDispatch(dispatch);
    setErrors({});
    setModalType("edit");
  };

  const openViewModal = (dispatch) => {
    setSelectedDispatch(dispatch);
    setModalType("view");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedDispatch(null);
    setForm(emptyForm);
    setErrors({});
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
     ITEM HANDLERS
     ===================================================== */

  const handleItemChange = (index, field, value) => {
    setForm((previous) => {
      const updatedItems = [...previous.items];

      if (field === "productCode") {
        const product = products.find(
          (item) => item.code === value
        );

        updatedItems[index] = {
          ...updatedItems[index],
          productCode: value,
          productName: product?.name || "",
          unit: product?.unit || "",
          rate: product?.rate || "",
          amount: calculateItemAmount({
            ...updatedItems[index],
            rate: product?.rate || "",
          }),
        };
      } else {
        const updatedItem = {
          ...updatedItems[index],
          [field]: value,
        };

        updatedItem.amount =
          calculateItemAmount(updatedItem);

        updatedItems[index] = updatedItem;
      }

      return {
        ...previous,
        items: updatedItems,
      };
    });
  };

  const addItem = () => {
    setForm((previous) => ({
      ...previous,
      items: [
        ...previous.items,
        { ...emptyItem },
      ],
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      items: previous.items.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  /* =====================================================
     VALIDATION
     ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!form.dispatchDate) {
      newErrors.dispatchDate =
        "Dispatch date is required.";
    }

    if (!form.customerCode) {
      newErrors.customerCode =
        "Please select a customer.";
    }

    if (!form.orderNo.trim()) {
      newErrors.orderNo =
        "Sales order number is required.";
    }

    if (!form.shippingAddress.trim()) {
      newErrors.shippingAddress =
        "Shipping address is required.";
    }

    if (form.driverMobile) {
      const mobile = form.driverMobile.replace(/\D/g, "");

      if (mobile.length !== 10) {
        newErrors.driverMobile =
          "Enter a valid 10-digit mobile number.";
      }
    }

    const invalidItem = form.items.some(
      (item) =>
        !item.productCode ||
        Number(item.quantity) <= 0 ||
        Number(item.rate) < 0
    );

    if (invalidItem) {
      newErrors.items =
        "Please enter valid product, quantity and rate.";
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

    const totalQty = calculateTotalQty(form.items);
    const totalAmount = calculateTotalAmount(
      form.items
    );

    const paymentData = {
      id:
        modalType === "edit"
          ? selectedDispatch.id
          : Date.now(),

      dispatchNo: form.dispatchNo,
      dispatchDate: form.dispatchDate,
      customerCode: form.customerCode,
      customerName: form.customerName,
      orderNo: form.orderNo.trim(),
      dispatchType: form.dispatchType,
      vehicleNo: form.vehicleNo.trim(),
      transporter: form.transporter.trim(),
      driverName: form.driverName.trim(),
      driverMobile: form.driverMobile.trim(),
      shippingAddress: form.shippingAddress.trim(),
      billingAddress: form.billingAddress.trim(),
      status: form.status,
      remarks: form.remarks.trim(),
      totalQty,
      totalAmount,
      items: form.items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        rate: Number(item.rate),
        amount: calculateItemAmount(item),
      })),
    };

    if (modalType === "edit") {
      setDispatches((previous) =>
        previous.map((item) =>
          item.id === selectedDispatch.id
            ? paymentData
            : item
        )
      );
    } else {
      setDispatches((previous) => [
        paymentData,
        ...previous,
      ]);
    }

    closeModal();
  };

  /* =====================================================
     DELETE
     ===================================================== */

  const handleDelete = (dispatch) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${dispatch.dispatchNo}?`
    );

    if (!confirmed) {
      return;
    }

    setDispatches((previous) =>
      previous.filter(
        (item) => item.id !== dispatch.id
      )
    );
  };

  /* =====================================================
     STATUS
     ===================================================== */

  const updateStatus = (dispatch, status) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark ${dispatch.dispatchNo} as ${status}?`
    );

    if (!confirmed) {
      return;
    }

    setDispatches((previous) =>
      previous.map((item) =>
        item.id === dispatch.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  /* =====================================================
     FILTER CLEAR
     ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCustomerFilter("");
    setDateFilter("");
  };

  /* =====================================================
     HELPERS
     ===================================================== */

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="dispatch-page">

      {/* HEADER */}

      <div className="dispatch-header">
        <div>
          <h1>Dispatch</h1>
          <p>
            Manage customer deliveries and dispatch
            operations
          </p>
        </div>

        <button
          className="dispatch-primary-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          New Dispatch
        </button>
      </div>

      {/* SUMMARY */}

      <div className="dispatch-summary">

        <div className="dispatch-summary-card">
          <div className="dispatch-icon blue">
            🚚
          </div>

          <div>
            <h3>Total Dispatches</h3>
            <strong>{totalDispatches}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon orange">
            ⏳
          </div>

          <div>
            <h3>Pending</h3>
            <strong>{pendingDispatches}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon purple">
            ✓
          </div>

          <div>
            <h3>Approved</h3>
            <strong>{approvedDispatches}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon teal">
            🚛
          </div>

          <div>
            <h3>Dispatched</h3>
            <strong>{dispatchedCount}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon green">
            ✓
          </div>

          <div>
            <h3>Delivered</h3>
            <strong>{deliveredCount}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon blue">
            ₹
          </div>

          <div>
            <h3>Total Value</h3>
            <strong>
              {formatCurrency(totalValue)}
            </strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon warning">
            #
          </div>

          <div>
            <h3>Total Quantity</h3>
            <strong>{totalQuantity}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-icon red">
            #
          </div>

          <div>
            <h3>Filtered Records</h3>
            <strong>
              {filteredDispatches.length}
            </strong>
          </div>
        </div>

      </div>

      {/* FILTER */}

      <div className="dispatch-filter-box">

        <div className="dispatch-filter-header">
          <div>
            <h3>Search & Filters</h3>
            <p>
              Find dispatch records quickly
            </p>
          </div>

          <button
            className="dispatch-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div className="dispatch-filter-grid">

          <div className="dispatch-filter-group search-filter">
            <label>Search</label>

            <input
              type="text"
              placeholder="Dispatch no, customer, order..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="dispatch-filter-group">
            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Dispatched">
                Dispatched
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>

          <div className="dispatch-filter-group">
            <label>Customer</label>

            <select
              value={customerFilter}
              onChange={(e) =>
                setCustomerFilter(e.target.value)
              }
            >
              <option value="">
                All Customers
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
          </div>

          <div className="dispatch-filter-group">
            <label>Dispatch Date</label>

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

      <div className="dispatch-table-card">

        <div className="dispatch-table-header">
          <div>
            <h3>Dispatch Records</h3>

            <p>
              Showing {filteredDispatches.length} record
              {filteredDispatches.length !== 1
                ? "s"
                : ""}
            </p>
          </div>
        </div>

        <div className="dispatch-table-wrapper">

          {filteredDispatches.length === 0 ? (
            <div className="dispatch-empty">
              <div className="dispatch-empty-icon">
                🚚
              </div>

              <h3>No dispatch records found</h3>

              <p>
                Try changing your search or filter
                criteria.
              </p>
            </div>
          ) : (
            <table className="dispatch-table">

              <thead>
                <tr>
                  <th>Dispatch No.</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Order No.</th>
                  <th>Vehicle</th>
                  <th>Transporter</th>
                  <th>Qty</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredDispatches.map(
                  (dispatch) => (
                    <tr key={dispatch.id}>

                      <td>
                        <span className="dispatch-number">
                          {dispatch.dispatchNo}
                        </span>
                      </td>

                      <td>
                        {dispatch.dispatchDate}
                      </td>

                      <td>
                        <div className="dispatch-customer">

                          <div className="dispatch-avatar">
                            {dispatch.customerName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {dispatch.customerName}
                            </strong>

                            <small>
                              {dispatch.customerCode}
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>{dispatch.orderNo}</td>

                      <td>
                        {dispatch.vehicleNo || "—"}
                      </td>

                      <td>
                        {dispatch.transporter || "—"}
                      </td>

                      <td>
                        <strong>
                          {dispatch.totalQty}
                        </strong>
                      </td>

                      <td>
                        <strong className="dispatch-value">
                          {formatCurrency(
                            dispatch.totalAmount
                          )}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`dispatch-status ${getStatusClass(
                            dispatch.status
                          )}`}
                        >
                          {dispatch.status}
                        </span>
                      </td>

                      <td>

                        <div className="dispatch-actions">

                          <button
                            className="dispatch-action view"
                            title="View"
                            onClick={() =>
                              openViewModal(
                                dispatch
                              )
                            }
                          >
                            👁
                          </button>

                          <button
                            className="dispatch-action edit"
                            title="Edit"
                            onClick={() =>
                              openEditModal(
                                dispatch
                              )
                            }
                          >
                            ✎
                          </button>

                          {dispatch.status ===
                            "Pending" && (
                            <button
                              className="dispatch-action approve"
                              title="Approve"
                              onClick={() =>
                                updateStatus(
                                  dispatch,
                                  "Approved"
                                )
                              }
                            >
                              ✓
                            </button>
                          )}

                          {dispatch.status ===
                            "Approved" && (
                            <button
                              className="dispatch-action ship"
                              title="Mark Dispatched"
                              onClick={() =>
                                updateStatus(
                                  dispatch,
                                  "Dispatched"
                                )
                              }
                            >
                              🚚
                            </button>
                          )}

                          {dispatch.status ===
                            "Dispatched" && (
                            <button
                              className="dispatch-action deliver"
                              title="Mark Delivered"
                              onClick={() =>
                                updateStatus(
                                  dispatch,
                                  "Delivered"
                                )
                              }
                            >
                              ✓
                            </button>
                          )}

                          {dispatch.status !==
                            "Cancelled" &&
                            dispatch.status !==
                              "Delivered" && (
                              <button
                                className="dispatch-action cancel"
                                title="Cancel"
                                onClick={() =>
                                  updateStatus(
                                    dispatch,
                                    "Cancelled"
                                  )
                                }
                              >
                                ×
                              </button>
                            )}

                          <button
                            className="dispatch-action delete"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                dispatch
                              )
                            }
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

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
        <div className="dispatch-modal-overlay">

          <div className="dispatch-modal">

            <div className="dispatch-modal-header">

              <div>
                <h2>
                  {modalType === "add"
                    ? "New Dispatch"
                    : "Edit Dispatch"}
                </h2>

                <p>
                  Enter dispatch and delivery details
                </p>
              </div>

              <button
                className="dispatch-close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="dispatch-form"
              onSubmit={handleSubmit}
            >

              <div className="dispatch-form-body">

                {/* DISPATCH DETAILS */}

                <h3 className="dispatch-section-title">
                  Dispatch Details
                </h3>

                <div className="dispatch-form-grid">

                  <div className="dispatch-form-group">
                    <label>
                      Dispatch Number
                    </label>

                    <input
                      type="text"
                      value={form.dispatchNo}
                      disabled
                    />
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Dispatch Date <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="dispatchDate"
                      value={form.dispatchDate}
                      onChange={handleFormChange}
                    />

                    {errors.dispatchDate && (
                      <small className="form-error">
                        {errors.dispatchDate}
                      </small>
                    )}
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Customer <span>*</span>
                    </label>

                    <select
                      value={form.customerCode}
                      onChange={
                        handleCustomerChange
                      }
                    >
                      <option value="">
                        Select Customer
                      </option>

                      {customers.map(
                        (customer) => (
                          <option
                            key={customer.id}
                            value={customer.code}
                          >
                            {customer.name}
                          </option>
                        )
                      )}
                    </select>

                    {errors.customerCode && (
                      <small className="form-error">
                        {errors.customerCode}
                      </small>
                    )}
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Customer Code
                    </label>

                    <input
                      type="text"
                      value={form.customerCode}
                      disabled
                      placeholder="Auto filled"
                    />
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Sales Order No. <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="orderNo"
                      value={form.orderNo}
                      onChange={handleFormChange}
                      placeholder="e.g. ORD-1001"
                    />

                    {errors.orderNo && (
                      <small className="form-error">
                        {errors.orderNo}
                      </small>
                    )}
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Dispatch Type
                    </label>

                    <select
                      name="dispatchType"
                      value={form.dispatchType}
                      onChange={handleFormChange}
                    >
                      <option value="Customer Delivery">
                        Customer Delivery
                      </option>

                      <option value="Partial Delivery">
                        Partial Delivery
                      </option>

                      <option value="Replacement">
                        Replacement
                      </option>

                      <option value="Sample">
                        Sample
                      </option>
                    </select>
                  </div>

                  <div className="dispatch-form-group">
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

                      <option value="Dispatched">
                        Dispatched
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                </div>

                {/* TRANSPORT DETAILS */}

                <h3 className="dispatch-section-title section-space">
                  Transport Details
                </h3>

                <div className="dispatch-form-grid">

                  <div className="dispatch-form-group">
                    <label>
                      Vehicle Number
                    </label>

                    <input
                      type="text"
                      name="vehicleNo"
                      value={form.vehicleNo}
                      onChange={handleFormChange}
                      placeholder="e.g. MH-16-AB-1234"
                    />
                  </div>

                  <div className="dispatch-form-group">
                    <label>Transporter</label>

                    <input
                      type="text"
                      name="transporter"
                      value={form.transporter}
                      onChange={handleFormChange}
                      placeholder="Transport company"
                    />
                  </div>

                  <div className="dispatch-form-group">
                    <label>Driver Name</label>

                    <input
                      type="text"
                      name="driverName"
                      value={form.driverName}
                      onChange={handleFormChange}
                      placeholder="Driver name"
                    />
                  </div>

                  <div className="dispatch-form-group">
                    <label>Driver Mobile</label>

                    <input
                      type="tel"
                      name="driverMobile"
                      value={form.driverMobile}
                      onChange={handleFormChange}
                      placeholder="10 digit mobile"
                      maxLength="10"
                    />

                    {errors.driverMobile && (
                      <small className="form-error">
                        {errors.driverMobile}
                      </small>
                    )}
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Shipping Address <span>*</span>
                    </label>

                    <textarea
                      name="shippingAddress"
                      value={form.shippingAddress}
                      onChange={handleFormChange}
                      placeholder="Delivery address"
                    />

                    {errors.shippingAddress && (
                      <small className="form-error">
                        {errors.shippingAddress}
                      </small>
                    )}
                  </div>

                  <div className="dispatch-form-group">
                    <label>
                      Billing Address
                    </label>

                    <textarea
                      name="billingAddress"
                      value={form.billingAddress}
                      onChange={handleFormChange}
                      placeholder="Billing address"
                    />
                  </div>

                </div>

                {/* ITEMS */}

                <div className="dispatch-items-header">

                  <h3 className="dispatch-section-title">
                    Dispatch Items
                  </h3>

                  <button
                    type="button"
                    className="dispatch-add-item-btn"
                    onClick={addItem}
                  >
                    ＋ Add Item
                  </button>

                </div>

                <div className="dispatch-items-box">

                  <div className="dispatch-items-table-wrapper">

                    <table className="dispatch-items-table">

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

                        {form.items.map(
                          (item, index) => (
                            <tr key={index}>

                              <td>
                                <select
                                  value={
                                    item.productCode
                                  }
                                  onChange={(e) =>
                                    handleItemChange(
                                      index,
                                      "productCode",
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
                                          product.id
                                        }
                                        value={
                                          product.code
                                        }
                                      >
                                        {product.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>

                              <td>
                                <input
                                  type="text"
                                  value={
                                    item.productCode
                                  }
                                  disabled
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
                                  placeholder="Qty"
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  value={
                                    item.unit
                                  }
                                  disabled
                                />
                              </td>

                              <td>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={
                                    item.rate
                                  }
                                  onChange={(e) =>
                                    handleItemChange(
                                      index,
                                      "rate",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>

                              <td>
                                <strong className="dispatch-item-amount">
                                  {formatCurrency(
                                    item.amount
                                  )}
                                </strong>
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="dispatch-remove-item"
                                  onClick={() =>
                                    removeItem(
                                      index
                                    )
                                  }
                                >
                                  ×
                                </button>
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                  {errors.items && (
                    <div className="dispatch-items-error">
                      {errors.items}
                    </div>
                  )}

                </div>

                {/* TOTAL */}

                <div className="dispatch-total-box">

                  <div>
                    <span>Total Quantity</span>

                    <strong>
                      {calculateTotalQty(
                        form.items
                      )}
                    </strong>
                  </div>

                  <div className="grand-total">
                    <span>Total Dispatch Value</span>

                    <strong>
                      {formatCurrency(
                        calculateTotalAmount(
                          form.items
                        )
                      )}
                    </strong>
                  </div>

                </div>

                {/* REMARKS */}

                <div className="dispatch-form-group full-width remarks-field">

                  <label>Remarks</label>

                  <textarea
                    name="remarks"
                    value={form.remarks}
                    onChange={handleFormChange}
                    placeholder="Enter dispatch remarks..."
                    rows="3"
                  />

                </div>

              </div>

              <div className="dispatch-modal-footer">

                <button
                  type="button"
                  className="dispatch-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="dispatch-save-btn"
                >
                  {modalType === "add"
                    ? "Save Dispatch"
                    : "Update Dispatch"}
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
        selectedDispatch && (
          <div className="dispatch-modal-overlay">

            <div className="dispatch-view-modal">

              <div className="dispatch-modal-header">

                <div>
                  <h2>Dispatch Details</h2>

                  <p>
                    {selectedDispatch.dispatchNo}
                  </p>
                </div>

                <button
                  className="dispatch-close-btn"
                  onClick={closeModal}
                >
                  ×
                </button>

              </div>

              <div className="dispatch-view-body">

                <div className="dispatch-view-top">

                  <div>
                    <span className="view-label">
                      Dispatch Number
                    </span>

                    <strong>
                      {selectedDispatch.dispatchNo}
                    </strong>
                  </div>

                  <span
                    className={`dispatch-status ${getStatusClass(
                      selectedDispatch.status
                    )}`}
                  >
                    {selectedDispatch.status}
                  </span>

                </div>

                <div className="dispatch-detail-grid">

                  <div className="dispatch-detail-card">
                    <span>Dispatch Date</span>
                    <strong>
                      {
                        selectedDispatch.dispatchDate
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Customer</span>
                    <strong>
                      {
                        selectedDispatch.customerName
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Customer Code</span>
                    <strong>
                      {
                        selectedDispatch.customerCode
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Sales Order</span>
                    <strong>
                      {selectedDispatch.orderNo}
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Vehicle Number</span>
                    <strong>
                      {
                        selectedDispatch.vehicleNo ||
                        "—"
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Transporter</span>
                    <strong>
                      {
                        selectedDispatch.transporter ||
                        "—"
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Driver</span>
                    <strong>
                      {
                        selectedDispatch.driverName ||
                        "—"
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card">
                    <span>Driver Mobile</span>
                    <strong>
                      {
                        selectedDispatch.driverMobile ||
                        "—"
                      }
                    </strong>
                  </div>

                  <div className="dispatch-detail-card amount-card">
                    <span>Total Value</span>
                    <strong>
                      {formatCurrency(
                        selectedDispatch.totalAmount
                      )}
                    </strong>
                  </div>

                </div>

                <div className="dispatch-address-grid">

                  <div className="dispatch-address-box">
                    <h4>
                      Shipping Address
                    </h4>

                    <p>
                      {
                        selectedDispatch.shippingAddress
                      }
                    </p>
                  </div>

                  <div className="dispatch-address-box">
                    <h4>
                      Billing Address
                    </h4>

                    <p>
                      {
                        selectedDispatch.billingAddress ||
                        "Same as shipping address"
                      }
                    </p>
                  </div>

                </div>

                {selectedDispatch.items &&
                  selectedDispatch.items.length >
                    0 && (
                    <div className="dispatch-view-items">

                      <h3>Dispatch Items</h3>

                      <div className="dispatch-view-items-wrapper">

                        <table className="dispatch-view-items-table">

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

                            {selectedDispatch.items.map(
                              (item, index) => (
                                <tr key={index}>

                                  <td>
                                    {
                                      item.productName
                                    }
                                  </td>

                                  <td>
                                    {
                                      item.productCode
                                    }
                                  </td>

                                  <td>
                                    {
                                      item.quantity
                                    }
                                  </td>

                                  <td>
                                    {item.unit}
                                  </td>

                                  <td>
                                    {formatCurrency(
                                      item.rate
                                    )}
                                  </td>

                                  <td>
                                    <strong>
                                      {formatCurrency(
                                        item.amount
                                      )}
                                    </strong>
                                  </td>

                                </tr>
                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    </div>
                  )}

                <div className="dispatch-view-total">

                  <div>
                    <span>Total Quantity</span>

                    <strong>
                      {
                        selectedDispatch.totalQty
                      }
                    </strong>
                  </div>

                  <div className="grand-total">
                    <span>Total Value</span>

                    <strong>
                      {formatCurrency(
                        selectedDispatch.totalAmount
                      )}
                    </strong>
                  </div>

                </div>

                <div className="dispatch-remarks-box">

                  <h3>Remarks</h3>

                  <p>
                    {
                      selectedDispatch.remarks ||
                      "No remarks added."
                    }
                  </p>

                </div>

              </div>

              <div className="dispatch-modal-footer">

                <button
                  className="dispatch-secondary-btn"
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

export default Dispatch;