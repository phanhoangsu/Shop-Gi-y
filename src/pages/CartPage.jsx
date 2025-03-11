import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CartItem component
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
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 ml-4"
        >
          Xóa
        </button>
      </div>
    );
  }
);

// CartPage component
const CartPage = () => {
  // State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : [
          {
            id: 1,
            name: "Sản phẩm 1",
            quantity: 1,
            price: 10,
            stock: 10,
            image: "https://via.placeholder.com/80",
          },
          {
            id: 2,
            name: "Sản phẩm 2",
            quantity: 2,
            price: 20,
            stock: 5,
            image: "https://via.placeholder.com/80",
          },
        ];
  });
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
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [language, setLanguage] = useState("vi"); // Ngôn ngữ tiếng Việt

  // Translations (chỉ cần tiếng Việt vì yêu cầu giữ tiếng Việt)
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
      addToFavorites: "Thêm vào danh sách yêu thích",
      noCartItems: "Giỏ hàng của bạn đang trống.",
      loyaltyPoints: "Điểm thưởng",
      paymentSuccess: "Thanh toán thành công!",
      paymentError: "Có lỗi xảy ra!",
      billingError: "Vui lòng điền đầy đủ thông tin thanh toán!",
      shippingError: "Vui lòng điền đầy đủ thông tin giao hàng!",
      processing: "Đang xử lý...",
      noOrders: "Chưa có đơn hàng.",
      orderLabel: "Đơn hàng #",
    },
  };

  // Format currency in USD
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  // Calculate totals
  const calculateSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  }, [cart]);

  const calculateShippingFee = useMemo(() => {
    if (!showShipping || !shippingInfo.address) return 5; // 5 USD mặc định
    return shippingInfo.address.includes("Hà Nội") ? 3 : 7; // Giả lập
  }, [showShipping, shippingInfo.address]);

  const calculateTotal = useMemo(() => {
    const subtotal = calculateSubtotal;
    const discountAmount = subtotal * discount;
    return (
      subtotal - discountAmount + (showShipping ? calculateShippingFee : 0)
    );
  }, [calculateSubtotal, discount, showShipping, calculateShippingFee]);

  // Handlers
  const handleQuantityChange = useCallback(
    (id, action, event) => {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === id) {
            if (action === "increase" && item.quantity < item.stock) {
              return { ...item, quantity: item.quantity + 1 };
            } else if (action === "decrease" && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else if (action === "manual") {
              const newQuantity = parseInt(event.target.value) || 1;
              if (newQuantity > item.stock) {
                toast.error(translations[language].outOfStock);
                return item;
              }
              return {
                ...item,
                quantity: Math.min(Math.max(newQuantity, 1), item.stock),
              };
            }
          }
          return item;
        })
      );
    },
    [language]
  );

  const handleRemoveItem = useCallback(
    (id) => {
      if (window.confirm(translations[language].removeConfirm)) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        toast.success(translations[language].success);
      }
    },
    [language]
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
    if (!billingInfo.name || !billingInfo.email || !billingInfo.phone) {
      toast.error(translations[language].billingError);
      return false;
    }
    if (
      showShipping &&
      (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone)
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
      };
      console.log("Payment Data:", paymentData);

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Cập nhật tồn kho và lịch sử
      setCart((prevCart) =>
        prevCart.map((item) => ({ ...item, stock: item.stock - item.quantity }))
      );
      const newOrder = {
        id: Date.now(),
        ...paymentData,
        date: new Date().toISOString(),
      };
      setOrderHistory((prev) => [...prev, newOrder]);
      setLoyaltyPoints((prev) => prev + Math.floor(calculateTotal / 10)); // 1 điểm cho 10 USD
      setCart([]);
      setDiscount(0);
      setDiscountCode("");
      setNotes("");
      toast.success(translations[language].paymentSuccess);
    } catch (error) {
      toast.error(translations[language].paymentError);
    } finally {
      setIsLoading(false);
    }
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    localStorage.setItem("loyaltyPoints", loyaltyPoints);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [cart, orderHistory, loyaltyPoints, favorites]);

  // Add to favorites
  const addToFavorites = (item) => {
    if (!favorites.find((fav) => fav.id === item.id)) {
      setFavorites([...favorites, item]);
      toast.success("Đã thêm vào danh sách yêu thích!");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <img src="/loading.gif" alt="Loading..." className="w-16 h-16" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Giỏ hàng */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].cart}
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">
              {translations[language].noCartItems}
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  formatCurrency={formatCurrency}
                />
              ))}
              <button
                onClick={() => addToFavorites(cart[0])}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                {translations[language].addToFavorites}
              </button>
            </>
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

        {/* Thanh toán */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].payment}
          </h2>

          {/* Mã giảm giá */}
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

          {/* Thông tin thanh toán */}
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

          {/* Phương thức thanh toán */}
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

          {/* Thông tin giao hàng */}
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

          {/* Ghi chú */}
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

          {/* Theo dõi đơn hàng */}
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
            disabled={isLoading}
          >
            {isLoading
              ? translations[language].processing
              : translations[language].payment}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
