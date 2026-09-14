import { useMemo, useState } from "react";
import "./BOM.css";

const initialBoms = [
  {
    id: 1,
    bomNo: "BOM-0001",
    finishedProduct: "Steel Gear Assembly",
    productCode: "FG-1001",
    version: "V1.0",
    effectiveDate: "2026-08-01",
    status: "Active",
    createdBy: "Admin",
    createdDate: "2026-07-28",
    notes: "Standard gear assembly BOM",
    components: [
      {
        id: 1,
        product: "Steel Gear 40T",
        code: "RM-1001",
        quantity: 2,
        unit: "PCS",
        scrap: 2,
      },
      {
        id: 2,
        product: "Steel Shaft",
        code: "RM-1002",
        quantity: 1,
        unit: "PCS",
        scrap: 1,
      },
      {
        id: 3,
        product: "Bearing 6204",
        code: "RM-1003",
        quantity: 2,
        unit: "PCS",
        scrap: 0,
      },
    ],
  },
  {
    id: 2,
    bomNo: "BOM-0002",
    finishedProduct: "Industrial Motor",
    productCode: "FG-1002",
    version: "V2.0",
    effectiveDate: "2026-08-15",
    status: "Active",
    createdBy: "Production Manager",
    createdDate: "2026-08-10",
    notes: "Updated motor assembly",
    components: [
      {
        id: 1,
        product: "Copper Wire",
        code: "RM-2001",
        quantity: 5,
        unit: "KG",
        scrap: 3,
      },
      {
        id: 2,
        product: "Motor Housing",
        code: "RM-2002",
        quantity: 1,
        unit: "PCS",
        scrap: 1,
      },
      {
        id: 3,
        product: "Bearing 6205",
        code: "RM-2003",
        quantity: 2,
        unit: "PCS",
        scrap: 0,
      },
    ],
  },
  {
    id: 3,
    bomNo: "BOM-0003",
    finishedProduct: "Aluminium Bracket",
    productCode: "FG-1003",
    version: "V1.0",
    effectiveDate: "2026-07-20",
    status: "Inactive",
    createdBy: "Admin",
    createdDate: "2026-07-15",
    notes: "Old bracket design",
    components: [
      {
        id: 1,
        product: "Aluminium Sheet",
        code: "RM-3001",
        quantity: 1.5,
        unit: "KG",
        scrap: 5,
      },
      {
        id: 2,
        product: "Steel Bolt",
        code: "RM-3002",
        quantity: 4,
        unit: "PCS",
        scrap: 1,
      },
    ],
  },
];

const products = [
  {
    name: "Steel Gear Assembly",
    code: "FG-1001",
    unit: "PCS",
  },
  {
    name: "Industrial Motor",
    code: "FG-1002",
    unit: "PCS",
  },
  {
    name: "Aluminium Bracket",
    code: "FG-1003",
    unit: "PCS",
  },
  {
    name: "Pump Assembly",
    code: "FG-1004",
    unit: "PCS",
  },
];

const componentProducts = [
  {
    name: "Steel Gear 40T",
    code: "RM-1001",
    unit: "PCS",
  },
  {
    name: "Steel Shaft",
    code: "RM-1002",
    unit: "PCS",
  },
  {
    name: "Bearing 6204",
    code: "RM-1003",
    unit: "PCS",
  },
  {
    name: "Copper Wire",
    code: "RM-2001",
    unit: "KG",
  },
  {
    name: "Motor Housing",
    code: "RM-2002",
    unit: "PCS",
  },
  {
    name: "Bearing 6205",
    code: "RM-2003",
    unit: "PCS",
  },
  {
    name: "Aluminium Sheet",
    code: "RM-3001",
    unit: "KG",
  },
  {
    name: "Steel Bolt",
    code: "RM-3002",
    unit: "PCS",
  },
  {
    name: "Rubber Seal",
    code: "RM-4001",
    unit: "PCS",
  },
  {
    name: "Lubricant Oil",
    code: "RM-4002",
    unit: "LTR",
  },
];

const emptyForm = {
  bomNo: "",
  finishedProduct: "",
  productCode: "",
  version: "V1.0",
  effectiveDate: "",
  status: "Draft",
  createdBy: "Admin",
  notes: "",
  components: [
    {
      id: Date.now(),
      product: "",
      code: "",
      quantity: "",
      unit: "",
      scrap: 0,
    },
  ],
};

function BOM() {
  const [boms, setBoms] = useState(initialBoms);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingBom, setEditingBom] = useState(null);
  const [viewingBom, setViewingBom] = useState(null);
  const [deletingBom, setDeletingBom] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredBoms = useMemo(() => {
    return boms.filter((bom) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        bom.bomNo.toLowerCase().includes(searchText) ||
        bom.finishedProduct.toLowerCase().includes(searchText) ||
        bom.productCode.toLowerCase().includes(searchText) ||
        bom.version.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || bom.status === statusFilter;

      const matchesProduct =
        productFilter === "All" ||
        bom.finishedProduct === productFilter;

      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [boms, search, statusFilter, productFilter]);

  const totalBoms = boms.length;

  const activeBoms = boms.filter(
    (bom) => bom.status === "Active"
  ).length;

  const draftBoms = boms.filter(
    (bom) => bom.status === "Draft"
  ).length;

  const inactiveBoms = boms.filter(
    (bom) => bom.status === "Inactive"
  ).length;

  const totalComponents = boms.reduce(
    (total, bom) => total + bom.components.length,
    0
  );

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      bomNo: `BOM-${String(boms.length + 1).padStart(4, "0")}`,
      effectiveDate: new Date().toISOString().split("T")[0],
      components: [
        {
          id: Date.now(),
          product: "",
          code: "",
          quantity: "",
          unit: "",
          scrap: 0,
        },
      ],
    });

    setErrors({});
  };

  const openAddModal = () => {
    setEditingBom(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (bom) => {
    setEditingBom(bom);

    setFormData({
      bomNo: bom.bomNo,
      finishedProduct: bom.finishedProduct,
      productCode: bom.productCode,
      version: bom.version,
      effectiveDate: bom.effectiveDate,
      status: bom.status,
      createdBy: bom.createdBy,
      notes: bom.notes,
      components: bom.components.map((component) => ({
        ...component,
      })),
    });

    setErrors({});
    setShowModal(true);
  };

  const openViewModal = (bom) => {
    setViewingBom(bom);
    setShowViewModal(true);
  };

  const openDeleteModal = (bom) => {
    setDeletingBom(bom);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBom(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFinishedProductChange = (e) => {
    const value = e.target.value;

    const selectedProduct = products.find(
      (product) => product.name === value
    );

    setFormData((prev) => ({
      ...prev,
      finishedProduct: value,
      productCode: selectedProduct?.code || "",
    }));

    setErrors((prev) => ({
      ...prev,
      finishedProduct: "",
    }));
  };

  const handleComponentChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((component) => {
        if (component.id !== id) {
          return component;
        }

        if (field === "product") {
          const selectedProduct = componentProducts.find(
            (product) => product.name === value
          );

          return {
            ...component,
            product: value,
            code: selectedProduct?.code || "",
            unit: selectedProduct?.unit || "",
          };
        }

        return {
          ...component,
          [field]: value,
        };
      }),
    }));
  };

  const addComponent = () => {
    setFormData((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          id: Date.now() + Math.random(),
          product: "",
          code: "",
          quantity: "",
          unit: "",
          scrap: 0,
        },
      ],
    }));
  };

  const removeComponent = (id) => {
    if (formData.components.length === 1) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      components: prev.components.filter(
        (component) => component.id !== id
      ),
    }));
  };

  const duplicateBom = (bom) => {
    const duplicated = {
      ...bom,
      id: Date.now(),
      bomNo: `BOM-${String(boms.length + 1).padStart(4, "0")}`,
      version: "V1.0",
      status: "Draft",
      createdDate: new Date().toISOString().split("T")[0],
      components: bom.components.map((component) => ({
        ...component,
        id: Date.now() + Math.random(),
      })),
    };

    setBoms((prev) => [...prev, duplicated]);
  };

  const toggleStatus = (bom) => {
    const newStatus =
      bom.status === "Active" ? "Inactive" : "Active";

    setBoms((prev) =>
      prev.map((item) =>
        item.id === bom.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bomNo.trim()) {
      newErrors.bomNo = "BOM number is required";
    }

    if (!formData.finishedProduct) {
      newErrors.finishedProduct =
        "Finished product is required";
    }

    if (!formData.version.trim()) {
      newErrors.version = "Version is required";
    }

    if (!formData.effectiveDate) {
      newErrors.effectiveDate =
        "Effective date is required";
    }

    if (!formData.createdBy.trim()) {
      newErrors.createdBy = "Created by is required";
    }

    if (!formData.components.length) {
      newErrors.components =
        "At least one component is required";
    }

    formData.components.forEach((component, index) => {
      if (!component.product) {
        newErrors[`component-${index}-product`] =
          "Select component";
      }

      if (
        component.quantity === "" ||
        Number(component.quantity) <= 0
      ) {
        newErrors[`component-${index}-quantity`] =
          "Enter valid quantity";
      }

      if (
        component.scrap === "" ||
        Number(component.scrap) < 0 ||
        Number(component.scrap) > 100
      ) {
        newErrors[`component-${index}-scrap`] =
          "Scrap must be between 0 and 100";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveBom = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanComponents = formData.components.map(
      (component) => ({
        ...component,
        quantity: Number(component.quantity),
        scrap: Number(component.scrap || 0),
      })
    );

    if (editingBom) {
      setBoms((prev) =>
        prev.map((bom) =>
          bom.id === editingBom.id
            ? {
                ...bom,
                ...formData,
                components: cleanComponents,
              }
            : bom
        )
      );
    } else {
      const newBom = {
        id: Date.now(),
        ...formData,
        components: cleanComponents,
        createdDate: new Date()
          .toISOString()
          .split("T")[0],
      };

      setBoms((prev) => [...prev, newBom]);
    }

    closeModal();
  };

  const deleteBom = () => {
    if (!deletingBom) return;

    setBoms((prev) =>
      prev.filter((bom) => bom.id !== deletingBom.id)
    );

    setDeletingBom(null);
    setShowDeleteModal(false);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setProductFilter("All");
  };

  const calculateScrapQty = (quantity, scrap) => {
    const qty = Number(quantity) || 0;
    const scrapPercentage = Number(scrap) || 0;

    return qty * (scrapPercentage / 100);
  };

  return (
    <div className="bom-page">

      {/* HEADER */}
      <div className="bom-header">
        <div>
          <h1>Bill of Materials</h1>
          <p>
            Create and manage product-wise raw material
            requirements.
          </p>
        </div>

        <button
          className="add-bom-btn"
          onClick={openAddModal}
        >
          <span>＋</span>
          New BOM
        </button>
      </div>

      {/* SUMMARY */}
      <div className="bom-summary">

        <div className="bom-card">
          <div className="bom-card-icon blue">📋</div>
          <div>
            <span>Total BOMs</span>
            <strong>{totalBoms}</strong>
          </div>
        </div>

        <div className="bom-card">
          <div className="bom-card-icon green">✓</div>
          <div>
            <span>Active BOMs</span>
            <strong>{activeBoms}</strong>
          </div>
        </div>

        <div className="bom-card">
          <div className="bom-card-icon orange">◷</div>
          <div>
            <span>Draft BOMs</span>
            <strong>{draftBoms}</strong>
          </div>
        </div>

        <div className="bom-card">
          <div className="bom-card-icon purple">↻</div>
          <div>
            <span>Inactive BOMs</span>
            <strong>{inactiveBoms}</strong>
          </div>
        </div>

        <div className="bom-card">
          <div className="bom-card-icon teal">☷</div>
          <div>
            <span>Total Components</span>
            <strong>{totalComponents}</strong>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="bom-toolbar">

        <div className="bom-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search BOM no, product or version..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={productFilter}
          onChange={(e) =>
            setProductFilter(e.target.value)
          }
        >
          <option value="All">All Products</option>

          {products.map((product) => (
            <option
              key={product.code}
              value={product.name}
            >
              {product.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>

      {/* TABLE */}
      <div className="bom-table-container">

        <div className="table-top">
          <div>
            <h3>BOM List</h3>
            <span>
              Showing {filteredBoms.length} of {boms.length} BOMs
            </span>
          </div>
        </div>

        <div className="table-responsive">

          <table className="bom-table">

            <thead>
              <tr>
                <th>BOM No.</th>
                <th>Finished Product</th>
                <th>Version</th>
                <th>Effective Date</th>
                <th>Components</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredBoms.length > 0 ? (
                filteredBoms.map((bom) => (
                  <tr key={bom.id}>

                    <td>
                      <div className="bom-number">
                        <div className="bom-icon">B</div>

                        <div>
                          <strong>{bom.bomNo}</strong>
                          <small>{bom.productCode}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="product-name">
                        {bom.finishedProduct}
                      </strong>
                    </td>

                    <td>
                      <span className="version-badge">
                        {bom.version}
                      </span>
                    </td>

                    <td>
                      {bom.effectiveDate}
                    </td>

                    <td>
                      <span className="component-count">
                        {bom.components.length} Components
                      </span>
                    </td>

                    <td>
                      <span
                        className={`bom-status ${bom.status.toLowerCase()}`}
                      >
                        {bom.status}
                      </span>
                    </td>

                    <td>
                      <div className="created-by">
                        <span>
                          {bom.createdBy
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                        {bom.createdBy}
                      </div>
                    </td>

                    <td>
                      <div className="bom-actions">

                        <button
                          className="action-btn view"
                          title="View"
                          onClick={() =>
                            openViewModal(bom)
                          }
                        >
                          👁
                        </button>

                        <button
                          className="action-btn edit"
                          title="Edit"
                          onClick={() =>
                            openEditModal(bom)
                          }
                        >
                          ✎
                        </button>

                        <button
                          className="action-btn duplicate"
                          title="Duplicate"
                          onClick={() =>
                            duplicateBom(bom)
                          }
                        >
                          ⧉
                        </button>

                        <button
                          className={`action-btn status ${
                            bom.status === "Active"
                              ? "deactivate"
                              : "activate"
                          }`}
                          title={
                            bom.status === "Active"
                              ? "Deactivate"
                              : "Activate"
                          }
                          onClick={() =>
                            toggleStatus(bom)
                          }
                        >
                          {bom.status === "Active"
                            ? "◉"
                            : "○"}
                        </button>

                        <button
                          className="action-btn delete"
                          title="Delete"
                          onClick={() =>
                            openDeleteModal(bom)
                          }
                        >
                          🗑
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="no-bom"
                  >
                    <div>
                      <span>📋</span>
                      <h3>No BOM Found</h3>
                      <p>
                        Try changing your search or
                        filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="bom-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="bom-modal">

            <div className="bom-modal-header">

              <div>
                <h2>
                  {editingBom
                    ? "Edit BOM"
                    : "Create New BOM"}
                </h2>

                <p>
                  Define finished product and its
                  material requirements.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={saveBom}
              className="bom-form"
            >

              {/* BASIC INFORMATION */}
              <div className="form-section">

                <div className="section-title">
                  <span>01</span>
                  <div>
                    <h3>BOM Information</h3>
                    <p>
                      Basic information about this
                      bill of materials.
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      BOM Number
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="bomNo"
                      value={formData.bomNo}
                      onChange={handleChange}
                      placeholder="BOM-0001"
                    />

                    {errors.bomNo && (
                      <small className="error-message">
                        {errors.bomNo}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Finished Product
                      <span>*</span>
                    </label>

                    <select
                      value={formData.finishedProduct}
                      onChange={
                        handleFinishedProductChange
                      }
                    >
                      <option value="">
                        Select finished product
                      </option>

                      {products.map((product) => (
                        <option
                          key={product.code}
                          value={product.name}
                        >
                          {product.name}
                        </option>
                      ))}
                    </select>

                    {errors.finishedProduct && (
                      <small className="error-message">
                        {errors.finishedProduct}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Product Code</label>

                    <input
                      type="text"
                      value={formData.productCode}
                      readOnly
                      placeholder="Auto-filled"
                      className="readonly-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Version
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleChange}
                      placeholder="V1.0"
                    />

                    {errors.version && (
                      <small className="error-message">
                        {errors.version}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Effective Date
                      <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="effectiveDate"
                      value={formData.effectiveDate}
                      onChange={handleChange}
                    />

                    {errors.effectiveDate && (
                      <small className="error-message">
                        {errors.effectiveDate}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Draft">
                        Draft
                      </option>

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Created By
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleChange}
                      placeholder="Enter employee name"
                    />

                    {errors.createdBy && (
                      <small className="error-message">
                        {errors.createdBy}
                      </small>
                    )}
                  </div>

                </div>

              </div>

              {/* COMPONENTS */}
              <div className="form-section">

                <div className="component-section-header">

                  <div className="section-title">
                    <span>02</span>
                    <div>
                      <h3>Raw Materials / Components</h3>
                      <p>
                        Define material quantity required
                        for one finished product.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="add-component-btn"
                    onClick={addComponent}
                  >
                    ＋ Add Component
                  </button>

                </div>

                {errors.components && (
                  <div className="component-error">
                    {errors.components}
                  </div>
                )}

                <div className="component-table-wrapper">

                  <table className="component-table">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Component / Raw Material</th>
                        <th>Code</th>
                        <th>Quantity / Unit</th>
                        <th>Scrap %</th>
                        <th>Scrap Qty</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {formData.components.map(
                        (component, index) => {

                          const scrapQty =
                            calculateScrapQty(
                              component.quantity,
                              component.scrap
                            );

                          return (
                            <tr key={component.id}>

                              <td>
                                <span className="row-number">
                                  {index + 1}
                                </span>
                              </td>

                              <td>
                                <select
                                  value={
                                    component.product
                                  }
                                  onChange={(e) =>
                                    handleComponentChange(
                                      component.id,
                                      "product",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">
                                    Select component
                                  </option>

                                  {componentProducts.map(
                                    (product) => (
                                      <option
                                        key={
                                          product.code
                                        }
                                        value={
                                          product.name
                                        }
                                      >
                                        {product.name}
                                      </option>
                                    )
                                  )}
                                </select>

                                {errors[
                                  `component-${index}-product`
                                ] && (
                                  <small className="error-message">
                                    {
                                      errors[
                                        `component-${index}-product`
                                      ]
                                    }
                                  </small>
                                )}
                              </td>

                              <td>
                                <input
                                  type="text"
                                  value={
                                    component.code
                                  }
                                  readOnly
                                  className="readonly-input"
                                  placeholder="Auto"
                                />
                              </td>

                              <td>
                                <div className="quantity-unit">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.001"
                                    value={
                                      component.quantity
                                    }
                                    onChange={(e) =>
                                      handleComponentChange(
                                        component.id,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                    placeholder="0.000"
                                  />

                                  <span>
                                    {component.unit ||
                                      "Unit"}
                                  </span>
                                </div>

                                {errors[
                                  `component-${index}-quantity`
                                ] && (
                                  <small className="error-message">
                                    {
                                      errors[
                                        `component-${index}-quantity`
                                      ]
                                    }
                                  </small>
                                )}
                              </td>

                              <td>
                                <div className="scrap-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={
                                      component.scrap
                                    }
                                    onChange={(e) =>
                                      handleComponentChange(
                                        component.id,
                                        "scrap",
                                        e.target.value
                                      )
                                    }
                                  />

                                  <span>%</span>
                                </div>
                              </td>

                              <td>
                                <span className="scrap-qty">
                                  {scrapQty.toFixed(3)}
                                </span>
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="remove-component-btn"
                                  onClick={() =>
                                    removeComponent(
                                      component.id
                                    )
                                  }
                                  disabled={
                                    formData.components
                                      .length === 1
                                  }
                                >
                                  🗑
                                </button>
                              </td>

                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>

                <div className="component-footer">

                  <span>
                    Total Components:
                    <strong>
                      {formData.components.length}
                    </strong>
                  </span>

                  <span>
                    Total Scrap Qty:
                    <strong>
                      {formData.components
                        .reduce(
                          (total, component) =>
                            total +
                            calculateScrapQty(
                              component.quantity,
                              component.scrap
                            ),
                          0
                        )
                        .toFixed(3)}
                    </strong>
                  </span>

                </div>

              </div>

              {/* NOTES */}
              <div className="form-section">

                <div className="section-title">
                  <span>03</span>
                  <div>
                    <h3>Additional Information</h3>
                    <p>
                      Add notes or production instructions.
                    </p>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Notes / Instructions</label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter notes, production instructions or special requirements..."
                    rows="4"
                  />
                </div>

              </div>

              {/* FOOTER */}
              <div className="bom-form-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-bom-btn"
                >
                  {editingBom
                    ? "Update BOM"
                    : "Create BOM"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && viewingBom && (
        <div
          className="bom-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowViewModal(false);
            }
          }}
        >
          <div className="bom-view-modal">

            <div className="bom-modal-header">

              <div>
                <h2>BOM Details</h2>
                <p>
                  Complete bill of materials information.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                ×
              </button>

            </div>

            <div className="bom-view-content">

              {/* VIEW SUMMARY */}
              <div className="bom-detail-header">

                <div className="detail-bom-icon">
                  B
                </div>

                <div>
                  <h2>{viewingBom.bomNo}</h2>
                  <p>{viewingBom.finishedProduct}</p>
                </div>

                <span
                  className={`bom-status ${viewingBom.status.toLowerCase()}`}
                >
                  {viewingBom.status}
                </span>

              </div>

              {/* INFO GRID */}
              <div className="view-info-grid">

                <div>
                  <span>Product Code</span>
                  <strong>
                    {viewingBom.productCode}
                  </strong>
                </div>

                <div>
                  <span>Version</span>
                  <strong>
                    {viewingBom.version}
                  </strong>
                </div>

                <div>
                  <span>Effective Date</span>
                  <strong>
                    {viewingBom.effectiveDate}
                  </strong>
                </div>

                <div>
                  <span>Created By</span>
                  <strong>
                    {viewingBom.createdBy}
                  </strong>
                </div>

                <div>
                  <span>Created Date</span>
                  <strong>
                    {viewingBom.createdDate}
                  </strong>
                </div>

                <div>
                  <span>Total Components</span>
                  <strong>
                    {viewingBom.components.length}
                  </strong>
                </div>

              </div>

              {/* COMPONENTS */}
              <div className="view-component-section">

                <div className="view-section-title">
                  <div>
                    <h3>Material Requirements</h3>
                    <p>
                      Components required for one
                      finished product.
                    </p>
                  </div>
                </div>

                <div className="view-component-table-wrapper">

                  <table className="view-component-table">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Component</th>
                        <th>Code</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Scrap %</th>
                        <th>Scrap Qty</th>
                        <th>Total Required</th>
                      </tr>
                    </thead>

                    <tbody>

                      {viewingBom.components.map(
                        (component, index) => {

                          const scrapQty =
                            calculateScrapQty(
                              component.quantity,
                              component.scrap
                            );

                          const totalRequired =
                            Number(component.quantity || 0) +
                            scrapQty;

                          return (
                            <tr key={component.id}>

                              <td>{index + 1}</td>

                              <td>
                                <strong>
                                  {component.product}
                                </strong>
                              </td>

                              <td>
                                {component.code}
                              </td>

                              <td>
                                {Number(
                                  component.quantity
                                ).toFixed(3)}
                              </td>

                              <td>
                                {component.unit}
                              </td>

                              <td>
                                {component.scrap}%
                              </td>

                              <td>
                                {scrapQty.toFixed(3)}
                              </td>

                              <td>
                                <strong>
                                  {totalRequired.toFixed(3)}
                                </strong>
                              </td>

                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* NOTES */}
              {viewingBom.notes && (
                <div className="view-notes">

                  <h3>Notes / Instructions</h3>

                  <p>{viewingBom.notes}</p>

                </div>
              )}

            </div>

            <div className="view-modal-footer">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                Close
              </button>

              <button
                className="save-bom-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(viewingBom);
                }}
              >
                Edit BOM
              </button>

            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteModal && deletingBom && (
        <div className="bom-modal-overlay">

          <div className="delete-modal">

            <div className="delete-icon">
              !
            </div>

            <h2>Delete BOM?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deletingBom.bomNo}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={deleteBom}
              >
                Delete BOM
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default BOM;