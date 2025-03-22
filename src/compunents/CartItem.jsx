import React from "react";

const CartItem = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  formatCurrency,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Màu: {item.color}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">Size: {item.size}</span>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id, item.color, item.size)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, "manual", e)}
                  className="w-12 text-center bg-transparent text-gray-700 font-medium focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-sm text-gray-500">
                Còn lại: {item.stock} sản phẩm
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(item.price)} / sản phẩm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
