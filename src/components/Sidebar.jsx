
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <h2>Manufacturing ERP</h2>
      </div>

      <nav className="sidebar-menu">

        {/* ================= DASHBOARD ================= */}
        <NavLink to="/dashboard">
           Dashboard
        </NavLink>


        {/* ================= MASTERS ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Masters
          </div>

          <NavLink to="/products">
             Products
          </NavLink>

          <NavLink to="/suppliers">
             Suppliers
          </NavLink>

          <NavLink to="/customers">
             Customers
          </NavLink>

          <NavLink to="/employees">
             Employees
          </NavLink>

          <NavLink to="/warehouses">
             Warehouses
          </NavLink>

          <NavLink to="/machines">
             Machines
          </NavLink>
        </div>


        {/* ================= PURCHASE ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Purchase
          </div>

          <NavLink to="/purchase-requests">
            Purchase Request
          </NavLink>

          <NavLink to="/purchase-orders">
            Purchase Order
          </NavLink>

          <NavLink to="/goods-receipts">
            Goods Receipt
          </NavLink>

          <NavLink to="/supplier-payments">
            Supplier Payments
          </NavLink>
        </div>


        {/* ================= INVENTORY ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Inventory
          </div>

          <NavLink to="/inventory">
            Stock Overview
          </NavLink>

          <NavLink to="/stock-movement">
            Stock Movement
          </NavLink>

          <NavLink to="/warehouse-transfer">
            Warehouse Transfer
          </NavLink>
        </div>


        {/* ================= PRODUCTION ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Production
          </div>

          <NavLink to="/bom">
            Bill of Materials
          </NavLink>

          <NavLink to="/production-orders">
            Production Orders
          </NavLink>

          <NavLink to="/production-tracking">
            Production Tracking
          </NavLink>
        </div>


        {/* ================= QUALITY ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Quality
          </div>

          <NavLink to="/quality-check">
            Quality Check
          </NavLink>

          <NavLink to="/rejected-quarantine">
            Rejected Quarantine
          </NavLink>
        </div>


        {/* ================= SALES ================= */}
        <div className="menu-section">
          <div className="menu-title">
            🧾 Sales
          </div>

          <NavLink to="/customer-orders">
            Customer Orders
          </NavLink>

          <NavLink to="/dispatch">
            Dispatch
          </NavLink>

          <NavLink to="/sales-invoice">
  Sales Invoice
</NavLink>

          <NavLink to="/customer-payments">
            Customer Payments
          </NavLink>
        </div>


        {/* ================= HR & PAYROLL ================= */}
        <div className="menu-section">
          <div className="menu-title">
            👥 HR & Payroll
          </div>

          <NavLink to="/employees">
            Employees
          </NavLink>

          <NavLink to="/attendance">
            Attendance
          </NavLink>

          <NavLink to="/salary">
  Salary
</NavLink>


          <NavLink to="/payroll">
            Payroll
          </NavLink>
        </div>


        {/* ================= MAINTENANCE ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Maintenance
          </div>

          <NavLink to="/machines">
            Machines
          </NavLink>

          <NavLink to="/maintenance-records">
            Maintenance Records
          </NavLink>
        </div>


        {/* ================= REPORTS ================= */}
        <div className="menu-section">
          <div className="menu-title">
             Reports
          </div>

          <NavLink to="/all-reports">
            All Reports
          </NavLink>
        </div>


        {/* ================= SETTINGS ================= */}
        <div className="menu-section">
          <div className="menu-title">
            Settings
          </div>

          <NavLink to="/users">
            Users
          </NavLink>

          <NavLink to="/roles">
            Roles
          </NavLink>

           <NavLink to="/company-settings">
           Company Settings
            </NavLink>
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;

