import { Routes, Route, Navigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Dashboard from "../Pages/Dashboard";

import GoodsReceipts from "../Sidebar/Purchase/Goods Receipts";


import SupplierPayments from "../Sidebar/Purchase/Supplier payments";


import QualityCheck from "../Sidebar/Quality/Quality Check";

import RejectedQuarantine from "../Sidebar/Quality/Rejected Quarantine";





import Products from "../Sidebar/Masters/Products";
import Suppliers from "../Sidebar/Masters/Suppliers";
import Customers from "../Sidebar/Masters/Customers";
import Employees from "../Sidebar/Masters/Employees";
import Warehouses from "../Sidebar/Masters/Warehouses";
import Machines from "../Sidebar/Masters/Machines";
import PurchaseRequests from "../Sidebar/Purchase/Purchase Requests";
import PurchaseOrders from "../Sidebar/Purchase/Purchase Orders";
import StockOverview from "../Sidebar/Inventory/Stock Overview";
import StockMovement from "../Sidebar/Inventory/Stock Movement";
import WarehouseTransfer from "../Sidebar/Inventory/Warehouse Transfer";
import BOM from "../Sidebar/Production/BOM";
import ProductionOrders from "../Sidebar/Production/Production Orders";
import ProductionTracking from "../Sidebar/Production/Production Tracking";
import CustomerOrders from "../Sidebar/Sales/Customer Orders";
import CustomerPayments from "../Sidebar/Sales/Customer Payments";
import Dispatch from "../Sidebar/Sales/Dispatch";
import SalesInvoice from "../Sidebar/Sales/Sales Invoice";
import Attendence from "../Sidebar/HR & Payroll/Attendence";
import Payroll from "../Sidebar/HR & Payroll/Payroll";
import Salary from "../Sidebar/HR & Payroll/Salary";
import MaintenanceRecords from "../Sidebar/Maintenance/Maintenance Records";
import AllReports from "../Sidebar/Reports/All Reports";
import Users from "../Sidebar/Settings/Users";
import Roles from "../Sidebar/Settings/Roles";
import CompanySettings from "../Sidebar/Settings/Company Settings";

function AppRoutes() {
  return (
    <Routes>
      
      
      

      {/* Dashboard */}
      
      
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      

      {/* Masters */}
      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/suppliers"
        element={<Suppliers />}
      />

<Route path="/goods-receipts" element={<GoodsReceipts />} />

<Route
  path="/supplier-payments"
  element={<SupplierPayments />}
/>

<Route
  path="/rejected-quarantine"
  element={<RejectedQuarantine />}
/>



<Route path="/quality-check" element={<QualityCheck />} />



      <Route
        path="/customers"
        element={<Customers />}
      />

      <Route
        path="/employees"
        element={<Employees />}
      />

      <Route
        path="/warehouses"
        element={<Warehouses />}
      />

      <Route
        path="/machines"
        element={<Machines />}
      />

      {/* Purchase */}
      <Route
        path="/purchase-requests"
        element={<PurchaseRequests />}
      />

      <Route
        path="/purchase-orders"
        element={<PurchaseOrders />}
      />

      {/* Inventory */}
      <Route
        path="/inventory"
        element={<StockOverview />}
      />

      <Route
        path="/stock-movement"
        element={<StockMovement />}
      />

      <Route
        path="/warehouse-transfer"
        element={<WarehouseTransfer />}
      />

      {/* Production */}
      <Route
        path="/bom"
        element={<BOM />}
      />

      <Route
        path="/production-orders"
        element={<ProductionOrders />}
      />

      <Route
        path="/production-tracking"
        element={<ProductionTracking />}
      />

      {/* Sales */}
      <Route
        path="/customer-orders"
        element={<CustomerOrders />}
      />

      <Route
        path="/customer-payments"
        element={<CustomerPayments />}
      />

      <Route
        path="/dispatch"
        element={<Dispatch />}
      />

      <Route
        path="/sales-invoice"
        element={<SalesInvoice />}
      />
      <Route path="/attendance" element={<Attendence />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/salary" element={<Salary />} />
      <Route path="/maintenance-records" element={<MaintenanceRecords />} />
      <Route path="/all-reports" element={<AllReports />} />
      <Route path="/users" element={<Users />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/company-settings" element={<CompanySettings />} />
      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;