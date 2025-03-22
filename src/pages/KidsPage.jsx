/**
 * KidsPage Component
 * 
 * Chức năng chính:
 * - Hiển thị và quản lý trang sản phẩm trẻ em
 * - Filter và sắp xếp sản phẩm
 * - Xử lý giỏ hàng
 * 
 * Logic chính:
 * 1. State Management:
 *    - productsData: Dữ liệu sản phẩm
 *    - filters: Size, color, price range
 *    - cart: Giỏ hàng
 *    - UI states: view mode, sort
 * 
 * 2. Features:
 *    - Product filtering
 *    - Add to cart
 *    - Quick view
 *    - Size guide
 *    - Wishlist
 */

import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaTimes,
  FaHeart,
  FaFilter,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const KidsPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const productsPerPage = 8;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartNotification, setCartNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://ngochieuwedding.io.vn/api/su/product?category=kids"
        );
        const data = await res.json();
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color))
      );
    }
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, priceRange, selectedColors, selectedSizes, sortBy]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const toggleWishlist = (product) => {
    const newWishlist = wishlist.some((item) => item._id === product._id)
      ? wishlist.filter((item) => item._id !== product._id)
      : [...wishlist, product];
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const openPopup = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedColor(product.colors[0] || "");
    setSelectedSize(product.sizes[0] || null);
  };

  const closePopup = () => setSelectedProduct(null);

  const handleAddToCart = (product = selectedProduct) => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích thước!");
      return;
    }
    if (quantity > product.stock) {
      alert("Số lượng vượt quá tồn kho!");
      return;
    }

    const newItem = {
      id: product._id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: product.price,
      image: product.img,
      stock: product.stock,
    };

    addToCart(newItem);
    setCartNotification(true);
    setTimeout(() => {
      setCartNotification(false);
      navigate("/cart");
    }, 2000);
    closePopup();
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const uniqueColors = [...new Set(products.flatMap((p) => p.colors || []))];
  const uniqueSizes = [...new Set(products.flatMap((p) => p.sizes || []))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Children's Shoes</title>
        <meta
          name="description"
          content="Explore our collection of children's shoes"
        />
      </Helmet>

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Children's Shoes
      </h2>

      {/* Search Bar and Filter Toggle Button */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          <FaFilter />
          <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {/* Filter Section (Collapsible) */}
      <div
        className={`mb-8 bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${
          isFilterOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full"
            />
          </div>
          <div>
            <label className="font-semibold">Colors:</label>
            <div className="flex gap-2 flex-wrap">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    selectedColors.includes(color)
                      ? "bg-black text-white border-black"
                      : "hover:border-black"
                  }`}
                  onClick={() =>
                    setSelectedColors(
                      selectedColors.includes(color)
                        ? selectedColors.filter((c) => c !== color)
                        : [...selectedColors, color]
                    )
                  }
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold">Sizes:</label>
            <div className="flex gap-2 flex-wrap">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded-lg ${
                    selectedSizes.includes(size)
                      ? "bg-blue-500 text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                  onClick={() =>
                    setSelectedSizes(
                      selectedSizes.includes(size)
                        ? selectedSizes.filter((s) => s !== size)
                        : [...selectedSizes, size]
                    )
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {cartNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in-0 duration-300">
          Added to cart successfully!
          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-green-500 px-2 py-1 rounded"
          >
            Go to Cart
          </button>
        </div>
      )}

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
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.img || "https://via.placeholder.com/150"}
                  alt={product.name || "Product"}
                  className={`w-full h-56 object-cover rounded-lg mb-3 transition-transform duration-300 ${
                    hoveredProduct === product._id ? "scale-110" : ""
                  }`}
                  loading="lazy"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPopup(product);
                  }}
                  className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-2 right-2 text-2xl ${
                    wishlist.some((item) => item._id === product._id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
              <h3
                className="text-lg font-semibold text-gray-800 truncate"
                onClick={() => openPopup(product)}
              >
                {product.name || "Unknown Product"}
              </h3>
              <p className="text-red-600 font-bold text-xl">
                $
                {product.price != null ? product.price.toLocaleString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No products found</p>
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
            }`}
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
            }`}
          >
            Next →
          </button>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative animate-in fade-in-0 slide-in-from-bottom-10 duration-300">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
            >
              <FaTimes size={20} />
            </button>

            <img
              src={selectedProduct.img || "https://via.placeholder.com/150"}
              alt={selectedProduct.name || "Product"}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.name || "Unknown Product"}
            </h3>
            <p className="text-red-600 font-bold text-xl mb-3">
              $
              {selectedProduct.price != null
                ? selectedProduct.price.toLocaleString()
                : "N/A"}
            </p>
            <p className="text-gray-600 mb-4 text-base leading-relaxed">
              {selectedProduct.description || "No description available."}
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

            {/* Updated Color Section (Text-based) */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Màu sắc:</h3>
              <div className="flex flex-wrap gap-2">
                {(selectedProduct.colors || []).length > 0 ? (
                  selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-all ${
                        selectedColor === color
                          ? "bg-black text-white border-black"
                          : "hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))
                ) : (
                  <span className="text-gray-500">No colors available</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Size:</span>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {(selectedProduct.sizes || []).length > 0 ? (
                  selectedProduct.sizes.map((size) => (
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
                  ))
                ) : (
                  <span className="text-gray-500">No sizes available</span>
                )}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50"
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
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50"
                disabled={
                  selectedProduct.stock === 0 ||
                  quantity >= selectedProduct.stock
                }
              >
                <FaPlus />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(selectedProduct)}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                selectedProduct.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={selectedProduct.stock === 0}
            >
              {selectedProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            {selectedProduct.stock === 0 && (
              <button
                onClick={() =>
                  alert(
                    "You will be notified when this product is back in stock!"
                  )
                }
                className="w-full py-3 bg-yellow-500 text-white rounded-lg mt-2 hover:bg-yellow-600 transition duration-200"
              >
                Notify Me When Available
              </button>
            )}

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Related Products</h4>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {products
                  .filter((p) => p._id !== selectedProduct._id)
                  .slice(0, 3)
                  .map((product) => (
                    <img
                      key={product._id}
                      src={product.img || "https://via.placeholder.com/150"}
                      alt={product.name || "Product"}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-200"
                      onClick={() => openPopup(product)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsPage;
