import { useEffect, useState, lazy, Suspense } from "react";
import { FaSearch, FaPlus, FaMinus, FaTimes } from "react-icons/fa";

// Component LazyImage tích hợp sẵn
const LazyImage = ({ src, alt, className, placeholder }) => {
  const [imageSrc, setImageSrc] = useState(placeholder || "/placeholder.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
    img.onerror = () => setImageSrc(placeholder || "/placeholder.jpg");
  }, [src, placeholder]);

  return <img src={imageSrc} alt={alt} className={className} loading="lazy" />;
};

const colorMap = {
  đen: "#000000",
  trắng: "#FFFFFF",
  "xanh đen": "#00008B",
  "vàng trắng": "#FFFFE0",
};

// Cache cho API
const cache = new Map();

// Mock data fallback
const mockProducts = [
  {
    _id: "1",
    name: "Sample Kid Shoe",
    price: 50,
    img: "/sample-shoe.jpg",
    stock: 10,
    colors: ["đen", "trắng"],
    sizes: ["S", "M", "L"],
    description: "A sample shoe for kids.",
  },
  {
    _id: "2",
    name: "Another Kid Shoe",
    price: 60,
    img: "/another-shoe.jpg",
    stock: 5,
    colors: ["xanh đen", "vàng trắng"],
    sizes: ["M", "L"],
    description: "Another sample shoe for kids.",
  },
];

const KidsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const productsPerPage = 8;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm fetch với retry và fallback
  const fetchProducts = async (retries = 3) => {
    const url = "https://ngochieuwedding.io.vn/api/su/product?category=kids";
    if (cache.has(url)) {
      setProducts(cache.get(url));
      setFilteredProducts(cache.get(url));
      return;
    }

    setIsLoading(true);
    setError(null);

    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) throw new Error("Không thể tải dữ liệu sản phẩm");
        const data = await res.json();
        if (!data?.data) throw new Error("Dữ liệu trả về không hợp lệ");
        cache.set(url, data.data);
        setProducts(data.data);
        setFilteredProducts(data.data);
        break;
      } catch (err) {
        if (i === retries - 1) {
          setError("Không thể tải sản phẩm. Sử dụng dữ liệu mẫu.");
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
          console.error("API Error:", err);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    setSearchTerm(term);
    setCurrentPage(1);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);

    if (filtered.length === 0 && term) {
      setNotification("Không tìm thấy sản phẩm phù hợp.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Mở popup chi tiết sản phẩm
  const openPopup = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedColor(product.colors[0] || "");
    setSelectedSize(null);
  };

  // Đóng popup
  const closePopup = () => setSelectedProduct(null);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setNotification("Vui lòng chọn màu sắc và kích thước!");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (quantity > selectedProduct.stock) {
      setNotification("Số lượng vượt quá tồn kho!");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const newItem = {
      id: selectedProduct._id,
      name: selectedProduct.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: selectedProduct.price,
      image: selectedProduct.img,
    };

    console.log("Thêm vào giỏ hàng:", newItem);
    setNotification("Đã thêm sản phẩm vào giỏ hàng!");
    setTimeout(() => setNotification(null), 3000);
    closePopup();
  };

  // Tính toán phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div
      className="p-6 bg-gray-50 min-h-screen"
      role="main"
      aria-label="Kids Products Page"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Kids' Shoes
      </h2>

      {/* Thông báo */}
      {notification && (
        <div
          className="fixed top-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg z-50"
          role="alert"
        >
          {notification}
        </div>
      )}

      {/* Ô tìm kiếm */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search products"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Hiển thị lỗi, loading hoặc sản phẩm */}
      {error ? (
        <p className="text-center text-red-500 text-lg" role="alert">
          {error}
        </p>
      ) : isLoading ? (
        <div
          className="flex justify-center items-center h-64"
          aria-label="Loading products"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <span className="ml-4 text-gray-600 text-lg">
            Loading products...
          </span>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              onClick={() => openPopup(product)}
              role="button"
              tabIndex={0}
              aria-label={`View ${product.name}`}
            >
              <Suspense
                fallback={
                  <div className="w-full h-56 bg-gray-200 rounded-lg" />
                }
              >
                <LazyImage
                  src={product.img}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-lg mb-3"
                  placeholder={<img src="/placeholder.jpg" alt="Placeholder" />}
                />
              </Suspense>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-red-600 font-bold text-xl">
                ${product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No products found</p>
      )}

      {/* Phân trang */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-5 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            } transition duration-200`}
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className={`px-5 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            } transition duration-200`}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      )}

      {/* Popup chi tiết sản phẩm */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
              aria-label="Close popup"
            >
              <FaTimes size={20} />
            </button>

            <Suspense
              fallback={<div className="w-full h-64 bg-gray-200 rounded-lg" />}
            >
              <LazyImage
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
                placeholder={<img src="/placeholder.jpg" alt="Placeholder" />}
              />
            </Suspense>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-red-600 font-bold text-xl mb-3">
              ${selectedProduct.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">
              {selectedProduct.description || "No description available"}
            </p>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Stock: </span>
              <span
                className={`text-lg ${
                  selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {selectedProduct.stock > 0
                  ? `${selectedProduct.stock} available`
                  : "Out of stock"}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Color:</span>
              <div className="flex gap-3 mt-2">
                {selectedProduct.colors.map((color) => {
                  const colorCode = colorMap[color] || "#ccc";
                  return (
                    <div
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                        selectedColor === color
                          ? "border-blue-500 scale-110"
                          : "border-gray-300"
                      } transform transition-all duration-200`}
                      style={{ backgroundColor: colorCode }}
                      onClick={() => setSelectedColor(color)}
                      role="button"
                      aria-label={`Select ${color}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Size:</span>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-2 border rounded-lg font-medium ${
                      selectedSize === size
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    } transition duration-200`}
                    onClick={() => setSelectedSize(size)}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                disabled={selectedProduct.stock === 0}
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <span className="px-6 py-2 bg-gray-100 rounded-lg font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev < selectedProduct.stock ? prev + 1 : prev
                  )
                }
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                disabled={
                  selectedProduct.stock === 0 ||
                  quantity >= selectedProduct.stock
                }
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                selectedProduct.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={selectedProduct.stock === 0}
              aria-label="Add to cart"
            >
              {selectedProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsPage;
