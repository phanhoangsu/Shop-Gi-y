import React from "react";

const BillingForm = ({
  billingInfo,
  handleBillingInfoChange,
  language,
  translations,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-2">
        {translations[language].billingInfo}
      </h3>
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
