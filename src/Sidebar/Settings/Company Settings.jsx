
import React, { useRef, useState } from "react";
import "./Company Settings.css";

const initialSettings = {
  companyName: "Apex Manufacturing Pvt. Ltd.",
  legalName: "Apex Manufacturing Private Limited",
  registrationNumber: "U28999MH2025PTC123456",
  taxNumber: "27AABCA1234A1Z5",
  email: "info@apexmanufacturing.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 240 245 6789",
  website: "www.apexmanufacturing.com",

  addressLine1: "MIDC Industrial Area",
  addressLine2: "Waluj",
  city: "Chhatrapati Sambhajinagar",
  state: "Maharashtra",
  postalCode: "431136",
  country: "India",

  currency: "INR - Indian Rupee",
  timezone: "Asia/Kolkata (IST)",
  financialYear: "April - March",
  dateFormat: "DD/MM/YYYY",

  invoicePrefix: "INV-",
  purchasePrefix: "PO-",
  orderPrefix: "ORD-",

  emailNotifications: true,
  lowStockAlerts: true,
  paymentReminders: true,
  maintenanceAlerts: true,
};

function CompanySettings() {
  const [settings, setSettings] =
    useState(initialSettings);

  const [savedSettings, setSavedSettings] =
    useState(initialSettings);

  const [logo, setLogo] = useState(null);

  const [activeSection, setActiveSection] =
    useState("company");

  const [isSaving, setIsSaving] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setSettings((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setShowSuccess(false);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Logo size must be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogo(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateSettings = () => {
    if (!settings.companyName.trim()) {
      alert("Company name is required.");
      return false;
    }

    if (!settings.legalName.trim()) {
      alert("Legal company name is required.");
      return false;
    }

    if (!settings.email.trim()) {
      alert("Company email is required.");
      return false;
    }

    if (!settings.phone.trim()) {
      alert("Company phone number is required.");
      return false;
    }

    if (!settings.addressLine1.trim()) {
      alert("Address is required.");
      return false;
    }

    if (!settings.city.trim()) {
      alert("City is required.");
      return false;
    }

    if (!settings.state.trim()) {
      alert("State is required.");
      return false;
    }

    if (!settings.postalCode.trim()) {
      alert("Postal code is required.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateSettings()) return;

    setIsSaving(true);

    setTimeout(() => {
      setSavedSettings({
        ...settings,
      });

      setIsSaving(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3500);
    }, 700);
  };

  const handleReset = () => {
    setSettings({
      ...savedSettings,
    });

    setShowSuccess(false);
  };

  const handleResetAll = () => {
    const confirmed = window.confirm(
      "Reset all company settings to the original values?"
    );

    if (!confirmed) return;

    setSettings({
      ...initialSettings,
    });

    setSavedSettings({
      ...initialSettings,
    });

    setLogo(null);
    setShowSuccess(false);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);

    const element =
      document.getElementById(
        `company-section-${section}`
      );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="company-settings-page">
      {/* PAGE HEADER */}
      <div className="company-settings-header">
        <div>
          <div className="company-settings-breadcrumb">
            Settings
            <span>/</span>
            Company Settings
          </div>

          <h1>Company Settings</h1>

          <p>
            Manage your organization's profile,
            business information and ERP preferences.
          </p>
        </div>

        <div className="company-settings-header-actions">
          <button
            type="button"
            className="company-reset-btn"
            onClick={handleReset}
          >
            Reset Changes
          </button>

          <button
            type="button"
            className="company-save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="company-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span>✓</span>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div className="company-success-message">
          <div className="success-icon">✓</div>

          <div>
            <strong>Changes saved successfully</strong>
            <span>
              Your company settings have been updated.
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowSuccess(false)
            }
          >
            ×
          </button>
        </div>
      )}

      <div className="company-settings-layout">
        {/* SIDEBAR */}
        <aside className="company-settings-nav">
          <div className="company-nav-title">
            SETTINGS
          </div>

          <button
            type="button"
            className={
              activeSection === "company"
                ? "active"
                : ""
            }
            onClick={() =>
              scrollToSection("company")
            }
          >
            <span className="nav-icon">▣</span>
            <div>
              <strong>Company Profile</strong>
              <small>
                Basic business information
              </small>
            </div>
          </button>

          <button
            type="button"
            className={
              activeSection === "address"
                ? "active"
                : ""
            }
            onClick={() =>
              scrollToSection("address")
            }
          >
            <span className="nav-icon">⌖</span>
            <div>
              <strong>Address</strong>
              <small>
                Business location details
              </small>
            </div>
          </button>

          <button
            type="button"
            className={
              activeSection === "regional"
                ? "active"
                : ""
            }
            onClick={() =>
              scrollToSection("regional")
            }
          >
            <span className="nav-icon">◎</span>
            <div>
              <strong>Regional Settings</strong>
              <small>
                Currency and date preferences
              </small>
            </div>
          </button>

          <button
            type="button"
            className={
              activeSection === "documents"
                ? "active"
                : ""
            }
            onClick={() =>
              scrollToSection("documents")
            }
          >
            <span className="nav-icon">▤</span>
            <div>
              <strong>Documents</strong>
              <small>
                Invoice and order numbering
              </small>
            </div>
          </button>

          <button
            type="button"
            className={
              activeSection === "notifications"
                ? "active"
                : ""
            }
            onClick={() =>
              scrollToSection("notifications")
            }
          >
            <span className="nav-icon">◌</span>
            <div>
              <strong>Notifications</strong>
              <small>
                Alerts and email preferences
              </small>
            </div>
          </button>

          <div className="company-nav-divider"></div>

          <button
            type="button"
            className="danger-nav-btn"
            onClick={handleResetAll}
          >
            <span className="nav-icon">↺</span>
            <div>
              <strong>Restore Defaults</strong>
              <small>
                Reset all settings
              </small>
            </div>
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="company-settings-content">
          {/* COMPANY PROFILE */}
          <section
            id="company-section-company"
            className="company-settings-card"
          >
            <div className="settings-card-header">
              <div className="settings-section-icon">
                ▣
              </div>

              <div>
                <h2>Company Profile</h2>

                <p>
                  General information about your
                  organization.
                </p>
              </div>
            </div>

            <div className="settings-card-body">
              <div className="company-logo-section">
                <div>
                  <label className="settings-label">
                    Company Logo
                  </label>

                  <p className="settings-help">
                    Recommended size: 400 × 400 px.
                    Maximum file size: 2 MB.
                  </p>
                </div>

                <div className="company-logo-area">
                  <div className="company-logo-preview">
                    {logo ? (
                      <img
                        src={logo}
                        alt="Company logo"
                      />
                    ) : (
                      <div className="company-logo-placeholder">
                        <strong>AM</strong>
                        <span>
                          COMPANY
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="company-logo-actions">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      hidden
                    />

                    <button
                      type="button"
                      className="upload-logo-btn"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    >
                      Upload Logo
                    </button>

                    {logo && (
                      <button
                        type="button"
                        className="remove-logo-btn"
                        onClick={removeLogo}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="settings-divider"></div>

              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>
                    Company Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    Legal Company Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="legalName"
                    value={settings.legalName}
                    onChange={handleChange}
                    placeholder="Enter legal name"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    Registration Number
                  </label>

                  <input
                    type="text"
                    name="registrationNumber"
                    value={
                      settings.registrationNumber
                    }
                    onChange={handleChange}
                    placeholder="Company registration number"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    GST / Tax Number
                  </label>

                  <input
                    type="text"
                    name="taxNumber"
                    value={settings.taxNumber}
                    onChange={handleChange}
                    placeholder="GST / Tax identification number"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    Company Email <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    placeholder="company@example.com"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    Primary Phone <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    Alternate Phone
                  </label>

                  <input
                    type="text"
                    name="alternatePhone"
                    value={
                      settings.alternatePhone
                    }
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="settings-form-group">
                  <label>Website</label>

                  <input
                    type="text"
                    name="website"
                    value={settings.website}
                    onChange={handleChange}
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ADDRESS */}
          <section
            id="company-section-address"
            className="company-settings-card"
          >
            <div className="settings-card-header">
              <div className="settings-section-icon">
                ⌖
              </div>

              <div>
                <h2>Business Address</h2>

                <p>
                  Official address and location details
                  of your company.
                </p>
              </div>
            </div>

            <div className="settings-card-body">
              <div className="settings-form-grid">
                <div className="settings-form-group full">
                  <label>
                    Address Line 1 <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="addressLine1"
                    value={
                      settings.addressLine1
                    }
                    onChange={handleChange}
                    placeholder="Building, street or industrial area"
                  />
                </div>

                <div className="settings-form-group full">
                  <label>Address Line 2</label>

                  <input
                    type="text"
                    name="addressLine2"
                    value={
                      settings.addressLine2
                    }
                    onChange={handleChange}
                    placeholder="Area, landmark or locality"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    City <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={settings.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    State <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={settings.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>

                <div className="settings-form-group">
                  <label>
                    Postal Code <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={
                      settings.postalCode
                    }
                    onChange={handleChange}
                    placeholder="Postal code"
                  />
                </div>

                <div className="settings-form-group">
                  <label>Country</label>

                  <select
                    name="country"
                    value={settings.country}
                    onChange={handleChange}
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>Singapore</option>
                    <option>United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* REGIONAL SETTINGS */}
          <section
            id="company-section-regional"
            className="company-settings-card"
          >
            <div className="settings-card-header">
              <div className="settings-section-icon">
                ◎
              </div>

              <div>
                <h2>Regional Settings</h2>

                <p>
                  Configure currency, timezone and
                  financial preferences.
                </p>
              </div>
            </div>

            <div className="settings-card-body">
              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>Currency</label>

                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option>
                      INR - Indian Rupee
                    </option>

                    <option>
                      USD - US Dollar
                    </option>

                    <option>
                      EUR - Euro
                    </option>

                    <option>
                      GBP - British Pound
                    </option>

                    <option>
                      AED - UAE Dirham
                    </option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label>Timezone</label>

                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                  >
                    <option>
                      Asia/Kolkata (IST)
                    </option>

                    <option>
                      America/New_York (EST)
                    </option>

                    <option>
                      Europe/London (GMT)
                    </option>

                    <option>
                      Asia/Dubai (GST)
                    </option>

                    <option>
                      Asia/Singapore (SGT)
                    </option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label>Financial Year</label>

                  <select
                    name="financialYear"
                    value={
                      settings.financialYear
                    }
                    onChange={handleChange}
                  >
                    <option>
                      April - March
                    </option>

                    <option>
                      January - December
                    </option>

                    <option>
                      July - June
                    </option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label>Date Format</label>

                  <select
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleChange}
                  >
                    <option>
                      DD/MM/YYYY
                    </option>

                    <option>
                      MM/DD/YYYY
                    </option>

                    <option>
                      YYYY-MM-DD
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* DOCUMENT SETTINGS */}
          <section
            id="company-section-documents"
            className="company-settings-card"
          >
            <div className="settings-card-header">
              <div className="settings-section-icon">
                ▤
              </div>

              <div>
                <h2>Document Settings</h2>

                <p>
                  Configure numbering prefixes for ERP
                  documents.
                </p>
              </div>
            </div>

            <div className="settings-card-body">
              <div className="settings-document-info">
                <div>
                  <strong>Document numbering</strong>

                  <span>
                    These prefixes will be used when
                    generating new documents.
                  </span>
                </div>

                <span className="document-status">
                  Automatic
                </span>
              </div>

              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>Sales Invoice Prefix</label>

                  <input
                    type="text"
                    name="invoicePrefix"
                    value={
                      settings.invoicePrefix
                    }
                    onChange={handleChange}
                    placeholder="INV-"
                  />

                  <small>
                    Example: INV-10001
                  </small>
                </div>

                <div className="settings-form-group">
                  <label>
                    Purchase Order Prefix
                  </label>

                  <input
                    type="text"
                    name="purchasePrefix"
                    value={
                      settings.purchasePrefix
                    }
                    onChange={handleChange}
                    placeholder="PO-"
                  />

                  <small>
                    Example: PO-10001
                  </small>
                </div>

                <div className="settings-form-group">
                  <label>
                    Customer Order Prefix
                  </label>

                  <input
                    type="text"
                    name="orderPrefix"
                    value={settings.orderPrefix}
                    onChange={handleChange}
                    placeholder="ORD-"
                  />

                  <small>
                    Example: ORD-10001
                  </small>
                </div>
              </div>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section
            id="company-section-notifications"
            className="company-settings-card"
          >
            <div className="settings-card-header">
              <div className="settings-section-icon">
                ◌
              </div>

              <div>
                <h2>Notifications</h2>

                <p>
                  Control alerts and notification
                  preferences for your organization.
                </p>
              </div>
            </div>

            <div className="settings-card-body">
              <div className="notification-list">
                <div className="notification-item">
                  <div className="notification-item-icon">
                    ✉
                  </div>

                  <div className="notification-item-content">
                    <strong>
                      Email Notifications
                    </strong>

                    <span>
                      Receive important ERP system
                      notifications through email.
                    </span>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={
                        settings.emailNotifications
                      }
                      onChange={handleChange}
                    />

                    <span></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-item-icon warning">
                    !
                  </div>

                  <div className="notification-item-content">
                    <strong>
                      Low Stock Alerts
                    </strong>

                    <span>
                      Get notified when inventory falls
                      below the minimum stock level.
                    </span>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      name="lowStockAlerts"
                      checked={
                        settings.lowStockAlerts
                      }
                      onChange={handleChange}
                    />

                    <span></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-item-icon payment">
                    ₹
                  </div>

                  <div className="notification-item-content">
                    <strong>
                      Payment Reminders
                    </strong>

                    <span>
                      Receive reminders for pending
                      customer payments.
                    </span>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      name="paymentReminders"
                      checked={
                        settings.paymentReminders
                      }
                      onChange={handleChange}
                    />

                    <span></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-item-icon maintenance">
                    ⚙
                  </div>

                  <div className="notification-item-content">
                    <strong>
                      Maintenance Alerts
                    </strong>

                    <span>
                      Get notified about upcoming machine
                      maintenance schedules.
                    </span>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      name="maintenanceAlerts"
                      checked={
                        settings.maintenanceAlerts
                      }
                      onChange={handleChange}
                    />

                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* BOTTOM ACTION */}
          <div className="company-settings-bottom-actions">
            <div>
              <strong>
                Ready to save your changes?
              </strong>

              <span>
                Make sure all company information is
                correct before saving.
              </span>
            </div>

            <div>
              <button
                type="button"
                className="company-reset-btn"
                onClick={handleReset}
              >
                Cancel Changes
              </button>

              <button
                type="button"
                className="company-save-btn"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving
                  ? "Saving..."
                  : "Save Company Settings"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CompanySettings;
