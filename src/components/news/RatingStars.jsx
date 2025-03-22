/**
 * Logic chính và chức năng:
 * 
 * 1. Chức năng:
 *    - Hiển thị đánh giá sao (1-5)
 *    - Cho phép user đánh giá tin tức
 *    - Lưu trữ rating theo newsId
 * 
 * 2. Logic xử lý:
 *    - Lấy current rating từ ratings object
 *    - Map array [1-5] thành stars
 *    - Toggle star state dựa vào rating
 *    - Prevent event bubbling khi click
 * 
 * 3. UI/UX:
 *    - Interactive stars
 *    - Hover effects
 *    - Fill/Empty states
 *    - Responsive sizing
 */
import React from "react";
import { FiStar } from "react-icons/fi";

const RatingStars = ({ newsId, ratings, handleRating }) => {
  const currentRating = ratings[newsId] || 0;

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`cursor-pointer ${
            star <= currentRating
              ? "text-yellow-500 fill-current"
              : "text-gray-400"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleRating(newsId, star);
          }}
        />
      ))}
    </div>
  );
};

export default RatingStars;
