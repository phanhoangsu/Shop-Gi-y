import React, { useState } from "react";
import { IoMdCloseCircleOutline, IoMdSearch } from "react-icons/io";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const KidsPage = () => {
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
      id: "0001",
      name: "Giày thể thao trẻ em",
      price: "1.200.000đ",
      image:
        "https://phuongstore.vn/uploads/images/2023/giay-the-thao-tre-em-tu-4-12-tuoi.jpg",
      colors: ["Xanh", "Đỏ", "Trắng"],
      sizes: [28, 29, 30, 31, 32, 33],
      description:
        "Giày thể thao trẻ em năng động, phù hợp cho các hoạt động ngoài trời.",
    },
    {
      id: "0002",
      name: "Giày sneaker trẻ em",
      price: "950.000đ",
      image:
        "https://product.hstatic.net/1000011840/product/giay-trang-sneaker-cho-be-gh87-5_b94398fdb35e49f08025e39bd4c230a5_1024x1024.jpg",
      colors: ["Trắng", "Đen"],
      sizes: [25, 26, 27, 28, 29],
      description:
        "Sneaker trẻ em phong cách, nhẹ nhàng, lý tưởng cho đi học và vui chơi.",
    },
    {
      id: "0003",
      name: "Giày tập đi trẻ em",
      price: "800.000đ",
      image:
        "https://product.hstatic.net/1000230642/product/dsc_0022_08d3905336cc45139bef880b73b8facd_grande.jpg",
      colors: ["Hồng", "Xanh dương"],
      sizes: [20, 21, 22, 23, 24],
      description:
        "Giày tập đi dành cho bé mới bắt đầu, đế mềm mại, chống trơn trượt.",
    },
    {
      id: "0004",
      name: "Giày trẻ em NEXT",
      price: "600.000đ",
      image: "https://pos.nvncdn.com/54f46e-27401/ps/20241026_7hLHAhmCEE.jpeg",
      colors: ["Xám", "Nâu"],
      sizes: [26, 27, 28, 29, 30],
      description: "Giày NEXT trẻ em thời trang, phù hợp cho các dịp đặc biệt.",
    },
    {
      id: "0005",
      name: "Giày lưới trẻ em",
      price: "1.100.000đ",
      image:
        "https://mebi.vn/wp-content/uploads/2023/04/giay-luoi-cho-be-tongkhothienan-7.jpg",
      colors: ["Xanh lá", "Đen"],
      sizes: [27, 28, 29, 30, 31],
      description:
        "Giày lưới thoáng khí, nhẹ nhàng, phù hợp cho mùa hè. Thiết kế linh hoạt, giúp bé thoải mái vận động cả ngày.",
    },
    {
      id: "0006",
      name: "Giày nhựa trẻ em",
      price: "1.500.000đ",
      image:
        "https://piget.vn/wp-content/uploads/2023/06/size-giay-tre-em-o-cac-noi.jpg",
      colors: ["Vàng", "Xanh dương"],
      sizes: [23, 24, 25, 26, 27],
      description:
        "Giày nhựa trẻ em cao cấp, chống nước, dễ vệ sinh. Thích hợp cho các hoạt động ngoài trời và ngày mưa.",
    },
  ];

  const openPopup = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors ? product.colors[0] : null);
    setSelectedSize(product.sizes ? product.sizes[0] : null);
    setQuantity(1);
  };

  const sizeChart = {
    20: { length: "12.5 cm", width: "5.5 cm" },
    21: { length: "13.0 cm", width: "5.7 cm" },
    22: { length: "13.5 cm", width: "5.9 cm" },
    23: { length: "14.0 cm", width: "6.0 cm" },
    24: { length: "14.5 cm", width: "6.2 cm" },
    25: { length: "15.0 cm", width: "6.4 cm" },
    26: { length: "15.5 cm", width: "6.6 cm" },
    27: { length: "16.0 cm", width: "6.8 cm" },
    28: { length: "16.5 cm", width: "7.0 cm" },
    29: { length: "17.0 cm", width: "7.2 cm" },
    30: { length: "17.5 cm", width: "7.4 cm" },
    31: { length: "18.0 cm", width: "7.6 cm" },
    32: { length: "18.5 cm", width: "7.8 cm" },
    33: { length: "19.0 cm", width: "8.0 cm" },
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
        <h1 className="text-2xl font-bold">Giày trẻ em</h1>
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

export default KidsPage;
