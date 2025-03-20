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
