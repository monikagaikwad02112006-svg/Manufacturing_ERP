
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
function Sidebar({ isOpen = false, onClose = () => {} }) {
  const handleNavigation = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">M</div>

          <div>
            <h2>Manufacturing ERP</h2>
            <span>Enterprise Management</span>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-menu">

          {/* Dashboard */}
          <NavLink to="/dashboard" onClick={handleNavigation}>
            <span className="menu-icon">⌂</span>
            <span>Dashboard</span>
          </NavLink>

          {/* Masters */}
          <div className="menu-section">
            <div className="menu-title">Masters</div>

            <NavLink to="/products" onClick={handleNavigation}>
              Products
            </NavLink>

            <NavLink to="/suppliers" onClick={handleNavigation}>
              Suppliers
            </NavLink>

            <NavLink to="/customers" onClick={handleNavigation}>
              Customers
            </NavLink>

            <NavLink to="/employees" onClick={handleNavigation}>
              Employees
            </NavLink>

            <NavLink to="/warehouses" onClick={handleNavigation}>
              Warehouses
            </NavLink>

            <NavLink to="/machines" onClick={handleNavigation}>
              Machines
            </NavLink>
          </div>

          {/* Purchase */}
          <div className="menu-section">
            <div className="menu-title">Purchase</div>

            <NavLink to="/purchase-requests" onClick={handleNavigation}>
              Purchase Request
            </NavLink>

            <NavLink to="/purchase-orders" onClick={handleNavigation}>
              Purchase Order
            </NavLink>

            <NavLink to="/goods-receipts" onClick={handleNavigation}>
              Goods Receipt
            </NavLink>

            <NavLink to="/supplier-payments" onClick={handleNavigation}>
              Supplier Payments
            </NavLink>
          </div>

          {/* Inventory */}
          <div className="menu-section">
            <div className="menu-title">Inventory</div>

            <NavLink to="/inventory" onClick={handleNavigation}>
              Stock Overview
            </NavLink>

            <NavLink to="/stock-movement" onClick={handleNavigation}>
              Stock Movement
            </NavLink>

            <NavLink to="/warehouse-transfer" onClick={handleNavigation}>
              Warehouse Transfer
            </NavLink>
          </div>

          {/* Production */}
          <div className="menu-section">
            <div className="menu-title">Production</div>

            <NavLink to="/bom" onClick={handleNavigation}>
              Bill of Materials
            </NavLink>

            <NavLink to="/production-orders" onClick={handleNavigation}>
              Production Orders
            </NavLink>

            <NavLink to="/production-tracking" onClick={handleNavigation}>
              Production Tracking
            </NavLink>
          </div>

          {/* Quality */}
          <div className="menu-section">
            <div className="menu-title">Quality</div>

            <NavLink to="/quality-check" onClick={handleNavigation}>
              Quality Check
            </NavLink>

            <NavLink to="/rejected-quarantine" onClick={handleNavigation}>
              Rejected Quarantine
            </NavLink>
          </div>

          {/* Sales */}
          <div className="menu-section">
            <div className="menu-title">Sales</div>

            <NavLink to="/customer-orders" onClick={handleNavigation}>
              Customer Orders
            </NavLink>

            <NavLink to="/dispatch" onClick={handleNavigation}>
              Dispatch
            </NavLink>

            <NavLink to="/sales-invoice" onClick={handleNavigation}>
              Sales Invoice
            </NavLink>

            <NavLink to="/customer-payments" onClick={handleNavigation}>
              Customer Payments
            </NavLink>
          </div>

          {/* HR */}
          <div className="menu-section">
            <div className="menu-title">HR & Payroll</div>

            <NavLink to="/employees" onClick={handleNavigation}>
              Employees
            </NavLink>

            <NavLink to="/attendance" onClick={handleNavigation}>
              Attendance
            </NavLink>

            <NavLink to="/salary" onClick={handleNavigation}>
              Salary
            </NavLink>

            <NavLink to="/payroll" onClick={handleNavigation}>
              Payroll
            </NavLink>
          </div>

          {/* Maintenance */}
          <div className="menu-section">
            <div className="menu-title">Maintenance</div>

            <NavLink to="/machines" onClick={handleNavigation}>
              Machines
            </NavLink>

            <NavLink to="/maintenance-records" onClick={handleNavigation}>
              Maintenance Records
            </NavLink>
          </div>

          {/* Reports */}
          <div className="menu-section">
            <div className="menu-title">Reports</div>

            <NavLink to="/all-reports" onClick={handleNavigation}>
              All Reports
            </NavLink>
          </div>

          {/* Settings */}
          <div className="menu-section">
            <div className="menu-title">Settings</div>

            <NavLink to="/users" onClick={handleNavigation}>
              Users
            </NavLink>

            <NavLink to="/roles" onClick={handleNavigation}>
              Roles
            </NavLink>

            <NavLink to="/company-settings" onClick={handleNavigation}>
              Company Settings
            </NavLink>
          </div>

        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

