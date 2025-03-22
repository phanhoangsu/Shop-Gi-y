import React from "react";

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
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Tổng quan đơn hàng
      </h3>

      {/* Tạm tính */}
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600">Tạm tính</span>
        <span className="font-medium text-gray-800">
          {formatCurrency(calculateSubtotal)}
        </span>
      </div>

      {/* Giảm giá */}
      {discount > 0 && (
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Giảm giá</span>
          <span className="font-medium text-green-600">
            -{formatCurrency(calculateSubtotal * discount)}
          </span>
        </div>
      )}

      {/* Phí vận chuyển */}
      {showShipping && (
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(calculateShippingFee)}
          </span>
        </div>
      )}

      {/* Điểm thưởng */}
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

      {/* Tổng cộng */}
      <div className="flex justify-between items-center py-2">
        <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
        <span className="text-lg font-bold text-blue-600">
          {formatCurrency(calculateTotal)}
        </span>
      </div>

      {/* Thông tin bổ sung */}
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
