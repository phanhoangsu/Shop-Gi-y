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
    <div className="mt-4">
      <div className="flex justify-between">
        <span>{translations[language].subtotal}:</span>
        <span>{formatCurrency(calculateSubtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>{translations[language].discount}:</span>
          <span>-{formatCurrency(calculateSubtotal * discount)}</span>
        </div>
      )}
      {showShipping && (
        <div className="flex justify-between">
          <span>{translations[language].shippingFee}:</span>
          <span>{formatCurrency(calculateShippingFee)}</span>
        </div>
      )}
      <div className="flex justify-between font-semibold mt-2">
        <span>{translations[language].total}:</span>
        <span>{formatCurrency(calculateTotal)}</span>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {translations[language].loyaltyPoints}: {loyaltyPoints} điểm
      </p>
    </div>
  );
};

export default CartSummary;
