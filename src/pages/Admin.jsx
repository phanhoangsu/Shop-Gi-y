import React, { useState, useEffect, useRef } from "react";
import useApi from "../hooks/useApi";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Orders from "../components/Orders";
import Customers from "../components/Customers";
import Reports from "../components/Reports";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaFilter,
  FaDownload,
  FaUpload,
  FaTrash,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Admin = () => {
  const { request, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    stock: "all",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const availableSizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

  // Thông tin đăng nhập admin hard-coded
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "1234";

  const [adminLoginData, setAdminLoginData] = useState({
    username: "",
    password: "",
  });

  const mockChartData = [
    { name: "T1", revenue: 4000 },
    { name: "T2", revenue: 3000 },
    { name: "T3", revenue: 2000 },
    { name: "T4", revenue: 2780 },
    { name: "T5", revenue: 1890 },
    { name: "T6", revenue: 2390 },
    { name: "T7", revenue: 3490 },
  ];

  const [formData, setFormData] = useState({
    _id: "",
    category: "nam",
    name: "",
    stock: "",
    price: "",
    img: "",
    images: [],
    product_by: "su",
    colors: [],
    description: "",
    sizes: [],
  });

  const formDataRef = useRef(formData);

  useEffect(() => {
    formDataRef.current = formData;
    console.log("Render - formData:", formData, "loading:", loading);
  }, [formData, loading]);

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchProducts();
    }
  }, [isAdminAuthenticated]);

  const fetchProducts = async () => {
    try {
      const data = await request("GET", "/su/product");
      console.log("Fetched products:", data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === "object" && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.warn("API returned invalid data format:", data);
        setProducts([]);
        showNotification("error", "Dữ liệu sản phẩm không hợp lệ!");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      showNotification("error", "Lỗi khi tải danh sách sản phẩm!");
      setProducts([]);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminLoginData.username === ADMIN_USERNAME &&
      adminLoginData.password === ADMIN_PASSWORD
    ) {
      setIsAdminAuthenticated(true);
      showNotification("success", "Đăng nhập admin thành công!");
      setAdminLoginData({ username: "", password: "" });
    } else {
      showNotification("error", "Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminLoginData({ username: "", password: "" });
    setCurrentView("dashboard");
    showNotification("success", "Đã đăng xuất!");
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b),
    }));
  };

  const handleSubmit = async (action) => {
    console.log(
      "handleSubmit called with action:",
      action,
      "formData:",
      formDataRef.current
    );

    if (action === "update" && !formDataRef.current._id) {
      showNotification("error", "Vui lòng chọn sản phẩm để cập nhật!");
      return;
    }

    const submitData = {
      ...formDataRef.current,
      stock: Number(formDataRef.current.stock),
      price: Number(formDataRef.current.price),
    };

    try {
      console.log("Submitting:", { action, data: submitData });
      switch (action) {
        case "add":
          await request("POST", "/su/product", submitData);
          showNotification("success", "Thêm sản phẩm thành công!");
          break;

        case "update":
          if (formDataRef.current._id) {
            await request(
              "DELETE",
              "/su/product/",
              {},
              formDataRef.current._id
            );
            showNotification("success", "Đã xóa sản phẩm cũ!");
          }
          await request("POST", "/su/product", {
            ...submitData,
            _id: undefined,
          });
          showNotification("success", "Cập nhật sản phẩm thành công!");
          break;

        case "delete":
          if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            await request(
              "DELETE",
              "/su/product/",
              {},
              formDataRef.current._id
            );
            showNotification("success", "Xóa sản phẩm thành công!");
          }
          break;

        default:
          throw new Error("Hành động không hợp lệ");
      }
      await fetchProducts();
      handleReset();
    } catch (err) {
      console.error("Submit error:", err);
      showNotification(
        "error",
        `Lỗi: ${err.message || "Không thể thực hiện hành động"}`
      );
    }
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
    const updatedFormData = {
      _id: product._id || "",
      category: product.category || "nam",
      name: product.name || "",
      stock: String(product.stock || ""),
      price: String(product.price || ""),
      img: product.img || "",
      images: product.images || [product.img].filter(Boolean),
      product_by: product.product_by || "su",
      colors: product.colors || [],
      description: product.description || "",
      sizes: product.sizes ? product.sizes.sort((a, b) => a - b) : [],
    };
    setFormData(updatedFormData);
    console.log("formData after set:", updatedFormData);
    setCurrentView("form");
  };

  const handleReset = () => {
    const resetData = {
      _id: "",
      category: "nam",
      name: "",
      stock: "",
      price: "",
      img: "",
      images: [],
      product_by: "su",
      colors: [],
      description: "",
      sizes: [],
    };
    setFormData(resetData);
    console.log("formData after reset:", resetData);
  };

  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) {
      showNotification("error", "Vui lòng chọn sản phẩm!");
      return;
    }

    switch (action) {
      case "delete":
        if (
          window.confirm(`Xóa ${selectedProducts.length} sản phẩm đã chọn?`)
        ) {
          try {
            await Promise.all(
              selectedProducts.map((id) =>
                request("DELETE", "/su/product/", {}, id)
              )
            );
            showNotification("success", "Xóa sản phẩm thành công!");
            setSelectedProducts([]);
            await fetchProducts();
          } catch (err) {
            showNotification("error", "Lỗi khi xóa sản phẩm!");
          }
        }
        break;
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (filters.stock === "low" && product.stock > 10) return false;
      if (filters.stock === "out" && product.stock > 0) return false;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
        );
      }
      return true;
    })
    .sort((a, b) => 0);

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Tổng sản phẩm</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {products.length}
            </h3>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <FaBox className="text-xl text-blue-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Đơn hàng mới</p>
            <h3 className="text-2xl font-bold text-gray-800">25</h3>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <FaShoppingCart className="text-xl text-green-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Khách hàng</p>
            <h3 className="text-2xl font-bold text-gray-800">1,245</h3>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <FaUsers className="text-xl text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Doanh thu</p>
            <h3 className="text-2xl font-bold text-gray-800">$13,245</h3>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <FaChartBar className="text-xl text-yellow-600" />
          </div>
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Biểu đồ doanh thu
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Đăng nhập Admin
        </h2>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={adminLoginData.username}
              onChange={handleLoginInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={adminLoginData.password}
              onChange={handleLoginInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!isAdminAuthenticated) {
      return renderLoginForm();
    }

    switch (currentView) {
      case "dashboard":
        return renderDashboard();
      case "form":
        return (
          <ProductForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSizeChange={handleSizeChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            loading={loading}
            availableSizes={availableSizes}
          />
        );
      case "list":
        return (
          <ProductList
            products={filteredProducts}
            handleEdit={handleEdit}
            handleDelete={(id) => {
              setFormData(products.find((p) => p._id === id));
              handleSubmit("delete");
            }}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            handleBulkAction={handleBulkAction}
            setCurrentView={setCurrentView}
          />
        );
      case "orders":
        return <Orders />;
      case "customers":
        return <Customers />;
      case "reports":
        return <Reports />;
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Cài đặt hệ thống</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAdminAuthenticated && (
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "dashboard"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaTachometerAlt className="mr-3" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("list")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "list"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaBox className="mr-3" />
                  Sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("orders")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "orders"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaShoppingCart className="mr-3" />
                  Đơn hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("customers")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "customers"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaUsers className="mr-3" />
                  Khách hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("reports")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "reports"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaChartBar className="mr-3" />
                  Báo cáo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("settings")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "settings"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaCog className="mr-3" />
                  Cài đặt
                </button>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <button
              onClick={handleAdminLogout}
              className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <FaSignOutAlt className="mr-3" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          sidebarOpen && isAdminAuthenticated ? "ml-64" : "ml-0"
        }`}
      >
        {isAdminAuthenticated && (
          <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FaBars className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-4"></div>
            </div>
          </header>
        )}

        <main className={isAdminAuthenticated ? "p-4" : ""}>
          {notification && (
            <div
              className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
                notification.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {notification.message}
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
