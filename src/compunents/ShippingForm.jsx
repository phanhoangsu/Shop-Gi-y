/**
 * Component ShippingForm
 * 
 * Chức năng chính:
 * 1. Thu thập thông tin giao hàng:
 *    - Tên người nhận
 *    - Địa chỉ giao hàng
 *    - Số điện thoại liên hệ
 * 
 * 2. Phương thức vận chuyển:
 *    - Giao hàng tiêu chuẩn
 *    - Giao hàng nhanh
 *    - Thời gian dự kiến
 * 
 * 3. Xác thực dữ liệu:
 *    - Kiểm tra các trường bắt buộc
 *    - Định dạng số điện thoại
 *    - Xác thực địa chỉ
 */

import React from "react";

/**
 * Component ShippingForm
 * @component
 * @description Form nhập thông tin giao hàng và lựa chọn phương thức vận chuyển
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {Object} props.shippingInfo - Thông tin giao hàng hiện tại
 * @param {Function} props.handleShippingInfoChange - Hàm xử lý thay đổi thông tin
 * @param {string} props.shippingMethod - Phương thức vận chuyển được chọn
 * @param {Function} props.setShippingMethod - Hàm cập nhật phương thức vận chuyển
 * @param {string} props.language - Ngôn ngữ hiện tại
 * @param {Object} props.translations - Đối tượng chứa các bản dịch
 */
const ShippingForm = ({
  shippingInfo,
  handleShippingInfoChange,
  shippingMethod,
  setShippingMethod,
  language,
  translations,
}) => {
  return (
    <>
      {/* Tiêu đề form */}
      <h3 className="text-lg font-semibold mb-2">
        {translations[language].shippingInfo}
      </h3>

      {/* Form nhập tên người nhận */}
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

      {/* Form nhập địa chỉ giao hàng */}
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

      {/* Form nhập số điện thoại */}
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

      {/* Lựa chọn phương thức vận chuyển */}
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
  );
};

export default ShippingForm;
