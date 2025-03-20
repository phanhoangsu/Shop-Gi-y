import React from "react";
import { FiHome } from "react-icons/fi";

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
    <a href="/" className="hover:text-red-500">
      <FiHome size={16} />
    </a>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <span>/</span>
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
