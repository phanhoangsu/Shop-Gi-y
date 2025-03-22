/**
 * Breadcrumb Component
 * 
 * Chức năng chính:
 * - Hiển thị đường dẫn điều hướng
 * - Tạo liên kết cho các mục
 * - Hỗ trợ dark mode
 * 
 * Logic chính:
 * 1. Props Management:
 *    - items: Mảng các mục breadcrumb
 *    - Mỗi item có:
 *      + path: Đường dẫn
 *      + label: Nhãn hiển thị
 * 
 * 2. UI Features:
 *    - Home icon
 *    - Separator styling
 *    - Active item styling
 *    - Hover effects
 * 
 * 3. Navigation:
 *    - Link handling
 *    - Current page indication
 *    - Hierarchy display
 */

import React from "react";
import { FiHome } from "react-icons/fi";

/**
 * Breadcrumb Component
 * @param {Object} props
 * @param {Array} props.items - List of breadcrumb items
 * @param {string} props.items[].path - URL path for the item
 * @param {string} props.items[].label - Display text for the item
 * @returns {JSX.Element} Breadcrumb navigation
 */
const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
    {/* Home Link */}
    <a href="/" className="hover:text-red-500">
      <FiHome size={16} />
    </a>

    {/* Breadcrumb Items */}
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {/* Separator */}
        <span>/</span>
        
        {/* Item Link */}
        <a
          href={item.path}
          className={`hover:text-red-500 ${
            index === items.length - 1 ? "text-red-500 font-medium" : ""
          }`}
        >
          {item.label}
        </a>
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumb;
