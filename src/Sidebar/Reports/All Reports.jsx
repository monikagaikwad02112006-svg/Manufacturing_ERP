import React, { useMemo, useState } from "react";
import "./All Reports.css";

const initialReports = [
  {
    id: 1,
    name: "Sales Overview",
    description:
      "Analyze sales revenue, orders, customers and overall sales performance.",
    category: "Sales",
    icon: "📈",
    color: "blue",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 2,
    name: "Customer Orders",
    description:
      "View customer orders, order status, order values and delivery information.",
    category: "Sales",
    icon: "🛒",
    color: "indigo",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 3,
    name: "Dispatch Report",
    description:
      "Track dispatched orders, pending dispatches and delivery performance.",
    category: "Sales",
    icon: "🚚",
    color: "cyan",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Yesterday",
    popular: false,
  },
  {
    id: 4,
    name: "Purchase Analysis",
    description:
      "Analyze purchase orders, supplier spending and purchasing trends.",
    category: "Purchase",
    icon: "🧾",
    color: "orange",
    frequency: "Weekly",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 5,
    name: "Supplier Performance",
    description:
      "Evaluate suppliers based on orders, delivery time and purchase value.",
    category: "Purchase",
    icon: "🏢",
    color: "amber",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "2 days ago",
    popular: false,
  },
  {
    id: 6,
    name: "Stock Overview",
    description:
      "Get complete visibility into current stock, available quantity and stock value.",
    category: "Inventory",
    icon: "📦",
    color: "green",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 7,
    name: "Stock Movement",
    description:
      "Track stock receipts, issues, adjustments and inventory movements.",
    category: "Inventory",
    icon: "🔄",
    color: "emerald",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 8,
    name: "Warehouse Transfer",
    description:
      "Analyze inventory transfers between warehouses and transfer status.",
    category: "Inventory",
    icon: "🏭",
    color: "teal",
    frequency: "Weekly",
    format: "PDF / Excel",
    updated: "Yesterday",
    popular: false,
  },
  {
    id: 9,
    name: "Production Summary",
    description:
      "Monitor production orders, quantities, completed units and production status.",
    category: "Production",
    icon: "⚙️",
    color: "purple",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 10,
    name: "Production Tracking",
    description:
      "Track production progress, machine utilization and order completion.",
    category: "Production",
    icon: "📊",
    color: "violet",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 11,
    name: "BOM Report",
    description:
      "View bills of materials, components, quantities and production requirements.",
    category: "Production",
    icon: "🧩",
    color: "fuchsia",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "3 days ago",
    popular: false,
  },
  {
    id: 12,
    name: "Quality Inspection",
    description:
      "Review inspection results, accepted quantities and quality issues.",
    category: "Quality",
    icon: "🔍",
    color: "rose",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 13,
    name: "Rejected & Quarantine",
    description:
      "Monitor rejected products, quarantine stock and quality-related issues.",
    category: "Quality",
    icon: "⚠️",
    color: "red",
    frequency: "Daily",
    format: "PDF / Excel",
    updated: "Yesterday",
    popular: false,
  },
  {
    id: 14,
    name: "Employee Report",
    description:
      "View employee information, departments, designations and employment status.",
    category: "HR & Payroll",
    icon: "👥",
    color: "sky",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 15,
    name: "Attendance Report",
    description:
      "Analyze employee attendance, present days, absences and working patterns.",
    category: "HR & Payroll",
    icon: "🗓️",
    color: "blue",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 16,
    name: "Salary Report",
    description:
      "Review employee salary, earnings, deductions and net salary information.",
    category: "HR & Payroll",
    icon: "💰",
    color: "green",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "Yesterday",
    popular: true,
  },
  {
    id: 17,
    name: "Payroll Report",
    description:
      "View payroll processing, gross salary, deductions and payment summaries.",
    category: "HR & Payroll",
    icon: "💳",
    color: "emerald",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "2 days ago",
    popular: false,
  },
  {
    id: 18,
    name: "Maintenance Report",
    description:
      "Track machine maintenance activities, costs, technicians and service status.",
    category: "Maintenance",
    icon: "🛠️",
    color: "orange",
    frequency: "Weekly",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
  {
    id: 19,
    name: "Machine Performance",
    description:
      "Analyze machine status, utilization, downtime and maintenance activities.",
    category: "Maintenance",
    icon: "⚡",
    color: "yellow",
    frequency: "Weekly",
    format: "PDF / Excel",
    updated: "Yesterday",
    popular: false,
  },
  {
    id: 20,
    name: "Financial Summary",
    description:
      "Get a high-level overview of revenue, expenses, payments and financial activity.",
    category: "Finance",
    icon: "💹",
    color: "teal",
    frequency: "Monthly",
    format: "PDF / Excel",
    updated: "Today",
    popular: true,
  },
];

const categories = [
  "All",
  "Sales",
  "Purchase",
  "Inventory",
  "Production",
  "Quality",
  "HR & Payroll",
  "Maintenance",
  "Finance",
];

function AllReports() {
  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredReports = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return reports.filter((report) => {
      const matchesSearch =
        !search ||
        report.name.toLowerCase().includes(search) ||
        report.description.toLowerCase().includes(search) ||
        report.category.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        report.category === selectedCategory;

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "popular" && report.popular) ||
        (activeTab === "favorites" && report.favorite);

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [reports, searchTerm, selectedCategory, activeTab]);

  const statistics = useMemo(() => {
    const favorites = reports.filter((report) => report.favorite).length;
    const popular = reports.filter((report) => report.popular).length;

    return {
      total: reports.length,
      categories: categories.length - 1,
      favorites,
      popular,
    };
  }, [reports]);

  const toggleFavorite = (id) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === id
          ? {
              ...report,
              favorite: !report.favorite,
            }
          : report
      )
    );
  };

  const openPreview = (report) => {
    setSelectedReport(report);
    setShowPreview(true);
  };

  const closePreview = () => {
    setSelectedReport(null);
    setShowPreview(false);
  };

  const handleGenerate = (report) => {
    alert(
      `${report.name} report generation started.\n\nFormat: ${report.format}`
    );
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setActiveTab("all");
  };

  return (
    <div className="all-reports-page">
      {/* =========================
          PAGE HEADER
      ========================== */}
      <header className="reports-header">
        <div className="reports-header-content">
          <div className="reports-breadcrumb">
            Reports <span>/</span> All Reports
          </div>

          <div className="reports-title-row">
            <div>
              <h1>All Reports</h1>

              <p>
                Access, analyze and generate reports across your
                entire manufacturing ERP.
              </p>
            </div>

            <div className="reports-header-actions">
              <button
                type="button"
                className="reports-outline-btn"
                onClick={() => alert("Report scheduler opened.")}
              >
                <span>◷</span>
                Schedule Report
              </button>

              <button
                type="button"
                className="reports-primary-btn"
                onClick={() =>
                  alert("Custom report builder opened.")
                }
              >
                <span>+</span>
                Create Report
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================
          STATISTICS
      ========================== */}
      <section className="reports-stat-grid">
        <div className="reports-stat-card">
          <div className="reports-stat-icon blue">
            📑
          </div>

          <div>
            <span>Total Reports</span>
            <strong>{statistics.total}</strong>
            <small>Available reports</small>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon purple">
            ◈
          </div>

          <div>
            <span>Categories</span>
            <strong>{statistics.categories}</strong>
            <small>Business modules</small>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon orange">
            ★
          </div>

          <div>
            <span>Popular Reports</span>
            <strong>{statistics.popular}</strong>
            <small>Frequently used</small>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon green">
            ♥
          </div>

          <div>
            <span>My Favorites</span>
            <strong>{statistics.favorites}</strong>
            <small>Saved reports</small>
          </div>
        </div>
      </section>

      {/* =========================
          SEARCH + TABS
      ========================== */}
      <section className="reports-control-card">
        <div className="reports-tabs">
          <button
            type="button"
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All Reports
          </button>

          <button
            type="button"
            className={activeTab === "popular" ? "active" : ""}
            onClick={() => setActiveTab("popular")}
          >
            Popular
          </button>

          <button
            type="button"
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>
        </div>

        <div className="reports-search-row">
          <div className="reports-search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search reports by name, category..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="reports-reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </section>

      {/* =========================
          CATEGORY QUICK NAV
      ========================== */}
      <section className="reports-category-section">
        <div className="reports-section-heading">
          <div>
            <h2>Browse by Category</h2>
            <p>Quickly find reports from a specific ERP module.</p>
          </div>

          <span>
            {filteredReports.length} reports found
          </span>
        </div>

        <div className="reports-category-list">
          {categories.map((category) => {
            const count =
              category === "All"
                ? reports.length
                : reports.filter(
                    (report) => report.category === category
                  ).length;

            return (
              <button
                type="button"
                key={category}
                className={
                  selectedCategory === category
                    ? "category-chip active"
                    : "category-chip"
                }
                onClick={() => setSelectedCategory(category)}
              >
                <span>
                  {category === "All"
                    ? "◉"
                    : category === "Sales"
                    ? "📈"
                    : category === "Purchase"
                    ? "🧾"
                    : category === "Inventory"
                    ? "📦"
                    : category === "Production"
                    ? "⚙️"
                    : category === "Quality"
                    ? "🔍"
                    : category === "HR & Payroll"
                    ? "👥"
                    : category === "Maintenance"
                    ? "🛠️"
                    : "💹"}
                </span>

                <strong>{category}</strong>

                <small>{count}</small>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================
          REPORT GRID
      ========================== */}
      <section className="reports-list-section">
        {filteredReports.length > 0 ? (
          <div className="reports-grid">
            {filteredReports.map((report) => (
              <article
                className="report-card"
                key={report.id}
              >
                <div className="report-card-top">
                  <div
                    className={`report-icon ${report.color}`}
                  >
                    {report.icon}
                  </div>

                  <button
                    type="button"
                    className={
                      report.favorite
                        ? "favorite-btn active"
                        : "favorite-btn"
                    }
                    title={
                      report.favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    onClick={() => toggleFavorite(report.id)}
                  >
                    {report.favorite ? "★" : "☆"}
                  </button>
                </div>

                <div className="report-card-content">
                  <div className="report-card-category">
                    {report.category}
                  </div>

                  <h3>{report.name}</h3>

                  <p>{report.description}</p>

                  <div className="report-meta">
                    <div>
                      <span>Frequency</span>
                      <strong>{report.frequency}</strong>
                    </div>

                    <div>
                      <span>Format</span>
                      <strong>{report.format}</strong>
                    </div>
                  </div>
                </div>

                <div className="report-card-footer">
                  <span className="report-updated">
                    Updated {report.updated}
                  </span>

                  <div className="report-card-actions">
                    <button
                      type="button"
                      className="report-view-btn"
                      onClick={() => openPreview(report)}
                    >
                      View
                    </button>

                    <button
                      type="button"
                      className="report-generate-btn"
                      onClick={() => handleGenerate(report)}
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="reports-empty-state">
            <div className="reports-empty-icon">📂</div>

            <h3>No reports found</h3>

            <p>
              We couldn't find any report matching your current
              search or filters.
            </p>

            <button
              type="button"
              onClick={handleReset}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* =========================
          PREVIEW MODAL
      ========================== */}
      {showPreview && selectedReport && (
        <div
          className="reports-modal-overlay"
          onClick={closePreview}
        >
          <div
            className="report-preview-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="report-preview-header">
              <div className="report-preview-title">
                <div
                  className={`report-icon ${selectedReport.color}`}
                >
                  {selectedReport.icon}
                </div>

                <div>
                  <span>{selectedReport.category}</span>
                  <h2>{selectedReport.name}</h2>
                </div>
              </div>

              <button
                type="button"
                className="reports-close-btn"
                onClick={closePreview}
              >
                ×
              </button>
            </div>

            <div className="report-preview-body">
              <div className="report-preview-description">
                <span>Report Description</span>

                <p>{selectedReport.description}</p>
              </div>

              <div className="report-preview-grid">
                <div>
                  <span>Report Category</span>
                  <strong>{selectedReport.category}</strong>
                </div>

                <div>
                  <span>Frequency</span>
                  <strong>{selectedReport.frequency}</strong>
                </div>

                <div>
                  <span>Available Format</span>
                  <strong>{selectedReport.format}</strong>
                </div>

                <div>
                  <span>Last Updated</span>
                  <strong>{selectedReport.updated}</strong>
                </div>
              </div>

              <div className="report-preview-note">
                <span>ℹ</span>

                <p>
                  This is a report preview. Connect this screen
                  to your backend/API later to load live ERP
                  data and generate PDF or Excel files.
                </p>
              </div>
            </div>

            <div className="report-preview-footer">
              <button
                type="button"
                className="reports-outline-btn"
                onClick={closePreview}
              >
                Close
              </button>

              <button
                type="button"
                className="reports-primary-btn"
                onClick={() =>
                  handleGenerate(selectedReport)
                }
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllReports;