import React from "react";

const Navigation = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!Array.isArray(categories) || categories.length === 0) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm mb-6 overflow-x-auto">
      <div className="container mx-auto px-4">
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
