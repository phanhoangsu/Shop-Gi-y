import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiShare2,
  FiStar,
  FiMessageSquare,
  FiHeart,
  FiClock,
  FiGrid,
  FiList,
  FiArrowLeft,
  FiX,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const newsData = [
  {
    id: 1,
    category: "Sản phẩm mới",
    tags: ["Giày thể thao"],
    title: "Giới thiệu bộ sưu tập giày thể thao mùa hè 2024",
    content:
      "Chi tiết về bộ sưu tập giày thể thao mùa hè 2024 với thiết kế hiện đại và màu sắc nổi bật...",
    date: "2025-03-10",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    wordCount: 200,
    media: { type: "video", url: "https://example.com/video.mp4" },
  },
  {
    id: 2,
    category: "Khuyến mãi",
    tags: ["Sale cuối mùa"],
    title: "Sale cuối mùa giảm giá lên đến 50%",
    content:
      "Khuyến mãi lớn cuối mùa với nhiều sản phẩm giảm giá sâu, cơ hội không thể bỏ lỡ...",
    date: "2025-03-11",
    image: "https://images.unsplash.com/photo-1578985545068-9948d5b8592e",
    wordCount: 150,
  },
  {
    id: 3,
    category: "Xu hướng thời trang",
    tags: ["Màu sắc"],
    title: "Xu hướng màu sắc hot nhất mùa hè này",
    content:
      "Khám phá những màu sắc nổi bật sẽ thống trị thời trang mùa hè 2024...",
    date: "2025-03-12",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    wordCount: 180,
  },
  {
    id: 4,
    category: "Sản phẩm mới",
    tags: ["Áo thun"],
    title: "Ra mắt dòng áo thun phong cách tối giản 2025",
    content:
      "Dòng áo thun mới với thiết kế tối giản, phù hợp cho mọi dịp từ công sở đến dạo phố...",
    date: "2025-03-09",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    wordCount: 220,
  },
  {
    id: 5,
    category: "Sự kiện",
    tags: ["Triển lãm"],
    title: "Triển lãm thời trang bền vững tại Hà Nội",
    content:
      "Sự kiện triển lãm giới thiệu các xu hướng thời trang bền vững và thân thiện với môi trường...",
    date: "2025-03-08",
    image: "https://images.unsplash.com/photo-1483985988355-0e6832e779c2",
    wordCount: 190,
  },
  {
    id: 6,
    category: "Mẹo và Thủ Thuật",
    tags: ["Phối đồ"],
    title: "5 mẹo phối đồ mùa hè cực chất",
    content:
      "Học ngay cách phối đồ để luôn nổi bật trong những ngày nắng nóng của mùa hè...",
    date: "2025-03-07",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629203d3",
    wordCount: 170,
  },
  {
    id: 7,
    category: "Khuyến mãi",
    tags: ["Flash Sale"],
    title: "Flash Sale 24h - Giảm giá toàn bộ sản phẩm",
    content:
      "Chỉ trong 24 giờ, tất cả sản phẩm đều được giảm giá, nhanh tay săn deal ngay hôm nay...",
    date: "2025-03-12",
    image: "https://images.unsplash.com/photo-1555529669-2263aa4074b0",
    wordCount: 140,
  },
  {
    id: 8,
    category: "Xu hướng thời trang",
    tags: ["Phụ kiện"],
    title: "Phụ kiện nổi bật cho mùa xuân hè 2025",
    content:
      "Khám phá những mẫu phụ kiện hot nhất để nâng tầm phong cách của bạn trong năm nay...",
    date: "2025-03-11",
    image: "https://images.unsplash.com/photo-1519706882493-30119b506d8d",
    wordCount: 200,
  },
  {
    id: 9,
    category: "Sản phẩm mới",
    tags: ["Túi xách"],
    title: "Bộ sưu tập túi xách đa năng mùa hè 2025",
    content:
      "Túi xách mới với thiết kế đa năng, vừa thời trang vừa tiện dụng cho mọi hoạt động...",
    date: "2025-03-10",
    image: "https://images.unsplash.com/photo-1554343449-738f7c16faff",
    wordCount: 210,
  },
];

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [savedNews, setSavedNews] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("text-base");
  const [viewMode, setViewMode] = useState("grid");
  const [comments, setComments] = useState(
    () => JSON.parse(localStorage.getItem("newsComments")) || {}
  );
  const [hearts, setHearts] = useState(
    () => JSON.parse(localStorage.getItem("newsHearts")) || {}
  );
  const [readHistory, setReadHistory] = useState(
    () => JSON.parse(localStorage.getItem("readHistory")) || []
  );
  const [userProfile, setUserProfile] = useState({
    name: "Người dùng ẩn danh",
  });
  const [showPopup, setShowPopup] = useState(true);
  const itemsPerPage = 6;

  const categories = [
    "Tất cả",
    "Sản phẩm mới",
    "Khuyến mãi",
    "Xu hướng thời trang",
    "Sự kiện",
    "Mẹo và Thủ Thuật",
  ];

  useEffect(() => {
    localStorage.setItem("newsComments", JSON.stringify(comments));
    localStorage.setItem("newsHearts", JSON.stringify(hearts));
    localStorage.setItem("readHistory", JSON.stringify(readHistory));
  }, [comments, hearts, readHistory]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedNews && comments[selectedNews.id]?.length > 0) {
        toast.info("Có bình luận mới trong bài viết bạn đang xem!");
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [comments, selectedNews]);

  const getFilteredNews = () => {
    let filtered = [...newsData];
    if (selectedCategory !== "Tất cả") {
      filtered = filtered.filter((news) => news.category === selectedCategory);
    }
    filtered = filtered.filter((news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
    return filtered;
  };

  const filteredNews = getFilteredNews();
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getReadingTime = (wordCount) => Math.ceil(wordCount / 200);

  const handleShare = (news, platform) => {
    const url = `${window.location.origin}/news/${news.id}`;
    const text = encodeURIComponent(news.title);
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Đã sao chép link!");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
    }
  };

  const handleSave = (news) => {
    setSavedNews((prev) =>
      prev.includes(news.id)
        ? prev.filter((id) => id !== news.id)
        : [...prev, news.id]
    );
    toast.success(
      savedNews.includes(news.id) ? "Đã xóa khỏi yêu thích" : "Đã lưu tin tức!"
    );
  };

  const handleHeart = (newsId) => {
    setHearts((prev) => ({
      ...prev,
      [newsId]: (prev[newsId] || 0) + 1,
    }));
    // Không hiển thị thông báo "Đã thả tim!"
  };

  const handleComment = (newsId, commentText) => {
    if (!commentText.trim()) return;
    setComments((prev) => ({
      ...prev,
      [newsId]: [
        ...(prev[newsId] || []),
        {
          id: Date.now(),
          text: commentText,
          date: new Date().toLocaleString(),
          user: userProfile.name,
        },
      ],
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Đăng ký nhận tin thành công!");
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    if (!readHistory.includes(news.id)) {
      setReadHistory((prev) => [...prev, news.id]);
    }
  };

  const NewsDetail = ({ news, onBack }) => {
    const [newComment, setNewComment] = useState("");
    const relatedNews = newsData
      .filter((n) => n.category === news.category && n.id !== news.id)
      .slice(0, 3);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <Helmet>
          <title>{news.title}</title>
          <meta name="description" content={news.content.slice(0, 150)} />
        </Helmet>
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Quay lại
        </button>
        {news.media?.type === "video" ? (
          <video
            controls
            className="w-full h-64 mb-4 rounded-lg"
            src={news.media.url}
          />
        ) : (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
            loading="lazy"
          />
        )}
        <h2 className={`text-2xl font-bold mb-2 dark:text-white ${fontSize}`}>
          {news.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center">
          {news.date} | {news.category} | <FiClock className="ml-1 mr-1" />{" "}
          {getReadingTime(news.wordCount)} phút đọc
        </p>
        <p className={`text-gray-800 dark:text-gray-200 ${fontSize}`}>
          {news.content}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <FiHeart
            className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-600 transition-colors"
            size={20}
            onClick={() => handleHeart(news.id)}
          />
          <span className="text-gray-600 dark:text-gray-300">
            {hearts[news.id] || 0} lượt thả tim
          </span>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold dark:text-white">Tags:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {news.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold dark:text-white">Bình luận:</h4>
          <div className="mt-2 space-y-3">
            {(comments[news.id] || []).map((comment) => (
              <div
                key={comment.id}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>{comment.user}:</strong> {comment.text}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {comment.date}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            />
            <button
              onClick={() => {
                handleComment(news.id, newComment);
                setNewComment("");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Gửi
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold dark:text-white">Tin tức liên quan:</h4>
          <div className="mt-2 space-y-2">
            {relatedNews.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer text-blue-500 hover:underline transition-colors"
                onClick={() => setSelectedNews(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const PersistentPopup = () => {
    return (
      <div
        className={`fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg p-4 flex items-center justify-between z-50 ${
          showPopup ? "block" : "hidden"
        }`}
      >
        <div>
          <h3 className="text-lg font-semibold dark:text-white">
            Sale cuối mùa giảm giá lên đến 50%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            2025-03-11 | Khuyến mãi lớn cuối mùa với nhiều sản phẩm giảm giá
            sâu, cơ hội không thể bỏ lỡ...
          </p>
          <button className="mt-2 px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
            Tìm hiểu thêm
          </button>
        </div>
        <button
          onClick={() => setShowPopup(false)}
          className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      } pt-16`}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      {showPopup && <PersistentPopup />}

      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-40 transition-shadow duration-300">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              size={20}
            />
          </div>
          <select
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Mới nhất</option>
            <option value="date-asc">Cũ nhất</option>
            <option value="title">Theo tiêu đề</option>
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? "Sáng" : "Tối"}
          </button>
          <select
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="text-sm">Nhỏ</option>
            <option value="text-base">Trung bình</option>
            <option value="text-lg">Lớn</option>
          </select>
          <div className="flex gap-2">
            <FiGrid
              className={`cursor-pointer ${
                viewMode === "grid" ? "text-red-500" : ""
              } hover:text-red-500 transition-colors`}
              size={20}
              onClick={() => setViewMode("grid")}
            />
            <FiList
              className={`cursor-pointer ${
                viewMode === "list" ? "text-red-500" : ""
              } hover:text-red-500 transition-colors`}
              size={20}
              onClick={() => setViewMode("list")}
            />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-8">
        {selectedNews ? (
          <NewsDetail
            news={selectedNews}
            onBack={() => setSelectedNews(null)}
          />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                <p className="mt-2 dark:text-white">Đang tải tin tức...</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-6"
                }
              >
                {paginatedNews.map((news) => (
                  <div
                    key={news.id}
                    className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleNewsClick(news)}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                    <h3
                      className={`text-xl font-semibold text-gray-800 dark:text-white ${fontSize}`}
                    >
                      {news.title}
                    </h3>
                    <p
                      className={`text-gray-600 dark:text-gray-300 mt-2 ${fontSize}`}
                    >
                      {news.content.slice(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {news.date} | <FiClock className="ml-1 mr-1" />{" "}
                        {getReadingTime(news.wordCount)} phút
                      </span>
                      <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FiShare2
                          className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(news, "copy");
                          }}
                        />
                        <FiStar
                          className={`cursor-pointer ${
                            savedNews.includes(news.id)
                              ? "text-yellow-500"
                              : "text-gray-500 dark:text-gray-400 hover:text-yellow-500"
                          } transition-colors`}
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(news);
                          }}
                        />
                        <FiMessageSquare
                          className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                          size={20}
                        />
                        <FiHeart
                          className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-600 transition-colors"
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHeart(news.id);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {hearts[news.id] || 0} lượt thả tim |{" "}
                      {(comments[news.id] || []).length} bình luận
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredNews.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Trang trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      currentPage === i + 1
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Trang sau
                </button>
              </div>
            )}

            <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold dark:text-white mb-4">
                Lịch sử đọc
              </h3>
              {readHistory.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {readHistory.map((id) => {
                    const news = newsData.find((n) => n.id === id);
                    return news ? (
                      <li
                        key={id}
                        className="text-blue-500 hover:underline cursor-pointer transition-colors"
                        onClick={() => setSelectedNews(news)}
                      >
                        {news.title}
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Chưa có tin tức nào được đọc.
                </p>
              )}
            </div>

            <form
              onSubmit={handleSubscribe}
              className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-semibold dark:text-white">
                Đăng ký nhận tin tức
              </h3>
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="mt-4 px-4 py-2 w-full max-w-md rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                required
              />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
