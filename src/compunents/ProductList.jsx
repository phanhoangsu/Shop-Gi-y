import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const images = [
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741347045/Right_Sidw-removebg-preview_ho6rwe.png",
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741347043/Right_Sidw__1_-removebg-preview_s1gbp7.png",
    "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741347043/pngwing_1-removebg-preview_hofj0t.png",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center  bg-white px-6   ">
        <div className="max-w-6xl flex flex-col md:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-7xl font-extrabold">
              Nike <span className="text-gray-300">Air</span>
              <br /> Max
            </h1>
            <p className="text-gray-600 text-lg">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            {/* <button className="bg-red-500 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-red-600 transition">
            Shop now
          </button> */}
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 relative flex justify-center">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Nike Air Max"
                className="w-full max-w-lg mx-auto drop-shadow-xl"
              />
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 space-y-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`w-16 h-16 cursor-pointer border-4 rounded-full transition hover:border-gray-500 bg-white p-1 shadow-lg ${
                      selectedImage === img
                        ? "border-gray-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
