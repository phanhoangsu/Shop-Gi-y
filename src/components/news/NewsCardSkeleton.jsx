import React from "react";

const NewsCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
  </div>
);

export default NewsCardSkeleton;
