import React, { useState } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import Pagination from "./Pagination";

const Orders = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "Đã giao":
        return "bg-green-100 text-green-800";
      case "Đã hủy":
        return "bg-red-100 text-red-800";
      case "Chưa thanh toán":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        String(order.id).toLowerCase().includes(search) ||
        order.billingInfo.name.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Chưa thanh toán">Chưa thanh toán</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Mã đơn</th>
              <th className="px-4 py-3 text-left">Khách hàng</th>
              <th className="px-4 py-3 text-left">Ngày đặt</th>
              <th className="px-4 py-3 text-left">Tổng tiền</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">{order.billingInfo.name}</td>
                  <td className="px-4 py-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaEye className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Chi tiết đơn hàng #{selectedOrder.id}
            </h2>
            <div className="space-y-4">
              <div>
                <strong>Khách hàng:</strong> {selectedOrder.billingInfo.name}
              </div>
              <div>
                <strong>Email:</strong>{" "}
                {selectedOrder.billingInfo.email || "N/A"}
              </div>
              <div>
                <strong>Số điện thoại:</strong>{" "}
                {selectedOrder.billingInfo.phone || "N/A"}
              </div>
              <div>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(selectedOrder.date).toLocaleString()}
              </div>
              <div>
                <strong>Phương thức thanh toán:</strong>{" "}
                {selectedOrder.paymentMethod}
              </div>
              <div>
                <strong>Trạng thái:</strong> {selectedOrder.status}
              </div>
              <div>
                <strong>Sản phẩm:</strong>
                <ul className="list-disc pl-5">
                  {selectedOrder.cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.quantity} x{" "}
                      {formatCurrency(item.price)} ={" "}
                      {formatCurrency(item.quantity * item.price)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Tổng tiền:</strong>{" "}
                {formatCurrency(selectedOrder.total)}
              </div>
              {selectedOrder.shippingInfo && (
                <div>
                  <strong>Thông tin giao hàng:</strong>
                  <p>Tên: {selectedOrder.shippingInfo.name}</p>
                  <p>Địa chỉ: {selectedOrder.shippingInfo.address}</p>
                  <p>Số điện thoại: {selectedOrder.shippingInfo.phone}</p>
                </div>
              )}
              {selectedOrder.notes && (
                <div>
                  <strong>Ghi chú:</strong> {selectedOrder.notes}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Orders;
