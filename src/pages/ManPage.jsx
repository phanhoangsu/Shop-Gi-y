import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const sampleProducts = [
  {
    id: "01",
    name: "Giày lecos",
    price: "1.200.000đ",
    image:
      "https://bizweb.dktcdn.net/100/527/490/products/giay-nam-cao-cap-da-that-lecos-lg8-2-1731770099469.jpg?v=1731771540970",
  },
  {
    id: "02",
    name: "Giày sneaker",
    price: "950.000đ",
    image:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyx1zah6468x27",
  },
  {
    id: "03",
    name: "Giày mulgati",
    price: "800.000đ",
    image:
      "https://product.hstatic.net/200000410665/product/giay-the-thao-nam-xb20649fk-2_a2f0e9136e6849da95f6c6476d9dbdec.jpg",
  },
  {
    id: "04",
    name: "Giày ZGOM",
    price: "600.000đ",
    image: "https://img.bitas.com.vn/sanpham/ZGOM.20/NAU/lg1.png",
  },
  {
    id: "05",
    name: "Giày SNEAKER NAM HAN QUOC",
    price: "1.100.000đ",
    image:
      "https://product.hstatic.net/1000238555/product/10328343760_937950205_2caaae5948f9444f9afe775861fb9bc4_1024x1024.jpg",
  },
  {
    id: "06",
    name: "Giày LACOSTE",
    price: "1.500.000đ",
    image:
      "https://cdn.vuahanghieu.com/unsafe/0x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/news/content/2024/05/giay-sneaker-nam-lacoste-l001-contrasted-leather-47sma0057-042-mau-trang-phoi-xanh-navy-jpg-1715068740-07052024145900.jpg",
  },
];

const ManPage = () => {
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
      <h1 className="text-2xl font-bold mb-4">Giày nữ</h1>
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

export default ManPage;
