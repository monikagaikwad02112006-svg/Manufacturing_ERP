import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const dashboardData = {
  stats: {
    products: 248,
    suppliers: 42,
    customers: 186,
    employees: 74,
    warehouses: 5,
    machines: 28,
    salesOrders: 86,
    purchaseOrders: 32,
    productionOrders: 24,
    lowStockItems: 12,
    qualityIssues: 7,
    pendingPayments: 18,
  },

  sales: {
    revenue: 1248500,
    orders: 86,
    pending: 14,
    completed: 58,
  },

  purchase: {
    totalOrders: 32,
    pending: 8,
    approved: 12,
    received: 12,
  },

  production: {
    planned: 24,
    inProgress: 9,
    completed: 11,
    delayed: 4,
  },

  inventory: {
    totalItems: 248,
    totalUnits: 18450,
    lowStock: 12,
    outOfStock: 3,
  },

  quality: {
    inspections: 126,
    passed: 112,
    rejected: 7,
    quarantine: 7,
  },

  hr: {
    employees: 74,
    present: 68,
    absent: 4,
    onLeave: 2,
  },

  maintenance: {
    totalMachines: 28,
    healthy: 21,
    upcoming: 5,
    overdue: 2,
  },
};

const recentActivities = [
  {
    id: 1,
    type: "sales",
    title: "New customer order received",
    description: "ORD-1048 from Metro Industrial Supplies",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "production",
    title: "Production order completed",
    description: "PROD-2026-018 • 500 units completed",
    time: "32 minutes ago",
  },
  {
    id: 3,
    type: "inventory",
    title: "Low stock alert",
    description: "MS-204 Steel Sheet is below minimum level",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "purchase",
    title: "Purchase order approved",
    description: "PO-2026-031 • Industrial Components",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "quality",
    title: "Quality inspection completed",
    description: "QC-0086 • Batch inspection passed",
    time: "3 hours ago",
  },
  {
    id: 6,
    type: "maintenance",
    title: "Machine maintenance scheduled",
    description: "CNC Machine M-014 • Tomorrow at 10:00 AM",
    time: "4 hours ago",
  },
];

const quickActions = [
  {
    title: "New Sales Order",
    description: "Create customer order",
    icon: "＋",
    path: "/customer-orders",
  },
  {
    title: "Purchase Order",
    description: "Create purchase order",
    icon: "▤",
    path: "/purchase-orders",
  },
  {
    title: "Production Order",
    description: "Plan production",
    icon: "⚙",
    path: "/production-orders",
  },
  {
    title: "Stock Movement",
    description: "Update inventory",
    icon: "⇄",
    path: "/stock-movement",
  },
];

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [showAllActivities, setShowAllActivities] = useState(false);

  const visibleActivities = useMemo(() => {
    if (showAllActivities) {
      return recentActivities;
    }

    return recentActivities.slice(0, 4);
  }, [showAllActivities]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <div className="dashboard-breadcrumb">
            Home <span>/</span> Dashboard
          </div>

          <h1>Good Morning, Admin 👋</h1>

          <p>
            Here&apos;s what&apos;s happening across your manufacturing
            operations today.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <select
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event.target.value)}
            className="dashboard-period-select"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>

          <button
            type="button"
            className="dashboard-refresh-btn"
            onClick={() => window.location.reload()}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Friendly Overview Banner */}
      <section className="dashboard-welcome-card">
        <div className="welcome-content">
          <div className="welcome-badge">
            ● System Status: All Services Operational
          </div>

          <h2>Your factory is running smoothly.</h2>

          <p>
            You have{" "}
            <strong>{dashboardData.production.inProgress} production orders</strong>{" "}
            currently in progress and{" "}
            <strong>{dashboardData.inventory.lowStock} low-stock items</strong>{" "}
            that need attention.
          </p>

          <div className="welcome-actions">
            <Link to="/production-orders" className="welcome-primary-btn">
              View Production
            </Link>

            <Link to="/stock-overview" className="welcome-secondary-btn">
              Check Inventory
            </Link>
          </div>
        </div>

        <div className="welcome-illustration">
          <div className="factory-building">
            <div className="factory-roof"></div>

            <div className="factory-body">
              <div className="factory-window"></div>
              <div className="factory-window"></div>
              <div className="factory-window"></div>
            </div>

            <div className="factory-smoke smoke-one"></div>
            <div className="factory-smoke smoke-two"></div>
          </div>
        </div>
      </section>

      {/* Main KPI Cards */}
      <section className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon blue">₹</div>

            <span className="stat-trend positive">
              ↑ 12.8%
            </span>
          </div>

          <div className="stat-label">Sales Revenue</div>

          <div className="stat-value">
            {formatCurrency(dashboardData.sales.revenue)}
          </div>

          <div className="stat-footer">
            <span>{dashboardData.sales.orders} total orders</span>
            <Link to="/sales-invoice">View Sales →</Link>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon purple">▤</div>

            <span className="stat-trend positive">
              ↑ 8.4%
            </span>
          </div>

          <div className="stat-label">Purchase Orders</div>

          <div className="stat-value">
            {dashboardData.purchase.totalOrders}
          </div>

          <div className="stat-footer">
            <span>{dashboardData.purchase.pending} pending approval</span>
            <Link to="/purchase-orders">View Orders →</Link>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon orange">⚙</div>

            <span className="stat-trend neutral">
              {dashboardData.production.inProgress} active
            </span>
          </div>

          <div className="stat-label">Production Orders</div>

          <div className="stat-value">
            {dashboardData.production.planned}
          </div>

          <div className="stat-footer">
            <span>{dashboardData.production.completed} completed</span>
            <Link to="/production-tracking">Track →</Link>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon green">▣</div>

            <span className="stat-trend warning">
              {dashboardData.inventory.lowStock} alerts
            </span>
          </div>

          <div className="stat-label">Inventory Items</div>

          <div className="stat-value">
            {dashboardData.inventory.totalItems}
          </div>

          <div className="stat-footer">
            <span>{dashboardData.inventory.totalUnits.toLocaleString()} units</span>
            <Link to="/stock-overview">View Stock →</Link>
          </div>
        </div>
      </section>

      {/* Secondary KPI Row */}
      <section className="dashboard-mini-grid">
        <div className="mini-stat-card">
          <div className="mini-stat-icon">✓</div>
          <div>
            <span>Quality Pass Rate</span>
            <strong>
              {Math.round(
                (dashboardData.quality.passed /
                  dashboardData.quality.inspections) *
                  100
              )}
              %
            </strong>
          </div>
        </div>

        <div className="mini-stat-card">
          <div className="mini-stat-icon">♙</div>
          <div>
            <span>Employee Attendance</span>
            <strong>
              {Math.round(
                (dashboardData.hr.present / dashboardData.hr.employees) *
                  100
              )}
              %
            </strong>
          </div>
        </div>

        <div className="mini-stat-card">
          <div className="mini-stat-icon">🔧</div>
          <div>
            <span>Machine Availability</span>
            <strong>
              {Math.round(
                (dashboardData.maintenance.healthy /
                  dashboardData.maintenance.totalMachines) *
                  100
              )}
              %
            </strong>
          </div>
        </div>

        <div className="mini-stat-card">
          <div className="mini-stat-icon">₹</div>
          <div>
            <span>Pending Payments</span>
            <strong>{dashboardData.stats.pendingPayments}</strong>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="dashboard-main-grid">
        {/* Sales Overview */}
        <section className="dashboard-panel sales-panel">
          <div className="panel-header">
            <div>
              <h2>Sales Overview</h2>
              <p>Customer order performance</p>
            </div>

            <Link to="/customer-orders" className="panel-link">
              View Details →
            </Link>
          </div>

          <div className="sales-overview">
            <div className="sales-chart-area">
              <div className="chart-y-axis">
                <span>₹4L</span>
                <span>₹3L</span>
                <span>₹2L</span>
                <span>₹1L</span>
                <span>₹0</span>
              </div>

              <div className="fake-chart">
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>

                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: "42%" }}>
                    <span>Jan</span>
                  </div>

                  <div className="chart-bar" style={{ height: "55%" }}>
                    <span>Feb</span>
                  </div>

                  <div className="chart-bar" style={{ height: "48%" }}>
                    <span>Mar</span>
                  </div>

                  <div className="chart-bar" style={{ height: "68%" }}>
                    <span>Apr</span>
                  </div>

                  <div className="chart-bar" style={{ height: "61%" }}>
                    <span>May</span>
                  </div>

                  <div className="chart-bar active" style={{ height: "82%" }}>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sales-summary">
              <div>
                <span>Total Orders</span>
                <strong>{dashboardData.sales.orders}</strong>
              </div>

              <div>
                <span>Completed</span>
                <strong className="success-text">
                  {dashboardData.sales.completed}
                </strong>
              </div>

              <div>
                <span>Pending</span>
                <strong className="warning-text">
                  {dashboardData.sales.pending}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* Production Status */}
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Production Status</h2>
              <p>Current manufacturing progress</p>
            </div>

            <Link to="/production-tracking" className="panel-link">
              Track →
            </Link>
          </div>

          <div className="production-status">
            <div className="progress-ring-wrapper">
              <div className="progress-ring">
                <div className="progress-ring-inner">
                  <strong>72%</strong>
                  <span>Efficiency</span>
                </div>
              </div>
            </div>

            <div className="production-legend">
              <div>
                <span>
                  <i className="legend-dot completed"></i>
                  Completed
                </span>
                <strong>{dashboardData.production.completed}</strong>
              </div>

              <div>
                <span>
                  <i className="legend-dot progress"></i>
                  In Progress
                </span>
                <strong>{dashboardData.production.inProgress}</strong>
              </div>

              <div>
                <span>
                  <i className="legend-dot delayed"></i>
                  Delayed
                </span>
                <strong>{dashboardData.production.delayed}</strong>
              </div>
            </div>
          </div>

          <div className="production-progress-list">
            <div className="progress-item">
              <div>
                <span>Assembly Line A</span>
                <strong>86%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "86%" }}></span>
              </div>
            </div>

            <div className="progress-item">
              <div>
                <span>Assembly Line B</span>
                <strong>68%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "68%" }}></span>
              </div>
            </div>

            <div className="progress-item">
              <div>
                <span>Packaging Line</span>
                <strong>74%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "74%" }}></span>
              </div>
            </div>
          </div>
        </section>

        {/* Inventory */}
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Inventory Health</h2>
              <p>Warehouse stock condition</p>
            </div>

            <Link to="/stock-overview" className="panel-link">
              View Stock →
            </Link>
          </div>

          <div className="inventory-health">
            <div className="inventory-total">
              <span>Total Units</span>
              <strong>
                {dashboardData.inventory.totalUnits.toLocaleString()}
              </strong>
            </div>

            <div className="inventory-breakdown">
              <div className="inventory-row">
                <div>
                  <span className="inventory-dot healthy"></span>
                  Healthy Stock
                </div>

                <strong>
                  {dashboardData.inventory.totalItems -
                    dashboardData.inventory.lowStock -
                    dashboardData.inventory.outOfStock}
                </strong>
              </div>

              <div className="inventory-row">
                <div>
                  <span className="inventory-dot low"></span>
                  Low Stock
                </div>

                <strong className="warning-text">
                  {dashboardData.inventory.lowStock}
                </strong>
              </div>

              <div className="inventory-row">
                <div>
                  <span className="inventory-dot out"></span>
                  Out of Stock
                </div>

                <strong className="danger-text">
                  {dashboardData.inventory.outOfStock}
                </strong>
              </div>
            </div>
          </div>

          <div className="inventory-alert">
            <div className="alert-symbol">!</div>

            <div>
              <strong>Attention Required</strong>
              <span>
                {dashboardData.inventory.lowStock} items need restocking.
              </span>
            </div>

            <Link to="/stock-overview">Review</Link>
          </div>
        </section>

        {/* Quality */}
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Quality Control</h2>
              <p>Latest inspection summary</p>
            </div>

            <Link to="/quality-check" className="panel-link">
              View QC →
            </Link>
          </div>

          <div className="quality-summary">
            <div className="quality-score">
              <strong>
                {Math.round(
                  (dashboardData.quality.passed /
                    dashboardData.quality.inspections) *
                    100
                )}
                %
              </strong>
              <span>Pass Rate</span>
            </div>

            <div className="quality-stats">
              <div>
                <span>Total Inspections</span>
                <strong>{dashboardData.quality.inspections}</strong>
              </div>

              <div>
                <span>Passed</span>
                <strong className="success-text">
                  {dashboardData.quality.passed}
                </strong>
              </div>

              <div>
                <span>Rejected</span>
                <strong className="danger-text">
                  {dashboardData.quality.rejected}
                </strong>
              </div>

              <div>
                <span>Quarantine</span>
                <strong className="warning-text">
                  {dashboardData.quality.quarantine}
                </strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="dashboard-panel quick-actions-panel">
        <div className="panel-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Frequently used ERP operations</p>
          </div>
        </div>

        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="quick-action-card"
            >
              <div className="quick-action-icon">{action.icon}</div>

              <div>
                <strong>{action.title}</strong>
                <span>{action.description}</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="dashboard-bottom-grid">
        {/* Recent Activities */}
        <section className="dashboard-panel activity-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Activities</h2>
              <p>Latest updates across your ERP</p>
            </div>

            <button
              type="button"
              className="panel-link button-link"
              onClick={() => setShowAllActivities(!showAllActivities)}
            >
              {showAllActivities ? "Show Less" : "View All"} →
            </button>
          </div>

          <div className="activity-list">
            {visibleActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === "sales" && "₹"}
                  {activity.type === "production" && "⚙"}
                  {activity.type === "inventory" && "▣"}
                  {activity.type === "purchase" && "▤"}
                  {activity.type === "quality" && "✓"}
                  {activity.type === "maintenance" && "🔧"}
                </div>

                <div className="activity-content">
                  <strong>{activity.title}</strong>
                  <span>{activity.description}</span>
                </div>

                <time>{activity.time}</time>
              </div>
            ))}
          </div>
        </section>

        {/* Operations Snapshot */}
        <section className="dashboard-panel operations-panel">
          <div className="panel-header">
            <div>
              <h2>Operations Snapshot</h2>
              <p>Today's key operational numbers</p>
            </div>
          </div>

          <div className="operations-list">
            <Link to="/customers" className="operation-row">
              <div className="operation-icon blue">C</div>

              <div>
                <span>Customers</span>
                <strong>{dashboardData.stats.customers}</strong>
              </div>

              <small>Active</small>
            </Link>

            <Link to="/suppliers" className="operation-row">
              <div className="operation-icon purple">S</div>

              <div>
                <span>Suppliers</span>
                <strong>{dashboardData.stats.suppliers}</strong>
              </div>

              <small>Active</small>
            </Link>

            <Link to="/warehouses" className="operation-row">
              <div className="operation-icon green">W</div>

              <div>
                <span>Warehouses</span>
                <strong>{dashboardData.stats.warehouses}</strong>
              </div>

              <small>Locations</small>
            </Link>

            <Link to="/machines" className="operation-row">
              <div className="operation-icon orange">M</div>

              <div>
                <span>Machines</span>
                <strong>{dashboardData.stats.machines}</strong>
              </div>

              <small>Registered</small>
            </Link>

            <Link to="/hr-employees" className="operation-row">
              <div className="operation-icon pink">E</div>

              <div>
                <span>Employees</span>
                <strong>{dashboardData.stats.employees}</strong>
              </div>

              <small>Workforce</small>
            </Link>
          </div>
        </section>
      </div>

      {/* Alerts */}
      <section className="dashboard-panel alerts-panel">
        <div className="panel-header">
          <div>
            <h2>Attention & Alerts</h2>
            <p>Items that may require your attention</p>
          </div>

          <span className="alerts-count">
            4 Active Alerts
          </span>
        </div>

        <div className="alerts-grid">
          <Link to="/stock-overview" className="dashboard-alert warning">
            <div className="dashboard-alert-icon">!</div>

            <div>
              <strong>Low Stock</strong>
              <span>
                {dashboardData.inventory.lowStock} inventory items are below
                minimum level.
              </span>
            </div>

            <span>→</span>
          </Link>

          <Link to="/production-tracking" className="dashboard-alert danger">
            <div className="dashboard-alert-icon">!</div>

            <div>
              <strong>Delayed Production</strong>
              <span>
                {dashboardData.production.delayed} production orders are
                currently delayed.
              </span>
            </div>

            <span>→</span>
          </Link>

          <Link to="/quality-check" className="dashboard-alert info">
            <div className="dashboard-alert-icon">✓</div>

            <div>
              <strong>Quality Review</strong>
              <span>
                {dashboardData.quality.quarantine} items are currently in
                quarantine.
              </span>
            </div>

            <span>→</span>
          </Link>

          <Link to="/maintenance-records" className="dashboard-alert maintenance">
            <div className="dashboard-alert-icon">⚙</div>

            <div>
              <strong>Maintenance Due</strong>
              <span>
                {dashboardData.maintenance.upcoming} machines have upcoming
                maintenance.
              </span>
            </div>

            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="dashboard-footer">
        <div>
          <strong>Manufacturing ERP</strong>
          <span>
            Centralized control for your manufacturing operations.
          </span>
        </div>

        <div className="dashboard-footer-right">
          <span>Last updated: Just now</span>

          <Link to="/company-settings">
            Company Settings →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;