import React from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // CSS cho carousel
import { Carousel } from "react-responsive-carousel";

const ProductList = () => {
  const navigate = useNavigate();

  // Dữ liệu hình ảnh
  const images = [
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741347045/Right_Sidw-removebg-preview_ho6rwe.png",
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741347043/Right_Sidw__1_-removebg-preview_s1gbp7.png",
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741347043/pngwing_1-removebg-preview_hofj0t.png",
  ];

  return (
    <div className="bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl lg:text-7xl font-extrabold animate-fade-in">
            Nike <span className="text-gray-300">Air</span>
            <br /> Max
          </h1>
          <p className="text-gray-600 text-lg">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          {/* Nút "Shop Now" */}
          <button
            onClick={() => navigate("/list/man")}
            className="bg-red-500 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>

        {/* Right Content - Carousel */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-lg">
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

      {/* Tailwind Animation */}
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
