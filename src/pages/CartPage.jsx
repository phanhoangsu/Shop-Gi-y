import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
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

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.id]: e.target.value });
  };

  const handleBillingInfoChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.id]: e.target.value });
  };

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
      console.log("Payment Data:", paymentData);

      if (process.env.NODE_ENV === "production") {
        const response = await fetch("https://api.stripe.com/v1/charges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`,
          },
          body: JSON.stringify({
            amount: Math.round(calculateTotal * 100),
            currency: "usd",
            source: "tok_visa", // Thay bằng token từ Stripe Elements
            description: `Order #${Date.now()}`,
          }),
        });

        if (!response.ok) {
          throw new Error("Thanh toán thất bại từ server!");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const newOrder = {
        id: Date.now(),
        ...paymentData,
        date: new Date().toISOString(),
      };

      setOrderHistory((prev) => {
        const updatedHistory = [...prev, newOrder];
        console.log("Order saved to history:", newOrder.id);
        return updatedHistory;
      });
      setLoyaltyPoints((prev) => prev + Math.floor(calculateTotal / 10));
      clearCart();
      setDiscount(0);
      setDiscountCode("");
      setNotes("");
      toast.success(translations[language].paymentSuccess);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Payment Error Details:", {
        message: error.message,
        stack: error.stack,
        paymentData,
      });
      toast.error(`Có lỗi xảy ra: ${error.message}. Vui lòng thử lại sau!`);
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
    const updateOrderStatus = () => {
      setOrderHistory((prev) =>
        prev.map((order) => {
          if (order.status === "Đang xử lý") {
            return Math.random() > 0.5
              ? { ...order, status: "Đang giao" }
              : order;
          } else if (order.status === "Đang giao") {
            return Math.random() > 0.5
              ? { ...order, status: "Đã giao" }
              : order;
          }
          return order;
        })
      );
    };

    const interval = setInterval(updateOrderStatus, 10000);
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

  // CartItem component inline
  const renderCartItem = (item) => (
    <div
      key={`${item.id}-${item.color}-${item.size}`}
      className="flex items-center border-b py-4 flex-col sm:flex-row"
    >
      <img
        src={item.image || "https://via.placeholder.com/80"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded mr-4 mb-2 sm:mb-0"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">{formatCurrency(item.price)}</p>
        <p className="text-gray-500 text-sm">
          Màu: {item.color}, Kích thước: {item.size}
        </p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange(item.id, "decrease")}
            className="bg-gray-200 px-2 py-1 rounded-l"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, "manual", e)}
            className="w-12 text-center border-t border-b"
            min="1"
            max={item.stock}
          />
          <button
            onClick={() => handleQuantityChange(item.id, "increase")}
            className="bg-gray-200 px-2 py-1 rounded-r"
            disabled={item.quantity >= item.stock}
          >
            +
          </button>
          <p className="ml-2 text-sm text-gray-500">(Tồn kho: {item.stock})</p>
        </div>
      </div>
      <button
        onClick={() => handleRemoveItem(item.id, item.color, item.size)}
        className="text-red-500 hover:text-red-700 ml-4"
      >
        Xóa
      </button>
    </div>
  );

  // OrderDetails component inline
  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    const statusColors = {
      "Đang xử lý": "bg-yellow-100 text-yellow-800",
      "Đang giao": "bg-blue-100 text-blue-800",
      "Đã giao": "bg-green-100 text-green-800",
      "Đã hủy": "bg-red-100 text-red-800",
    };

    const statusSteps = ["Đang xử lý", "Đang giao", "Đã giao"];
    const currentStep = statusSteps.indexOf(selectedOrder.status);

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <h3 className="text-xl font-semibold mb-4">
            {translations[language].orderLabel}
            {selectedOrder.id}
          </h3>
          <p>
            <strong>Ngày đặt:</strong>{" "}
            {new Date(selectedOrder.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                statusColors[selectedOrder.status]
              }`}
            >
              {selectedOrder.status}
            </span>
          </p>
          <div className="my-4">
            <div className="flex justify-between">
              {statusSteps.map((step, index) => (
                <div key={step} className="flex-1 text-center">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm mt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <p>
            <strong>Tổng tiền:</strong> {formatCurrency(selectedOrder.total)}
          </p>
          {selectedOrder.shippingInfo && (
            <div className="mt-2">
              <strong>{translations[language].shippingInfo}:</strong>
              <p>Tên: {selectedOrder.shippingInfo.name}</p>
              <p>Địa chỉ: {selectedOrder.shippingInfo.address}</p>
              <p>Số điện thoại: {selectedOrder.shippingInfo.phone}</p>
            </div>
          )}
          <div className="mt-4">
            <strong>Sản phẩm:</strong>
            <ul className="list-disc ml-5">
              {selectedOrder.cartItems.map((item) => (
                <li key={`${item.id}-${item.color}-${item.size}`}>
                  {item.name} - {item.quantity} x {formatCurrency(item.price)} (
                  Màu: {item.color}, Kích thước: {item.size})
                </li>
              ))}
            </ul>
          </div>
          {selectedOrder.notes && (
            <p className="mt-2">
              <strong>{translations[language].notes}:</strong>{" "}
              {selectedOrder.notes}
            </p>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedOrder(null)}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Đóng
            </button>
            {selectedOrder.status === "Đang xử lý" && (
              <button
                onClick={() => handleCancelOrder(selectedOrder.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Hủy đơn
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      {renderOrderDetails()}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].cart}
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">
              {translations[language].noCartItems}
            </p>
          ) : (
            cart.map(renderCartItem)
          )}
          <div className="mt-4">
            <div className="flex justify-between">
              <span>{translations[language].subtotal}:</span>
              <span>{formatCurrency(calculateSubtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{translations[language].discount}:</span>
                <span>-{formatCurrency(calculateSubtotal * discount)}</span>
              </div>
            )}
            {showShipping && (
              <div className="flex justify-between">
                <span>{translations[language].shippingFee}:</span>
                <span>{formatCurrency(calculateShippingFee)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold mt-2">
              <span>{translations[language].total}:</span>
              <span>{formatCurrency(calculateTotal)}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {translations[language].loyaltyPoints}: {loyaltyPoints} điểm
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].payment}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {translations[language].discountCode}
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              className="border rounded w-full py-2 px-3"
              placeholder={translations[language].discountCode}
            />
          </div>

          {loyaltyPoints >= 100 && (
            <div className="mb-4">
              <button
                onClick={handleRedeemPoints}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
              >
                {translations[language].redeemPoints} (100 điểm = 10%)
              </button>
            </div>
          )}

          <h3 className="text-lg font-semibold mb-2">
            {translations[language].billingInfo}
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {translations[language].name}
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              id="name"
              value={billingInfo.name}
              onChange={handleBillingInfoChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {translations[language].email}
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="email"
              id="email"
              value={billingInfo.email}
              onChange={handleBillingInfoChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {translations[language].phone}
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="tel"
              id="phone"
              value={billingInfo.phone}
              onChange={handleBillingInfoChange}
              required
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {translations[language].paymentMethod}
            </h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border rounded w-full py-2 px-3"
            >
              <option value="cash">Thanh toán khi nhận hàng</option>
              <option value="card">Thẻ tín dụng</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <button
            className="text-blue-500 hover:underline mb-4"
            onClick={() => setShowShipping(!showShipping)}
          >
            {showShipping
              ? translations[language].hideShipping
              : translations[language].toggleShipping}
          </button>
          {showShipping && (
            <>
              <h3 className="text-lg font-semibold mb-2">
                {translations[language].shippingInfo}
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {translations[language].name}
                </label>
                <input
                  className="border rounded w-full py-2 px-3"
                  type="text"
                  id="name"
                  value={shippingInfo.name}
                  onChange={handleShippingInfoChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {translations[language].address}
                </label>
                <input
                  className="border rounded w-full py-2 px-3"
                  type="text"
                  id="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {translations[language].phone}
                </label>
                <input
                  className="border rounded w-full py-2 px-3"
                  type="tel"
                  id="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {translations[language].shippingMethod}
                </label>
                <select
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="standard">Tiêu chuẩn (2-5 ngày)</option>
                  <option value="express">Nhanh (1-2 ngày)</option>
                </select>
              </div>
            </>
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

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {translations[language].orderTracking}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded w-full py-2 px-3"
                placeholder={translations[language].searchOrders}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded w-full sm:w-40 py-2 px-3"
              >
                <option value="Tất cả">{translations[language].all}</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
            {paginatedOrders.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">
                          Đơn hàng
                        </th>
                        <th className="py-2 px-4 border-b text-left">Ngày</th>
                        <th className="py-2 px-4 border-b text-left">
                          Trạng thái
                        </th>
                        <th className="py-2 px-4 border-b text-left">
                          Tổng tiền
                        </th>
                        <th className="py-2 px-4 border-b text-left">
                          Hành động
                        </th>
                        <th className="py-2 px-4 border-b text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="py-2 px-4 border-b">
                            {translations[language].orderLabel}
                            {order.id}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                order.status === "Đang xử lý"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Đang giao"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Đã giao"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-blue-500 hover:underline"
                            >
                              {translations[language].viewDetails}
                            </button>
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    Trước
                  </button>
                  <span>
                    {translations[language].page} {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </button>
                </div>
              </>
            ) : (
              <p>{translations[language].noOrders}</p>
            )}
          </div>

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
