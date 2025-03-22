/**
 * Component CartSummary
 * 
 * Chức năng chính:
 * 1. Hiển thị tổng quan đơn hàng:
 *    - Tạm tính
 *    - Giảm giá (nếu có)
 *    - Phí vận chuyển
 *    - Điểm thưởng
 *    - Tổng cộng
 * 
 * 2. Tính toán giá trị:
 *    - Tính tổng tiền hàng
 *    - Áp dụng mã giảm giá
 *    - Tính phí vận chuyển
 *    - Tích điểm thưởng
 * 
 * 3. Hiển thị thông tin:
 *    - Định dạng tiền tệ
 *    - Thông tin vận chuyển
 *    - Chính sách ưu đãi
 */

import React from "react";

/**
 * Component CartSummary
 * @component
 * @description Hiển thị tổng quan và tính toán giá trị đơn hàng
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {number} props.calculateSubtotal - Tổng tiền tạm tính
 * @param {number} props.calculateShippingFee - Phí vận chuyển
 * @param {number} props.calculateTotal - Tổng tiền cuối cùng
 * @param {number} props.discount - Tỷ lệ giảm giá (0-1)
 * @param {boolean} props.showShipping - Hiển thị phí vận chuyển
 * @param {number} props.loyaltyPoints - Điểm thưởng tích lũy
 * @param {Function} props.formatCurrency - Hàm định dạng tiền tệ
 * @param {string} props.language - Ngôn ngữ hiện tại
 * @param {Object} props.translations - Đối tượng chứa các bản dịch
 */
const CartSummary = ({
  calculateSubtotal,
  calculateShippingFee,
  calculateTotal,
  discount,
  showShipping,
  loyaltyPoints,
  formatCurrency,
  language,
  translations,
}) => {
  // Hiển thị tiêu đề tổng quan đơn hàng
  return (
    <div className="space-y-4">
      {/* Tiêu đề */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Tổng quan đơn hàng
      </h3>

      {/* Hiển thị tạm tính */}
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600">Tạm tính</span>
        <span className="font-medium text-gray-800">
          {formatCurrency(calculateSubtotal)}
        </span>
      </div>

      {/* Hiển thị giảm giá nếu có */}
      {discount > 0 && (
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Giảm giá</span>
          <span className="font-medium text-green-600">
            -{formatCurrency(calculateSubtotal * discount)}
          </span>
        </div>
      )}

      {/* Hiển thị phí vận chuyển nếu cần */}
      {showShipping && (
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(calculateShippingFee)}
          </span>
        </div>
      )}

      {/* Hiển thị điểm thưởng nếu có */}
      {loyaltyPoints > 0 && (
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Điểm thưởng</span>
          <span className="font-medium text-blue-600">
            {loyaltyPoints} điểm
          </span>
        </div>
      )}

      {/* Đường kẻ phân cách */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Hiển thị tổng cộng */}
      <div className="flex justify-between items-center py-2">
        <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
        <span className="text-lg font-bold text-blue-600">
          {formatCurrency(calculateTotal)}
        </span>
      </div>

      {/* Thông tin chính sách vận chuyển và ưu đãi */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm text-blue-800">
              Đơn hàng của bạn sẽ được xử lý trong vòng 24h làm việc
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Miễn phí vận chuyển cho đơn hàng trên 500.000đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
