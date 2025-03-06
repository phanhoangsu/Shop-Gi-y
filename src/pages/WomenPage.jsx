import React, { useState } from "react";
import { IoMdCloseCircleOutline, IoMdSearch } from "react-icons/io";

const WomenPage = () => {
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
      id: "001",
      name: "Giày Sneaker Nữ",
      price: "1.200.000đ",
      image:
        "https://timan.vn/upload/products/082024/giay-the-thao-nu-tmsz124-cao-cap.jpg",
      colors: ["Trắng", "Hồng"],
      sizes: [35, 36, 37, 38, 39],
      description:
        "Giày sneaker nữ thời trang, phong cách năng động, phù hợp cho cả đi chơi và đi học. Chất liệu thoáng khí, đế êm nhẹ.",
    },
    {
      id: "002",
      name: "Giày Cao Gót",
      price: "900.000đ",
      image:
        "https://mediaelly.sgp1.digitaloceanspaces.com/uploads/2022/12/10225609/giay-nu-cao-cap-da-that-elly-egt196-3-2.jpg",
      colors: ["Đen", "Be"],
      sizes: [35, 36, 37, 38, 39],
      description:
        "Giày cao gót thanh lịch, phù hợp với các sự kiện quan trọng hoặc đi làm. Đế cao vừa phải, tạo cảm giác thoải mái.",
    },
    {
      id: "003",
      name: "Giày Sandal Nữ",
      price: "700.000đ",
      image:
        "https://streetstyleshop.vn/wp-content/uploads/2022/05/giay-the-thao-nu-don-gian-6.jpg",
      colors: ["Trắng", "Xanh"],
      sizes: [35, 36, 37, 38, 39],
      description:
        "Sandal nữ đơn giản, thoáng mát, thích hợp cho mùa hè. Thiết kế tối giản nhưng vẫn thời trang.",
    },
    {
      id: "004",
      name: "Giày Boot Nữ",
      price: "1.500.000đ",
      image:
        "https://giaybootnu.com/upload/images/giay-boot-nu-phong-cach-au-my-sanh-dieu-gbn165.jpg",
      colors: ["Đen", "Nâu"],
      sizes: [35, 36, 37, 38, 39],
      description:
        "Boot nữ phong cách Âu Mỹ, sang trọng và cá tính. Phù hợp với thời tiết se lạnh và các outfit mùa đông.",
    },
    {
      id: "005",
      name: "Giày Thể Thao Nữ",
      price: "1.000.000đ",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/be/69/c7/479390fd3b130863198608cf280589fc.jpg",
      colors: ["Xám", "Hồng"],
      sizes: [35, 36, 37, 38, 39],
      description:
        "Giày thể thao nữ cao cấp, hỗ trợ vận động tốt, đế chống trơn trượt. Thích hợp cho gym và chạy bộ.",
    },
    {
      id: "006",
      name: "Giày Cao Gót",
      price: "800.000đ",
      image: "https://thatlungnam.com.vn/wp-content/uploads/2019/03/1-27.jpg",
      colors: ["Đỏ", "Đen"],
      sizes: [35, 36, 37, 38, 39],
      description:
        "Giày cao gót quyến rũ, phù hợp cho các buổi tiệc tối. Chất liệu da cao cấp, đế chắc chắn.",
    },
  ];

  const openPopup = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors ? product.colors[0] : null);
    setSelectedSize(product.sizes ? product.sizes[0] : null);
    setQuantity(1);
  };

  const addToCart = () => {
    if (selectedProduct.sizes && !selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }
    console.log(
      `Thêm ${quantity} sản phẩm "${selectedProduct.name}" ${
        selectedColor ? `(Màu: ${selectedColor})` : ""
      } ${selectedSize ? `(Size: ${selectedSize})` : ""} vào giỏ hàng!`
    );
    setSelectedProduct(null);
  };

  const sizeChart = {
    35: { length: "22 cm", width: "8 cm" },
    36: { length: "22.5 cm", width: "8.2 cm" },
    37: { length: "23 cm", width: "8.4 cm" },
    38: { length: "23.5 cm", width: "8.6 cm" },
    39: { length: "24 cm", width: "8.8 cm" },
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic phân trang
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

  return (
    <div className="container mx-auto p-4">
      {/* Header với tiêu đề và ô tìm kiếm */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Giày nữ</h1>
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
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48 transition-all duration-300"
            />
          )}
        </div>
      </div>

      {/* Danh sách sản phẩm */}
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

      {/* Phân trang */}
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
          <span>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
      )}

      {/* Popup sản phẩm */}
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

            <div className="mt-2">
              <p className="font-semibold">Giới thiệu:</p>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>

            {selectedProduct.colors && (
              <div className="mt-2">
                <p className="font-semibold">Màu sắc:</p>
                <div className="flex space-x-2 mt-1">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`p-2 border rounded-full ${
                        selectedColor === color
                          ? "border-black bg-gray-200"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span
                        className={`w-4 h-4 inline-block rounded-full ${
                          color === "Đỏ"
                            ? "bg-red-500"
                            : color === "Trắng"
                            ? "bg-white border"
                            : color === "Hồng"
                            ? "bg-pink-400"
                            : color === "Xanh"
                            ? "bg-blue-500"
                            : color === "Xám"
                            ? "bg-gray-500"
                            : color === "Nâu"
                            ? "bg-yellow-800"
                            : color === "Be"
                            ? "bg-yellow-100"
                            : "bg-black"
                        }`}
                      ></span>
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
                        selectedSize === size ? "border-black bg-gray-200" : ""
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
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}

      {/* Popup bảng số đo */}
      {showSizeChart && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative max-h-[80vh] overflow-y-auto">
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

export default WomenPage;
