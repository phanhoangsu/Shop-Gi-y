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
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/w_300,h_300/v1741631008/8-loai-giay-the-thao-pho-bien-giup-nam-gioi-tre-trung-hon-4-1683716701-136-width720height720_fpoxff.jpg",
      alt: "Giày nam",
      name: "Men's Sneakers",
      price: 89.99,
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741696800/Gia%CC%80y-Balenciaga-su%CC%A3c-Den-6-768x1024_ujk931.webp",
      alt: "Giày cao gót nữ",
      name: "Women's Heels",
      price: 119.99,
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/w_300,h_300/v1741646953/Top-5-Th%C6%B0%C6%A1ng-hi%E1%BB%87u-gi%C3%A0y-d%C3%A9p-cho-tr%E1%BA%BB-em-t%E1%BB%91t-nh%E1%BA%A5t2_gyo27d.webp",
      alt: "Dép trẻ em",
      name: "Kids' Sandals",
      price: 49.99,
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/w_300,h_300/v1741695521/timthumb_tt8jau.jpg",
      alt: "Giày sneaker trẻ em",
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
        navigate("/list/kids"); // Đã sửa từ "/list/man" sang "/list/kids" để hợp lý hơn
        break;
      default:
        navigate("/list"); // Trang mặc định nếu không khớp
    }
  };

  // Hàm xử lý khi ảnh tải thất bại
  const handleImageError = (e, src) => {
    console.error(`Failed to load image: ${src}`);
    // Có thể đặt một ảnh fallback nếu cần
    e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-7xl mx-auto">
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
              onClick={() => handleProductClick(product.name)}
            >
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <LazyLoadImage
                  src={product.src}
                  alt={product.alt}
                  className="w-64 h-64 object-contain rounded-lg"
                  wrapperClassName="w-full"
                  onError={(e) => handleImageError(e, product.src)}
                  onLoad={() => console.log(`Loaded image: ${product.src}`)}
                />
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.name);
                    }}
                  >
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
