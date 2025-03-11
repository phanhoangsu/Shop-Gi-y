import React from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // CSS cho carousel
import { Carousel } from "react-responsive-carousel";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Lazy loading cho ảnh

const OutstandingPrd = () => {
  const navigate = useNavigate();

  // Dữ liệu sản phẩm nổi bật
  const products = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741631008/8-loai-giay-the-thao-pho-bien-giup-nam-gioi-tre-trung-hon-4-1683716701-136-width720height720_fpoxff.jpg",
      alt: "Giày nam",
      name: "Men's Sneakers",
      price: 89.99,
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741696647/536737_w2fw1_9700.png_f253a59ca9614d4c8844b859a0b56fd1_ioawq8.png",
      alt: "Ảnh nữ",
      name: "Women's Heels",
      price: 119.99,
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741646953/Top-5-Th%C6%B0%C6%A1ng-hi%E1%BB%87u-gi%C3%A0y-d%C3%A9p-cho-tr%E1%BA%BB-em-t%E1%BB%91t-nh%E1%BA%A5t2_gyo27d.webp",
      alt: "Ảnh trẻ em",
      name: "Kids' Sandals",
      price: 49.99,
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741695521/timthumb_tt8jau.jpg",
      alt: "Ảnh nữ",
      name: "Kids' Sneakers",
      price: 59.99,
    },
  ];

  // Xử lý khi click vào sản phẩm
  const handleProductClick = (productName) => {
    switch (productName) {
      case "Men's Sneakers":
        navigate("/list/man");
        break;
      case "Women's Heels":
        navigate("/list/women");
        break;
      case "Kids' Sandals":
        navigate("/list/kids");
        break;
      case "Kids' Sneakers":
        navigate("/list/man");
        break;
      default:
        navigate("/list"); // Nếu không khớp, chuyển hướng mặc định
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          centerMode={true}
          centerSlidePercentage={33.33} // 3 sản phẩm hiển thị trên desktop
          className="carousel-container"
          emulateTouch={true}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="px-2 cursor-pointer"
              onClick={() => handleProductClick(product.name)} // Truyền name thay vì id
            >
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <LazyLoadImage
                  src={product.src}
                  alt={product.alt}
                  effect="blur" // Hiệu ứng khi tải ảnh
                  className="w-64 h-64 object-cover rounded-lg"
                  wrapperClassName="w-full"
                />
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700">${product.price}</p>
                  <button className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default OutstandingPrd;
