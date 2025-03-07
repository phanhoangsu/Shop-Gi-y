import React, { useState } from "react";
import { IoMdCloseCircleOutline, IoMdSearch } from "react-icons/io";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ManPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const itemsPerPage = 4;

  const sampleProducts = [
    {
      id: "01",
      name: "Giày Lecos",
      price: "1.200.000đ",
      image:
        "https://bizweb.dktcdn.net/100/527/490/products/giay-nam-cao-cap-da-that-lecos-lg8-2-1731770099469.jpg?v=1731771540970",
      colors: ["Đỏ", "Trắng"],
      sizes: [40, 41, 42, 43],
      description:
        "Giày da cao cấp Lecos, thiết kế sang trọng, phù hợp với các dịp quan trọng.",
    },
    {
      id: "02",
      name: "Giày Sneaker",
      price: "950.000đ",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyx1zah6468x27",
      colors: ["Xanh", "Đen"],
      sizes: [40, 41, 42, 43],
      description:
        "Sneaker phong cách trẻ trung, nhẹ nhàng, lý tưởng cho đi học và dạo phố.",
    },
    {
      id: "03",
      name: "Giày Thể Thao Cao Cấp",
      price: "1.500.000đ",
      image: "https://via.placeholder.com/150", // Thay URL hợp lệ nếu có
      colors: ["Đen", "Xám", "Trắng"],
      sizes: [40, 41, 42, 43],
      description: "Giày thể thao cao cấp với công nghệ chống trơn trượt.",
    },
    {
      id: "04",
      name: "Giày Da Nam Sang Trọng",
      price: "1.800.000đ",
      image: "https://via.placeholder.com/150", // Thay URL hợp lệ nếu có
      colors: ["Nâu", "Đen", "Xám"],
      sizes: [40, 41, 42, 43],
      description: "Giày da nam cao cấp, phong cách lịch lãm.",
    },
    {
      id: "05",
      name: "Giày Tây Lịch Lãm",
      price: "2.000.000đ",
      image: "https://via.placeholder.com/150",
      colors: ["Đen", "Nâu"],
      sizes: [40, 41, 42, 43],
      description: "Phong cách lịch lãm.",
    },
    {
      id: "06",
      name: "Giày Bốt Nam",
      price: "2.500.000đ",
      image: "https://via.placeholder.com/150",
      colors: ["Đen", "Xám"],
      sizes: [40, 41, 42, 43],
      description: "Giày bốt nam cá tính.",
    },
    {
      id: "07",
      name: "Giày Chạy Bộ",
      price: "1.000.000đ",
      image: "https://via.placeholder.com/150",
      colors: ["Xanh", "Trắng"],
      sizes: [40, 41, 42, 43],
      description: "Giày chạy bộ nhẹ, êm ái.",
    },
    {
      id: "08",
      name: "Giày Cổ Cao",
      price: "1.300.000đ",
      image: "https://via.placeholder.com/150",
      colors: ["Đen", "Đỏ"],
      sizes: [40, 41, 42, 43],
      description: "Giày cổ cao phong cách.",
    },
  ];

  const sizeChart = {
    40: { length: "25 cm", width: "9.4 cm" },
    41: { length: "25.5 cm", width: "9.6 cm" },
    42: { length: "26 cm", width: "9.8 cm" },
    43: { length: "26.5 cm", width: "10.0 cm" },
  };

  const openPopup = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors ? product.colors[0] : null);
    setSelectedSize(product.sizes ? product.sizes[0] : null);
    setQuantity(1);
  };

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAddToCart = () => {
    if (selectedProduct.sizes && !selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    setSelectedProduct(null);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Giày nam</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdSearch size={24} />
          </button>
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Tìm giày..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
            />
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="border p-2 rounded-lg cursor-pointer hover:shadow-lg"
              onClick={() => openPopup(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-red-500 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Không tìm thấy sản phẩm nào.
        </p>
      )}

      {filteredProducts.length > 0 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              } rounded`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedProduct(null)}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{selectedProduct.name}</h2>
            <p className="text-red-500 font-bold">{selectedProduct.price}</p>
            <p className="mt-2 text-gray-600">{selectedProduct.description}</p>

            {selectedProduct.colors && (
              <div className="mt-2">
                <p className="font-semibold">Màu sắc:</p>
                <div className="flex space-x-2 mt-1">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`p-2 border rounded-full ${
                        selectedColor === color ? "border-blue-500" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span
                        className={`w-4 h-4 inline-block rounded-full ${
                          color === "Trắng"
                            ? "bg-white border"
                            : `bg-${color.toLowerCase()}-500`
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.sizes && (
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Size:</p>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowSizeChart(true)}
                  >
                    Bảng số đo
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-1">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`p-2 border rounded ${
                        selectedSize === size ? "bg-blue-500 text-white" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-2">
              <p className="font-semibold">Số lượng:</p>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  className="border p-2"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="border p-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}

      {showSizeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowSizeChart(false)}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Bảng số đo</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Chiều dài</th>
                  <th className="border p-2">Chiều rộng</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(sizeChart).map(([size, measurements]) => (
                  <tr key={size}>
                    <td className="border p-2">{size}</td>
                    <td className="border p-2">{measurements.length}</td>
                    <td className="border p-2">{measurements.width}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManPage;
