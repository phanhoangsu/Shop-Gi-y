/**
 * Component PaymentOptions
 * 
 * Chức năng chính:
 * 1. Phương thức thanh toán:
 *    - Thanh toán khi nhận hàng
 *    - Thẻ tín dụng
 *    - PayPal
 * 
 * 2. Mã giảm giá:
 *    - Nhập mã giảm giá
 *    - Áp dụng giảm giá
 *    - Kiểm tra tính hợp lệ
 * 
 * 3. Điểm thưởng:
 *    - Hiển thị điểm hiện có
 *    - Đổi điểm lấy giảm giá
 *    - Tính toán tỷ lệ quy đổi
 */

import React from "react";

/**
 * Component PaymentOptions
 * @component
 * @description Quản lý các tùy chọn thanh toán và ưu đãi
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {string} props.paymentMethod - Phương thức thanh toán được chọn
 * @param {Function} props.setPaymentMethod - Hàm cập nhật phương thức thanh toán
 * @param {string} props.discountCode - Mã giảm giá
 * @param {Function} props.handleDiscountCodeChange - Hàm xử lý thay đổi mã giảm giá
 * @param {number} props.loyaltyPoints - Số điểm thưởng hiện có
 * @param {Function} props.handleRedeemPoints - Hàm xử lý đổi điểm thưởng
 * @param {string} props.language - Ngôn ngữ hiện tại
 * @param {Object} props.translations - Đối tượng chứa các bản dịch
 */
const PaymentOptions = ({
  paymentMethod,
  setPaymentMethod,
  discountCode,
  handleDiscountCodeChange,
  loyaltyPoints,
  handleRedeemPoints,
  language,
  translations,
}) => {
  return (
    <>
      {/* Form nhập mã giảm giá */}
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

      {/* Nút đổi điểm thưởng (hiển thị khi đủ điểm) */}
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

      {/* Lựa chọn phương thức thanh toán */}
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
    </>
  );
};

export default PaymentOptions;
