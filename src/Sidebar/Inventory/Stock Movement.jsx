import { useMemo, useState } from "react";
import "./Stock Movement.css";

const initialMovements = [
  {
    id: 1,
    movementNo: "SM-2026-001",
    date: "2026-08-28",
    type: "Stock In",
    product: "Steel Sheet 2mm",
    productCode: "RM-001",
    warehouse: "Raw Material Store",
    quantity: 100,
    unit: "Kg",
    batchNo: "BTH-260801",
    referenceNo: "GR-2026-001",
    reason: "Purchase Receipt",
    performedBy: "Rahul Patil",
  },
  {
    id: 2,
    movementNo: "SM-2026-002",
    date: "2026-08-29",
    type: "Stock Out",
    product: "Steel Sheet 2mm",
    productCode: "RM-001",
    warehouse: "Raw Material Store",
    quantity: 25,
    unit: "Kg",
    batchNo: "BTH-260801",
    referenceNo: "PROD-2026-001",
    reason: "Production Consumption",
    performedBy: "Amit Shinde",
  },
  {
    id: 3,
    movementNo: "SM-2026-003",
    date: "2026-08-29",
    type: "Stock In",
    product: "Motor Assembly",
    productCode: "FG-001",
    warehouse: "Finished Goods Store",
    quantity: 20,
    unit: "Nos",
    batchNo: "FG-BTH-260829",
    referenceNo: "PROD-2026-001",
    reason: "Production Output",
    performedBy: "Sagar More",
  },
  {
    id: 4,
    movementNo: "SM-2026-004",
    date: "2026-08-30",
    type: "Stock Out",
    product: "Motor Assembly",
    productCode: "FG-001",
    warehouse: "Finished Goods Store",
    quantity: 5,
    unit: "Nos",
    batchNo: "FG-BTH-260829",
    referenceNo: "SO-2026-001",
    reason: "Sales Issue",
    performedBy: "Priya Deshmukh",
  },
  {
    id: 5,
    movementNo: "SM-2026-005",
    date: "2026-08-30",
    type: "Adjustment",
    product: "Copper Wire",
    productCode: "RM-002",
    warehouse: "Raw Material Store",
    quantity: 3,
    unit: "Kg",
    batchNo: "BTH-CU-001",
    referenceNo: "ADJ-2026-001",
    reason: "Stock Adjustment",
    performedBy: "Rahul Patil",
  },
  {
    id: 6,
    movementNo: "SM-2026-006",
    date: "2026-08-31",
    type: "Transfer",
    product: "Aluminium Rod",
    productCode: "RM-003",
    warehouse: "Production Store",
    quantity: 40,
    unit: "Kg",
    batchNo: "AL-BTH-001",
    referenceNo: "TRF-2026-001",
    reason: "Warehouse Transfer",
    performedBy: "Amit Shinde",
  },
];

const productOptions = [
  {
    name: "Steel Sheet 2mm",
    code: "RM-001",
    unit: "Kg",
  },
  {
    name: "Copper Wire",
    code: "RM-002",
    unit: "Kg",
  },
  {
    name: "Aluminium Rod",
    code: "RM-003",
    unit: "Kg",
  },
  {
    name: "Motor Assembly",
    code: "FG-001",
    unit: "Nos",
  },
  {
    name: "Gear Box",
    code: "FG-002",
    unit: "Nos",
  },
];

const warehouseOptions = [
  "Raw Material Store",
  "Production Store",
  "Finished Goods Store",
  "Quarantine Store",
];

function StockMovement() {
  const [movements, setMovements] = useState(initialMovements);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [viewMovement, setViewMovement] = useState(null);
  const [editingMovement, setEditingMovement] = useState(null);

  const [formData, setFormData] = useState({
    movementNo: "",
    date: "",
    type: "Stock In",
    product: "",
    warehouse: "",
    quantity: "",
    unit: "Nos",
    batchNo: "",
    referenceNo: "",
    reason: "Purchase Receipt",
    performedBy: "",
    remarks: "",
  });

  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      const searchText = search.toLowerCase();

      const searchMatch =
        movement.movementNo.toLowerCase().includes(searchText) ||
        movement.product.toLowerCase().includes(searchText) ||
        movement.productCode.toLowerCase().includes(searchText) ||
        movement.referenceNo.toLowerCase().includes(searchText) ||
        movement.performedBy.toLowerCase().includes(searchText);

      const typeMatch =
        typeFilter === "All" || movement.type === typeFilter;

      const warehouseMatch =
        warehouseFilter === "All" ||
        movement.warehouse === warehouseFilter;

      const productMatch =
        productFilter === "All" ||
        movement.product === productFilter;

      const dateMatch =
        !dateFilter || movement.date === dateFilter;

      return (
        searchMatch &&
        typeMatch &&
        warehouseMatch &&
        productMatch &&
        dateMatch
      );
    });
  }, [
    movements,
    search,
    typeFilter,
    warehouseFilter,
    productFilter,
    dateFilter,
  ]);

  const stockInCount = movements.filter(
    (movement) => movement.type === "Stock In"
  ).length;

  const stockOutCount = movements.filter(
    (movement) => movement.type === "Stock Out"
  ).length;

  const adjustmentCount = movements.filter(
    (movement) => movement.type === "Adjustment"
  ).length;

  const transferCount = movements.filter(
    (movement) => movement.type === "Transfer"
  ).length;

  const totalInQuantity = movements
    .filter((movement) => movement.type === "Stock In")
    .reduce((total, movement) => total + Number(movement.quantity), 0);

  const totalOutQuantity = movements
    .filter((movement) => movement.type === "Stock Out")
    .reduce((total, movement) => total + Number(movement.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "product") {
      const selectedProduct = productOptions.find(
        (product) => product.name === value
      );

      if (selectedProduct) {
        setFormData((previous) => ({
          ...previous,
          product: selectedProduct.name,
          unit: selectedProduct.unit,
        }));
      }
    }

    if (name === "type") {
      const reasonMap = {
        "Stock In": "Purchase Receipt",
        "Stock Out": "Sales Issue",
        Adjustment: "Stock Adjustment",
        Transfer: "Warehouse Transfer",
        Return: "Sales Return",
      };

      setFormData((previous) => ({
        ...previous,
        type: value,
        reason: reasonMap[value] || "Other",
      }));
    }
  };

  const openAddModal = () => {
    setEditingMovement(null);

    setFormData({
      movementNo: "",
      date: new Date().toISOString().split("T")[0],
      type: "Stock In",
      product: "",
      warehouse: "",
      quantity: "",
      unit: "Nos",
      batchNo: "",
      referenceNo: "",
      reason: "Purchase Receipt",
      performedBy: "",
      remarks: "",
    });

    setShowModal(true);
  };

  const openEditModal = (movement) => {
    setEditingMovement(movement);

    setFormData({
      movementNo: movement.movementNo,
      date: movement.date,
      type: movement.type,
      product: movement.product,
      warehouse: movement.warehouse,
      quantity: String(movement.quantity),
      unit: movement.unit,
      batchNo: movement.batchNo,
      referenceNo: movement.referenceNo,
      reason: movement.reason,
      performedBy: movement.performedBy,
      remarks: movement.remarks || "",
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.movementNo ||
      !formData.date ||
      !formData.product ||
      !formData.warehouse ||
      !formData.quantity ||
      !formData.performedBy
    ) {
      alert(
        "Please fill Movement No, Date, Product, Warehouse, Quantity and Performed By."
      );
      return;
    }

    if (Number(formData.quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    const selectedProduct = productOptions.find(
      (product) => product.name === formData.product
    );

    const movementData = {
      ...formData,
      productCode: selectedProduct?.code || "",
      quantity: Number(formData.quantity),
      remarks: formData.remarks || "",
    };

    if (editingMovement) {
      setMovements((previous) =>
        previous.map((movement) =>
          movement.id === editingMovement.id
            ? {
                ...movementData,
                id: editingMovement.id,
              }
            : movement
        )
      );
    } else {
      setMovements((previous) => [
        ...previous,
        {
          ...movementData,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stock movement?"
    );

    if (confirmDelete) {
      setMovements((previous) =>
        previous.filter((movement) => movement.id !== id)
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setWarehouseFilter("All");
    setProductFilter("All");
    setDateFilter("");
  };

  return (
    <div className="stock-movement-page">

      {/* HEADER */}
      <div className="stock-movement-header">
        <div>
          <h1>Stock Movement</h1>
          <p>Track all inventory movement and stock transactions</p>
        </div>

        <button
          className="add-stock-movement-btn"
          onClick={openAddModal}
        >
          + Add Stock Movement
        </button>
      </div>

      {/* SUMMARY */}
      <div className="stock-movement-summary">

        <div className="stock-movement-card">
          <div className="movement-card-icon blue">↕</div>
          <div>
            <span>Total Movements</span>
            <strong>{movements.length}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon green">↓</div>
          <div>
            <span>Stock In</span>
            <strong>{stockInCount}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon orange">↑</div>
          <div>
            <span>Stock Out</span>
            <strong>{stockOutCount}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon purple">↔</div>
          <div>
            <span>Transfers</span>
            <strong>{transferCount}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon warning">±</div>
          <div>
            <span>Adjustments</span>
            <strong>{adjustmentCount}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon green">+</div>
          <div>
            <span>Total In Qty</span>
            <strong>{totalInQuantity}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon orange">−</div>
          <div>
            <span>Total Out Qty</span>
            <strong>{totalOutQuantity}</strong>
          </div>
        </div>

        <div className="stock-movement-card">
          <div className="movement-card-icon blue">#</div>
          <div>
            <span>Filtered Records</span>
            <strong>{filteredMovements.length}</strong>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="stock-movement-filter-box">

        <div className="stock-movement-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search movement, product or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Movement Types</option>
          <option value="Stock In">Stock In</option>
          <option value="Stock Out">Stock Out</option>
          <option value="Adjustment">Adjustment</option>
          <option value="Transfer">Transfer</option>
          <option value="Return">Return</option>
        </select>

        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        >
          <option value="All">All Products</option>

          {productOptions.map((product) => (
            <option key={product.code} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <select
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
        >
          <option value="All">All Warehouses</option>

          {warehouseOptions.map((warehouse) => (
            <option key={warehouse} value={warehouse}>
              {warehouse}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button
          className="clear-movement-filter-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {/* TABLE */}
      <div className="stock-movement-table-container">

        <table className="stock-movement-table">

          <thead>
            <tr>
              <th>Movement No.</th>
              <th>Date</th>
              <th>Type</th>
              <th>Product</th>
              <th>Warehouse</th>
              <th>Quantity</th>
              <th>Batch No.</th>
              <th>Reference</th>
              <th>Reason</th>
              <th>Performed By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredMovements.length > 0 ? (
              filteredMovements.map((movement) => (
                <tr key={movement.id}>

                  <td>
                    <strong className="movement-number">
                      {movement.movementNo}
                    </strong>
                  </td>

                  <td>{movement.date}</td>

                  <td>
                    <span
                      className={`movement-type ${movement.type
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {movement.type}
                    </span>
                  </td>

                  <td>
                    <div className="movement-product">
                      <strong>{movement.product}</strong>
                      <small>{movement.productCode}</small>
                    </div>
                  </td>

                  <td>{movement.warehouse}</td>

                  <td>
                    <strong>
                      {movement.quantity} {movement.unit}
                    </strong>
                  </td>

                  <td>
                    <span className="batch-number">
                      {movement.batchNo || "-"}
                    </span>
                  </td>

                  <td>{movement.referenceNo || "-"}</td>

                  <td>{movement.reason}</td>

                  <td>{movement.performedBy}</td>

                  <td>
                    <div className="stock-movement-actions">

                      <button
                        title="View"
                        onClick={() => setViewMovement(movement)}
                      >
                        👁
                      </button>

                      <button
                        title="Edit"
                        onClick={() => openEditModal(movement)}
                      >
                        ✏️
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleDelete(movement.id)}
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
                  colSpan="11"
                  className="no-stock-movements"
                >
                  No stock movements found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="stock-movement-modal-overlay">

          <div className="stock-movement-modal">

            <div className="stock-movement-modal-header">

              <div>
                <h2>
                  {editingMovement
                    ? "Edit Stock Movement"
                    : "Add Stock Movement"}
                </h2>

                <p>
                  Record inventory movement details
                </p>
              </div>

              <button
                type="button"
                className="movement-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form
              className="stock-movement-form"
              onSubmit={handleSubmit}
            >

              <div className="stock-movement-form-grid">

                <div className="form-group">
                  <label>Movement No. *</label>

                  <input
                    name="movementNo"
                    value={formData.movementNo}
                    onChange={handleChange}
                    placeholder="SM-2026-007"
                  />
                </div>

                <div className="form-group">
                  <label>Date *</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Movement Type *</label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="Stock In">Stock In</option>
                    <option value="Stock Out">Stock Out</option>
                    <option value="Adjustment">Adjustment</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Return">Return</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Product *</label>

                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value="">Select Product</option>

                    {productOptions.map((product) => (
                      <option
                        key={product.code}
                        value={product.name}
                      >
                        {product.name} ({product.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Warehouse *</label>

                  <select
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleChange}
                  >
                    <option value="">Select Warehouse</option>

                    {warehouseOptions.map((warehouse) => (
                      <option
                        key={warehouse}
                        value={warehouse}
                      >
                        {warehouse}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity *</label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="form-group">
                  <label>Unit</label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="Nos">Nos</option>
                    <option value="Kg">Kg</option>
                    <option value="Gram">Gram</option>
                    <option value="Meter">Meter</option>
                    <option value="Liter">Liter</option>
                    <option value="Box">Box</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Batch No.</label>

                  <input
                    name="batchNo"
                    value={formData.batchNo}
                    onChange={handleChange}
                    placeholder="Enter batch number"
                  />
                </div>

                <div className="form-group">
                  <label>Reference No.</label>

                  <input
                    name="referenceNo"
                    value={formData.referenceNo}
                    onChange={handleChange}
                    placeholder="PO / GR / SO / PROD No."
                  />
                </div>

                <div className="form-group">
                  <label>Reason</label>

                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  >
                    <option value="Purchase Receipt">
                      Purchase Receipt
                    </option>
                    <option value="Sales Issue">
                      Sales Issue
                    </option>
                    <option value="Production Consumption">
                      Production Consumption
                    </option>
                    <option value="Production Output">
                      Production Output
                    </option>
                    <option value="Stock Adjustment">
                      Stock Adjustment
                    </option>
                    <option value="Warehouse Transfer">
                      Warehouse Transfer
                    </option>
                    <option value="Sales Return">
                      Sales Return
                    </option>
                    <option value="Purchase Return">
                      Purchase Return
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Performed By *</label>

                  <input
                    name="performedBy"
                    value={formData.performedBy}
                    onChange={handleChange}
                    placeholder="Employee name"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Remarks</label>

                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter additional remarks..."
                    rows="3"
                  />
                </div>

              </div>

              <div className="stock-movement-form-buttons">

                <button
                  type="button"
                  className="cancel-movement-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-stock-movement-btn"
                >
                  {editingMovement
                    ? "Update Movement"
                    : "Save Movement"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {viewMovement && (
        <div className="stock-movement-modal-overlay">

          <div className="stock-movement-view-modal">

            <div className="stock-movement-modal-header">

              <div>
                <h2>Stock Movement Details</h2>
                <p>{viewMovement.movementNo}</p>
              </div>

              <button
                type="button"
                className="movement-modal-close"
                onClick={() => setViewMovement(null)}
              >
                ×
              </button>

            </div>

            <div className="movement-view-content">

              <div className="movement-view-status">
                <span
                  className={`movement-type ${viewMovement.type
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {viewMovement.type}
                </span>
              </div>

              <div className="movement-details-grid">

                <div>
                  <label>Movement No.</label>
                  <strong>{viewMovement.movementNo}</strong>
                </div>

                <div>
                  <label>Date</label>
                  <strong>{viewMovement.date}</strong>
                </div>

                <div>
                  <label>Product</label>
                  <strong>{viewMovement.product}</strong>
                </div>

                <div>
                  <label>Product Code</label>
                  <strong>{viewMovement.productCode}</strong>
                </div>

                <div>
                  <label>Warehouse</label>
                  <strong>{viewMovement.warehouse}</strong>
                </div>

                <div>
                  <label>Quantity</label>
                  <strong>
                    {viewMovement.quantity} {viewMovement.unit}
                  </strong>
                </div>

                <div>
                  <label>Batch No.</label>
                  <strong>
                    {viewMovement.batchNo || "-"}
                  </strong>
                </div>

                <div>
                  <label>Reference No.</label>
                  <strong>
                    {viewMovement.referenceNo || "-"}
                  </strong>
                </div>

                <div>
                  <label>Reason</label>
                  <strong>{viewMovement.reason}</strong>
                </div>

                <div>
                  <label>Performed By</label>
                  <strong>{viewMovement.performedBy}</strong>
                </div>

              </div>

              {viewMovement.remarks && (
                <div className="movement-view-remarks">
                  <label>Remarks</label>
                  <p>{viewMovement.remarks}</p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default StockMovement;