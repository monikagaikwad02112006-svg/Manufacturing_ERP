import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AppRoutes from "../routes/AppRoutes";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <main className="page-content">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;