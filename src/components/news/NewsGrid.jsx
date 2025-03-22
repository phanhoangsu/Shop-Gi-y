/**
 * NewsGrid Component
 * 
 * Chức năng chính:
 * - Hiển thị lưới tin tức
 * - Xử lý tương tác người dùng
 * - Tối ưu hiệu năng
 * 
 * Logic chính:
 * 1. Data Processing:
 *    - New news detection (24h)
 *    - Reading time calculation
 *    - Input validation
 *    - Performance optimization
 * 
 * 2. UI Rendering:
 *    - Responsive grid layout
 *    - Image optimization
 *    - Text truncation
 *    - Loading states
 * 
 * 3. User Interactions:
 *    - News click handling
 *    - Bookmark toggling
 *    - Heart/Like toggling
 *    - Share functionality
 */

import React from "react";
import { FiClock, FiBookmark, FiHeart, FiShare2 } from "react-icons/fi";
import { OptimizedImage } from "./index";

/**
 * NewsGrid Component
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.news - Array of news items
 * @param {Function} props.onNewsClick - News click handler
 * @param {Array} props.bookmarks - Bookmarked news IDs
 * @param {Object} props.hearts - Hearted news status
 * @param {Function} props.handleBookmark - Bookmark toggle handler
 * @param {Function} props.handleHeart - Heart toggle handler
 * @param {Function} props.handleShare - Share handler
 */
const NewsGrid = ({
  title,
  news = [],
  onNewsClick,
  bookmarks = [],
  hearts = {},
  handleBookmark,
  handleHeart,
  handleShare,
}) => {
  /**
   * Check if news is new (within 24 hours)
   * @param {string} date - News publication date
   * @returns {boolean} - True if news is new
   */
  const isNewNews = (date) => {
    const newsDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - newsDate);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffHours <= 24;
  };

  /**
   * Calculate reading time based on word count
   * Assumes reading speed of 200 words/minute
   * @param {number} wordCount - Number of words in article
   * @returns {number} - Reading time in minutes
   */
  const getReadingTime = (wordCount) => Math.ceil(wordCount / 200);

  // Input validation
  if (!Array.isArray(news) || news.length === 0) {
    return <p className="text-center text-gray-500">Không có tin tức nào</p>;
  }

  return (
    <div className="mb-8">
      {/* Section Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
          <a
            href="#"
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Xem tất cả
          </a>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => onNewsClick(item)}
          >
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              {item.tags?.includes("ưu đãi") && (
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  HOT
                </span>
              )}
              {isNewNews(item.date) && (
                <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  MỚI
                </span>
              )}
            </div>

            {/* Content Section */}
            <div className="p-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {item.description || "Không có mô tả"}
              </p>

              {/* Footer Actions */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  <span>{getReadingTime(item.wordCount)} phút đọc</span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(item);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      bookmarks.includes(item.id)
                        ? "text-yellow-500 bg-yellow-50 dark:bg-gray-700"
                        : "text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FiBookmark size={18} />
                  </button>

                  {/* Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeart(item.id);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      hearts[item.id]
                        ? "text-red-500 bg-red-50 dark:bg-gray-700"
                        : "text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FiHeart size={18} />
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(item, "copy");
                    }}
                    className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiShare2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// Optimize re-renders with React.memo
export default React.memo(NewsGrid);
