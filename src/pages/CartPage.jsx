import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartItem = React.memo(
  ({ item, onQuantityChange, onRemove, formatCurrency }) => {
    return (
      <div className="flex items-center border-b py-4 flex-col sm:flex-row">
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
              onClick={() => onQuantityChange(item.id, "decrease")}
              className="bg-gray-200 px-2 py-1 rounded-l"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.id, "manual", e)}
              className="w-12 text-center border-t border-b"
              min="1"
              max={item.stock}
            />
            <button
              onClick={() => onQuantityChange(item.id, "increase")}
              className="bg-gray-200 px-2 py-1 rounded-r"
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
            <p className="ml-2 text-sm text-gray-500">
              (Tồn kho: {item.stock})
            </p>
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id, item.color, item.size)}
          className="text-red-500 hover:text-red-700 ml-4"
        >
          Xóa
        </button>
      </div>
    );
  }
);

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

  const applyDiscount = useCallback(() => {
    if (discountCode === "GIAM10") {
      setDiscount(0.1);
      toast.success(translations[language].success);
    } else {
      setDiscount(0);
      toast.error(translations[language].error);
    }
  }, [discountCode, language]);

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
      toast.error("Vui lòng nhập họ và tên!");
      return false;
    }
    if (!emailRegex.test(billingInfo.email)) {
      toast.error("Vui lòng nhập email hợp lệ!");
      return false;
    }
    if (!phoneRegex.test(billingInfo.phone)) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ (9-11 chữ số)!");
      return false;
    }
    if (
      showShipping &&
      (!shippingInfo.name.trim() ||
        !shippingInfo.address.trim() ||
        !phoneRegex.test(shippingInfo.phone))
    ) {
      toast.error("Vui lòng điền đầy đủ và hợp lệ thông tin giao hàng!");
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
      };
      console.log("Payment Data:", paymentData);

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) reject(new Error("Mô phỏng lỗi thanh toán"));
          else resolve();
        }, 2000);
      });

      setOrderHistory((prev) => [
        ...prev,
        { id: Date.now(), ...paymentData, date: new Date().toISOString() },
      ]);
      setLoyaltyPoints((prev) => prev + Math.floor(calculateTotal / 10));
      clearCart();
      setDiscount(0);
      setDiscountCode("");
      setNotes("");
      toast.success(translations[language].paymentSuccess);
      setTimeout(() => navigate("/"), 2000); // Chuyển về trang chủ sau khi thanh toán thành công
    } catch (error) {
      console.error("Payment Error:", error.message);
      toast.error(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    localStorage.setItem("loyaltyPoints", loyaltyPoints);
  }, [orderHistory, loyaltyPoints]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
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
            cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.color}-${item.size}`}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                formatCurrency={formatCurrency}
              />
            ))
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
            <div className="flex">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border rounded w-full py-2 px-3"
                placeholder={translations[language].discountCode}
              />
              <button
                onClick={applyDiscount}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 ml-2 rounded"
              >
                {translations[language].apply}
              </button>
            </div>
          </div>

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
            {orderHistory.length > 0 ? (
              <ul>
                {orderHistory.map((order) => (
                  <li key={order.id}>{`${translations[language].orderLabel}${
                    order.id
                  } - ${new Date(order.date).toLocaleDateString()}`}</li>
                ))}
              </ul>
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
