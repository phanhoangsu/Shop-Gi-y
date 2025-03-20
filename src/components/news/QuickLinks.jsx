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
