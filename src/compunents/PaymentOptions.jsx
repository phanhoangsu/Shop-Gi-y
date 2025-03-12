import React from "react";

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
