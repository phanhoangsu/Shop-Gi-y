import React, { useState } from "react";
import { FaSearch, FaUserEdit, FaTrash } from "react-icons/fa";
import Pagination from "./Pagination";

const Customers = ({ customers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editCustomer, setEditCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    if (statusFilter !== "all" && customer.status !== statusFilter)
      return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(search) ||
        (customer.email && customer.email.toLowerCase().includes(search)) ||
        (customer.phone && customer.phone.includes(search))
      );
    }
    return true;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditCustomer = (customer) => {
    setEditCustomer({ ...customer });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = () => {
    const updatedAdminData = JSON.parse(localStorage.getItem("adminData"));
    updatedAdminData.customers = updatedAdminData.customers.map((c) =>
      (c.email && c.email === editCustomer.email) ||
      (c.phone && c.phone === editCustomer.phone) ||
      c.name === editCustomer.name
        ? editCustomer
        : c
    );
    localStorage.setItem("adminData", JSON.stringify(updatedAdminData));
    setIsModalOpen(false);
    setEditCustomer(null);
  };

  const handleDeleteCustomer = (customer) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      const updatedAdminData = JSON.parse(localStorage.getItem("adminData"));
      updatedAdminData.customers = updatedAdminData.customers.filter(
        (c) =>
          c.email !== customer.email ||
          c.phone !== customer.phone ||
          c.name !== customer.name
      );
      localStorage.setItem("adminData", JSON.stringify(updatedAdminData));
    }
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
                placeholder="Tìm kiếm khách hàng..."
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
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng khách hàng */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Khách hàng</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Số điện thoại</th>
              <th className="px-4 py-3 text-left">Tổng đơn</th>
              <th className="px-4 py-3 text-left">Tổng chi tiêu</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-left">Ngày tham gia</th>
              <th className="px-4 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCustomers.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-3 text-center text-gray-500">
                  Chưa có khách hàng nào.
                </td>
              </tr>
            ) : (
              currentCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">{customer.email || "N/A"}</td>
                  <td className="px-4 py-3">{customer.phone || "N/A"}</td>
                  <td className="px-4 py-3">{customer.totalOrders || 0}</td>
                  <td className="px-4 py-3">
                    {formatCurrency(customer.totalSpent || 0)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                        customer.status
                      )}`}
                    >
                      {customer.status === "active"
                        ? "Đang hoạt động"
                        : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{customer.joinDate || "N/A"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditCustomer(customer)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FaUserEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa khách hàng</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tên khách hàng
              </label>
              <input
                type="text"
                value={editCustomer.name}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={editCustomer.email || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                value={editCustomer.phone || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Trạng thái
              </label>
              <select
                value={editCustomer.status}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCustomer}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Lưu
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

export default Customers;
