import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const modules = [
    {
      icon: "production",
      title: "Production Management",
      description:
        "Plan production orders, monitor progress and manage manufacturing workflows.",
    },
    {
      icon: "inventory",
      title: "Inventory Control",
      description:
        "Track stock, warehouse movements, transfers and inventory availability.",
    },
    {
      icon: "purchase",
      title: "Purchase Management",
      description:
        "Manage suppliers, purchase requests and purchase orders efficiently.",
    },
    {
      icon: "sales",
      title: "Sales Management",
      description:
        "Manage customer orders, dispatches, invoices and payments.",
    },
    {
      icon: "hr",
      title: "HR & Payroll",
      description:
        "Manage employees, attendance, salary and payroll operations.",
    },
    {
      icon: "reports",
      title: "Reports & Analytics",
      description:
        "Access business reports and operational insights for better decisions.",
    },
  ];

  const workflow = [
    {
      number: "01",
      title: "Plan",
      description:
        "Create production plans, purchase requirements and business workflows.",
    },
    {
      number: "02",
      title: "Execute",
      description:
        "Manage inventory, production, sales and workforce operations.",
    },
    {
      number: "03",
      title: "Monitor",
      description:
        "Track activities and get real-time visibility across your business.",
    },
    {
      number: "04",
      title: "Analyze",
      description:
        "Use centralized reports to understand performance and make decisions.",
    },
  ];

  return (
    <div className="erp-landing">

      {/* ================= NAVBAR ================= */}

      <header className="erp-navbar">
        <div className="erp-nav-inner">

          <div
            className="erp-logo-area"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <div className="erp-logo">
              <span>M</span>
              <span>E</span>
            </div>

            <div className="erp-brand">
              <strong>Manufacturing ERP</strong>
              <small>Enterprise Management</small>
            </div>
          </div>

          <nav className="erp-nav-links">
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Home
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("solutions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Solutions
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("modules")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Modules
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("workflow")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Workflow
            </button>
          </nav>

          <div className="erp-nav-buttons">
            <button
              className="erp-signin"
              onClick={goToLogin}
            >
              Sign In
            </button>

            <button
              className="erp-get-started"
              onClick={goToLogin}
            >
              Get Started
              <span>→</span>
            </button>
          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="erp-hero">

        <div className="hero-background-shape hero-shape-one"></div>
        <div className="hero-background-shape hero-shape-two"></div>

        <div className="erp-hero-container">

          <div className="hero-left">

            <div className="hero-tag">
              <span className="hero-tag-dot"></span>
              SMART MANUFACTURING MANAGEMENT
            </div>

            <h1>
              Run Your
              <span> Manufacturing</span>
              <br />
              Business Smarter.
            </h1>

            <p>
              A centralized ERP platform built to connect production,
              inventory, purchasing, sales, HR and business operations
              into one intelligent workspace.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-hero-button"
                onClick={goToLogin}
              >
                Start Managing
                <span>→</span>
              </button>

              <button
                className="secondary-hero-button"
                onClick={() =>
                  document
                    .getElementById("modules")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explore Platform
                <span>↓</span>
              </button>

            </div>

            <div className="hero-proof">

              <div className="proof-item">
                <strong>10+</strong>
                <span>ERP Modules</span>
              </div>

              <div className="proof-line"></div>

              <div className="proof-item">
                <strong>360°</strong>
                <span>Business Visibility</span>
              </div>

              <div className="proof-line"></div>

              <div className="proof-item">
                <strong>24/7</strong>
                <span>Operational Access</span>
              </div>

            </div>

          </div>


          {/* ================= DASHBOARD PREVIEW ================= */}

          <div className="hero-dashboard">

            <div className="dashboard-glow"></div>

            <div className="dashboard-card">

              <div className="dashboard-browser-bar">

                <div className="browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="browser-title">
                  Manufacturing ERP
                </div>

                <div className="browser-live">
                  <span></span>
                  Live
                </div>

              </div>


              <div className="dashboard-content">

                <aside className="preview-sidebar">

                  <div className="preview-logo">
                    ME
                  </div>

                  <div className="preview-menu active">
                    <span>▦</span>
                  </div>

                  <div className="preview-menu">
                    <span>▣</span>
                  </div>

                  <div className="preview-menu">
                    <span>⌘</span>
                  </div>

                  <div className="preview-menu">
                    <span>□</span>
                  </div>

                  <div className="preview-menu">
                    <span>♙</span>
                  </div>

                  <div className="preview-menu">
                    <span>◫</span>
                  </div>

                </aside>


                <div className="preview-main">

                  <div className="preview-header">

                    <div>
                      <small>Dashboard Overview</small>
                      <h3>Good morning, Administrator</h3>
                    </div>

                    <div className="preview-user">
                      <span>AD</span>
                    </div>

                  </div>


                  <div className="preview-stat-grid">

                    <div className="preview-stat">
                      <div className="stat-icon blue-icon">
                        📦
                      </div>

                      <div>
                        <small>Total Products</small>
                        <strong>1,248</strong>
                        <em>+8.4%</em>
                      </div>
                    </div>

                    <div className="preview-stat">
                      <div className="stat-icon green-icon">
                        ⚙
                      </div>

                      <div>
                        <small>Production</small>
                        <strong>86%</strong>
                        <em>+12.2%</em>
                      </div>
                    </div>

                    <div className="preview-stat">
                      <div className="stat-icon orange-icon">
                        🛒
                      </div>

                      <div>
                        <small>Orders</small>
                        <strong>326</strong>
                        <em>+5.7%</em>
                      </div>
                    </div>

                  </div>


                  <div className="preview-lower">

                    <div className="preview-chart">

                      <div className="chart-heading">

                        <div>
                          <small>Production Performance</small>
                          <strong>Monthly Overview</strong>
                        </div>

                        <span>2026</span>

                      </div>

                      <div className="fake-chart">

                        <div className="chart-y">
                          <span>100%</span>
                          <span>75%</span>
                          <span>50%</span>
                          <span>25%</span>
                        </div>

                        <div className="chart-bars">

                          <i style={{ height: "38%" }}></i>
                          <i style={{ height: "55%" }}></i>
                          <i style={{ height: "48%" }}></i>
                          <i style={{ height: "70%" }}></i>
                          <i style={{ height: "63%" }}></i>
                          <i style={{ height: "82%" }}></i>
                          <i style={{ height: "91%" }}></i>

                        </div>

                      </div>

                      <div className="chart-months">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                      </div>

                    </div>


                    <div className="preview-activity">

                      <div className="activity-heading">
                        <strong>Recent Activity</strong>
                        <span>View all</span>
                      </div>

                      <div className="activity-row">
                        <div className="activity-circle green-circle">
                          ✓
                        </div>

                        <div>
                          <strong>Production completed</strong>
                          <small>Order #PO-1048</small>
                        </div>
                      </div>

                      <div className="activity-row">
                        <div className="activity-circle blue-circle">
                          +
                        </div>

                        <div>
                          <strong>Stock updated</strong>
                          <small>Warehouse A</small>
                        </div>
                      </div>

                      <div className="activity-row">
                        <div className="activity-circle orange-circle">
                          $
                        </div>

                        <div>
                          <strong>New invoice</strong>
                          <small>Sales department</small>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Floating cards */}

            <div className="floating-status production-status">

              <div className="floating-check">
                ✓
              </div>

              <div>
                <strong>Production Complete</strong>
                <small>Order #PO-1048</small>
              </div>

            </div>


            <div className="floating-status inventory-status">

              <div className="inventory-ring">
                92%
              </div>

              <div>
                <strong>Inventory Health</strong>
                <small>Optimal Stock Level</small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SOLUTIONS ================= */}

      <section
        className="erp-section solutions-section"
        id="solutions"
      >

        <div className="section-top">

          <span className="section-eyebrow">
            WHY MANUFACTURING ERP
          </span>

          <h2>
            Everything Connected.
            <span> Everything Under Control.</span>
          </h2>

          <p>
            Replace disconnected processes with one centralized
            platform designed to give your team clarity,
            control and operational efficiency.
          </p>

        </div>


        <div className="solution-grid">

          <div className="solution-card">

            <div className="solution-number">
              01
            </div>

            <div className="solution-icon">
              ◈
            </div>

            <h3>Centralized Operations</h3>

            <p>
              Bring production, inventory, purchasing, sales
              and workforce operations together in one platform.
            </p>

          </div>


          <div className="solution-card featured-solution">

            <div className="solution-number">
              02
            </div>

            <div className="solution-icon">
              ◉
            </div>

            <h3>Complete Visibility</h3>

            <p>
              Get a clear view of your business activities,
              stock levels, orders and production performance.
            </p>

          </div>


          <div className="solution-card">

            <div className="solution-number">
              03
            </div>

            <div className="solution-icon">
              ↗
            </div>

            <h3>Better Decisions</h3>

            <p>
              Use organized information and reports to
              make faster, smarter operational decisions.
            </p>

          </div>

        </div>

      </section>


      {/* ================= MODULES ================= */}

      <section
        className="erp-section modules-section"
        id="modules"
      >

        <div className="section-top modules-top">

          <span className="section-eyebrow">
            COMPLETE ERP PLATFORM
          </span>

          <h2>
            One Platform.
            <span> Every Business Function.</span>
          </h2>

          <p>
            Powerful modules designed to manage every
            important part of your manufacturing organization.
          </p>

        </div>


        <div className="module-grid">

          {modules.map((module) => (

            <div
              className="erp-module-card"
              key={module.title}
            >

              <div className={`module-icon ${module.icon}`}>
                {module.icon === "production" && "⚙"}
                {module.icon === "inventory" && "▣"}
                {module.icon === "purchase" && "⌑"}
                {module.icon === "sales" && "◫"}
                {module.icon === "hr" && "♙"}
                {module.icon === "reports" && "▥"}
              </div>

              <div className="module-card-content">

                <h3>{module.title}</h3>

                <p>{module.description}</p>

                <button onClick={goToLogin}>
                  Explore
                  <span>→</span>
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= WORKFLOW ================= */}

      <section
        className="erp-section workflow-section"
        id="workflow"
      >

        <div className="workflow-layout">

          <div className="workflow-text">

            <span className="section-eyebrow">
              SIMPLE BUSINESS WORKFLOW
            </span>

            <h2>
              From Planning
              <span> To Performance.</span>
            </h2>

            <p>
              Manufacturing ERP creates a connected workflow
              where every department can work with the same
              organized business information.
            </p>

            <button
              className="workflow-button"
              onClick={goToLogin}
            >
              Start Your ERP Journey
              <span>→</span>
            </button>

          </div>


          <div className="workflow-steps">

            {workflow.map((item, index) => (

              <div
                className="workflow-step"
                key={item.number}
              >

                <div className="workflow-number">
                  {item.number}
                </div>

                <div className="workflow-step-content">

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                </div>

                {index !== workflow.length - 1 && (
                  <div className="workflow-line"></div>
                )}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= BUSINESS IMPACT ================= */}

      <section className="impact-section">

        <div className="impact-container">

          <div className="impact-heading">

            <span className="section-eyebrow">
              BUILT FOR BUSINESS GROWTH
            </span>

            <h2>
              Manage More.
              <span> See More.</span>
            </h2>

            <p>
              A structured ERP environment helps your
              organization maintain better control over
              daily operations while preparing for growth.
            </p>

          </div>


          <div className="impact-stats">

            <div className="impact-stat">
              <strong>10+</strong>
              <span>Integrated Modules</span>
            </div>

            <div className="impact-stat">
              <strong>360°</strong>
              <span>Operational Visibility</span>
            </div>

            <div className="impact-stat">
              <strong>24/7</strong>
              <span>Business Access</span>
            </div>

            <div className="impact-stat">
              <strong>1</strong>
              <span>Unified Platform</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="erp-final-cta">

        <div className="cta-pattern"></div>

        <div className="cta-content">

          <span className="section-eyebrow cta-eyebrow">
            READY TO GET STARTED?
          </span>

          <h2>
            Bring Your Manufacturing
            <br />
            Operations Together.
          </h2>

          <p>
            Create your account and start managing
            your manufacturing business from one
            professional ERP platform.
          </p>

          <button
            className="cta-main-button"
            onClick={goToLogin}
          >
            Create Your Account
            <span>→</span>
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="erp-footer">

        <div className="footer-container">

          <div className="footer-brand-area">

            <div className="erp-logo-area">

              <div className="erp-logo">
                <span>M</span>
                <span>E</span>
              </div>

              <div className="erp-brand">
                <strong>Manufacturing ERP</strong>
                <small>Enterprise Management</small>
              </div>

            </div>

            <p>
              A modern ERP platform designed to
              simplify manufacturing operations.
            </p>

          </div>


          <div className="footer-links">

            <div>
              <h4>Platform</h4>
              <button onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}>
                Solutions
              </button>
              <button onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
                Modules
              </button>
              <button onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}>
                Workflow
              </button>
            </div>

            <div>
              <h4>Account</h4>
              <button onClick={goToLogin}>
                Sign In
              </button>
              <button onClick={goToLogin}>
                Create Account
              </button>
            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 Manufacturing ERP. All rights reserved.
          </span>

          <span>
            Enterprise Management System
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Landing;