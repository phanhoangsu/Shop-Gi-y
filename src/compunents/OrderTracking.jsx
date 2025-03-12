import React from "react";

const OrderTracking = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  paginatedOrders,
  currentPage,
  setCurrentPage,
  totalPages,
  setSelectedOrder,
  handleDeleteOrder,
  formatCurrency,
  language,
  translations,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {translations[language].orderTracking}
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded w-full py-2 px-3"
          placeholder={translations[language].searchOrders}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded w-full sm:w-40 py-2 px-3"
        >
          <option value="Tất cả">{translations[language].all}</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>
      {paginatedOrders.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Đơn hàng</th>
                  <th className="py-2 px-4 border-b text-left">Ngày</th>
                  <th className="py-2 px-4 border-b text-left">Trạng thái</th>
                  <th className="py-2 px-4 border-b text-left">Tổng tiền</th>
                  <th className="py-2 px-4 border-b text-left">Hành động</th>
                  <th className="py-2 px-4 border-b text-left"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b">
                      {translations[language].orderLabel}
                      {order.id}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Đang giao"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Đã giao"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-500 hover:underline"
                      >
                        {translations[language].viewDetails}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <span>
              {translations[language].page} {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </>
      ) : (
        <p>{translations[language].noOrders}</p>
      )}
    </div>
  );
};

export default OrderTracking;
