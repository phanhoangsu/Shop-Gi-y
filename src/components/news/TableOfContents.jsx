/**
 * Logic chính:
 * 1. Quản lý state:
 *    - headings: Danh sách tiêu đề (h2, h3)
 *    - activeId: ID tiêu đề đang active
 * 
 * 2. Xử lý DOM:
 *    - Query các heading elements
 *    - Extract thông tin: id, text, level
 *    - IntersectionObserver theo dõi vị trí
 *    - Cleanup observer
 * 
 * 3. UI/UX:
 *    - Sticky positioning
 *    - Indent theo level
 *    - Scroll spy
 *    - Active state
 *    - Smooth scroll
 */
import React, { useState, useEffect } from "react";

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll("h2, h3");
    const headingsData = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent,
      level: element.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(headingsData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [content]);

  return (
    <nav className="sticky top-20 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h4 className="text-lg font-bold mb-4 dark:text-white">Mục lục</h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 text-sm ${
                activeId === heading.id
                  ? "text-red-500 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-red-500"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
