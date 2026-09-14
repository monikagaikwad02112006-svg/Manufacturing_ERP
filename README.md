#  Manufacturing ERP

> **A modern, responsive Manufacturing Enterprise Resource Planning (ERP) frontend built with React and Vite.**

Manufacturing ERP is a professional web-based application designed to centralize and simplify manufacturing business operations. The system provides a structured interface for managing **products, suppliers, customers, inventory, purchasing, production, quality, sales, HR & payroll, maintenance, reports, users, roles, and company settings** from a single platform.

The project focuses on a clean user experience, responsive design, modular architecture, and scalable frontend development.



##  Project Overview

Manufacturing organizations manage multiple interconnected operations such as procurement, inventory, production, quality control, sales, employee management, and reporting.

This ERP frontend provides a centralized dashboard and module-based interface to help users:

* Manage manufacturing master data
* Track inventory and stock movement
* Handle purchase requests and purchase orders
* Manage Bills of Materials (BOM)
* Monitor production activities
* Perform quality checks
* Manage customer orders and dispatch
* Handle sales invoices and customer payments
* Manage employees and payroll
* Track maintenance records
* Generate business reports
* Manage users and roles
* Configure company settings

The application is designed with a **professional, clean, light-themed interface** and responsive layouts for desktop, tablet, and mobile screens.

---

##  Key Features

### Dashboard

* Manufacturing business overview
* Production statistics
* Inventory summary
* Purchase and sales insights
* Recent activities
* Operational status indicators

###  Masters Management

* Products
* Suppliers
* Customers
* Employees
* Warehouses
* Machines

###  Purchase Management

* Purchase Requests
* Purchase Orders
* Supplier management
* Procurement workflow

###  Inventory Management

* Stock Overview
* Stock Movement
* Warehouse Transfer
* Inventory tracking

###  Production Management

* Bill of Materials (BOM)
* Production Orders
* Production Tracking
* Production workflow monitoring

###  Quality Management

* Quality Checks
* Rejected & Quarantine management
* Quality status tracking

###  Sales Management

* Customer Orders
* Dispatch
* Sales Invoices
* Customer Payments

###  HR & Payroll

* Employee management
* Attendance
* Salary management
* Payroll management

###  Maintenance

* Maintenance Records
* Equipment maintenance tracking
* Maintenance status management

###  Reports & Analytics

* Centralized reports section
* Business performance monitoring
* Operational insights

###  Settings & Administration

* User Management
* Role Management
* Company Settings
* Login & account creation interface

---

##  Authentication

The current frontend includes a login and account-creation experience using:

* Login ID
* Password
* Remember Me
* Password visibility toggle
* Create Account
* Session management
* Local browser storage for demo authentication

> **Note:** The current authentication is intended for frontend demonstration and development. Production deployment should use a secure backend authentication system with encrypted password handling, authorization, HTTPS, secure cookies/tokens, rate limiting, and proper access control.



##  Technology Stack

| Technology                       | Purpose                         |
| -------------------------------- | ------------------------------- |
|  React                         | Frontend UI development         |
|  Vite                           | Development & build tooling     |
|  JavaScript                    | Application logic               |
|  CSS3                          | Styling & responsive design     |
| React Router                  | Application routing             |
| LocalStorage / SessionStorage | Demo session & account handling |
|  Git                           | Version control                 |
|  GitHub                        | Source code management          |

---

## Project Structure


Manufacturing_ERP/
│
├── public/
│
├── src/
│   │
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   │
│   ├── Sidebar/
│   │   │
│   │   ├── Masters/
│   │   │   ├── Products.jsx
│   │   │   ├── Suppliers.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Warehouses.jsx
│   │   │   └── Machines.jsx
│   │   │
│   │   ├── Purchase/
│   │   ├── Inventory/
│   │   ├── Production/
│   │   ├── Quality/
│   │   ├── Sales/
│   │   ├── HR & Payroll/
│   │   ├── Reports/
│   │   ├── Maintenance/
│   │   └── Settings/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── PageHeader.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🧩 ERP Modules

```text
Manufacturing ERP
│
├── Dashboard
│
├── Masters
│   ├── Products
│   ├── Suppliers
│   ├── Customers
│   ├── Employees
│   ├── Warehouses
│   └── Machines
│
├── Purchase
│   ├── Purchase Requests
│   └── Purchase Orders
│
├── Inventory
│   ├── Stock Overview
│   ├── Stock Movement
│   └── Warehouse Transfer
│
├── Production
│   ├── Bill of Materials
│   ├── Production Orders
│   └── Production Tracking
│
├── Quality
│   ├── Quality Check
│   └── Rejected & Quarantine
│
├── Sales
│   ├── Customer Orders
│   ├── Dispatch
│   ├── Sales Invoice
│   └── Customer Payments
│
├── HR & Payroll
│   ├── Employees
│   ├── Attendance
│   ├── Salary
│   └── Payroll
│
├── Maintenance
│   └── Maintenance Records
│
├── Reports
│   └── All Reports
│
└── Settings
    ├── Users
    ├── Roles
    └── Company Settings
```



##  Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/monikagaikwad02112006-svg/Manufacturing_ERP.git

### 2. Navigate to the Project

```bash
cd Manufacturing_ERP


### 3. Install Dependencies

```bash
npm install


### 4. Start the Development Server

```bash
npm run dev


The application will be available at the local URL displayed by Vite, usually:


http://localhost:5173



##  Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* Git installed
* A modern web browser
* VS Code or another code editor

You can verify Node.js and npm with:


node --version
npm --version


##  UI & Design

The application follows a modern enterprise dashboard design approach.

### Design Principles

* Clean professional interface
* Light theme
* Responsive layouts
* Consistent spacing
* Reusable components
* Clear navigation
* Accessible form layouts
* Structured data tables
* Professional dashboard cards
* Mobile-friendly interface

---

##  Responsive Design

The application is designed to work across different screen sizes:

*  Desktop
*  Laptop
*  Mobile
*  Tablet

Responsive CSS techniques are used to adapt layouts, navigation, cards, tables, forms, and dashboard components according to screen size.

---

##  Application Flow


Landing Page
     ↓
   Login
     ↓
Authentication
     ↓
Dashboard
     ↓
ERP Modules
     │
     ├── Masters
     ├── Purchase
     ├── Inventory
     ├── Production
     ├── Quality
     ├── Sales
     ├── HR & Payroll
     ├── Maintenance
     ├── Reports
     └── Settings


##  Future Enhancements

The current project is primarily a frontend ERP application. Future development can include:

*  REST API integration
*  Backend database integration
*  Production-grade authentication
*  Role-based access control
*  Advanced analytics dashboards
*  Interactive charts
*  PDF invoice generation
*  Excel/CSV export
*  Real-time notifications
*  Advanced inventory tracking
*  Real-time production monitoring
*  Payment integration
*  Cloud deployment
*  Real-time data synchronization
*  Audit logs

---

##  Project Goals

The major goals of this project are to:

1. Build a complete manufacturing ERP frontend.
2. Create a modular and scalable React architecture.
3. Provide a professional enterprise-level user interface.
4. Centralize manufacturing operations.
5. Improve visibility of business processes.
6. Practice real-world React application development.
7. Build a strong portfolio-level project.

---

##  Developer

### Monika Gaikwad

**Frontend Developer | Data Analytics & Technology Enthusiast**

This project was developed as a practical implementation of modern frontend development concepts using React, JavaScript, CSS, and Vite.



##  Repository

GitHub:
[Manufacturing_ERP](https://github.com/monikagaikwad02112006-svg/Manufacturing_ERP?utm_source=chatgpt.com)









