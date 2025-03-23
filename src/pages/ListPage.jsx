/**
 * ListPage Component
 *
 * Chức năng chính:
 *- Thành phần vùng chứa cho các tuyến đường
 * - Kết xuất đầu ra từ Bộ định tuyến React
 * - Cung cấp bố cục chung
 *
 * Logic chính:
 * - Sử dụng Outlet để hiển thị các tuyến đường lồng nhau
 * - Không có quản lý nhà nước
 * - Thành phần bao bọc tối thiểu
 */

import React from "react";
import { Outlet } from "react-router-dom";

/**
 * ListPage Component
 * @component
 * @description Container component for nested routes using React Router's Outlet
 */
const ListPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ListPage;
