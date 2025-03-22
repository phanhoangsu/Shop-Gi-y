/**
 * AdvancedSearch Component
 * 
 * Chức năng chính:
 * - Cung cấp giao diện tìm kiếm nâng cao
 * - Lọc theo khoảng thời gian
 * - Lọc theo tags
 * 
 * Logic chính:
 * 1. State Management:
 *    - dateRange: Quản lý khoảng thời gian
 *      + start: Ngày bắt đầu
 *      + end: Ngày kết thúc
 *    - selectedTags: Quản lý tags được chọn
 * 
 * 2. Data Processing:
 *    - Toggle tags selection
 *    - Date range validation
 *    - Tag filtering
 * 
 * 3. UI Features:
 *    - Responsive grid layout
 *    - Native date pickers
 *    - Interactive tag buttons
 *    - Dark mode support
 */

import React from "react";

/**
 * AdvancedSearch Component
 * @param {Object} props
 * @param {Object} props.dateRange - Selected date range
 * @param {string} props.dateRange.start - Start date
 * @param {string} props.dateRange.end - End date
 * @param {Function} props.setDateRange - Date range setter
 * @param {Array} props.selectedTags - Selected tag list
 * @param {Function} props.setSelectedTags - Tags setter
 * @param {Function} props.getAllTags - Function to get all available tags
 * @returns {JSX.Element} Advanced search form
 */
const AdvancedSearch = ({
  dateRange,
  setDateRange,
  selectedTags,
  setSelectedTags,
  getAllTags,
}) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
    {/* Date Range Inputs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Từ ngày
        </label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Đến ngày
        </label>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>

    {/* Tags Selection */}
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {getAllTags().map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setSelectedTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag) // Remove tag if already selected
                  : [...prev, tag] // Add tag if not selected
              )
            }
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? "bg-red-500 text-white" // Active state
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" // Inactive state
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default AdvancedSearch;
