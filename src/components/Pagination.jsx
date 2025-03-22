/**
 * Logic chính:
 * 1. Input:
 *    - currentPage: Số trang hiện tại
 *    - totalPages: Tổng số trang
 *    - onPageChange: Callback khi chuyển trang
 * 
 * 2. Xử lý:
 *    - Tạo mảng số trang từ 1 -> totalPages
 *    - Disable nút Previous khi ở trang 1
 *    - Disable nút Next khi ở trang cuối
 *    - Highlight trang hiện tại
 */
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Tạo mảng số trang từ 1 đến totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Nút quay lại trang trước, disable khi ở trang 1 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
      >
        Trước
      </button>

      {/* Danh sách các trang với style active cho trang hiện tại */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút chuyển đến trang sau, disable khi ở trang cuối */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;
