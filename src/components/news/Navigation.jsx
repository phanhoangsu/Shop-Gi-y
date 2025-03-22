/**
 * Navigation Component
 * 
 * Chức năng chính:
 * - Hiển thị thanh điều hướng danh mục
 * - Quản lý lựa chọn danh mục
 * - Responsive horizontal scrolling
 * 
 * Logic chính:
 * 1. Props Management:
 *    - categories: Danh sách danh mục
 *    - selectedCategory: Danh mục đang chọn
 *    - setSelectedCategory: Handler cập nhật danh mục
 * 
 * 2. UI Features:
 *    - Horizontal scrolling
 *    - Active state styling
 *    - Hover effects
 *    - Dark mode support
 * 
 * 3. Validation:
 *    - Check categories array
 *    - Null rendering for empty data
 */

import React from "react";

/**
 * Navigation Component
 * @param {Object} props
 * @param {Array} props.categories - List of category names
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Function} props.setSelectedCategory - Category selection handler
 * @returns {JSX.Element|null} Navigation bar or null if no categories
 */
const Navigation = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  // Validate categories array
  if (!Array.isArray(categories) || categories.length === 0) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm mb-6 overflow-x-auto">
      <div className="container mx-auto px-4">
        {/* Category Buttons */}
        <div className="flex space-x-4 py-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
