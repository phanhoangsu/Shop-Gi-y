/**
 * ListPage Component
 * 
 * Chức năng chính:
 * - Container component cho các route con
 * - Render Outlet từ React Router
 * - Cung cấp layout chung
 * 
 * Logic chính:
 * - Sử dụng Outlet để render nested routes
 * - Không có state management
 * - Minimal wrapper component
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
