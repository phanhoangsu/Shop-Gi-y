import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../compunents/OrderDetails";
import CartSummary from "../compunents/CartSummary";
import BillingForm from "../compunents/BillingForm";
import ShippingForm from "../compunents/ShippingForm";
import PaymentOptions from "../compunents/PaymentOptions";
import OrderTracking from "../compunents/OrderTracking";
import CartItem from "../compunents/CartItem";

const CartPage = () => {
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

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showShipping, setShowShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [orderHistory, setOrderHistory] = useState(() => {
    const savedHistory = localStorage.getItem("orderHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const savedPoints = localStorage.getItem("loyaltyPoints");
    return savedPoints ? parseInt(savedPoints) : 0;
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

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

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập API

      const newOrder = {
        id: Date.now(),
        ...paymentData,
        date: new Date().toISOString(),
      };
      setOrderHistory((prev) => [...prev, newOrder]);
      setLoyaltyPoints((prev) => prev + Math.floor(calculateTotal / 10));
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
    <div className="container mx-auto p-4 md:p-8">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
      <div className="mb-4 flex justify-between items-center">
        {isLoggedIn && user ? <span>Xin chào, {user.username}!</span> : null}
        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
              toast.success("Đăng xuất thành công!");
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            {translations[language].logout}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].cart}
          </h2>
          <button
            onClick={() =>
              addToCart({
                id: 1,
                name: "Test Product",
                price: 10,
                quantity: 1,
                color: "red",
                size: "M",
                stock: 10,
              })
            }
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            Add Test Product
          </button>
          {cart.length === 0 ? (
            <p className="text-gray-600">
              {translations[language].noCartItems}
            </p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.color}-${item.size}`}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                formatCurrency={formatCurrency}
              />
            ))
          )}
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].payment}
          </h2>
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
            className="text-blue-500 hover:underline mb-4"
            onClick={() => setShowShipping(!showShipping)}
          >
            {showShipping
              ? translations[language].hideShipping
              : translations[language].toggleShipping}
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {translations[language].notes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Nhập ghi chú cho đơn hàng..."
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
            onClick={handlePayment}
            disabled={isLoading || cart.length === 0}
          >
            {isLoading
              ? translations[language].processing
              : translations[language].payment}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
            onClick={() => navigate("/")}
          >
            {translations[language].continueShopping}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
