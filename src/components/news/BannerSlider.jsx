import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { OptimizedImage } from "./index";

const BannerSlider = ({ news = [] }) => {
  if (!Array.isArray(news) || news.length === 0) return null;

  return (
    <div className="mb-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="rounded-lg overflow-hidden"
      >
        {news.slice(0, 5).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[400px]">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
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

export default React.memo(BannerSlider);
