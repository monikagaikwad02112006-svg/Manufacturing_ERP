import "./App.css";
import { useLocation, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";

function App() {
  const location = useLocation();

  const session =
    localStorage.getItem("manufacturing_erp_session") ||
    sessionStorage.getItem("manufacturing_erp_session");

  const isAuthenticated = Boolean(session);

  // 1. Landing Page
  // Sidebar/Login kuch bhi nahi dikhega
  if (location.pathname === "/") {
    return <Landing />;
  }

  // 2. Login Page
  if (location.pathname === "/login") {
    // Already logged in hai to directly Dashboard
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Login />;
  }

  // 3. Login nahi hai aur Dashboard/module open karne ki
  // koshish kare to Login par bhejo
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 4. Login successful -> Main ERP + Sidebar
  return <MainLayout />;
}

export default App;