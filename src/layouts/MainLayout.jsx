
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import AppRoutes from "../routes/AppRoutes";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="main-section">

        <Navbar
          onMenuClick={openSidebar}
        />

        <main className="page-content">
          <AppRoutes />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;

