
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [isCreateAccount, setIsCreateAccount] = useState(false);

  // Login fields
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Create account fields
  const [fullName, setFullName] = useState("");
  const [newLoginId, setNewLoginId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // =========================
  // CREATE ACCOUNT
  // =========================
  const handleCreateAccount = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!fullName.trim()) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!newLoginId.trim()) {
      setMessage("Please create a Login ID.");
      setMessageType("error");
      return;
    }

    if (!newPassword) {
      setMessage("Please create a password.");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 4) {
      setMessage("Password must contain at least 4 characters.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    // Get existing accounts
    const existingAccounts =
      JSON.parse(localStorage.getItem("manufacturing_erp_accounts")) || [];

    // Check duplicate Login ID
    const accountExists = existingAccounts.some(
      (account) =>
        account.loginId.toLowerCase() === newLoginId.trim().toLowerCase()
    );

    if (accountExists) {
      setMessage("This Login ID already exists. Please choose another.");
      setMessageType("error");
      return;
    }

    // Create new account
    const newAccount = {
      id: Date.now(),
      fullName: fullName.trim(),
      loginId: newLoginId.trim(),
      password: newPassword,
      role: "Employee",
      createdAt: new Date().toISOString(),
    };

    existingAccounts.push(newAccount);

    localStorage.setItem(
      "manufacturing_erp_accounts",
      JSON.stringify(existingAccounts)
    );

    // Clear create account fields
    setFullName("");
    setNewLoginId("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage("Account created successfully! Please login.");
    setMessageType("success");

    // Switch to login after short delay
    setTimeout(() => {
      setIsCreateAccount(false);
      setMessage("");
      setMessageType("");
      setLoginId(newAccount.loginId);
    }, 1200);
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!loginId.trim()) {
      setMessage("Please enter your Login ID.");
      setMessageType("error");
      return;
    }

    if (!loginPassword) {
      setMessage("Please enter your password.");
      setMessageType("error");
      return;
    }

    const accounts =
      JSON.parse(localStorage.getItem("manufacturing_erp_accounts")) || [];

    // Find account
    const account = accounts.find(
      (user) =>
        user.loginId.toLowerCase() === loginId.trim().toLowerCase() &&
        user.password === loginPassword
    );

    if (!account) {
      setMessage("Invalid Login ID or Password.");
      setMessageType("error");
      return;
    }

    // Create login session
    const session = {
      authenticated: true,
      loginId: account.loginId,
      fullName: account.fullName,
      role: account.role,
      loginTime: new Date().toISOString(),
    };

    const sessionData = JSON.stringify(session);

    if (rememberMe) {
      localStorage.setItem("manufacturing_erp_session", sessionData);
      sessionStorage.removeItem("manufacturing_erp_session");
    } else {
      sessionStorage.setItem("manufacturing_erp_session", sessionData);
      localStorage.removeItem("manufacturing_erp_session");
    }

    setMessage("Login successful! Opening dashboard...");
    setMessageType("success");

    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 700);
  };

  // =========================
  // LOGIN SCREEN
  // =========================
  if (!isCreateAccount) {
    return (
      <div className="login-page">
        <div className="login-container">

          {/* LEFT SIDE */}
          <div className="login-brand-panel">
            <div className="brand-content">

              <div className="brand-logo">
                <span>ME</span>
              </div>

              <h1>Manufacturing ERP</h1>

              <p className="brand-description">
                Smart and efficient management for your complete
                manufacturing business.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Production Management</span>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Inventory Management</span>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Sales & Purchase</span>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>HR & Payroll</span>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Reports & Analytics</span>
                </div>
              </div>

              <div className="security-note">
                <span>🔒</span>
                <div>
                  <strong>Secure Workspace</strong>
                  <p>
                    Access your manufacturing operations
                    from one centralized platform.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="login-form-panel">
            <div className="login-form-wrapper">

              <div className="mobile-logo">
                <div className="brand-logo">
                  <span>ME</span>
                </div>
              </div>

              <div className="form-heading">
                <span className="welcome-text">
                  WELCOME BACK
                </span>

                <h2>Sign in to your account</h2>

                <p>
                  Enter your Login ID and password to continue.
                </p>
              </div>

              {message && (
                <div className={`login-message ${messageType}`}>
                  <span>
                    {messageType === "success" ? "✓" : "!"}
                  </span>
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin}>

                {/* LOGIN ID */}
                <div className="form-group">
                  <label>Login ID</label>

                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>

                    <input
                      type="text"
                      placeholder="Enter your Login ID"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <label>Password</label>

                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>

                    <input
                      type={
                        showLoginPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) =>
                        setLoginPassword(e.target.value)
                      }
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowLoginPassword(!showLoginPassword)
                      }
                    >
                      {showLoginPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="login-options">

                  <label className="remember-option">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                    />

                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      alert(
                        "Please contact the administrator to reset your password."
                      )
                    }
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="login-button"
                >
                  <span>Sign In</span>
                  <span>→</span>
                </button>

              </form>

              {/* CREATE ACCOUNT */}
              <div className="create-account-section">

                <div className="divider">
                  <span>OR</span>
                </div>

                <p>
                  Don't have an account?
                </p>

                <button
                  type="button"
                  className="create-account-button"
                  onClick={() => {
                    setMessage("");
                    setMessageType("");
                    setIsCreateAccount(true);
                  }}
                >
                  Create New Account
                </button>

              </div>

              <div className="login-footer">
                <span>© 2026 Manufacturing ERP</span>
                <span>•</span>
                <span>Enterprise Management System</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================
  // CREATE ACCOUNT SCREEN
  // =========================
  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-brand-panel">
          <div className="brand-content">

            <div className="brand-logo">
              <span>ME</span>
            </div>

            <h1>Create Your Account</h1>

            <p className="brand-description">
              Create your Manufacturing ERP account and
              start managing your business operations.
            </p>

            <div className="feature-list">

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Easy Account Creation</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Personalized Dashboard</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Manufacturing Management</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Business Reports</span>
              </div>

            </div>

            <div className="security-note">
              <span>✨</span>

              <div>
                <strong>Quick Setup</strong>

                <p>
                  Create your Login ID and password
                  to access the ERP system.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-panel">
          <div className="login-form-wrapper">

            <div className="form-heading">

              <span className="welcome-text">
                GET STARTED
              </span>

              <h2>Create an account</h2>

              <p>
                Create your Login ID and password below.
              </p>

            </div>

            {message && (
              <div className={`login-message ${messageType}`}>
                <span>
                  {messageType === "success" ? "✓" : "!"}
                </span>

                {message}
              </div>
            )}

            <form onSubmit={handleCreateAccount}>

              {/* FULL NAME */}
              <div className="form-group">
                <label>Full Name</label>

                <div className="input-wrapper">
                  <span className="input-icon">👤</span>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* LOGIN ID */}
              <div className="form-group">
                <label>Login ID</label>

                <div className="input-wrapper">
                  <span className="input-icon">🪪</span>

                  <input
                    type="text"
                    placeholder="Create your Login ID"
                    value={newLoginId}
                    onChange={(e) =>
                      setNewLoginId(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>

                  <input
                    type={
                      showCreatePassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowCreatePassword(
                        !showCreatePassword
                      )
                    }
                  >
                    {showCreatePassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="form-group">
                <label>Confirm Password</label>

                <div className="input-wrapper">
                  <span className="input-icon">🔐</span>

                  <input
                    type={
                      showCreatePassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* CREATE BUTTON */}
              <button
                type="submit"
                className="login-button"
              >
                <span>Create Account</span>
                <span>→</span>
              </button>

            </form>

            {/* BACK TO LOGIN */}
            <div className="create-account-section">

              <div className="divider">
                <span>ALREADY HAVE AN ACCOUNT?</span>
              </div>

              <button
                type="button"
                className="create-account-button"
                onClick={() => {
                  setMessage("");
                  setMessageType("");
                  setIsCreateAccount(false);
                }}
              >
                ← Back to Login
              </button>

            </div>

            <div className="login-footer">
              <span>© 2026 Manufacturing ERP</span>
              <span>•</span>
              <span>Enterprise Management System</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;

