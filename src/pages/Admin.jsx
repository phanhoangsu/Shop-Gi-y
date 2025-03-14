import React, { useState, useEffect, useRef } from "react";
import { FaSync, FaTrash } from "react-icons/fa";
import useApi from "../hooks/useApi";

const Admin = () => {
  const { request, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState(null);
  const availableSizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

  const [formData, setFormData] = useState({
    _id: "",
    category: "nam",
    name: "",
    stock: "",
    price: "",
    img: "",
    product_by: "su",
    colors: [],
    description: "",
    sizes: [],
  });

  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const formDataRef = useRef(formData);

  useEffect(() => {
    formDataRef.current = formData;
    console.log("Render - formData:", formData, "loading:", loading);
  }, [formData, loading]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await request("GET", "/su/product");
      console.log("Fetched products:", data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === "object" && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.warn("API returned invalid data format:", data);
        setProducts([]);
        setNotification({
          type: "error",
          message: "Dữ liệu sản phẩm không hợp lệ. Vui lòng kiểm tra API!",
        });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setNotification({
        type: "error",
        message: "Lỗi khi tải danh sách sản phẩm: " + err.message,
      });
      setProducts([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]:
          name === "colors"
            ? value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : value,
      };
      console.log("Updated formData:", updatedData);
      return updatedData;
    });
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b);
      const updatedData = { ...prev, sizes: newSizes };
      console.log("Updated formData (sizes):", updatedData);
      return updatedData;
    });
  };

  const validateForm = () => {
    if (!formData.name) return "Vui lòng nhập tên sản phẩm!";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      return "Vui lòng nhập giá sản phẩm hợp lệ (lớn hơn 0)!";
    if (!formData.img) return "Vui lòng nhập URL hình ảnh!";
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0)
      return "Vui lòng nhập số lượng tồn kho hợp lệ (lớn hơn hoặc bằng 0)!";
    if (!formData.description) return "Vui lòng nhập mô tả sản phẩm!";
    if (formData.colors.length === 0)
      return "Vui lòng nhập ít nhất một màu sắc!";
    if (formData.sizes.length === 0)
      return "Vui lòng chọn ít nhất một kích thước!";
    return null;
  };

  const handleSubmit = async (action) => {
    console.log(
      "handleSubmit called with action:",
      action,
      "formData:",
      formDataRef.current
    );
    if (action === "update" && !formDataRef.current._id) {
      setNotification({
        type: "error",
        message: "Vui lòng chọn sản phẩm để cập nhật!",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const validationError = validateForm();
    if (validationError && (action === "add" || action === "update")) {
      setNotification({ type: "error", message: validationError });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const submitData = {
      ...formDataRef.current,
      stock: Number(formDataRef.current.stock),
      price: Number(formDataRef.current.price),
    };

    try {
      console.log("Submitting:", { action, data: submitData });
      switch (action) {
        case "add":
          await request("POST", "/su/product", {
            ...submitData,
            createdAt: Date.now(),
          });
          setNotification({
            type: "success",
            message: "Thêm sản phẩm thành công!",
          });
          break;
        case "update":
          await request(
            "PUT",
            `/su/product/${formDataRef.current._id}`,
            submitData
          );
          setNotification({
            type: "success",
            message: "Cập nhật sản phẩm thành công!",
          });
          break;
        case "delete":
          if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            await request("DELETE", `/su/product/${formDataRef.current._id}`);
            setNotification({
              type: "success",
              message: "Xóa sản phẩm thành công!",
            });
          } else {
            return;
          }
          break;
        default:
          throw new Error("Hành động không hợp lệ");
      }
      await fetchProducts();
      handleReset();
    } catch (err) {
      console.error("Submit error:", err);
      setNotification({
        type: "error",
        message: `Lỗi: ${err.message || "Không thể thực hiện hành động"}`,
      });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
    const updatedFormData = {
      _id: product._id || "",
      category: product.category || "nam",
      name: product.name || "",
      stock: String(product.stock || ""),
      price: String(product.price || ""),
      img: product.img || "",
      product_by: product.product_by || "su",
      colors: product.colors || [],
      description: product.description || "",
      sizes: product.sizes ? product.sizes.sort((a, b) => a - b) : [],
    };
    setFormData(updatedFormData);
    console.log("formData after set:", updatedFormData);
  };

  const handleReset = () => {
    const resetData = {
      _id: "",
      category: "nam",
      name: "",
      stock: "",
      price: "",
      img: "",
      product_by: "su",
      colors: [],
      description: "",
      sizes: [],
    };
    setFormData(resetData);
    console.log("formData after reset:", resetData);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = filteredProducts.map((p) => p._id);
      setSelectedProducts(new Set(allProductIds));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.size === 0) {
      setNotification({
        type: "error",
        message: "Vui lòng chọn ít nhất một sản phẩm để xóa!",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedProducts.size} sản phẩm?`
      )
    ) {
      try {
        const ids = Array.from(selectedProducts);
        await request("POST", "/su/product/batch-delete", { ids });
        setNotification({
          type: "success",
          message: `Đã xóa ${selectedProducts.size} sản phẩm thành công!`,
        });
        await fetchProducts();
        setSelectedProducts(new Set());
      } catch (err) {
        console.error("Error deleting selected products:", err);
        setNotification({
          type: "error",
          message: "Lỗi khi xóa sản phẩm: " + err.message,
        });
      } finally {
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Quản lý Sản phẩm
      </h2>

      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg animate-in fade-in-0 duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="kids">Trẻ em</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="stock"
            placeholder="Số lượng"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type="number"
              name="price"
              placeholder="Giá ($)"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
          </div>
          <input
            type="text"
            name="img"
            placeholder="URL hình ảnh"
            value={formData.img}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="colors"
            placeholder="Màu sắc (cách nhau bằng dấu phẩy)"
            value={formData.colors.join(", ")}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label className="block text-gray-700 mb-2">Chọn kích cỡ:</label>
            <div className="grid grid-cols-5 gap-2 max-h-24 overflow-y-auto border p-2 rounded-md">
              {availableSizes.map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
            <div className="mt-2 text-gray-600">
              <span className="font-semibold">Kích cỡ đã chọn: </span>
              {formData.sizes.length > 0
                ? formData.sizes.join(", ")
                : "Chưa chọn kích cỡ"}
            </div>
          </div>
          <textarea
            name="description"
            placeholder="Mô tả sản phẩm"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            rows="3"
          />
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => handleSubmit("add")}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang thêm..." : "Thêm"}
          </button>
          <button
            onClick={() => handleSubmit("update")}
            disabled={loading || !formDataRef.current._id}
            className={`px-4 py-2 rounded-md text-white ${
              loading || !formDataRef.current._id
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <button
            onClick={() => handleSubmit("delete")}
            disabled={loading || !formDataRef.current._id}
            className={`px-4 py-2 rounded-md text-white ${
              loading || !formDataRef.current._id
                ? "bg-gray-400"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Reset
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Danh sách sản phẩm
      </h2>
      <div className="mb-4 flex items-center space-x-2">
        <label className="text-gray-700">Lọc theo danh mục:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả</option>
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
          <option value="kids">Trẻ em</option>
        </select>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          <FaSync />
          <span>Làm mới</span>
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedProducts.size === 0 || loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
            selectedProducts.size === 0 || loading
              ? "bg-gray-400"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <FaTrash />
          <span>{loading ? "Đang xóa..." : "Xóa chọn"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          <>
            <div className="col-span-full mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedProducts.size === filteredProducts.length}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                Chọn tất cả
              </label>
            </div>
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.has(product._id)}
                  onChange={() => handleSelectProduct(product._id)}
                  className="absolute top-4 left-4"
                />
                <img
                  src={product.img || "https://via.placeholder.com/150"}
                  alt={product.name || "Product"}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <p className="text-lg font-semibold text-gray-800">
                  {product.name || "Unknown Product"}
                </p>
                <p className="text-gray-600">Danh mục: {product.category}</p>
                <p className="text-gray-600">Giá: ${product.price || "N/A"}</p>
                <p className="text-gray-600">
                  Số lượng: {product.stock || "N/A"}
                </p>
                <p className="text-gray-600">
                  Màu sắc: {(product.colors || []).join(", ")}
                </p>
                <p className="text-gray-600">
                  Kích cỡ:{" "}
                  {(product.sizes || []).sort((a, b) => a - b).join(", ")}
                </p>
                <button
                  onClick={() => handleEdit(product)}
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Chỉnh sửa
                </button>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-3">
            Không có sản phẩm nào trong danh mục này.
          </p>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Admin;
