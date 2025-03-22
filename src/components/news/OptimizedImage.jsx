/**
 * Logic chính và chức năng:
 * 
 * 1. Tối ưu tải hình ảnh:
 *    - Lazy loading: chỉ tải khi scroll đến
 *    - Placeholder: dùng ảnh nhỏ (w=50) khi loading
 *    - Blur effect: hiệu ứng mờ khi đang tải
 * 
 * 2. Cải thiện UX:
 *    - Tránh layout shift
 *    - Loading indicator
 *    - Alt text cho SEO
 *    - Responsive classes
 * 
 * 3. Performance:
 *    - Giảm initial load
 *    - Tối ưu bandwidth
 *    - Tăng tốc FCP (First Contentful Paint)
 *    - Cải thiện Core Web Vitals
 */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OptimizedImage = ({ src, alt, className }) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    effect="blur"
    className={className}
    loading="lazy"
    placeholderSrc={`${src}?w=50`} // Sử dụng ảnh nhỏ hơn làm placeholder
  />
);

export default OptimizedImage;
