import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("manufacturing_erp_session");
  sessionStorage.removeItem("manufacturing_erp_session");

  navigate("/login", { replace: true });
};

  return (
    <header className="navbar">

      {/* Left Side */}
      <div className="navbar-left">
        <button className="menu-button" onClick={() => navigate("/")}>
          ☰
        </button>

        <h3>Manufacturing ERP</h3>
      </div>

      {/* Right Side */}
      <div className="navbar-right">

        <button className="notification-button">
          🔔
        </button>

        <div className="user-profile">
          <span>Admin</span>
          <span>▼</span>
        </div>

      </div>
      <button
  type="button"
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>

    </header>
  );
}

export default Navbar;