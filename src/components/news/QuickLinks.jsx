/**
 * Logic chính và chức năng:
 * 
 * 1. Chức năng:
 *    - Thanh điều hướng nhanh các danh mục tin tức
 *    - Filter tin tức theo tag
 *    - Tối ưu UX với horizontal scroll
 * 
 * 2. Logic xử lý:
 *    - Định nghĩa links array với id/label/tag
 *    - Map links thành buttons
 *    - Callback onCategoryClick với tag
 * 
 * 3. UI/UX:
 *    - Horizontal scrolling
 *    - Hide scrollbar
 *    - Hover effects
 *    - Responsive buttons
 *    - Dark mode support
 */
import React from "react";

const QuickLinks = ({ onCategoryClick }) => {
  const links = [
    { id: "flash-sale", label: "Flash Sale", tag: "flash-sale" },
    { id: "trending", label: "Trending", tag: "trending" },
    { id: "khuyen-mai", label: "Khuyến mãi hot", tag: "ưu đãi" },
    { id: "review", label: "Review", tag: "review" },
    { id: "so-sanh", label: "So sánh", tag: "so sánh" },
    { id: "tu-van", label: "Tư vấn", tag: "tư vấn" },
  ];

  return (
    <div className="flex overflow-x-auto whitespace-nowrap py-2 mb-4 scrollbar-hide">
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => onCategoryClick(link.tag)}
          className="inline-block px-4 py-1 mr-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-colors"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
};

export default QuickLinks;
