import React from "react";

const OrderDetails = ({
  selectedOrder,
  setSelectedOrder,
  handleCancelOrder,
  language,
  translations,
  formatCurrency,
}) => {
  console.log("Rendering OrderDetails with:", selectedOrder);
  if (!selectedOrder) return null;

  const statusColors = {
    "Đang xử lý": "bg-yellow-100 text-yellow-800",
    "Đang giao": "bg-blue-100 text-blue-800",
    "Đã giao": "bg-green-100 text-green-800",
    "Đã hủy": "bg-red-100 text-red-800",
  };

  const statusSteps = ["Đang xử lý", "Đang giao", "Đã giao"];
  const currentStep = statusSteps.indexOf(selectedOrder.status);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">
          {translations[language].orderLabel}
          {selectedOrder.id}
        </h3>
        <p>
          <strong>Ngày đặt:</strong>{" "}
          {new Date(selectedOrder.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              statusColors[selectedOrder.status]
            }`}
          >
            {selectedOrder.status}
          </span>
        </p>
        <div className="my-4">
          <div className="flex justify-between">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-sm mt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <p>
          <strong>Tổng tiền:</strong> {formatCurrency(selectedOrder.total)}
        </p>
        {selectedOrder.shippingInfo && (
          <div className="mt-2">
            <strong>{translations[language].shippingInfo}:</strong>
            <p>Tên: {selectedOrder.shippingInfo.name}</p>
            <p>Địa chỉ: {selectedOrder.shippingInfo.address}</p>
            <p>Số điện thoại: {selectedOrder.shippingInfo.phone}</p>
          </div>
        )}
        <div className="mt-4">
          <strong>Sản phẩm:</strong>
          <ul className="list-disc ml-5">
            {selectedOrder.cartItems.map((item) => (
              <li key={`${item.id}-${item.color}-${item.size}`}>
                {item.name} - {item.quantity} x {formatCurrency(item.price)}{" "}
                (Màu: {item.color}, Kích thước: {item.size})
              </li>
            ))}
          </ul>
        </div>
        {selectedOrder.notes && (
          <p className="mt-2">
            <strong>{translations[language].notes}:</strong>{" "}
            {selectedOrder.notes}
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setSelectedOrder(null)}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Đóng
          </button>
          {selectedOrder.status === "Đang xử lý" && (
            <button
              onClick={() => handleCancelOrder(selectedOrder.id)}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Hủy đơn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
