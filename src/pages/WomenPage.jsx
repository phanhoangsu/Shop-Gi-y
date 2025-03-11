import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaMinus, FaTimes } from "react-icons/fa";

const colorMap = {
  đen: "#000000",
  trắng: "#FFFFFF",
  "xanh đen": "#00008B",
  "vàng trắng": "#FFFFE0",
};

const WomenPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 8;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://ngochieuwedding.io.vn/api/su/product?category=nu"
        );
        const data = await res.json();
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  // Mở popup chi tiết sản phẩm
  const openPopup = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedColor(product.colors[0] || "");
    setSelectedSize(null);
  };

  // Đóng popup
  const closePopup = () => {
    setSelectedProduct(null);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích thước!");
      return;
    }

    if (quantity > selectedProduct.stock) {
      alert("Số lượng vượt quá tồn kho!");
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
    closePopup();
  };

  // Tính toán sản phẩm hiển thị cho từng trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Women's Shoes
      </h2>

      {/* Ô tìm kiếm */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Hiển thị trạng thái loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
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
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg mb-3"
              />
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

      {/* PHÂN TRANG */}
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
          >
            Next →
          </button>
        </div>
      )}

      {/* Popup hiển thị chi tiết sản phẩm */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
            >
              <FaTimes size={20} />
            </button>

            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-red-600 font-bold text-xl mb-3">
              ${selectedProduct.price.toLocaleString()}
            </p>

            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Thêm field Stock */}
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
            >
              {selectedProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenPage;
