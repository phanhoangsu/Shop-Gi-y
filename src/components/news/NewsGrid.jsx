import React from "react";
import { FiClock, FiBookmark, FiHeart, FiShare2 } from "react-icons/fi";
import { OptimizedImage } from "./index";

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
  const isNewNews = (date) => {
    const newsDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - newsDate);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffHours <= 24;
  };
  const getReadingTime = (wordCount) => Math.ceil(wordCount / 200);

  if (!Array.isArray(news) || news.length === 0) {
    return <p className="text-center text-gray-500">Không có tin tức nào</p>;
  }

  return (
    <div className="mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => onNewsClick(item)}
          >
            <div className="relative aspect-video overflow-hidden">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
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

            <div className="p-5">
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

              <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {item.description || "Không có mô tả"}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  <span>{getReadingTime(item.wordCount)} phút đọc</span>
                </div>

                <div className="flex items-center space-x-3">
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

export default React.memo(NewsGrid);
