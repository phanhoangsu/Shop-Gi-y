/**
 * Component OrderTracking
 * 
 * Chức năng chính:
 * 1. Theo dõi đơn hàng:
 *    - Hiển thị danh sách đơn hàng
 *    - Tìm kiếm đơn hàng
 *    - Lọc theo trạng thái
 * 
 * 2. Quản lý đơn hàng:
 *    - Xem chi tiết đơn hàng
 *    - Xóa đơn hàng
 *    - Cập nhật trạng thái
 * 
 * 3. Phân trang:
 *    - Hiển thị số trang
 *    - Điều hướng trang
 *    - Giới hạn số đơn hàng/trang
 */

import React from "react";

/**
 * Component OrderTracking
 * @component
 * @description Hiển thị và quản lý danh sách đơn hàng với tính năng tìm kiếm và lọc
 * 
 * @param {Object} props - Props của component
 * @param {string} props.searchQuery - Từ khóa tìm kiếm
 * @param {Function} props.setSearchQuery - Hàm cập nhật từ khóa tìm kiếm
 * @param {string} props.filterStatus - Trạng thái lọc hiện tại
 * @param {Function} props.setFilterStatus - Hàm cập nhật trạng thái lọc
 * @param {Array} props.paginatedOrders - Danh sách đơn hàng đã phân trang
 * @param {number} props.currentPage - Trang hiện tại
 * @param {Function} props.setCurrentPage - Hàm cập nhật trang hiện tại
 * @param {number} props.totalPages - Tổng số trang
 * @param {Function} props.setSelectedOrder - Hàm chọn đơn hàng để xem chi tiết
 * @param {Function} props.handleDeleteOrder - Hàm xóa đơn hàng
 * @param {Function} props.formatCurrency - Hàm định dạng tiền tệ
 * @param {string} props.language - Ngôn ngữ hiện tại
 * @param {Object} props.translations - Đối tượng chứa các bản dịch
 */
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
      {/* Tiêu đề */}
      <h3 className="text-lg font-semibold mb-2">
        {translations[language].orderTracking}
      </h3>

      {/* Thanh tìm kiếm và lọc */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded w-full py-2 px-3"
          placeholder={translations[language].searchOrders}
        />
        {/* Lọc theo trạng thái */}
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

      {/* Bảng danh sách đơn hàng */}
      {paginatedOrders.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              {/* Tiêu đề bảng */}
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
              {/* Nội dung bảng */}
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    {/* Mã đơn hàng */}
                    <td className="py-2 px-4 border-b">
                      {translations[language].orderLabel}
                      {order.id}
                    </td>
                    {/* Ngày đặt hàng */}
                    <td className="py-2 px-4 border-b">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    {/* Trạng thái đơn hàng với màu sắc tương ứng */}
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
                    {/* Tổng tiền */}
                    <td className="py-2 px-4 border-b">
                      {formatCurrency(order.total)}
                    </td>
                    {/* Nút xem chi tiết */}
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-500 hover:underline"
                      >
                        {translations[language].viewDetails}
                      </button>
                    </td>
                    {/* Nút xóa đơn hàng */}
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

          {/* Điều hướng phân trang */}
          <div className="mt-4 flex justify-between items-center">
            {/* Nút trang trước */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {/* Hiển thị trang hiện tại */}
            <span>
              {translations[language].page} {currentPage} / {totalPages}
            </span>
            {/* Nút trang sau */}
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
