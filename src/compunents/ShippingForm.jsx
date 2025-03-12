import React from "react";

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
      <h3 className="text-lg font-semibold mb-2">
        {translations[language].shippingInfo}
      </h3>
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
