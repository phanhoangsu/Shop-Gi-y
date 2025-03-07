import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/\./g, "").replace("đ", ""), 10);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handlePayment = (e) => {
    e.preventDefault();
    setIsPaid(true);

    // Quay về trang chủ sau 3 giây
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🛒 Giỏ Hàng Của Bạn</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
      ) : isPaid ? (
        <div className="text-center text-green-600 text-xl font-bold py-10">
          ✅ Thanh toán thành công! Cảm ơn bạn đã mua hàng. 🎉
          <p className="text-gray-500 mt-2">
            Đang chuyển hướng về trang chủ...
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="border-b pb-4 flex gap-4 items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="text-gray-600 space-y-1">
                    {item.color && <p>Màu: {item.color}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                  <p className="text-red-500 font-bold mt-2">
                    {parsePrice(item.price).toLocaleString("vi-VN")}đ ×{" "}
                    {item.quantity} ={" "}
                    {(parsePrice(item.price) * item.quantity).toLocaleString(
                      "vi-VN"
                    )}
                    đ
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.color, item.size)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  ❌ Xóa
                </button>
              </div>
            ))}
          </div>

          <div className="text-xl font-bold border-t pt-4">
            Tổng tiền: {total.toLocaleString("vi-VN")}đ
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Thông tin thanh toán</h3>
            <form className="space-y-4" onSubmit={handlePayment}>
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Địa chỉ giao hàng"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                type="submit"
              >
                Thanh toán
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
