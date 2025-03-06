import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const sampleProducts = [
  {
    id: "001",
    name: "Giày Sneaker Nữ",
    price: "1.200.000đ",
    image:
      "https://timan.vn/upload/products/082024/giay-the-thao-nu-tmsz124-cao-cap.jpg",
  },
  {
    id: "002",
    name: "Giày Cao Gót",
    price: "900.000đ",
    image:
      "https://mediaelly.sgp1.digitaloceanspaces.com/uploads/2022/12/10225609/giay-nu-cao-cap-da-that-elly-egt196-3-2.jpg",
  },
  {
    id: "003",
    name: "Giày Sandal Nữ",
    price: "700.000đ",
    image:
      "https://streetstyleshop.vn/wp-content/uploads/2022/05/giay-the-thao-nu-don-gian-6.jpg",
  },
  {
    id: "004",
    name: "Giày Boot Nữ",
    price: "1.500.000đ",
    image:
      "https://giaybootnu.com/upload/images/giay-boot-nu-phong-cach-au-my-sanh-dieu-gbn165.jpg",
  },
  {
    id: "005",
    name: "Giày Thể Thao Nữ",
    price: "1.000.000đ",
    image:
      "https://salt.tikicdn.com/cache/w1200/ts/product/be/69/c7/479390fd3b130863198608cf280589fc.jpg",
  },
  {
    id: "006",
    name: "Giày cao gót",
    price: "800.000đ",
    image: "https://thatlungnam.com.vn/wp-content/uploads/2019/03/1-27.jpg",
  },
];

const WomenPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sampleProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sampleProducts.length / productsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Giày Nữ</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-2 rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedProduct(product)}
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

      {/* Phân trang */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Popup hiển thị chi tiết sản phẩm */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96 relative">
            {/* Icon đóng */}
            <button
              className="absolute top-2 right-2 text-red-500 text-2xl"
              onClick={() => setSelectedProduct(null)}
            >
              <IoMdCloseCircleOutline />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="text-red-500 text-lg font-semibold">
              {selectedProduct.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenPage;
