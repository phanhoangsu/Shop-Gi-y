/**
 * Logic chính:
 * 1. Quản lý state:
 *    - progress: Phần trăm đã đọc (0-100)
 * 
 * 2. Xử lý scroll:
 *    - Tính toán progress:
 *      scrolled = window.scrollY
 *      height = scrollHeight - innerHeight
 *      progress = (scrolled / height) * 100
 *    - Cleanup event listener
 * 
 * 3. UI/UX:
 *    - Fixed position
 *    - Smooth transition
 *    - Z-index priority
 */
import React, { useState, useEffect } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-red-500 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
