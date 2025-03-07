import React, { useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Nike Air Max", price: 120, quantity: 1 },
    { id: 2, name: "Adidas Ultraboost", price: 150, quantity: 2 },
  ]);

  // Tính tổng tiền
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {/* Danh sách sản phẩm trong giỏ */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <p className="text-lg">{item.name}</p>
              <p className="text-gray-600">
                ${item.price} x {item.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tổng tiền */}
      <div className="flex justify-between font-bold text-xl mt-4">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>

      {/* Form nhập thông tin giao hàng */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">🚚 Shipping Details</h3>
        <form className="space-y-4 mt-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full p-2 border rounded-lg"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
