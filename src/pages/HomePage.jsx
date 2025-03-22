import React from "react";
import Banner from "../compunents/Banner";
import ProductList from "../compunents/ProductList";
import OutstandingPrd from "../compunents/OutstandingPrd";
import Footer from "../compunents/Footer";
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaExchangeAlt,
  FaArrowRight,
} from "react-icons/fa";

const HomePage = () => {
  const features = [
    {
      icon: (
        <FaTruck className="text-3xl text-gray-600 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Miễn phí vận chuyển",
      description: "Cho đơn hàng trên 500.000đ",
    },
    {
      icon: (
        <FaShieldAlt className="text-3xl text-gray-600 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Bảo mật thanh toán",
      description: "100% an toàn khi thanh toán",
    },
    {
      icon: (
        <FaHeadset className="text-3xl text-gray-600 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Hỗ trợ 24/7",
      description: "Luôn sẵn sàng hỗ trợ",
    },
    {
      icon: (
        <FaExchangeAlt className="text-3xl text-gray-600 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Đổi trả dễ dàng",
      description: "30 ngày đổi trả miễn phí",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Banner />

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tốt nhất với
            những dịch vụ chất lượng
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 p-4 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductList />
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              Sản phẩm nổi bật
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></span>
            </h2>
            <p className="text-gray-600 mt-4">
              Khám phá bộ sưu tập sản phẩm được yêu thích nhất của chúng tôi
            </p>
          </div>
          <OutstandingPrd />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
