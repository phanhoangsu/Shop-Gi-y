/**
 * Admin Page Component
 * 
 * Chức năng chính:
 * 1. Quản lý sản phẩm:
 *    - CRUD operations
 *    - Quản lý tồn kho
 *    - Upload ảnh
 *    - Phân loại sản phẩm
 * 
 * 2. Quản lý đơn hàng:
 *    - Xem danh sách
 *    - Cập nhật trạng thái
 *    - Thống kê doanh thu
 * 
 * 3. Quản lý khách hàng:
 *    - Danh sách khách hàng
 *    - Lịch sử mua hàng
 *    - Phân tích hành vi
 * 
 * 4. Quản lý tin tức:
 *    - Đăng/sửa/xóa tin
 *    - Quản lý tags
 *    - SEO optimization
 * 
 * 5. Bảo mật:
 *    - Xác thực admin
 *    - Phân quyền
 *    - Session management
 */

import React, { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBox,
  FaChartBar,
  FaCog,
  FaCrown,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUsers,
  FaNewspaper,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Customers from "../components/Customers";
import Orders from "../components/Orders";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Reports from "../components/Reports";
import Settings from "../components/Settings";
import NewsForm from "../components/NewsForm";
import useApi from "../hooks/useApi";

/**
 * Admin Component
 * @component
 * @description Quản lý toàn bộ chức năng admin của hệ thống
 */
const Admin = () => {
  // API hooks
  const { request, loading, error } = useApi();
  const navigate = useNavigate();

  // Product selection state
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Product selection handler
  const selectProducts = (products) => {
    setSelectedProducts(products);
  };

  // Product management state
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [notification, setNotification] = useState(null); // System notifications
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state
  const [currentView, setCurrentView] = useState("dashboard"); // Current view
  const [searchTerm, setSearchTerm] = useState(""); // Search functionality
  
  // Filter state
  const [filters, setFilters] = useState({
    category: "all", // Product category
    priceRange: "all", // Price range
    stock: "all", // Stock status
  });

  // Authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Product configuration
  const availableSizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

  // Authentication constants
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "1234";

  // Login form state
  const [adminLoginData, setAdminLoginData] = useState({
    username: "",
    password: "",
  });

  // Dashboard statistics
  const [adminStats, setAdminStats] = useState({
    newOrders: 0, // New orders count
    customers: [], // Customer list
    revenue: 0, // Total revenue
    orders: [], // Order history
  });

  // Product form state
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

  // News form state
  const [newsFormData, setNewsFormData] = useState({
    _id: "",
    title: "",
    thumbnail: "",
    description: "",
    body: "",
    tags: [],
  });

  // Refs for form data persistence
  const formDataRef = useRef(formData);

  // Effect hooks
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData, loading]);

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchProducts();
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    const fetchAdminData = () => {
      const data = JSON.parse(localStorage.getItem("adminData")) || {
        newOrders: 0,
        customers: [],
        revenue: 0,
        orders: [],
      };
      setAdminStats(data);
    };

    fetchAdminData();
    window.addEventListener("storage", fetchAdminData);
    return () => window.removeEventListener("storage", fetchAdminData);
  }, []);

  // Hàm fetch dữ liệu sản phẩm
  const fetchProducts = async () => {
    try {
      const data = await request("GET", "/su/product");
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

  // Hàm hiển thị thông báo
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Xử lý đăng nhập admin
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

  // Xử lý đăng xuất admin
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminLoginData({ username: "", password: "" });
    setCurrentView("dashboard");
    showNotification("success", "Đã đăng xuất!");
  };

  // Xử lý thay đổi input đăng nhập
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi input sản phẩm
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi size sản phẩm
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b),
    }));
  };

  // Xử lý submit sản phẩm
  const handleSubmit = async (action) => {
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

  // Xử lý chỉnh sửa sản phẩm
  const handleEdit = (product) => {
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
    setCurrentView("form");
  };

  // Xử lý reset sản phẩm
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
  };

  // Xử lý hành động hàng loạt
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

  // Xử lý click logo
  const handleLogoClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/admin");
      setIsLoading(false);
    }, 1000);
  };

  // Xử lý cập nhật mật khẩu
  const handleUpdatePassword = (newPassword) => {
    console.log("Mật khẩu mới:", newPassword);
    // Thêm logic cập nhật mật khẩu nếu cần
  };

  // Lọc sản phẩm
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

  // Định dạng tiền tệ
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  // Dữ liệu biểu đồ
  const chartData = adminStats.orders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const existing = acc.find((item) => item.name === date);
    if (existing) {
      existing.revenue += order.total;
    } else {
      acc.push({ name: date, revenue: order.total });
    }
    return acc;
  }, []);

  // Fetch tin tức
  const fetchNews = async () => {
    try {
      const response = await request("GET", "/su/news");
      if (response && response.data) {
        setNews(response.data);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      showNotification("error", "Lỗi khi tải danh sách tin tức!");
    }
  };

  // Xử lý thay đổi input tin tức
  const handleNewsInputChange = (e) => {
    const { name, value } = e.target;
    setNewsFormData((prev) => ({
      ...prev,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  // Xử lý submit tin tức
  const handleNewsSubmit = async (action) => {
    try {
      switch (action) {
        case "add":
          await request("POST", "/su/news", newsFormData);
          showNotification("success", "Thêm tin tức thành công!");
          break;
        case "update":
          await request("PUT", `/su/news/${newsFormData._id}`, newsFormData);
          showNotification("success", "Cập nhật tin tức thành công!");
          break;
        case "delete":
          if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
            await request("DELETE", `/su/news/${newsFormData._id}`);
            showNotification("success", "Xóa tin tức thành công!");
          }
          break;
      }
      fetchNews();
      handleNewsReset();
    } catch (err) {
      showNotification(
        "error",
        `Lỗi: ${err.message || "Không thể thực hiện hành động"}`
      );
    }
  };

  // Xử lý reset tin tức
  const handleNewsReset = () => {
    setNewsFormData({
      _id: "",
      title: "",
      thumbnail: "",
      description: "",
      body: "",
      tags: [],
    });
  };

  // Render dashboard
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
            <h3 className="text-2xl font-bold text-gray-800">
              {adminStats.newOrders}
            </h3>
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
            <h3 className="text-2xl font-bold text-gray-800">
              {adminStats.customers.length}
            </h3>
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
            <h3 className="text-2xl font-bold text-gray-800">
              {formatCurrency(adminStats.revenue)}
            </h3>
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
            <LineChart
              data={
                chartData.length ? chartData : [{ name: "No Data", revenue: 0 }]
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
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

  // Render form đăng nhập
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

  // Render nội dung
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
        return <Orders orders={adminStats.orders} />;
      case "customers":
        return <Customers customers={adminStats.customers} />;
      case "reports":
        return (
          <Reports
            orders={adminStats.orders}
            customers={adminStats.customers}
          />
        );
      case "settings":
        return <Settings onUpdatePassword={handleUpdatePassword} />;
      case "news":
        return (
          <NewsForm
            formData={newsFormData}
            handleInputChange={handleNewsInputChange}
            handleSubmit={handleNewsSubmit}
            handleReset={handleNewsReset}
          />
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
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2"
            >
              <FaCrown className="text-2xl text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">ADMIN</h1>
            </button>
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
              <li>
                <button
                  onClick={() => setCurrentView("news")}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    currentView === "news"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaNewspaper className="mr-3" />
                  Tin tức
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
          {isLoading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
