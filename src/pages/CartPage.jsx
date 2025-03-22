/**
 * CartPage Component
 * 
 * Chức năng chính:
 * 1. Quản lý giỏ hàng:
 *    - Hiển thị sản phẩm
 *    - Cập nhật số lượng
 *    - Xóa sản phẩm
 *    - Tính toán giá
 * 
 * 2. Thanh toán:
 *    - Form thông tin
 *    - Phương thức thanh toán
 *    - Xử lý đơn hàng
 *    - Tích điểm
 * 
 * 3. Giao hàng:
 *    - Địa chỉ giao hàng
 *    - Phí vận chuyển
 *    - Theo dõi đơn
 * 
 * 4. Khuyến mãi:
 *    - Mã giảm giá
 *    - Điểm thưởng
 *    - Ưu đãi
 * 
 * 5. Đa ngôn ngữ:
 *    - Hỗ trợ tiếng Việt
 *    - Messages
 *    - Labels
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BillingForm from "../compunents/BillingForm";
import CartItem from "../compunents/CartItem";
import CartSummary from "../compunents/CartSummary";
import OrderDetails from "../compunents/OrderDetails";
import OrderTracking from "../compunents/OrderTracking";
import PaymentOptions from "../compunents/PaymentOptions";
import ShippingForm from "../compunents/ShippingForm";
import { useCart } from "../context/CartContext";

/**
 * CartPage Component
 * @component
 * @description Quản lý toàn bộ chức năng giỏ hàng và thanh toán
 */
const CartPage = () => {
  // Cart Context
  const {
    cart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    addToCart,
    user,
    logout,
    isLoggedIn,
  } = useCart();
  
  const navigate = useNavigate();

  // Discount Management
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Shipping Information
  const [showShipping, setShowShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Billing & Payment
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  // Order History
  const [orderHistory, setOrderHistory] = useState(() => {
    const savedHistory = localStorage.getItem("orderHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Loyalty Program
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const savedPoints = localStorage.getItem("loyaltyPoints");
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  // Order Management
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Localization
  const [language] = useState("vi");
  const translations = {
    vi: {
      cart: "Giỏ hàng",
      subtotal: "Tạm tính",
      discount: "Giảm giá",
      shippingFee: "Phí vận chuyển",
      total: "Tổng cộng",
      payment: "Thanh toán",
      discountCode: "Mã giảm giá",
      apply: "Áp dụng",
      billingInfo: "Thông tin thanh toán",
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      shippingInfo: "Thông tin giao hàng",
      address: "Địa chỉ",
      toggleShipping: "Thêm thông tin giao hàng",
      hideShipping: "Ẩn thông tin giao hàng",
      paymentMethod: "Phương thức thanh toán",
      notes: "Ghi chú",
      shippingMethod: "Phương thức vận chuyển",
      orderTracking: "Theo dõi đơn hàng",
      success: "Thành công",
      error: "Lỗi",
      removeConfirm: "Bạn có chắc muốn xóa sản phẩm này?",
      outOfStock: "Số lượng vượt quá tồn kho!",
      noCartItems: "Giỏ hàng của bạn đang trống.",
      loyaltyPoints: "Điểm thưởng",
      paymentSuccess: "Thanh toán thành công!",
      paymentError: "Có lỗi xảy ra!",
      billingError: "Vui lòng điền đầy đủ thông tin thanh toán!",
      shippingError: "Vui lòng điền đầy đủ thông tin giao hàng!",
      processing: "Đang xử lý...",
      noOrders: "Chưa có đơn hàng.",
      orderLabel: "Đơn hàng #",
      continueShopping: "Tiếp tục mua sắm",
      viewDetails: "Xem chi tiết",
      searchOrders: "Tìm kiếm đơn hàng",
      filterStatus: "Lọc theo trạng thái",
      all: "Tất cả",
      cancelOrder: "Hủy đơn hàng",
      cancelConfirm: "Bạn có chắc muốn hủy đơn hàng này?",
      page: "Trang",
      redeemPoints: "Đổi điểm",
      pointsRedeemed: "Đã sử dụng điểm thưởng!",
      deleteOrderConfirm: "Bạn có chắc muốn xóa đơn hàng này?",
      logout: "Đăng xuất",
    },
  };

  // Utility Functions
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  // Price Calculations
  const calculateSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  }, [cart]);

  const calculateShippingFee = useMemo(() => {
    if (!showShipping || !shippingInfo.address) return 5;
    return shippingInfo.address.includes("Hà Nội") ? 3 : 7;
  }, [showShipping, shippingInfo.address]);

  const calculateTotal = useMemo(() => {
    const subtotal = calculateSubtotal;
    const discountAmount = subtotal * discount;
    return (
      subtotal - discountAmount + (showShipping ? calculateShippingFee : 0)
    );
  }, [calculateSubtotal, discount, showShipping, calculateShippingFee]);

  // Event Handlers
  const handleQuantityChange = useCallback(
    (id, action, event) => {
      const item = cart.find((item) => item.id === id);
      if (!item) return;

      if (action === "increase" && item.quantity < item.stock) {
        updateCartItemQuantity(id, item.quantity + 1, item.color, item.size);
      } else if (action === "decrease" && item.quantity > 1) {
        updateCartItemQuantity(id, item.quantity - 1, item.color, item.size);
      } else if (action === "manual") {
        const newQuantity = parseInt(event.target.value) || 1;
        if (newQuantity > item.stock) {
          toast.error(translations[language].outOfStock);
          return;
        }
        updateCartItemQuantity(
          id,
          Math.min(Math.max(newQuantity, 1), item.stock),
          item.color,
          item.size
        );
      }
    },
    [cart, updateCartItemQuantity, language]
  );

  const handleRemoveItem = useCallback(
    (id, color, size) => {
      if (window.confirm(translations[language].removeConfirm)) {
        removeFromCart(id, color, size);
        toast.success(translations[language].success);
      }
    },
    [removeFromCart, language]
  );

  const handleDiscountCodeChange = useCallback(
    (e) => {
      const value = e.target.value;
      setDiscountCode(value);
      if (value === "GIAM10") {
        setDiscount(0.1);
        toast.success(translations[language].success);
      } else if (discount > 0 && value !== "GIAM10") {
        setDiscount(0);
      }
    },
    [language, discount]
  );

  const handleRedeemPoints = useCallback(() => {
    if (loyaltyPoints >= 100) {
      setDiscount(0.1);
      setLoyaltyPoints((prev) => prev - 100);
      setDiscountCode("");
      toast.success(translations[language].pointsRedeemed);
    }
  }, [loyaltyPoints, language]);

  const handleShippingInfoChange = (e) =>
    setShippingInfo({ ...shippingInfo, [e.target.id]: e.target.value });
  const handleBillingInfoChange = (e) =>
    setBillingInfo({ ...billingInfo, [e.target.id]: e.target.value });

  // Payment Processing
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;

    if (!billingInfo.name.trim()) {
      toast.error(translations[language].billingError + " (Họ và tên)");
      return false;
    }
    if (!emailRegex.test(billingInfo.email)) {
      toast.error(
        translations[language].billingError + " (Email không hợp lệ)"
      );
      return false;
    }
    if (!phoneRegex.test(billingInfo.phone)) {
      toast.error(
        translations[language].billingError +
          " (Số điện thoại phải có 9-11 chữ số)"
      );
      return false;
    }
    if (
      showShipping &&
      (!shippingInfo.name.trim() ||
        !shippingInfo.address.trim() ||
        !phoneRegex.test(shippingInfo.phone))
    ) {
      toast.error(translations[language].shippingError);
      return false;
    }
    return true;
  };

  const updateAdminData = (newOrder) => {
    const adminData = {
      newOrders: 1,
      customer: {
        name: newOrder.billingInfo.name || "Khách vãng lai",
        email: newOrder.billingInfo.email || "",
        phone: newOrder.billingInfo.phone || "",
        totalOrders: 1,
        totalSpent: newOrder.total,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      },
      revenue: newOrder.total,
      orderDetails: newOrder,
    };

    const existingAdminData = JSON.parse(localStorage.getItem("adminData")) || {
      newOrders: 0,
      customers: [],
      revenue: 0,
      orders: [],
    };

    const customerExists = existingAdminData.customers.find(
      (c) =>
        c.email === adminData.customer.email ||
        c.phone === adminData.customer.phone
    );

    let updatedCustomers;
    if (customerExists) {
      updatedCustomers = existingAdminData.customers.map((c) =>
        c.email === adminData.customer.email ||
        c.phone === adminData.customer.phone
          ? {
              ...c,
              totalOrders: c.totalOrders + 1,
              totalSpent: c.totalSpent + adminData.customer.totalSpent,
              status: "active",
            }
          : c
      );
    } else {
      updatedCustomers = [...existingAdminData.customers, adminData.customer];
    }

    const updatedAdminData = {
      newOrders: existingAdminData.newOrders + 1,
      customers: updatedCustomers,
      revenue: existingAdminData.revenue + newOrder.total,
      orders: [...existingAdminData.orders, newOrder],
    };

    localStorage.setItem("adminData", JSON.stringify(updatedAdminData));
  };

  const handlePayment = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      const paymentData = {
        cartItems: cart.map((item) => ({
          ...item,
          stock: item.stock - item.quantity,
        })),
        shippingInfo: showShipping ? shippingInfo : null,
        billingInfo,
        paymentMethod,
        total: calculateTotal,
        notes,
        shippingMethod,
        status: "Đang xử lý",
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newOrder = {
        id: Date.now(),
        ...paymentData,
        date: new Date().toISOString(),
      };

      setOrderHistory((prev) => [...prev, newOrder]);
      setLoyaltyPoints((prev) => prev + Math.floor(calculateTotal / 10));
      updateAdminData(newOrder);

      clearCart();
      setDiscount(0);
      setDiscountCode("");
      setNotes("");
      toast.success(translations[language].paymentSuccess);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(translations[language].paymentError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    const newOrder = {
      id: Date.now(),
      cartItems: [product],
      shippingInfo: null,
      billingInfo: { name: "Khách vãng lai", email: "", phone: "" },
      paymentMethod: "cash",
      total: product.price * product.quantity,
      notes: "Đơn hàng từ thêm sản phẩm",
      shippingMethod: "standard",
      status: "Chưa thanh toán",
      date: new Date().toISOString(),
    };
    updateAdminData(newOrder);
    toast.success("Sản phẩm đã được thêm vào giỏ hàng và gửi đến Admin!");
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm(translations[language].cancelConfirm)) {
      setOrderHistory((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "Đã hủy" } : order
        )
      );
      setSelectedOrder(null);
      toast.success(translations[language].success);
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(translations[language].deleteOrderConfirm)) {
      setOrderHistory((prev) => prev.filter((order) => order.id !== orderId));
      toast.success(translations[language].success);
    }
  };

  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    localStorage.setItem("loyaltyPoints", loyaltyPoints);
  }, [orderHistory, loyaltyPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderHistory((prev) =>
        prev.map((order) => {
          if (order.status === "Đang xử lý" && Math.random() > 0.5)
            return { ...order, status: "Đang giao" };
          if (order.status === "Đang giao" && Math.random() > 0.5)
            return { ...order, status: "Đã giao" };
          return order;
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = orderHistory.filter((order) => {
    const matchesSearch =
      `${translations[language].orderLabel}${order.id}`.includes(searchQuery) ||
      order.cartItems.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      filterStatus === "Tất cả" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              <p className="mt-4 text-gray-600 font-medium">Đang xử lý...</p>
            </div>
          </div>
        )}
        <OrderDetails
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          handleCancelOrder={handleCancelOrder}
          language={language}
          translations={translations}
          formatCurrency={formatCurrency}
        />
        <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          {isLoggedIn && user ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-700 font-medium">
                Xin chào, {user.username}!
              </span>
            </div>
          ) : null}
          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                toast.success("Đăng xuất thành công!");
                navigate("/");
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
            >
              {translations[language].logout}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {translations[language].cart}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {cart.length} sản phẩm trong giỏ hàng
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: 1,
                      name: "Test Product",
                      price: 10,
                      quantity: 1,
                      color: "red",
                      size: "M",
                      stock: 10,
                    })
                  }
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Add Test Product</span>
                </button>
              </div>
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-xl font-medium">
                    {translations[language].noCartItems}
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.color}-${item.size}`}
                      item={item}
                      handleQuantityChange={handleQuantityChange}
                      handleRemoveItem={handleRemoveItem}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </div>
              )}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <CartSummary
                  calculateSubtotal={calculateSubtotal}
                  calculateShippingFee={calculateShippingFee}
                  calculateTotal={calculateTotal}
                  discount={discount}
                  showShipping={showShipping}
                  loyaltyPoints={loyaltyPoints}
                  formatCurrency={formatCurrency}
                  language={language}
                  translations={translations}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {translations[language].payment}
              </h2>
              <div className="space-y-8">
                <PaymentOptions
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  discountCode={discountCode}
                  handleDiscountCodeChange={handleDiscountCodeChange}
                  loyaltyPoints={loyaltyPoints}
                  handleRedeemPoints={handleRedeemPoints}
                  language={language}
                  translations={translations}
                />
                <BillingForm
                  billingInfo={billingInfo}
                  handleBillingInfoChange={handleBillingInfoChange}
                  language={language}
                  translations={translations}
                />
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 ease-in-out flex items-center space-x-2"
                  onClick={() => setShowShipping(!showShipping)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {showShipping
                      ? translations[language].hideShipping
                      : translations[language].toggleShipping}
                  </span>
                </button>
                {showShipping && (
                  <ShippingForm
                    shippingInfo={shippingInfo}
                    handleShippingInfoChange={handleShippingInfoChange}
                    shippingMethod={shippingMethod}
                    setShippingMethod={setShippingMethod}
                    language={language}
                    translations={translations}
                  />
                )}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    {translations[language].notes}
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out resize-none"
                    placeholder="Nhập ghi chú cho đơn hàng..."
                    rows="3"
                  />
                </div>
                <OrderTracking
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  paginatedOrders={paginatedOrders}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  setSelectedOrder={setSelectedOrder}
                  handleDeleteOrder={handleDeleteOrder}
                  formatCurrency={formatCurrency}
                  language={language}
                  translations={translations}
                />
                <div className="space-y-4">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center space-x-2"
                    onClick={handlePayment}
                    disabled={isLoading || cart.length === 0}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        <span>{translations[language].processing}</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 1h6v4H7V5zm8 8v2h-2v-2H9v2H7v-2a1 1 0 00-2 0v2a1 1 0 001 1h2V9h2v6zm-2-2v-2H9v2h2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{translations[language].payment}</span>
                      </>
                    )}
                  </button>
                  <button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3.5 px-6 rounded-xl transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                    onClick={() => navigate("/")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{translations[language].continueShopping}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
