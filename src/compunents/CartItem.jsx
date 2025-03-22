/**
 * Component CartItem
 * 
 * Chức năng chính:
 * 1. Hiển thị sản phẩm trong giỏ hàng:
 *    - Hình ảnh sản phẩm
 *    - Tên sản phẩm
 *    - Màu sắc và kích thước
 *    - Số lượng còn lại trong kho
 * 
 * 2. Quản lý số lượng:
 *    - Tăng/giảm số lượng
 *    - Kiểm tra giới hạn tồn kho
 *    - Nhập số lượng trực tiếp
 * 
 * 3. Hiển thị giá:
 *    - Giá mỗi sản phẩm
 *    - Tổng giá theo số lượng
 *    - Định dạng tiền tệ
 * 
 * 4. Chức năng xóa:
 *    - Xóa sản phẩm khỏi giỏ hàng
 *    - Xác nhận xóa
 */

import React from "react";

/**
 * Component CartItem
 * @component
 * @description Hiển thị và quản lý từng sản phẩm trong giỏ hàng
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {Object} props.item - Thông tin sản phẩm (id, tên, màu, size, số lượng, giá, hình ảnh)
 * @param {Function} props.handleQuantityChange - Hàm xử lý thay đổi số lượng
 * @param {Function} props.handleRemoveItem - Hàm xử lý xóa sản phẩm
 * @param {Function} props.formatCurrency - Hàm định dạng tiền tệ
 */
const CartItem = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  formatCurrency,
}) => {
  // Render phần hiển thị hình ảnh và thông tin sản phẩm
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      {/* Phần hiển thị hình ảnh và thông tin sản phẩm */}
      <div className="flex items-center space-x-6">
        {/* Hình ảnh sản phẩm */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thông tin chi tiết sản phẩm */}
        <div className="flex-grow">
          {/* Tên sản phẩm và nút xóa */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              {/* Màu sắc và kích thước */}
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Màu: {item.color}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">Size: {item.size}</span>
              </div>
            </div>

            {/* Nút xóa sản phẩm */}
            <button
              onClick={() => handleRemoveItem(item.id, item.color, item.size)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              title="Xóa sản phẩm"
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

          {/* Phần điều chỉnh số lượng và hiển thị giá */}
          <div className="mt-4 flex items-center justify-between">
            {/* Điều chỉnh số lượng và hiển thị tồn kho */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                {/* Nút giảm số lượng */}
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200"
                  title="Giảm số lượng"
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

                {/* Ô nhập số lượng */}
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, "manual", e)}
                  className="w-12 text-center bg-transparent text-gray-700 font-medium focus:outline-none"
                  title="Nhập số lượng"
                />

                {/* Nút tăng số lượng */}
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200"
                  title="Tăng số lượng"
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

              {/* Hiển thị số lượng tồn kho */}
              <span className="text-sm text-gray-500">
                Còn lại: {item.stock} sản phẩm
              </span>
            </div>

            {/* Hiển thị giá */}
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
