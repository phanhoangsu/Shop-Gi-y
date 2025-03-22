/**
 * Component quản lý tin tức
 * Chức năng:
 * - Thêm/sửa/xóa tin tức
 * - Upload hình ảnh thumbnail
 * - Quản lý tags
 * - Xem danh sách tin tức
 * - Xóa nhiều tin tức cùng lúc
 */
import React, { useState, useEffect } from "react";

function NewsForm() {
  // State quản lý form tin tức
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    description: "",
    body: "",
    tags: [],
  });

  // State quản lý danh sách và trạng thái
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState("add"); // 'add' hoặc 'edit'
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch danh sách tin tức khi component mount
  useEffect(() => {
    fetchNews();
  }, []);

  /**
   * Fetch danh sách tin tức từ API
   * Xử lý các trường hợp response khác nhau
   */
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://ngochieuwedding.io.vn/api/su/news");
      const data = await response.json();
      if (Array.isArray(data)) {
        setNewsList(data);
      } else if (data.data && Array.isArray(data.data)) {
        setNewsList(data.data);
      } else {
        setNewsList([]);
        console.error("Dữ liệu không đúng định dạng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      setNewsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xử lý thay đổi input form
   * Cập nhật state formData
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Xử lý thay đổi tags
   * Chuyển đổi chuỗi tags thành mảng
   * Loại bỏ khoảng trắng và tags rỗng
   */
  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  /**
   * Format nội dung bài viết
   * - Thay thế \n bằng xuống dòng thật
   * - Gộp nhiều dòng trống
   * - Xóa khoảng trắng thừa
   */
  const formatContent = (content) => {
    if (!content) return "";
    return content
      .replace(/\\n/g, "\n") // Thay thế \n bằng xuống dòng thật
      .replace(/\n\n+/g, "\n\n") // Gộp nhiều dòng trống thành 2 dòng
      .trim(); // Xóa khoảng trắng thừa
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedData = {
        ...formData,
        body: formatContent(formData.body),
      };

      const url = "https://ngochieuwedding.io.vn/api/su/news";
      const method = currentAction === "add" ? "POST" : "PUT";
      const finalUrl =
        currentAction === "edit" ? `${url}/${formData._id}` : url;

      const response = await fetch(finalUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        alert(
          currentAction === "add"
            ? "Thêm tin tức thành công!"
            : "Cập nhật tin tức thành công!"
        );
        handleReset();
        fetchNews();
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      alert("Có lỗi xảy ra: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý xóa nhiều
  const handleBulkDelete = async () => {
    if (!selectedItems.length) return;

    if (
      window.confirm(
        `Bạn có chắc muốn xóa ${selectedItems.length} tin tức đã chọn?`
      )
    ) {
      setIsLoading(true);
      try {
        await Promise.all(
          selectedItems.map((id) =>
            fetch(`https://ngochieuwedding.io.vn/api/su/news/${id}`, {
              method: "DELETE",
            })
          )
        );
        alert("Xóa thành công!");
        setSelectedItems([]);
        fetchNews();
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: "",
      thumbnail: "",
      description: "",
      body: "",
      tags: [],
    });
    setCurrentAction("add");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý tin tức
              </h1>
              <p className="mt-2 text-gray-600">
                Thêm, sửa và quản lý các bài viết tin tức của bạn
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {currentAction === "add" ? "Thêm mới" : "Đang chỉnh sửa"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100"
            >
              {/* Basic Info Section */}
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Thông tin cơ bản
                </h2>
                <div className="space-y-6">
                  {/* Tiêu đề */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                      placeholder="Nhập tiêu đề bài viết..."
                      required
                    />
                  </div>

                  {/* Mô tả */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white resize-none"
                      rows="3"
                      placeholder="Nhập mô tả ngắn về bài viết..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Nội dung
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung HTML <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="body"
                      value={formatContent(formData.body)}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white font-mono text-sm"
                      rows="12"
                      placeholder="Nhập nội dung HTML của bài viết..."
                      required
                    />
                    <p className="mt-2 text-sm text-gray-500 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Hỗ trợ định dạng HTML
                    </p>
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Hình ảnh & Tags
                </h2>
                <div className="space-y-6">
                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ảnh thumbnail <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-blue-400 transition-colors duration-200">
                      <div className="space-y-2 text-center">
                        <div className="mx-auto h-24 w-24 text-gray-400">
                          {formData.thumbnail ? (
                            <img
                              src={formData.thumbnail}
                              alt="Preview"
                              className="h-24 w-24 object-cover rounded-lg shadow-sm"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/96?text=No+Image";
                                e.target.onerror = null;
                              }}
                            />
                          ) : (
                            <svg
                              className="h-24 w-24"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 48 48"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex text-sm text-gray-600">
                          <input
                            type="text"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                            placeholder="Nhập URL ảnh thumbnail..."
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                      placeholder="Nhập tags, cách nhau bằng dấu phẩy..."
                    />
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 bg-gray-50 rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Làm mới
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {currentAction === "add" ? "Thêm mới" : "Cập nhật"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Xem trước
              </h2>
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-full aspect-video object-cover rounded-lg shadow-sm mb-4"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x225?text=No+Image";
                    e.target.onerror = null;
                  }}
                />
              )}
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {formData.title || "Chưa có tiêu đề"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {formData.description || "Chưa có mô tả"}
              </p>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* News List Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Danh sách tin tức
              </h2>
              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 focus:ring-4 focus:ring-red-500/50 transition-all duration-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Xóa ({selectedItems.length})
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedItems.length === newsList.length}
                      onChange={() => {
                        if (selectedItems.length === newsList.length) {
                          setSelectedItems([]);
                        } else {
                          setSelectedItems(newsList.map((news) => news._id));
                        }
                      }}
                    />
                  </th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">
                    Tiêu đề
                  </th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">
                    Mô tả
                  </th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">
                    Tags
                  </th>
                  <th className="py-4 px-6 text-right font-medium text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-8">
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-8 w-8 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ) : newsList && newsList.length > 0 ? (
                  newsList.map((news) => (
                    <tr key={news._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedItems.includes(news._id)}
                          onChange={() => {
                            setSelectedItems((prev) =>
                              prev.includes(news._id)
                                ? prev.filter((id) => id !== news._id)
                                : [...prev, news._id]
                            );
                          }}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={news.thumbnail}
                            alt={news.title}
                            className="w-16 h-12 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/64x48?text=No+Image";
                              e.target.onerror = null;
                            }}
                          />
                          <span className="font-medium text-gray-900">
                            {news.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-600 line-clamp-2">
                          {news.description}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {news.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setFormData(news);
                              setCurrentAction("edit");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Bạn có chắc muốn xóa tin tức này?"
                                )
                              ) {
                                fetch(
                                  `https://ngochieuwedding.io.vn/api/su/news/${news._id}`,
                                  {
                                    method: "DELETE",
                                  }
                                )
                                  .then(() => {
                                    alert("Xóa thành công!");
                                    fetchNews();
                                  })
                                  .catch(() => alert("Có lỗi xảy ra khi xóa!"));
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8">
                      <div className="text-center text-gray-500">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="mt-2">Chưa có tin tức nào</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsForm;
