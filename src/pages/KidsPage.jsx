import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const sampleProducts = [
  {
    id: "0001",
    name: "Giày thể thao trẻ em",
    price: "1.200.000đ",
    image:
      "https://phuongstore.vn/uploads/images/2023/giay-the-thao-tre-em-tu-4-12-tuoi.jpg",
  },
  {
    id: "0002",
    name: "Giày sneaker trẻ em",
    price: "950.000đ",
    image:
      "https://product.hstatic.net/1000011840/product/giay-trang-sneaker-cho-be-gh87-5_b94398fdb35e49f08025e39bd4c230a5_1024x1024.jpg",
  },
  {
    id: "0003",
    name: "Giày tập đi trẻ em",
    price: "800.000đ",
    image:
      "https://product.hstatic.net/1000230642/product/dsc_0022_08d3905336cc45139bef880b73b8facd_grande.jpg",
  },
  {
    id: "0004",
    name: "Giày trẻ em NEXT",
    price: "600.000đ",
    image: "https://pos.nvncdn.com/54f46e-27401/ps/20241026_7hLHAhmCEE.jpeg",
  },
  {
    id: "0005",
    name: "Giày lưới trẻ em",
    price: "1.100.000đ",
    image:
      "https://mebi.vn/wp-content/uploads/2023/04/giay-luoi-cho-be-tongkhothienan-7.jpg",
  },
  {
    id: "0006",
    name: "Giày nhựa trẻ em ",
    price: "1.500.000đ",
    image:
      "https://piget.vn/wp-content/uploads/2023/06/size-giay-tre-em-o-cac-noi.jpg",
  },
];

const KidsPage = () => {
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
      <h1 className="text-2xl font-bold mb-4">Giày trẻ em</h1>
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

export default KidsPage;
