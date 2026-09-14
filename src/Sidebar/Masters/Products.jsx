import "./Products.css";
import { useState } from "react";

function Products() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState([
    {
      code: "PRD-001",
      name: "Steel Sheet",
      type: "Raw Material",
      category: "Raw Material",
      unit: "Kg",
      stock: 1250,
      minStock: 500,
      purchasePrice: 85,
      sellingPrice: 110,
      supplier: "Tata Steel",
      batchTracking: "Yes",
      status: "In Stock",
    },
    {
      code: "PRD-002",
      name: "Aluminium Rod",
      type: "Raw Material",
      category: "Raw Material",
      unit: "Kg",
      stock: 320,
      minStock: 400,
      purchasePrice: 210,
      sellingPrice: 260,
      supplier: "Hindalco",
      batchTracking: "Yes",
      status: "Low Stock",
    },
    {
      code: "PRD-003",
      name: "MS Bolt 10mm",
      type: "Component",
      category: "Component",
      unit: "Nos",
      stock: 5200,
      minStock: 1000,
      purchasePrice: 8,
      sellingPrice: 12,
      supplier: "ABC Fasteners",
      batchTracking: "No",
      status: "In Stock",
    },
    {
      code: "PRD-004",
      name: "Copper Wire",
      type: "Raw Material",
      category: "Raw Material",
      unit: "Kg",
      stock: 180,
      minStock: 250,
      purchasePrice: 720,
      sellingPrice: 850,
      supplier: "Vedanta",
      batchTracking: "Yes",
      status: "Low Stock",
    },
    {
      code: "PRD-005",
      name: "Motor Housing",
      type: "Finished Goods",
      category: "Finished Goods",
      unit: "Nos",
      stock: 850,
      minStock: 200,
      purchasePrice: 450,
      sellingPrice: 620,
      supplier: "Internal Production",
      batchTracking: "No",
      status: "In Stock",
    },
  ]);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    category: "",
    unit: "",
    openingStock: "",
    minStock: "",
    purchasePrice: "",
    sellingPrice: "",
    supplier: "",
    batchTracking: "No",
    description: "",
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !formData.code ||
      !formData.name ||
      !formData.type ||
      !formData.category ||
      !formData.unit
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const stock = Number(formData.openingStock) || 0;
    const minStock = Number(formData.minStock) || 0;

    const newProduct = {
      code: formData.code,
      name: formData.name,
      type: formData.type,
      category: formData.category,
      unit: formData.unit,
      stock: stock,
      minStock: minStock,
      purchasePrice: Number(formData.purchasePrice) || 0,
      sellingPrice: Number(formData.sellingPrice) || 0,
      supplier: formData.supplier || "Not Assigned",
      batchTracking: formData.batchTracking,
      status: stock <= minStock ? "Low Stock" : "In Stock",
    };

    setProducts([...products, newProduct]);

    setFormData({
      code: "",
      name: "",
      type: "",
      category: "",
      unit: "",
      openingStock: "",
      minStock: "",
      purchasePrice: "",
      sellingPrice: "",
      supplier: "",
      batchTracking: "No",
      description: "",
    });

    setShowForm(false);
  };

  return (
    <div className="products-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage products, materials and finished goods</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Product
        </button>
      </div>

      {/* Product Summary */}
      <div className="product-summary">

        <div className="summary-card">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="summary-card">
          <span>Raw Materials</span>
          <strong>
            {products.filter(
              (product) => product.type === "Raw Material"
            ).length}
          </strong>
        </div>

        <div className="summary-card">
          <span>Finished Goods</span>
          <strong>
            {products.filter(
              (product) => product.type === "Finished Goods"
            ).length}
          </strong>
        </div>

        <div className="summary-card">
          <span>Low Stock</span>
          <strong className="danger-text">
            {products.filter(
              (product) => product.status === "Low Stock"
            ).length}
          </strong>
        </div>

      </div>

      {/* Product Table */}
      <div className="table-card">

        <div className="table-toolbar">

          <div>
            <h3>Product List</h3>
            <p>View and manage all products</p>
          </div>

          <div className="table-actions">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <button className="secondary-button">
              Filter
            </button>

          </div>

        </div>

        <div className="table-wrapper">

          <table className="erp-table">

            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Current Stock</th>
                <th>Purchase Price</th>
                <th>Selling Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product.code}>

                  <td>
                    <strong>{product.code}</strong>
                  </td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>{product.unit}</td>

                  <td>
                    <strong>{product.stock}</strong>
                  </td>

                  <td>₹{product.purchasePrice}</td>

                  <td>₹{product.sellingPrice}</td>

                  <td>
                    <span
                      className={
                        product.status === "Low Stock"
                          ? "status-badge status-warning"
                          : "status-badge status-success"
                      }
                    >
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <button className="action-button">
                      View
                    </button>

                    <button className="action-button">
                      Edit
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add Product Modal */}
      {showForm && (
        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">
              <div>
                <h2>Add Product</h2>
                <p>Create a new product master record</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>

              <div className="form-section">

                <h3>Basic Information</h3>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      Product Code <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="code"
                      placeholder="e.g. PRD-006"
                      value={formData.code}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Product Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Product Type <span>*</span>
                    </label>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Raw Material">
                        Raw Material
                      </option>
                      <option value="Component">
                        Component
                      </option>
                      <option value="Finished Goods">
                        Finished Goods
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Category <span>*</span>
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Raw Material">
                        Raw Material
                      </option>
                      <option value="Component">
                        Component
                      </option>
                      <option value="Finished Goods">
                        Finished Goods
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Unit <span>*</span>
                    </label>

                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                    >
                      <option value="">Select Unit</option>
                      <option value="Kg">Kg</option>
                      <option value="Nos">Nos</option>
                      <option value="Litre">Litre</option>
                      <option value="Meter">Meter</option>
                      <option value="Box">Box</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Supplier</label>

                    <select
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                    >
                      <option value="">Select Supplier</option>
                      <option value="Tata Steel">
                        Tata Steel
                      </option>
                      <option value="Hindalco">
                        Hindalco
                      </option>
                      <option value="ABC Fasteners">
                        ABC Fasteners
                      </option>
                      <option value="Vedanta">
                        Vedanta
                      </option>
                    </select>
                  </div>

                </div>

              </div>

              <div className="form-section">

                <h3>Stock & Pricing</h3>

                <div className="form-grid">

                  <div className="form-group">
                    <label>Opening Stock</label>

                    <input
                      type="number"
                      name="openingStock"
                      placeholder="0"
                      value={formData.openingStock}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Minimum Stock</label>

                    <input
                      type="number"
                      name="minStock"
                      placeholder="0"
                      value={formData.minStock}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Purchase Price</label>

                    <input
                      type="number"
                      name="purchasePrice"
                      placeholder="₹ 0.00"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Selling Price</label>

                    <input
                      type="number"
                      name="sellingPrice"
                      placeholder="₹ 0.00"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Batch Tracking</label>

                    <select
                      name="batchTracking"
                      value={formData.batchTracking}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                </div>

              </div>

              <div className="form-section">

                <h3>Description</h3>

                <div className="form-group">

                  <textarea
                    name="description"
                    placeholder="Enter product description..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Save Product
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Products;
