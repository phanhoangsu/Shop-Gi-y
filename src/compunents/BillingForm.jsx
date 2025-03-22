/**
 * Component BillingForm
 * 
 * Chức năng chính:
 * 1. Thu thập thông tin thanh toán:
 *    - Tên người mua
 *    - Email liên hệ
 *    - Số điện thoại
 * 
 * 2. Xác thực dữ liệu:
 *    - Kiểm tra định dạng email
 *    - Kiểm tra số điện thoại
 *    - Đảm bảo các trường bắt buộc
 * 
 * 3. Đa ngôn ngữ:
 *    - Hỗ trợ nhiều ngôn ngữ
 *    - Hiển thị label theo ngôn ngữ
 */

import React from "react";

/**
 * Component BillingForm
 * @component
 * @description Form nhập thông tin thanh toán của người dùng
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {Object} props.billingInfo - Thông tin thanh toán hiện tại
 * @param {Function} props.handleBillingInfoChange - Hàm xử lý thay đổi thông tin
 * @param {string} props.language - Ngôn ngữ hiện tại
 * @param {Object} props.translations - Đối tượng chứa các bản dịch
 */
const BillingForm = ({
  billingInfo,
  handleBillingInfoChange,
  language,
  translations,
}) => {
  return (
    <>
      {/* Tiêu đề form */}
      <h3 className="text-lg font-semibold mb-2">
        {translations[language].billingInfo}
      </h3>

      {/* Form nhập tên */}
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

      {/* Form nhập email */}
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

      {/* Form nhập số điện thoại */}
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
    </>
  );
};

export default BillingForm;
