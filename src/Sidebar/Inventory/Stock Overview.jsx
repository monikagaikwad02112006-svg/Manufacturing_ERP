import { useMemo, useState } from "react";
import "./Stock Overview.css";

const initialStock = [
  {
    id: 1,
    code: "RM-001",
    product: "Mild Steel Sheet",
    category: "Raw Material",
    warehouse: "Raw Material Store",
    unit: "KG",
    currentStock: 1850,
    reservedStock: 250,
    minStock: 500,
    purchasePrice: 72,
    batchTracking: true,
    batches: [
      {
        batchNo: "MS-260801",
        quantity: 1000,
        date: "2026-08-01",
      },
      {
        batchNo: "MS-260815",
        quantity: 850,
        date: "2026-08-15",
      },
    ],
    movements: [
      {
        date: "2026-08-30",
        type: "Stock In",
        quantity: 500,
        reference: "GR-2026-018",
      },
      {
        date: "2026-08-31",
        type: "Stock Out",
        quantity: 120,
        reference: "PROD-2026-022",
      },
    ],
  },
  {
    id: 2,
    code: "RM-002",
    product: "Stainless Steel Rod",
    category: "Raw Material",
    warehouse: "Raw Material Store",
    unit: "KG",
    currentStock: 420,
    reservedStock: 80,
    minStock: 300,
    purchasePrice: 185,
    batchTracking: true,
    batches: [
      {
        batchNo: "SSR-260820",
        quantity: 420,
        date: "2026-08-20",
      },
    ],
    movements: [
      {
        date: "2026-08-29",
        type: "Stock In",
        quantity: 200,
        reference: "GR-2026-016",
      },
    ],
  },
  {
    id: 3,
    code: "RM-003",
    product: "Industrial Lubricant",
    category: "Consumables",
    warehouse: "Maintenance Store",
    unit: "LTR",
    currentStock: 75,
    reservedStock: 20,
    minStock: 100,
    purchasePrice: 420,
    batchTracking: false,
    batches: [],
    movements: [
      {
        date: "2026-08-28",
        type: "Stock Out",
        quantity: 25,
        reference: "MNT-2026-011",
      },
    ],
  },
  {
    id: 4,
    code: "FG-001",
    product: "Industrial Gear Assembly",
    category: "Finished Goods",
    warehouse: "Finished Goods Store",
    unit: "PCS",
    currentStock: 340,
    reservedStock: 90,
    minStock: 100,
    purchasePrice: 2450,
    batchTracking: true,
    batches: [
      {
        batchNo: "IGA-260825",
        quantity: 200,
        date: "2026-08-25",
      },
      {
        batchNo: "IGA-260830",
        quantity: 140,
        date: "2026-08-30",
      },
    ],
    movements: [
      {
        date: "2026-08-30",
        type: "Stock In",
        quantity: 150,
        reference: "PROD-2026-020",
      },
      {
        date: "2026-08-31",
        type: "Stock Out",
        quantity: 50,
        reference: "SO-2026-014",
      },
    ],
  },
  {
    id: 5,
    code: "FG-002",
    product: "Heavy Duty Coupling",
    category: "Finished Goods",
    warehouse: "Finished Goods Store",
    unit: "PCS",
    currentStock: 65,
    reservedStock: 15,
    minStock: 100,
    purchasePrice: 1850,
    batchTracking: true,
    batches: [
      {
        batchNo: "HDC-260828",
        quantity: 65,
        date: "2026-08-28",
      },
    ],
    movements: [
      {
        date: "2026-08-31",
        type: "Stock Out",
        quantity: 30,
        reference: "SO-2026-016",
      },
    ],
  },
  {
    id: 6,
    code: "RM-004",
    product: "Copper Wire",
    category: "Raw Material",
    warehouse: "Raw Material Store",
    unit: "MTR",
    currentStock: 0,
    reservedStock: 0,
    minStock: 250,
    purchasePrice: 95,
    batchTracking: true,
    batches: [],
    movements: [
      {
        date: "2026-08-29",
        type: "Stock Out",
        quantity: 300,
        reference: "PROD-2026-021",
      },
    ],
  },
];

function StockOverview() {
  const [stockItems, setStockItems] = useState(initialStock);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [viewItem, setViewItem] = useState(null);

  const categories = useMemo(() => {
    return [...new Set(stockItems.map((item) => item.category))];
  }, [stockItems]);

  const warehouses = useMemo(() => {
    return [...new Set(stockItems.map((item) => item.warehouse))];
  }, [stockItems]);

  const getStockStatus = (item) => {
    if (item.currentStock === 0) {
      return "Out of Stock";
    }

    if (item.currentStock <= item.minStock) {
      return "Low Stock";
    }

    return "In Stock";
  };

  const getAvailableStock = (item) => {
    return Math.max(
      item.currentStock - item.reservedStock,
      0
    );
  };

  const filteredItems = useMemo(() => {
    return stockItems.filter((item) => {
      const searchValue = search.toLowerCase();

      const searchMatch =
        item.product.toLowerCase().includes(searchValue) ||
        item.code.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue) ||
        item.warehouse.toLowerCase().includes(searchValue);

      const categoryMatch =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const warehouseMatch =
        warehouseFilter === "All" ||
        item.warehouse === warehouseFilter;

      const itemStatus = getStockStatus(item);

      const statusMatch =
        statusFilter === "All" ||
        itemStatus === statusFilter;

      return (
        searchMatch &&
        categoryMatch &&
        warehouseMatch &&
        statusMatch
      );
    });
  }, [
    stockItems,
    search,
    categoryFilter,
    warehouseFilter,
    statusFilter,
  ]);

  const totalQuantity = stockItems.reduce(
    (total, item) => total + item.currentStock,
    0
  );

  const totalInventoryValue = stockItems.reduce(
    (total, item) =>
      total +
      item.currentStock * item.purchasePrice,
    0
  );

  const totalReserved = stockItems.reduce(
    (total, item) => total + item.reservedStock,
    0
  );

  const totalAvailable = stockItems.reduce(
    (total, item) =>
      total + getAvailableStock(item),
    0
  );

  const lowStockCount = stockItems.filter(
    (item) =>
      item.currentStock > 0 &&
      item.currentStock <= item.minStock
  ).length;

  const outOfStockCount = stockItems.filter(
    (item) => item.currentStock === 0
  ).length;

  const inStockCount = stockItems.filter(
    (item) => item.currentStock > item.minStock
  ).length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setWarehouseFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="stock-overview-page">

      {/* HEADER */}
      <div className="stock-overview-header">
        <div>
          <h1>Stock Overview</h1>
          <p>
            Monitor current inventory, available stock and
            warehouse-wise quantities
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="stock-summary">

        <div className="stock-summary-card">
          <div className="stock-summary-icon blue">
            📦
          </div>

          <div>
            <span>Total Products</span>
            <strong>{stockItems.length}</strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon green">
            #
          </div>

          <div>
            <span>Total Stock Qty.</span>
            <strong>{totalQuantity.toLocaleString()}</strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon purple">
            ₹
          </div>

          <div>
            <span>Inventory Value</span>
            <strong>
              {formatCurrency(totalInventoryValue)}
            </strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon orange">
            ✓
          </div>

          <div>
            <span>Available Stock</span>
            <strong>
              {totalAvailable.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon yellow">
            ⚠
          </div>

          <div>
            <span>Low Stock</span>
            <strong>{lowStockCount}</strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon red">
            !
          </div>

          <div>
            <span>Out of Stock</span>
            <strong>{outOfStockCount}</strong>
          </div>
        </div>
      </div>

      {/* STOCK INFORMATION */}
      <div className="stock-info-strip">

        <div>
          <span>In Stock Items</span>
          <strong>{inStockCount}</strong>
        </div>

        <div>
          <span>Reserved Quantity</span>
          <strong>
            {totalReserved.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Warehouses</span>
          <strong>{warehouses.length}</strong>
        </div>

        <div>
          <span>Filtered Records</span>
          <strong>{filteredItems.length}</strong>
        </div>

      </div>

      {/* FILTERS */}
      <div className="stock-filter-box">

        <div className="stock-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search product, code, warehouse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={warehouseFilter}
          onChange={(e) =>
            setWarehouseFilter(e.target.value)
          }
        >
          <option value="All">All Warehouses</option>

          {warehouses.map((warehouse) => (
            <option key={warehouse} value={warehouse}>
              {warehouse}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">
            Out of Stock
          </option>
        </select>

        <button
          className="clear-stock-filters"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      {/* TABLE */}
      <div className="stock-table-container">

        <table className="stock-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Current Stock</th>
              <th>Reserved</th>
              <th>Available</th>
              <th>Min. Stock</th>
              <th>Unit</th>
              <th>Stock Value</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {

                const status = getStockStatus(item);

                return (
                  <tr key={item.id}>

                    <td>
                      <div className="product-cell">
                        <div className="product-avatar">
                          {item.product
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {item.product}
                          </strong>

                          <span>{item.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>{item.category}</td>

                    <td>
                      <span className="warehouse-name">
                        {item.warehouse}
                      </span>
                    </td>

                    <td>
                      <strong className="current-stock">
                        {item.currentStock.toLocaleString()}
                      </strong>
                    </td>

                    <td>
                      {item.reservedStock.toLocaleString()}
                    </td>

                    <td>
                      <strong className="available-stock">
                        {getAvailableStock(
                          item
                        ).toLocaleString()}
                      </strong>
                    </td>

                    <td>
                      {item.minStock.toLocaleString()}
                    </td>

                    <td>{item.unit}</td>

                    <td className="stock-value">
                      {formatCurrency(
                        item.currentStock *
                          item.purchasePrice
                      )}
                    </td>

                    <td>
                      {item.batchTracking ? (
                        <span className="batch-enabled">
                          Tracked
                        </span>
                      ) : (
                        <span className="batch-disabled">
                          No
                        </span>
                      )}
                    </td>

                    <td>
                      <span
                        className={`stock-status ${status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-stock-btn"
                        onClick={() =>
                          setViewItem(item)
                        }
                      >
                        👁 View
                      </button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="no-stock-records"
                >
                  No stock records found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* VIEW STOCK MODAL */}
      {viewItem && (
        <div className="stock-modal-overlay">

          <div className="stock-view-modal">

            <div className="stock-modal-header">

              <div>
                <h2>{viewItem.product}</h2>

                <p>
                  Product Code: {viewItem.code}
                </p>
              </div>

              <button
                className="stock-modal-close"
                onClick={() =>
                  setViewItem(null)
                }
              >
                ×
              </button>

            </div>

            <div className="stock-view-content">

              {/* TOP CARDS */}
              <div className="stock-detail-cards">

                <div>
                  <span>Current Stock</span>
                  <strong>
                    {viewItem.currentStock.toLocaleString()}{" "}
                    {viewItem.unit}
                  </strong>
                </div>

                <div>
                  <span>Reserved</span>
                  <strong>
                    {viewItem.reservedStock.toLocaleString()}{" "}
                    {viewItem.unit}
                  </strong>
                </div>

                <div>
                  <span>Available</span>
                  <strong>
                    {getAvailableStock(
                      viewItem
                    ).toLocaleString()}{" "}
                    {viewItem.unit}
                  </strong>
                </div>

                <div>
                  <span>Stock Value</span>
                  <strong>
                    {formatCurrency(
                      viewItem.currentStock *
                        viewItem.purchasePrice
                    )}
                  </strong>
                </div>

              </div>

              {/* DETAILS */}
              <div className="stock-details-grid">

                <div>
                  <span>Category</span>
                  <strong>
                    {viewItem.category}
                  </strong>
                </div>

                <div>
                  <span>Warehouse</span>
                  <strong>
                    {viewItem.warehouse}
                  </strong>
                </div>

                <div>
                  <span>Unit</span>
                  <strong>{viewItem.unit}</strong>
                </div>

                <div>
                  <span>Minimum Stock</span>
                  <strong>
                    {viewItem.minStock.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Purchase Price</span>
                  <strong>
                    {formatCurrency(
                      viewItem.purchasePrice
                    )}
                  </strong>
                </div>

                <div>
                  <span>Batch Tracking</span>
                  <strong>
                    {viewItem.batchTracking
                      ? "Enabled"
                      : "Disabled"}
                  </strong>
                </div>

              </div>

              {/* BATCHES */}
              {viewItem.batchTracking && (
                <div className="stock-detail-section">

                  <div className="stock-section-title">
                    <h3>Batch Information</h3>

                    <span>
                      {viewItem.batches.length} Batch(es)
                    </span>
                  </div>

                  {viewItem.batches.length > 0 ? (
                    <div className="batch-table-wrapper">

                      <table className="batch-table">

                        <thead>
                          <tr>
                            <th>Batch No.</th>
                            <th>Quantity</th>
                            <th>Date</th>
                          </tr>
                        </thead>

                        <tbody>

                          {viewItem.batches.map(
                            (batch, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>
                                    {batch.batchNo}
                                  </strong>
                                </td>

                                <td>
                                  {batch.quantity.toLocaleString()}{" "}
                                  {viewItem.unit}
                                </td>

                                <td>
                                  {batch.date}
                                </td>
                              </tr>
                            )
                          )}

                        </tbody>

                      </table>

                    </div>
                  ) : (
                    <p className="empty-batch">
                      No batch information available.
                    </p>
                  )}

                </div>
              )}

              {/* MOVEMENTS */}
              <div className="stock-detail-section">

                <div className="stock-section-title">
                  <h3>Recent Stock Movements</h3>

                  <span>
                    Latest transactions
                  </span>
                </div>

                {viewItem.movements.length > 0 ? (
                  <div className="movement-table-wrapper">

                    <table className="movement-table">

                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Movement</th>
                          <th>Quantity</th>
                          <th>Reference</th>
                        </tr>
                      </thead>

                      <tbody>

                        {viewItem.movements.map(
                          (movement, index) => (
                            <tr key={index}>

                              <td>
                                {movement.date}
                              </td>

                              <td>
                                <span
                                  className={`movement-type ${movement.type
                                    .toLowerCase()
                                    .replace(
                                      " ",
                                      "-"
                                    )}`}
                                >
                                  {movement.type}
                                </span>
                              </td>

                              <td>
                                {movement.quantity.toLocaleString()}{" "}
                                {viewItem.unit}
                              </td>

                              <td>
                                <strong>
                                  {movement.reference}
                                </strong>
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                ) : (
                  <p className="empty-batch">
                    No recent stock movements.
                  </p>
                )}

              </div>

              {/* CLOSE */}
              <div className="stock-view-footer">

                <button
                  onClick={() =>
                    setViewItem(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default StockOverview;