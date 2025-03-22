/**
 * Component ProductList
 * 
 * Chức năng chính:
 * 1. Hiển thị sản phẩm nổi bật:
 *    - Carousel hình ảnh sản phẩm
 *    - Hiệu ứng chuyển động
 *    - Tự động chuyển ảnh
 * 
 * 2. Điều hướng:
 *    - Nút Shop Now
 *    - Liên kết đến danh mục
 *    - Xử lý chuyển trang
 * 
 * 3. Giao diện:
 *    - Responsive design
 *    - Animation hiệu ứng
 *    - Tương tác người dùng
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // CSS cho carousel
import { Carousel } from "react-responsive-carousel";

/**
 * Component ProductList
 * @component
 * @description Hiển thị danh sách sản phẩm nổi bật với carousel và điều hướng
 */
const ProductList = () => {
  // Hook điều hướng
  const navigate = useNavigate();

  /**
   * Dữ liệu hình ảnh sản phẩm
   * @constant
   * @type {Array<string>}
   */
  const images = [
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741696031/o1cn01pejv7i1tcvg2rz2al1891072_xjfbmb.webp",
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1742124073/vn-11134207-7r98o-lxs5fpvuqn6j07_noyerj.jpg",
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741677226/0a366cfc464a32b91233072ea103bc5b_ykefor.jpg",
  ];

  return (
    <div className="bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Phần nội dung bên trái */}
        <div className="md:w-1/2 space-y-6">
          {/* Tiêu đề sản phẩm */}
          <h1 className="text-5xl lg:text-7xl font-extrabold animate-fade-in">
            Nike <span className="text-gray-300">Air</span>
            <br /> Max
          </h1>

          {/* Mô tả sản phẩm */}
          <p className="text-gray-600 text-lg">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          {/* Nút điều hướng đến trang sản phẩm */}
          <button
            onClick={() => navigate("/list/man")}
            className="bg-red-500 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>

        {/* Phần carousel bên phải */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-lg">
            {/* Carousel hiển thị hình ảnh */}
            <Carousel
              showArrows={true}
              showThumbs={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              className="carousel-container"
            >
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Nike Air Max ${index}`}
                    className="w-full drop-shadow-xl transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
