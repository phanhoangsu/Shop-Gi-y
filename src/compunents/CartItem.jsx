import React from "react";

const CartItem = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  formatCurrency,
}) => {
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
};

export default CartItem;
