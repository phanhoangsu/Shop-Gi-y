/**
 * Logic chính và chức năng:
 * 
 * 1. Chức năng chính:
 *    - Hiển thị thông tin sản phẩm
 *    - Quick view modal
 *    - Hiển thị rating và reviews
 *    - Chức năng mua hàng nhanh
 * 
 * 2. Logic state và xử lý:
 *    - showQuickView state quản lý modal
 *    - Toggle modal visibility
 *    - Xử lý rating display
 *    - Format giá (price, oldPrice)
 * 
 * 3. UI/UX:
 *    - Hover effects trên ảnh
 *    - Modal overlay với animation
 *    - Responsive grid layout
 *    - Dark mode support
 *    - Interactive buttons
 * 
 * 4. Features:
 *    - Ảnh sản phẩm với hover overlay
 *    - Giá hiện tại và giá cũ
 *    - Rating stars system
 *    - Quick view chi tiết
 *    - Add to cart functionality
 */
import React, { useState } from "react";
import { FiStar, FiX } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => setShowQuickView(true)}
            className="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
          >
            Xem nhanh
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 hover:text-red-500 cursor-pointer">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-red-500 font-bold">{product.price}đ</span>
          {product.oldPrice && (
            <span className="ml-2 text-gray-500 line-through text-sm">
              {product.oldPrice}đ
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`${
                  star <= product.rating
                    ? "text-yellow-500 fill-current"
                    : "text-gray-400"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
            Mua ngay
          </button>
        </div>
      </div>

      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowQuickView(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <div className="flex items-center mb-4">
                  <span className="text-2xl text-red-500 font-bold">
                    {product.price}đ
                  </span>
                  {product.oldPrice && (
                    <span className="ml-2 text-gray-500 line-through">
                      {product.oldPrice}đ
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`${
                        star <= product.rating
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-500">
                    ({product.reviews} đánh giá)
                  </span>
                </div>
                <button className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
