import React, { useState, useEffect } from "react";

function NewsForm() {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    description: "",
    body: "",
    tags: [],
  });
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState("add"); // 'add' hoặc 'edit'
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch danh sách tin tức
  useEffect(() => {
    fetchNews();
  }, []);

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

  // Xử lý input thông thường
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý tags
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

  // Thêm hàm xử lý nội dung
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
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Ảnh thumbnail</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="mt-2 max-w-xs rounded"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Nội dung (HTML)</label>
          <textarea
            name="body"
            value={formatContent(formData.body)}
            onChange={handleInputChange}
            className="w-full p-2 border rounded font-mono"
            rows="10"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Bạn có thể nhập mã HTML vào đây
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập tags, cách nhau bằng dấu phẩy"
          />
          <p className="text-sm text-gray-500 mt-1">
            Gợi ý: báo chí, truyền thông, chính trị, xã hội...
          </p>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading
              ? "Đang xử lý..."
              : currentAction === "add"
              ? "Thêm mới"
              : "Cập nhật"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Làm mới
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh sách tin tức</h2>
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa ({selectedItems.length})
            </button>
          )}
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">
                <input
                  type="checkbox"
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
              <th className="border p-2">Tiêu đề</th>
              <th className="border p-2">Mô tả</th>
              <th className="border p-2">Tags</th>
              <th className="border p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : newsList && newsList.length > 0 ? (
              newsList.map((news) => (
                <tr key={news._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <input
                      type="checkbox"
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
                  <td className="border p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={news.thumbnail}
                        alt={news.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span>{news.title}</span>
                    </div>
                  </td>
                  <td className="border p-2">{news.description}</td>
                  <td className="border p-2">
                    <div className="flex flex-wrap gap-1">
                      {news.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFormData(news);
                          setCurrentAction("edit");
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm("Bạn có chắc muốn xóa tin tức này?")
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
                        className="text-red-600 hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Không có tin tức nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsForm;
