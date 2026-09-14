
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("manufacturing_erp_session");
    sessionStorage.removeItem("manufacturing_erp_session");

    navigate("/login", { replace: true });
  };

  return (
    <header className="erp-navbar">

      {/* LEFT SECTION */}
      <div className="erp-navbar-left">

        <button
          type="button"
          className="erp-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="erp-navbar-brand">
          <h1>Manufacturing ERP</h1>
          <p>Enterprise Management System</p>
        </div>

      </div>


      {/* RIGHT SECTION */}
      <div className="erp-navbar-right">

        {/* Notification */}
        <button
          type="button"
          className="erp-notification"
          aria-label="Notifications"
        >
          <span className="notification-icon">🔔</span>
          <span className="notification-dot"></span>
        </button>


        {/* Divider */}
        <div className="erp-navbar-divider"></div>


        {/* User */}
        <div className="erp-user">

          <div className="erp-user-avatar">
            A
          </div>

          <div className="erp-user-details">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>

          <span className="erp-user-arrow">⌄</span>

        </div>


        {/* Logout */}
        <button
          type="button"
          className="erp-logout"
          onClick={handleLogout}
        >
          <span className="logout-icon">↪</span>
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;

