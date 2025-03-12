import { useEffect, useState, useMemo, useCallback } from "react";
import { FaSearch, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colorMap = {
  đen: "#000000",
  trắng: "#FFFFFF",
  "xanh đen": "#00008B",
  "vàng trắng": "#FFFFE0",
};

// Custom hook để lấy dữ liệu sản phẩm
const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://ngochieuwedding.io.vn/api/su/product?category=${category}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
        toast.error("Không thể tải sản phẩm. Vui lòng thử lại sau!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return { products, isLoading, error };
};

// Component hiển thị sản phẩm trong grid
const ProductCard = ({ product, onClick }) => (
  <div
    className="bg-white border border-gray-200 p-4 rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === "Enter" && onClick()}
  >
    <img
      src={product.img}
      alt={product.name}
      loading="lazy"
      className="w-full h-56 object-cover rounded-lg mb-3"
    />
    <h3 className="text-lg font-semibold text-gray-800 truncate">
      {product.name}
    </h3>
    <p className="text-red-600 font-bold text-xl">
      ${product.price.toLocaleString()}
    </p>
  </div>
);

// Component hiển thị popup chi tiết sản phẩm
const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!selectedColor || !selectedSize) {
      toast.warning("Vui lòng chọn màu sắc và kích thước!");
      return;
    }
    if (quantity > product.stock) {
      toast.warning("Số lượng vượt quá tồn kho!");
      return;
    }

    setIsAdding(true);
    await onAddToCart({ quantity, selectedColor, selectedSize });
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          <FaTimes size={20} />
        </button>

        <img
          src={product.img}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-red-600 font-bold text-xl mb-3">
          ${product.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="mb-4">
          <span className="font-semibold text-gray-700">Tồn kho: </span>
          <span
            className={`text-lg ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} sản phẩm` : "Hết hàng"}
          </span>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-700">Màu sắc:</span>
          <div className="flex gap-3 mt-2">
            {product.colors.map((color) => {
              const colorCode = colorMap[color] || "#ccc";
              return (
                <div
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer hover:scale-110 ${
                    selectedColor === color
                      ? "border-blue-500 scale-110"
                      : "border-gray-300"
                  } transform transition-all duration-200`}
                  style={{ backgroundColor: colorCode }}
                  onClick={() => setSelectedColor(color)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === "Enter" && setSelectedColor(color)
                  }
                  aria-label={`Chọn màu ${color}`}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-700">Kích thước:</span>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-2 border rounded-lg font-medium ${
                  selectedSize === size
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } transition duration-200`}
                onClick={() => setSelectedSize(size)}
                aria-label={`Chọn kích thước ${size}`}
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
            disabled={product.stock === 0}
            aria-label="Giảm số lượng"
          >
            <FaMinus />
          </button>
          <span className="px-6 py-2 bg-gray-100 rounded-lg font-semibold text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() =>
              setQuantity((prev) => (prev < product.stock ? prev + 1 : prev))
            }
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
            disabled={product.stock === 0 || quantity >= product.stock}
            aria-label="Tăng số lượng"
          >
            <FaPlus />
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={isAdding || product.stock === 0}
          aria-label="Thêm vào giỏ hàng"
          className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
            product.stock > 0 && !isAdding
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {isAdding
            ? "Đang thêm..."
            : product.stock > 0
            ? "Thêm vào giỏ"
            : "Hết hàng"}
        </button>
      </div>
    </div>
  );
};

const WomenPage = () => {
  const { products, isLoading, error } = useProducts("nu");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 8;

  // Memoized values
  const currentProducts = useMemo(() => {
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    return filteredProducts.slice(indexOfFirst, indexOfLast);
  }, [filteredProducts, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / productsPerPage),
    [filteredProducts]
  );

  // Memoized handlers
  const handleSearch = useCallback(
    (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      setCurrentPage(1);
      setFilteredProducts(
        products.filter((product) => product.name.toLowerCase().includes(term))
      );
    },
    [products]
  );

  const openPopup = useCallback((product) => setSelectedProduct(product), []);
  const closePopup = useCallback(() => setSelectedProduct(null), []);

  const handleAddToCart = useCallback(
    async ({ quantity, selectedColor, selectedSize }) => {
      const newItem = {
        id: selectedProduct._id,
        name: selectedProduct.name,
        color: selectedColor,
        size: selectedSize,
        quantity,
        price: selectedProduct.price,
        image: selectedProduct.img,
      };
      console.log("Đã thêm vào giỏ hàng:", newItem);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      closePopup();
    },
    [selectedProduct]
  );

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Giày Nữ
      </h2>

      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm sản phẩm..."
            aria-label="Tìm kiếm sản phẩm"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <span className="ml-4 text-gray-600 text-lg">
            Đang tải sản phẩm...
          </span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-16">{error}</div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => openPopup(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-16">
          <p>Không tìm thấy sản phẩm nào</p>
          <p className="mt-2">Hãy thử thay đổi từ khóa tìm kiếm</p>
        </div>
      )}

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
            aria-label="Trang trước"
          >
            ← Trước
          </button>
          <span className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-5 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            } transition duration-200`}
            aria-label="Trang sau"
          >
            Sau →
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closePopup}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default WomenPage;
