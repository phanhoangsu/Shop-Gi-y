/**
 * NewsPage Component
 * 
 * Chức năng chính:
 * 1. Content Management:
 *    - News display and organization
 *    - Category management
 *    - Content filtering
 *    - Search functionality
 * 
 * 2. User Interaction:
 *    - Bookmarking
 *    - Comments
 *    - Reactions
 *    - Sharing
 * 
 * 3. UI/UX Features:
 *    - Dark mode
 *    - Reading progress
 *    - Responsive design
 *    - Loading states
 * 
 * 4. Data Management:
 *    - API integration
 *    - Local storage
 *    - Error handling
 *    - State management
 */

import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Breadcrumb,
  QuickLinks,
  BannerSlider,
  SEO,
  ReadingProgress,
  Header,
  Navigation,
  AdvancedSearch,
  NewsCardSkeleton,
  NewsGrid,
  NewsDetail,
} from "../components/news";
import { FiArrowUp } from "react-icons/fi";

/**
 * useLocalStorage Custom Hook
 * @template T
 * @param {string} key - Storage key
 * @param {T} initialValue - Initial value
 * @returns {[T, (value: T) => void]} Value and setter
 */
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

/**
 * useNewsFiltering Custom Hook
 * @param {Array<Object>} newsData - Raw news data
 * @param {Object} filters - Filter criteria
 * @param {string} filters.selectedCategory - Selected category
 * @param {string} filters.searchTerm - Search keyword
 * @param {Object} filters.dateRange - Date range for filtering
 * @param {Array<string>} filters.selectedTags - Selected tags
 * @param {string} filters.sortBy - Sort criteria
 * @param {Array<string>} filters.bookmarks - Bookmarked items
 * @returns {Array<Object>} Filtered news items
 */
const useNewsFiltering = (newsData, filters) => {
  const {
    selectedCategory,
    searchTerm,
    dateRange,
    selectedTags,
    sortBy,
    bookmarks,
  } = filters;

  return useMemo(() => {
    let filtered = [...newsData];

    // Category filtering
    if (selectedCategory === "Đã Lưu") {
      filtered = filtered.filter((news) => bookmarks.includes(news.id));
    } else if (selectedCategory !== "Tất cả") {
      filtered = filtered.filter((news) =>
        news.tags.includes(selectedCategory)
      );
    }

    // Search term filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const searchTerms = searchLower
        .split(" ")
        .filter((term) => term.length > 0);
      filtered = filtered.filter((news) =>
        searchTerms.every(
          (term) =>
            news.title.toLowerCase().includes(term) ||
            news.description.toLowerCase().includes(term) ||
            news.tags.some((tag) => tag.toLowerCase().includes(term))
        )
      );
    }

    // Date range filtering
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filtered = filtered.filter((news) => {
        const newsDate = new Date(news.date);
        return newsDate >= startDate && newsDate <= endDate;
      });
    }

    // Tag filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter((news) =>
        selectedTags.every((tag) => news.tags.includes(tag))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    newsData,
    selectedCategory,
    searchTerm,
    dateRange,
    selectedTags,
    sortBy,
    bookmarks,
  ]);
};

/**
 * Error Message Utility
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
const getErrorMessage = (error) => {
  if (!navigator.onLine) {
    return "Không có kết nối internet. Vui lòng kiểm tra lại kết nối và thử lại.";
  }
  if (error.code === "ECONNABORTED") {
    return "Server phản hồi quá chậm. Vui lòng thử lại sau.";
  }
  if (error.response?.status === 404) {
    return "Không tìm thấy dữ liệu tin tức.";
  }
  if (error.response?.status >= 500) {
    return "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";
  }
  return "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
};

/**
 * NewsPage Component
 * 
 * Props: None
 * 
 * Logic chính:
 * 1. Data management:
 *    - Fetch và cache tin tức
 *    - Update state theo user actions
 * 
 * 2. User interactions:
 *    - Handle search/filter
 *    - Handle pagination
 *    - Handle bookmarks/hearts
 * 
 * 3. UI/UX:
 *    - Responsive layout
 *    - Loading states
 *    - Error handling
 *    - Infinite scroll
 */
const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [error, setError] = useState(null);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const maxRetries = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc");
  const [darkMode, setDarkMode] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedTags, setSelectedTags] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Use custom hook for localStorage states
  const [comments, setComments] = useLocalStorage("newsComments", {});
  const [hearts, setHearts] = useLocalStorage("newsHearts", {});
  const [readHistory, setReadHistory] = useLocalStorage("readHistory", []);
  const [bookmarks, setBookmarks] = useLocalStorage("newsBookmarks", []);
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "searchHistory",
    []
  );
  const [ratings, setRatings] = useLocalStorage("ratings", {});
  const itemsPerPage = 9;
  const [categories, setCategories] = useState(["Tất cả"]);

  // Fetch dữ liệu từ API
  let isInitialMount = true;
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoadingApi(true);
        setError(null);

        const response = await axios.get(
          "https://ngochieuwedding.io.vn/api/su/news",
          {
            timeout: 8000,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.data?.data) {
          throw new Error("Không có dữ liệu tin tức");
        }

        const formattedNews = response.data.data.map((item) => ({
          id: item._id || Math.random().toString(36).substr(2, 9),
          title: item.title || "Không có tiêu đề",
          description: item.description || "Không có mô tả",
          content: item.body || "",
          image: item.thumbnail || "https://via.placeholder.com/400x300",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("vi-VN")
            : "Không rõ",
          category: "Tin tức",
          tags: Array.isArray(item.tags) ? item.tags : [],
          created_by: item.created_by || "Admin",
          wordCount: (item.description || "").split(" ").length || 0,
        }));

        setNewsData(formattedNews);
        const uniqueTags = [
          "Tất cả",
          ...new Set(formattedNews.flatMap((item) => item.tags)),
        ];
        setCategories(uniqueTags);
        setRetryAttempt(0);
      } catch (err) {
        console.error("Lỗi khi tải tin tức:", err);

        if (!isInitialMount) {
          if (retryAttempt < maxRetries) {
            setRetryAttempt((prev) => prev + 1);
            setTimeout(() => fetchNews(), 2000);
          } else {
            const errorMessage = getErrorMessage(err);
            setError(errorMessage);
          }
        }
      } finally {
        setIsLoadingApi(false);
        isInitialMount = false;
      }
    };

    fetchNews();
  }, []);

  // Thêm hàm retry thủ công
  const handleRetry = useCallback(() => {
    setRetryAttempt(0);
    setError(null);
    isInitialMount = false;
    setIsLoadingApi(true);
    const fetchNews = async () => {
      try {
        setIsLoadingApi(true);
        setError(null);

        const response = await axios.get(
          "https://ngochieuwedding.io.vn/api/su/news",
          {
            timeout: 8000,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.data?.data) {
          throw new Error("Không có dữ liệu tin tức");
        }

        const formattedNews = response.data.data.map((item) => ({
          id: item._id || Math.random().toString(36).substr(2, 9),
          title: item.title || "Không có tiêu đề",
          description: item.description || "Không có mô tả",
          content: item.body || "",
          image: item.thumbnail || "https://via.placeholder.com/400x300",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("vi-VN")
            : "Không rõ",
          category: "Tin tức",
          tags: Array.isArray(item.tags) ? item.tags : [],
          created_by: item.created_by || "Admin",
          wordCount: (item.description || "").split(" ").length || 0,
        }));

        setNewsData(formattedNews);
        const uniqueTags = [
          "Tất cả",
          ...new Set(formattedNews.flatMap((item) => item.tags)),
        ];
        setCategories(uniqueTags);
        setRetryAttempt(0);
      } catch (err) {
        console.error("Lỗi khi tải tin tức:", err);
        if (retryAttempt < maxRetries) {
          setRetryAttempt((prev) => prev + 1);
          setTimeout(() => fetchNews(), 2000);
        } else {
          const errorMessage = getErrorMessage(err);
          setError(errorMessage);
        }
      } finally {
        setIsLoadingApi(false);
      }
    };
    fetchNews();
  }, []);

  // Use custom hook for filtering
  const filteredNews = useNewsFiltering(newsData, {
    selectedCategory,
    searchTerm,
    dateRange,
    selectedTags,
    sortBy,
    bookmarks,
  });

  const paginatedNews = useMemo(() => {
    return filteredNews.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredNews, currentPage, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredNews.length / itemsPerPage),
    [filteredNews.length, itemsPerPage]
  );

  const handleShare = (news, platform) => {
    if (!news) return;

    try {
      const url = `${window.location.origin}/news/${news.id}`;
      const text = encodeURIComponent(news.title);

      if (platform === "copy") {
        navigator.clipboard.writeText(url);
      } else if (platform === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
      } else if (platform === "twitter") {
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
      }
    } catch (error) {
      console.error("Error sharing news:", error);
    }
  };

  const handleBookmark = (news) => {
    if (!news) return;

    setBookmarks((prev) =>
      prev.includes(news.id)
        ? prev.filter((id) => id !== news.id)
        : [...prev, news.id]
    );
  };

  const handleHeart = (newsId) => {
    if (!newsId) return;

    setHearts((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  };

  const handleComment = (newsId, commentText) => {
    if (!newsId || !commentText?.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      date: new Date().toLocaleString("vi-VN"),
      author: "Người dùng",
      avatar: "https://via.placeholder.com/40",
      likes: 0,
    };

    setComments((prev) => ({
      ...prev,
      [newsId]: [...(prev[newsId] || []), newComment],
    }));
  };

  const handleNewsClick = (news) => {
    if (!news) return;

    setSelectedNews(news);
    if (!readHistory.includes(news.id)) {
      setReadHistory((prev) => [...prev, news.id].slice(0, 10));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLinkClick = (tag) => {
    setSelectedCategory(tag);
    setCurrentPage(1);
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SEO
        title="TechNews - Tin tức công nghệ mới nhất"
        description="Cập nhật tin tức công nghệ, đánh giá sản phẩm, khuyến mãi và nhiều hơn nữa"
        image="https://example.com/og-image.jpg"
        url={window.location.href}
      />
      <ReadingProgress />

      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="container mx-auto px-4 pt-20">
          <Navigation
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {selectedNews ? (
            <NewsDetail
              news={selectedNews}
              onBack={() => setSelectedNews(null)}
              comments={comments}
              setComments={setComments}
              hearts={hearts}
              setHearts={setHearts}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              handleShare={handleShare}
              handleBookmark={handleBookmark}
              handleHeart={handleHeart}
              handleComment={handleComment}
              newsData={newsData}
            />
          ) : (
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { label: "Trang chủ", path: "/" },
                  { label: "Tin tức", path: "/news" },
                ]}
              />

              {isLoadingApi && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6)
                    .fill()
                    .map((_, i) => (
                      <NewsCardSkeleton key={i} />
                    ))}
                </div>
              )}

              {error && (
                <div className="text-center py-10">
                  <p className="text-red-500 text-xl font-semibold mb-4">
                    {error}
                  </p>
                  <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {!isLoadingApi && !error && newsData.length > 0 && (
                <>
                  <QuickLinks onCategoryClick={handleQuickLinkClick} />
                  <button
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="mb-4 px-4 py-2 bg-red-500 text-white rounded-full"
                  >
                    {showAdvancedSearch
                      ? "Ẩn tìm kiếm nâng cao"
                      : "Tìm kiếm nâng cao"}
                  </button>
                  {showAdvancedSearch && (
                    <AdvancedSearch
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      getAllTags={() => [
                        ...new Set(newsData.flatMap((item) => item.tags)),
                      ]}
                    />
                  )}
                  <BannerSlider news={newsData} />
                </>
              )}

              <div id="news-section">
                {selectedCategory !== "Tất cả" ? (
                  <NewsGrid
                    title={`Tin tức ${selectedCategory}`}
                    news={paginatedNews}
                    onNewsClick={handleNewsClick}
                    bookmarks={bookmarks}
                    hearts={hearts}
                    handleBookmark={handleBookmark}
                    handleHeart={handleHeart}
                    handleShare={handleShare}
                  />
                ) : (
                  <>
                    <NewsGrid
                      title="Tin tức nổi bật"
                      news={newsData
                        .filter((news) => news.tags?.includes("ưu đãi"))
                        .slice(0, 6)}
                      onNewsClick={handleNewsClick}
                      bookmarks={bookmarks}
                      hearts={hearts}
                      handleBookmark={handleBookmark}
                      handleHeart={handleHeart}
                      handleShare={handleShare}
                    />
                    <NewsGrid
                      title="Tin tức mới nhất"
                      news={paginatedNews}
                      onNewsClick={handleNewsClick}
                      bookmarks={bookmarks}
                      hearts={hearts}
                      handleBookmark={handleBookmark}
                      handleHeart={handleHeart}
                      handleShare={handleShare}
                    />
                  </>
                )}
              </div>

              {filteredNews.length > itemsPerPage && (
                <div className="flex justify-center gap-2 py-6">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                  >
                    Trang trước
                  </button>
                  {Array.from(
                    { length: Math.ceil(filteredNews.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-full ${
                          currentPage === i + 1
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredNews.length / itemsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredNews.length / itemsPerPage)
                    }
                    className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                  >
                    Trang sau
                  </button>
                </div>
              )}
            </div>
          )}

          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <FiArrowUp size={24} />
            </button>
          )}
        </main>
      </div>
    </>
  );
};

export default NewsPage;
