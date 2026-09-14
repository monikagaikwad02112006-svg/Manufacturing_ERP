import { useMemo, useState } from "react";
import "./Goods Receipts.css";

const initialReceipts = [
  {
    id: 1,
    grnNo: "GRN-2026-001",
    poNo: "PO-2026-001",
    supplier: "ABC Steel Suppliers",
    receiptDate: "2026-08-28",
    warehouse: "Raw Material Store",
    receivedBy: "Rahul Patil",
    status: "Completed",
    items: [
      {
        product: "MS Steel Sheet",
        description: "Mild steel sheet 2mm",
        orderedQty: 100,
        receivedQty: 100,
        acceptedQty: 98,
        rejectedQty: 2,
        unit: "Kg",
        batchNo: "BATCH-SS-001",
      },
      {
        product: "MS Angle",
        description: "Mild steel angle",
        orderedQty: 50,
        receivedQty: 50,
        acceptedQty: 50,
        rejectedQty: 0,
        unit: "Kg",
        batchNo: "BATCH-AN-001",
      },
    ],
    notes: "Material received and quality checked.",
  },
  {
    id: 2,
    grnNo: "GRN-2026-002",
    poNo: "PO-2026-002",
    supplier: "XYZ Industrial Components",
    receiptDate: "2026-08-29",
    warehouse: "Finished Goods Store",
    receivedBy: "Amit Shinde",
    status: "Pending",
    items: [
      {
        product: "Bearing 6205",
        description: "Industrial ball bearing",
        orderedQty: 40,
        receivedQty: 40,
        acceptedQty: 40,
        rejectedQty: 0,
        unit: "Nos",
        batchNo: "BATCH-BR-002",
      },
    ],
    notes: "Waiting for final quality approval.",
  },
  {
    id: 3,
    grnNo: "GRN-2026-003",
    poNo: "PO-2026-003",
    supplier: "Maharashtra Packaging",
    receiptDate: "2026-08-30",
    warehouse: "General Store",
    receivedBy: "Sagar More",
    status: "Draft",
    items: [
      {
        product: "Packaging Box",
        description: "Corrugated packaging box",
        orderedQty: 500,
        receivedQty: 480,
        acceptedQty: 480,
        rejectedQty: 0,
        unit: "Nos",
        batchNo: "BATCH-PB-003",
      },
    ],
    notes: "",
  },
  {
    id: 4,
    grnNo: "GRN-2026-004",
    poNo: "PO-2026-004",
    supplier: "Prime Electricals",
    receiptDate: "2026-08-31",
    warehouse: "General Store",
    receivedBy: "Neha Joshi",
    status: "Rejected",
    items: [
      {
        product: "Copper Cable",
        description: "Industrial copper cable",
        orderedQty: 200,
        receivedQty: 200,
        acceptedQty: 150,
        rejectedQty: 50,
        unit: "Meter",
        batchNo: "BATCH-CC-004",
      },
    ],
    notes: "50 meters rejected due to quality issue.",
  },
];

const emptyItem = {
  product: "",
  description: "",
  orderedQty: "",
  receivedQty: "",
  acceptedQty: "",
  rejectedQty: "",
  unit: "Nos",
  batchNo: "",
};

function GoodsReceipts() {
  const [receipts, setReceipts] = useState(initialReceipts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [supplierFilter, setSupplierFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [viewReceipt, setViewReceipt] = useState(null);
  const [editingReceipt, setEditingReceipt] = useState(null);

  const [formData, setFormData] = useState({
    grnNo: "",
    poNo: "",
    supplier: "",
    receiptDate: "",
    warehouse: "",
    receivedBy: "",
    status: "Draft",
    notes: "",
  });

  const [items, setItems] = useState([{ ...emptyItem }]);
  const [errors, setErrors] = useState({});

  const suppliers = useMemo(() => {
    return [...new Set(receipts.map((receipt) => receipt.supplier))];
  }, [receipts]);

  const filteredReceipts = receipts.filter((receipt) => {
    const searchValue = search.toLowerCase();

    const searchMatch =
      receipt.grnNo.toLowerCase().includes(searchValue) ||
      receipt.poNo.toLowerCase().includes(searchValue) ||
      receipt.supplier.toLowerCase().includes(searchValue) ||
      receipt.warehouse.toLowerCase().includes(searchValue) ||
      receipt.receivedBy.toLowerCase().includes(searchValue);

    const statusMatch =
      statusFilter === "All" || receipt.status === statusFilter;

    const supplierMatch =
      supplierFilter === "All" || receipt.supplier === supplierFilter;

    return searchMatch && statusMatch && supplierMatch;
  });

  const totalReceipts = receipts.length;

  const completedCount = receipts.filter(
    (receipt) => receipt.status === "Completed"
  ).length;

  const pendingCount = receipts.filter(
    (receipt) => receipt.status === "Pending"
  ).length;

  const rejectedCount = receipts.filter(
    (receipt) => receipt.status === "Rejected"
  ).length;

  const totalAcceptedQty = receipts.reduce((total, receipt) => {
    return (
      total +
      receipt.items.reduce(
        (itemTotal, item) => itemTotal + Number(item.acceptedQty || 0),
        0
      )
    );
  }, 0);

  const handleFormChange = (e) => {
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

  const handleItemChange = (index, field, value) => {
    setItems((previous) =>
      previous.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        const updatedItem = {
          ...item,
          [field]: value,
        };

        if (field === "receivedQty") {
          const received = Number(value) || 0;
          const accepted = Number(item.acceptedQty) || 0;

          if (accepted > received) {
            updatedItem.acceptedQty = value;
          }
        }

        if (field === "acceptedQty") {
          const accepted = Number(value) || 0;
          const received = Number(item.receivedQty) || 0;

          if (accepted > received) {
            updatedItem.acceptedQty = received;
          }

          updatedItem.rejectedQty = Math.max(
            received - Math.min(accepted, received),
            0
          );
        }

        if (field === "receivedQty") {
          const received = Number(value) || 0;
          const accepted = Number(item.acceptedQty) || 0;

          updatedItem.rejectedQty = Math.max(
            received - Math.min(accepted, received),
            0
          );
        }

        return updatedItem;
      })
    );

    setErrors((previous) => ({
      ...previous,
      items: "",
    }));
  };

  const addItem = () => {
    setItems((previous) => [...previous, { ...emptyItem }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) {
      return;
    }

    setItems((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const resetForm = () => {
    setFormData({
      grnNo: "",
      poNo: "",
      supplier: "",
      receiptDate: new Date().toISOString().split("T")[0],
      warehouse: "",
      receivedBy: "",
      status: "Draft",
      notes: "",
    });

    setItems([{ ...emptyItem }]);
    setErrors({});
  };

  const openAddModal = () => {
    setEditingReceipt(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (receipt) => {
    setEditingReceipt(receipt);

    setFormData({
      grnNo: receipt.grnNo,
      poNo: receipt.poNo,
      supplier: receipt.supplier,
      receiptDate: receipt.receiptDate,
      warehouse: receipt.warehouse,
      receivedBy: receipt.receivedBy,
      status: receipt.status,
      notes: receipt.notes,
    });

    setItems(
      receipt.items.map((item) => ({
        ...item,
        orderedQty: String(item.orderedQty),
        receivedQty: String(item.receivedQty),
        acceptedQty: String(item.acceptedQty),
        rejectedQty: String(item.rejectedQty),
      }))
    );

    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.grnNo.trim()) {
      newErrors.grnNo = "GRN No. is required.";
    }

    if (!formData.poNo.trim()) {
      newErrors.poNo = "Purchase Order No. is required.";
    }

    if (!formData.supplier) {
      newErrors.supplier = "Please select supplier.";
    }

    if (!formData.receiptDate) {
      newErrors.receiptDate = "Receipt date is required.";
    }

    if (!formData.warehouse) {
      newErrors.warehouse = "Please select warehouse.";
    }

    if (!formData.receivedBy.trim()) {
      newErrors.receivedBy = "Received By is required.";
    }

    if (items.length === 0) {
      newErrors.items = "At least one item is required.";
    }

    const hasInvalidItem = items.some((item) => {
      const received = Number(item.receivedQty) || 0;
      const accepted = Number(item.acceptedQty) || 0;

      return (
        !item.product.trim() ||
        received <= 0 ||
        accepted < 0 ||
        accepted > received
      );
    });

    if (hasInvalidItem) {
      newErrors.items =
        "Please enter valid product, received quantity and accepted quantity.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formattedItems = items.map((item) => {
      const receivedQty = Number(item.receivedQty) || 0;
      const acceptedQty = Math.min(
        Number(item.acceptedQty) || 0,
        receivedQty
      );

      return {
        ...item,
        orderedQty: Number(item.orderedQty) || 0,
        receivedQty,
        acceptedQty,
        rejectedQty: Math.max(receivedQty - acceptedQty, 0),
      };
    });

    const receiptData = {
      ...formData,
      items: formattedItems,
    };

    if (editingReceipt) {
      setReceipts((previous) =>
        previous.map((receipt) =>
          receipt.id === editingReceipt.id
            ? {
                ...receiptData,
                id: editingReceipt.id,
              }
            : receipt
        )
      );
    } else {
      setReceipts((previous) => [
        ...previous,
        {
          ...receiptData,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
    setEditingReceipt(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goods receipt?"
    );

    if (!confirmed) {
      return;
    }

    setReceipts((previous) =>
      previous.filter((receipt) => receipt.id !== id)
    );
  };

  const handleComplete = (receipt) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark ${receipt.grnNo} as Completed?`
    );

    if (!confirmed) {
      return;
    }

    setReceipts((previous) =>
      previous.map((item) =>
        item.id === receipt.id
          ? {
              ...item,
              status: "Completed",
            }
          : item
      )
    );
  };

  const getTotalReceived = (receipt) => {
    return receipt.items.reduce(
      (total, item) => total + Number(item.receivedQty || 0),
      0
    );
  };

  const getTotalAccepted = (receipt) => {
    return receipt.items.reduce(
      (total, item) => total + Number(item.acceptedQty || 0),
      0
    );
  };

  const getTotalRejected = (receipt) => {
    return receipt.items.reduce(
      (total, item) => total + Number(item.rejectedQty || 0),
      0
    );
  };

  return (
    <div className="goods-receipts-page">
      {/* HEADER */}
      <div className="goods-receipts-header">
        <div>
          <h1>Goods Receipts</h1>
          <p>Receive and manage materials against purchase orders</p>
        </div>

        <button
          className="add-goods-receipt-btn"
          onClick={openAddModal}
        >
          + Add Goods Receipt
        </button>
      </div>

      {/* SUMMARY */}
      <div className="goods-receipt-summary">
        <div className="goods-receipt-card">
          <div className="summary-icon blue">GR</div>
          <div>
            <span>Total Receipts</span>
            <strong>{totalReceipts}</strong>
          </div>
        </div>

        <div className="goods-receipt-card">
          <div className="summary-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>

        <div className="goods-receipt-card">
          <div className="summary-icon orange">⏳</div>
          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="goods-receipt-card">
          <div className="summary-icon red">!</div>
          <div>
            <span>Rejected</span>
            <strong>{rejectedCount}</strong>
          </div>
        </div>

        <div className="goods-receipt-card">
          <div className="summary-icon purple">Q</div>
          <div>
            <span>Accepted Qty</span>
            <strong>{totalAcceptedQty}</strong>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="goods-receipt-filter-box">
        <div className="goods-receipt-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search GRN, PO, supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
        >
          <option value="All">All Suppliers</option>

          {suppliers.map((supplier) => (
            <option key={supplier} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="goods-receipts-table-container">
        <table className="goods-receipts-table">
          <thead>
            <tr>
              <th>GRN No.</th>
              <th>PO No.</th>
              <th>Supplier</th>
              <th>Receipt Date</th>
              <th>Warehouse</th>
              <th>Items</th>
              <th>Received</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Status</th>
              <th>Received By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>
                    <strong className="grn-number">
                      {receipt.grnNo}
                    </strong>
                  </td>

                  <td>
                    <span className="po-number">
                      {receipt.poNo}
                    </span>
                  </td>

                  <td>
                    <span className="supplier-name">
                      {receipt.supplier}
                    </span>
                  </td>

                  <td>{receipt.receiptDate}</td>

                  <td>{receipt.warehouse}</td>

                  <td>
                    <span className="item-count">
                      {receipt.items.length}
                    </span>
                  </td>

                  <td className="quantity-text">
                    {getTotalReceived(receipt)}
                  </td>

                  <td className="accepted-text">
                    {getTotalAccepted(receipt)}
                  </td>

                  <td className="rejected-text">
                    {getTotalRejected(receipt)}
                  </td>

                  <td>
                    <span
                      className={`gr-status ${receipt.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {receipt.status}
                    </span>
                  </td>

                  <td>{receipt.receivedBy}</td>

                  <td>
                    <div className="goods-receipt-actions">
                      <button
                        onClick={() => setViewReceipt(receipt)}
                        title="View"
                      >
                        👁
                      </button>

                      <button
                        onClick={() => openEditModal(receipt)}
                        title="Edit"
                      >
                        ✏️
                      </button>

                      {receipt.status === "Pending" && (
                        <button
                          className="complete-action"
                          onClick={() => handleComplete(receipt)}
                          title="Complete"
                        >
                          ✓
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(receipt.id)}
                        title="Delete"
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
                  colSpan="12"
                  className="no-goods-receipts"
                >
                  No goods receipts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="goods-receipt-modal-overlay">
          <div className="goods-receipt-modal">
            <div className="goods-receipt-modal-header">
              <div>
                <h2>
                  {editingReceipt
                    ? "Edit Goods Receipt"
                    : "Add Goods Receipt"}
                </h2>

                <p>
                  Enter received material details and quantities
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form
              className="goods-receipt-form"
              onSubmit={handleSubmit}
            >
              {/* BASIC DETAILS */}
              <div className="form-section">
                <div className="section-heading">
                  <h3>Receipt Details</h3>
                  <span>Basic GRN information</span>
                </div>

                <div className="goods-receipt-form-grid">
                  <div className="form-group">
                    <label>GRN No. *</label>

                    <input
                      name="grnNo"
                      value={formData.grnNo}
                      onChange={handleFormChange}
                      placeholder="GRN-2026-005"
                    />

                    {errors.grnNo && (
                      <small className="form-error">
                        {errors.grnNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Purchase Order No. *</label>

                    <input
                      name="poNo"
                      value={formData.poNo}
                      onChange={handleFormChange}
                      placeholder="PO-2026-005"
                    />

                    {errors.poNo && (
                      <small className="form-error">
                        {errors.poNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Supplier *</label>

                    <select
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleFormChange}
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
                    <label>Receipt Date *</label>

                    <input
                      type="date"
                      name="receiptDate"
                      value={formData.receiptDate}
                      onChange={handleFormChange}
                    />

                    {errors.receiptDate && (
                      <small className="form-error">
                        {errors.receiptDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Warehouse *</label>

                    <select
                      name="warehouse"
                      value={formData.warehouse}
                      onChange={handleFormChange}
                    >
                      <option value="">
                        Select Warehouse
                      </option>
                      <option value="Raw Material Store">
                        Raw Material Store
                      </option>
                      <option value="Finished Goods Store">
                        Finished Goods Store
                      </option>
                      <option value="General Store">
                        General Store
                      </option>
                      <option value="Quarantine Store">
                        Quarantine Store
                      </option>
                    </select>

                    {errors.warehouse && (
                      <small className="form-error">
                        {errors.warehouse}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Received By *</label>

                    <input
                      name="receivedBy"
                      value={formData.receivedBy}
                      onChange={handleFormChange}
                      placeholder="Employee name"
                    />

                    {errors.receivedBy && (
                      <small className="form-error">
                        {errors.receivedBy}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">
                        Completed
                      </option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ITEMS */}
              <div className="form-section">
                <div className="section-heading item-heading">
                  <div>
                    <h3>Received Items</h3>
                    <span>
                      Record ordered, received, accepted and
                      rejected quantities
                    </span>
                  </div>

                  <button
                    type="button"
                    className="add-item-btn"
                    onClick={addItem}
                  >
                    + Add Item
                  </button>
                </div>

                {errors.items && (
                  <div className="items-error">
                    {errors.items}
                  </div>
                )}

                <div className="receipt-items-wrapper">
                  <table className="receipt-items-table">
                    <thead>
                      <tr>
                        <th>Product *</th>
                        <th>Description</th>
                        <th>Ordered Qty</th>
                        <th>Received Qty *</th>
                        <th>Accepted Qty *</th>
                        <th>Rejected Qty</th>
                        <th>Unit</th>
                        <th>Batch No.</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              value={item.product}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "product",
                                  e.target.value
                                )
                              }
                              placeholder="Product name"
                            />
                          </td>

                          <td>
                            <input
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.orderedQty}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "orderedQty",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.receivedQty}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "receivedQty",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.acceptedQty}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "acceptedQty",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              value={item.rejectedQty}
                              readOnly
                              className="readonly-input"
                            />
                          </td>

                          <td>
                            <select
                              value={item.unit}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "unit",
                                  e.target.value
                                )
                              }
                            >
                              <option value="Nos">Nos</option>
                              <option value="Kg">Kg</option>
                              <option value="Gram">Gram</option>
                              <option value="Meter">
                                Meter
                              </option>
                              <option value="Liter">
                                Liter
                              </option>
                              <option value="Box">Box</option>
                            </select>
                          </td>

                          <td>
                            <input
                              value={item.batchNo}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "batchNo",
                                  e.target.value
                                )
                              }
                              placeholder="Batch no."
                            />
                          </td>

                          <td>
                            <button
                              type="button"
                              className="remove-item-btn"
                              onClick={() =>
                                removeItem(index)
                              }
                              title="Remove Item"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <div className="form-group notes-group">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows="3"
                    placeholder="Enter any receipt notes, inspection remarks or rejection reason..."
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="goods-receipt-form-buttons">
                <button
                  type="button"
                  className="cancel-gr-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-gr-btn"
                >
                  {editingReceipt
                    ? "Update Goods Receipt"
                    : "Save Goods Receipt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewReceipt && (
        <div className="goods-receipt-modal-overlay">
          <div className="goods-receipt-view-modal">
            <div className="goods-receipt-modal-header">
              <div>
                <h2>Goods Receipt Details</h2>
                <p>{viewReceipt.grnNo}</p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setViewReceipt(null)}
              >
                ×
              </button>
            </div>

            <div className="gr-view-content">
              <div className="gr-view-grid">
                <div>
                  <span>GRN No.</span>
                  <strong>{viewReceipt.grnNo}</strong>
                </div>

                <div>
                  <span>Purchase Order</span>
                  <strong>{viewReceipt.poNo}</strong>
                </div>

                <div>
                  <span>Supplier</span>
                  <strong>{viewReceipt.supplier}</strong>
                </div>

                <div>
                  <span>Receipt Date</span>
                  <strong>{viewReceipt.receiptDate}</strong>
                </div>

                <div>
                  <span>Warehouse</span>
                  <strong>{viewReceipt.warehouse}</strong>
                </div>

                <div>
                  <span>Received By</span>
                  <strong>{viewReceipt.receivedBy}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    <span
                      className={`gr-status ${viewReceipt.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {viewReceipt.status}
                    </span>
                  </strong>
                </div>
              </div>

              <div className="view-items-section">
                <div className="section-heading">
                  <h3>Received Items</h3>
                </div>

                <div className="view-items-table-wrapper">
                  <table className="view-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Ordered</th>
                        <th>Received</th>
                        <th>Accepted</th>
                        <th>Rejected</th>
                        <th>Unit</th>
                        <th>Batch</th>
                      </tr>
                    </thead>

                    <tbody>
                      {viewReceipt.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{item.product}</strong>
                            <small>
                              {item.description}
                            </small>
                          </td>
                          <td>{item.orderedQty}</td>
                          <td>{item.receivedQty}</td>
                          <td className="accepted-text">
                            {item.acceptedQty}
                          </td>
                          <td className="rejected-text">
                            {item.rejectedQty}
                          </td>
                          <td>{item.unit}</td>
                          <td>{item.batchNo || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="gr-view-totals">
                <div>
                  <span>Total Received</span>
                  <strong>
                    {getTotalReceived(viewReceipt)}
                  </strong>
                </div>

                <div>
                  <span>Total Accepted</span>
                  <strong className="accepted-text">
                    {getTotalAccepted(viewReceipt)}
                  </strong>
                </div>

                <div>
                  <span>Total Rejected</span>
                  <strong className="rejected-text">
                    {getTotalRejected(viewReceipt)}
                  </strong>
                </div>
              </div>

              {viewReceipt.notes && (
                <div className="gr-view-notes">
                  <strong>Notes</strong>
                  <p>{viewReceipt.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoodsReceipts;