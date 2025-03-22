/**
 * BannerSlider Component
 * 
 * Chức năng chính:
 * - Hiển thị slider banner tin tức
 * - Tự động chuyển slide
 * - Tương tác người dùng
 * 
 * Logic chính:
 * 1. Props Management:
 *    - news: Danh sách tin tức hiển thị
 *    - Validation dữ liệu đầu vào
 * 
 * 2. Slider Features:
 *    - Auto-play (5s/slide)
 *    - Pagination controls
 *    - Responsive design
 *    - Image optimization
 * 
 * 3. UI Elements:
 *    - Gradient overlay
 *    - Title & description
 *    - Rounded corners
 *    - Image scaling
 * 
 * Performance:
 * - Memoization với React.memo
 * - Lazy loading images
 * - Limited to 5 slides
 */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { OptimizedImage } from "./index";

/**
 * BannerSlider Component
 * @param {Object} props
 * @param {Array} props.news - List of news items for the banner
 * @returns {JSX.Element|null} Banner slider or null if no news
 */
const BannerSlider = ({ news = [] }) => {
  // Input validation
  if (!Array.isArray(news) || news.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Swiper Configuration */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }} // 5 seconds per slide
        className="rounded-lg overflow-hidden"
      >
        {/* Render first 5 news items */}
        {news.slice(0, 5).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[400px]">
              {/* Optimized News Image */}
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h2 className="text-white text-2xl font-bold mb-2">
                  {item.title}
                </h2>
                <p className="text-white text-sm line-clamp-2">
                  {item.description || "Không có mô tả"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Optimize re-renders
export default React.memo(BannerSlider);
