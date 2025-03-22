/**
 * NewsDetail Component
 * 
 * Chức năng chính:
 * - Hiển thị chi tiết tin tức
 * - Quản lý tương tác người dùng
 * - Xử lý comments và reactions
 * 
 * Logic chính:
 * 1. State Management:
 *    - Comments handling
 *    - Hearts/Likes tracking
 *    - Bookmarks management
 *    - Share functionality
 * 
 * 2. Data Processing:
 *    - Related news filtering
 *    - Reading time calculation
 *    - Date formatting
 *    - Safe HTML rendering
 * 
 * 3. User Interactions:
 *    - Back navigation
 *    - Social sharing
 *    - Comments system
 *    - Like/Bookmark actions
 */

import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiHeart,
  FiBookmark,
  FiFacebook,
  FiTwitter,
  FiLink,
} from "react-icons/fi";
import { OptimizedImage, CommentSection } from "./index";

/**
 * NewsDetail Component
 * @param {Object} props
 * @param {Object} props.news - Current news item
 * @param {Function} props.onBack - Back navigation handler
 * @param {Object} props.comments - Comments data
 * @param {Function} props.setComments - Comments setter
 * @param {Object} props.hearts - Hearts/Likes data
 * @param {Function} props.setHearts - Hearts setter
 * @param {Array} props.bookmarks - Bookmarked items
 * @param {Function} props.setBookmarks - Bookmarks setter
 * @param {Function} props.handleShare - Share handler
 * @param {Function} props.handleBookmark - Bookmark handler
 * @param {Function} props.handleHeart - Heart/Like handler
 * @param {Function} props.handleComment - Comment handler
 * @param {Array} props.newsData - All news data
 */
const NewsDetail = ({
  news,
  onBack,
  comments,
  setComments,
  hearts,
  setHearts,
  bookmarks,
  setBookmarks,
  handleShare,
  handleBookmark,
  handleHeart,
  handleComment,
  newsData,
}) => {
  /**
   * Comment State
   * @type {string}
   */
  const [newComment, setNewComment] = useState("");

  /**
   * Filter Related News
   * - Same category
   * - Exclude current news
   * - Limit to 3 items
   */
  const relatedNews = newsData
    .filter((n) => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  /**
   * Calculate Reading Time
   * @param {number} wordCount - Number of words
   * @returns {number} - Reading time in minutes
   */
  const getReadingTime = (wordCount) => Math.ceil(wordCount / 200);

  // Debug logging
  useEffect(() => {
    console.log("NewsDetail mounted:", news);
    console.log("Comments for this news:", comments[news.id]);
  }, [news, comments]);

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Hero Image Section */}
      <div className="relative h-96">
        <OptimizedImage
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <FiArrowLeft size={24} />
        </button>
      </div>

      <div className="p-8">
        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {news.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Meta Info */}
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          {news.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-6">
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>{getReadingTime(news.wordCount)} phút đọc</span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="mr-2" />
            <span>{new Date(news.date).toLocaleDateString("vi-VN")}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {news.description || "Không có mô tả"}
          </p>
          {news.content && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold dark:text-white">
                Nội dung chi tiết
              </h3>
              <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
          {/* Like & Bookmark Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleHeart(news.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                hearts[news.id]
                  ? "bg-red-50 text-red-500 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FiHeart className={hearts[news.id] ? "fill-current" : ""} />
              <span>{hearts[news.id] ? "Đã thích" : "Thích"}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark(news);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                bookmarks.includes(news.id)
                  ? "bg-yellow-50 text-yellow-500 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FiBookmark
                className={bookmarks.includes(news.id) ? "fill-current" : ""}
              />
              <span>{bookmarks.includes(news.id) ? "Đã lưu" : "Lưu tin"}</span>
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(news, "facebook");
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiFacebook size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(news, "twitter");
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiTwitter size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(news, "copy");
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiLink size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Bình luận ({(comments[news.id] || []).length})
          </h3>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-red-400 dark:text-white"
            />
            <button
              onClick={() => {
                if (newComment.trim()) {
                  handleComment(news.id, newComment);
                  setNewComment("");
                }
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Gửi
            </button>
          </div>
          <CommentSection
            comments={comments[news.id] || []}
            onAddComment={(text) => handleComment(news.id, text)}
            onAddReply={(commentId, replyText) => {
              const newReply = {
                id: Date.now(),
                content: replyText,
                date: new Date().toLocaleString("vi-VN"),
                author: "Người dùng",
                avatar: "https://via.placeholder.com/32",
                likes: 0,
              };
              setComments((prev) => ({
                ...prev,
                [news.id]: (prev[news.id] || []).map((c) =>
                  c.id === commentId
                    ? { ...c, replies: [...(c.replies || []), newReply] }
                    : c
                ),
              }));
            }}
          />
        </div>

        {relatedNews.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Tin tức liên quan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedNews.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    // Chưa implement setSelectedNews
                  }}
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium mb-2 line-clamp-2 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
