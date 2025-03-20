// import axios from "axios";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Helmet } from "react-helmet";
// import {
//   FiArrowLeft,
//   FiArrowUp,
//   FiBookmark,
//   FiCalendar,
//   FiClock,
//   FiFacebook,
//   FiHeart,
//   FiHome,
//   FiLink,
//   FiMonitor,
//   FiMoon,
//   FiSearch,
//   FiShare2,
//   FiStar,
//   FiSun,
//   FiTwitter,
//   FiX,
// } from "react-icons/fi";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Component Skeleton Loading
// const NewsCardSkeleton = () => (
//   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
//     <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
//     <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
//     <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
//     <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
//     <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
//   </div>
// );

// // Component Breadcrumb
// const Breadcrumb = ({ items }) => (
//   <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
//     <a href="/" className="hover:text-red-500">
//       <FiHome size={16} />
//     </a>
//     {items.map((item, index) => (
//       <React.Fragment key={index}>
//         <span>/</span>
//         <a
//           href={item.path}
//           className={`hover:text-red-500 ${
//             index === items.length - 1 ? "text-red-500 font-medium" : ""
//           }`}
//         >
//           {item.label}
//         </a>
//       </React.Fragment>
//     ))}
//   </nav>
// );

// // Component QuickLinks
// const QuickLinks = ({ onCategoryClick }) => {
//   const links = [
//     { id: "flash-sale", label: "Flash Sale", tag: "flash-sale" },
//     { id: "trending", label: "Trending", tag: "trending" },
//     { id: "khuyen-mai", label: "Khuyến mãi hot", tag: "ưu đãi" },
//     { id: "review", label: "Review", tag: "review" },
//     { id: "so-sanh", label: "So sánh", tag: "so sánh" },
//     { id: "tu-van", label: "Tư vấn", tag: "tư vấn" },
//   ];

//   return (
//     <div className="flex overflow-x-auto whitespace-nowrap py-2 mb-4 scrollbar-hide">
//       {links.map((link) => (
//         <button
//           key={link.id}
//           onClick={() => onCategoryClick(link.tag)}
//           className="inline-block px-4 py-1 mr-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-colors"
//         >
//           {link.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Component BannerSlider
// const BannerSlider = ({ news = [] }) => {
//   if (!Array.isArray(news) || news.length === 0) return null;

//   return (
//     <div className="mb-8">
//       <Swiper
//         modules={[Pagination, Autoplay]}
//         spaceBetween={0}
//         slidesPerView={1}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000 }}
//         className="rounded-lg overflow-hidden"
//       >
//         {news.slice(0, 5).map((item) => (
//           <SwiperSlide key={item.id}>
//             <div className="relative h-[400px]">
//               <OptimizedImage
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
//                 <h2 className="text-white text-2xl font-bold mb-2">
//                   {item.title}
//                 </h2>
//                 <p className="text-white text-sm line-clamp-2">
//                   {item.description || "Không có mô tả"}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// // Memoized BannerSlider component
// const MemoizedBannerSlider = React.memo(BannerSlider);

// // Custom hook for localStorage
// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = useState(() => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error(`Error saving to localStorage key "${key}":`, error);
//     }
//   }, [key, value]);

//   return [value, setValue];
// };

// // Custom hooks
// const useIsNewNews = () => {
//   return useCallback((date) => {
//     const newsDate = new Date(date);
//     const now = new Date();
//     const diffTime = Math.abs(now - newsDate);
//     const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
//     return diffHours <= 24;
//   }, []);
// };

// // Component NewsGrid
// const NewsGrid = ({
//   title,
//   news = [],
//   onNewsClick,
//   bookmarks = [],
//   hearts = {},
//   handleBookmark,
//   handleHeart,
//   handleShare,
// }) => {
//   const isNewNews = useIsNewNews();
//   const getReadingTime = (wordCount) => Math.ceil(wordCount / 200);

//   if (!Array.isArray(news) || news.length === 0) {
//     return <p className="text-center text-gray-500">Không có tin tức nào</p>;
//   }

//   return (
//     <div className="mb-8">
//       {title && (
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
//           <a
//             href="#"
//             className="text-red-500 hover:text-red-600 text-sm font-medium"
//           >
//             Xem tất cả
//           </a>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {news.map((item) => (
//           <article
//             key={item.id}
//             className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
//             onClick={() => onNewsClick(item)}
//           >
//             <div className="relative aspect-video overflow-hidden">
//               <OptimizedImage
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//               />
//               {item.tags?.includes("ưu đãi") && (
//                 <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//                   HOT
//                 </span>
//               )}
//               {isNewNews(item.date) && (
//                 <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//                   MỚI
//                 </span>
//               )}
//             </div>

//             <div className="p-5">
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {item.tags?.map((tag) => (
//                   <span
//                     key={tag}
//                     className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
//                 {item.title}
//               </h3>

//               <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
//                 {item.description || "Không có mô tả"}
//               </p>

//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center text-gray-500 dark:text-gray-400">
//                   <FiClock className="mr-1" />
//                   <span>{getReadingTime(item.wordCount)} phút đọc</span>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleBookmark(item);
//                     }}
//                     className={`p-2 rounded-full transition-colors ${
//                       bookmarks.includes(item.id)
//                         ? "text-yellow-500 bg-yellow-50 dark:bg-gray-700"
//                         : "text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     }`}
//                   >
//                     <FiBookmark size={18} />
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleHeart(item.id);
//                     }}
//                     className={`p-2 rounded-full transition-colors ${
//                       hearts[item.id]
//                         ? "text-red-500 bg-red-50 dark:bg-gray-700"
//                         : "text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     }`}
//                   >
//                     <FiHeart size={18} />
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleShare(item, "copy");
//                     }}
//                     className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <FiShare2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Memoized NewsGrid component
// const MemoizedNewsGrid = React.memo(NewsGrid);

// // Component ProductCard
// const ProductCard = ({ product }) => {
//   const [showQuickView, setShowQuickView] = useState(false);

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//       <div className="relative group">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//           <button
//             onClick={() => setShowQuickView(true)}
//             className="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
//           >
//             Xem nhanh
//           </button>
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold mb-2 hover:text-red-500 cursor-pointer">
//           {product.name}
//         </h3>
//         <div className="flex items-center mb-2">
//           <span className="text-red-500 font-bold">{product.price}đ</span>
//           {product.oldPrice && (
//             <span className="ml-2 text-gray-500 line-through text-sm">
//               {product.oldPrice}đ
//             </span>
//           )}
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FiStar
//                 key={star}
//                 className={`${
//                   star <= product.rating
//                     ? "text-yellow-500 fill-current"
//                     : "text-gray-400"
//                 }`}
//               />
//             ))}
//             <span className="ml-1 text-sm text-gray-500">
//               ({product.reviews})
//             </span>
//           </div>
//           <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
//             Mua ngay
//           </button>
//         </div>
//       </div>

//       {showQuickView && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black bg-opacity-50"
//             onClick={() => setShowQuickView(false)}
//           />
//           <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
//             <button
//               onClick={() => setShowQuickView(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <FiX size={24} />
//             </button>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full rounded-lg"
//                 />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
//                 <div className="flex items-center mb-4">
//                   <span className="text-2xl text-red-500 font-bold">
//                     {product.price}đ
//                   </span>
//                   {product.oldPrice && (
//                     <span className="ml-2 text-gray-500 line-through">
//                       {product.oldPrice}đ
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   {product.description}
//                 </p>
//                 <div className="flex items-center mb-4">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <FiStar
//                       key={star}
//                       className={`${
//                         star <= product.rating
//                           ? "text-yellow-500 fill-current"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   ))}
//                   <span className="ml-2 text-gray-500">
//                     ({product.reviews} đánh giá)
//                   </span>
//                 </div>
//                 <button className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors">
//                   Thêm vào giỏ hàng
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Component CommentSection
// const CommentSection = ({ comments = [], onAddComment, onAddReply }) => {
//   const [newComment, setNewComment] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   const handleSubmitComment = (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       onAddComment(newComment);
//       setNewComment("");
//     }
//   };

//   const handleSubmitReply = (commentId) => {
//     if (replyText.trim()) {
//       onAddReply(commentId, replyText);
//       setReplyText("");
//       setReplyingTo(null);
//     }
//   };

//   // Debug: Log comments to check if they are received correctly
//   console.log("Comments in CommentSection:", comments);

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-bold mb-4 dark:text-white">Bình luận</h3>

//       <form onSubmit={handleSubmitComment} className="mb-6">
//         <div className="flex gap-4">
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Viết bình luận của bạn..."
//             className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <button
//             type="submit"
//             className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Gửi
//           </button>
//         </div>
//       </form>

//       {comments.length === 0 ? (
//         <p className="text-gray-500">Chưa có bình luận nào.</p>
//       ) : (
//         <div className="space-y-4">
//           {comments.map((comment) => (
//             <div
//               key={comment.id}
//               className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold dark:text-white">
//                       {comment.author || "Ẩn danh"}
//                     </h4>
//                     <span className="text-sm text-gray-500">
//                       {comment.date}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-gray-600 dark:text-gray-300">
//                     {comment.text || comment.content}
//                   </p>
//                   <div className="mt-2 flex items-center gap-4">
//                     <button
//                       onClick={() => setReplyingTo(comment.id)}
//                       className="text-sm text-gray-500 hover:text-red-500"
//                     >
//                       Trả lời
//                     </button>
//                     <div className="flex items-center gap-1">
//                       <button className="text-gray-500 hover:text-red-500">
//                         <FiHeart />
//                       </button>
//                       <span className="text-sm text-gray-500">
//                         {comment.likes || 0}
//                       </span>
//                     </div>
//                   </div>

//                   {comment.replies && (
//                     <div className="mt-4 ml-8 space-y-4">
//                       {comment.replies.map((reply) => (
//                         <div
//                           key={reply.id}
//                           className="bg-white dark:bg-gray-700 rounded-lg p-4"
//                         >
//                           <div className="flex items-start gap-4">
//                             <div className="flex-1">
//                               <div className="flex items-center justify-between">
//                                 <h5 className="font-semibold dark:text-white">
//                                   {reply.author || "Ẩn danh"}
//                                 </h5>
//                                 <span className="text-sm text-gray-500">
//                                   {reply.date}
//                                 </span>
//                               </div>
//                               <p className="mt-1 text-gray-600 dark:text-gray-300">
//                                 {reply.content}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {replyingTo === comment.id && (
//                     <div className="mt-4 ml-8">
//                       <div className="flex gap-4">
//                         <input
//                           type="text"
//                           value={replyText}
//                           onChange={(e) => setReplyText(e.target.value)}
//                           placeholder="Viết câu trả lời..."
//                           className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                         />
//                         <button
//                           onClick={() => handleSubmitReply(comment.id)}
//                           className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                         >
//                           Gửi
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // SEO Component
// const SEO = ({ title, description, image, url }) => (
//   <Helmet>
//     <title>{title}</title>
//     <meta name="description" content={description} />
//     <meta property="og:title" content={title} />
//     <meta property="og:description" content={description} />
//     <meta property="og:image" content={image} />
//     <meta property="og:url" content={url} />
//     <meta name="twitter:card" content="summary_large_image" />
//     <meta name="twitter:title" content={title} />
//     <meta name="twitter:description" content={description} />
//     <meta name="twitter:image" content={image} />
//     <script type="application/ld+json">
//       {`
//         {
//           "@context": "https://schema.org",
//           "@type": "NewsArticle",
//           "headline": "${title}",
//           "image": "${image}",
//           "description": "${description}",
//           "url": "${url}",
//           "datePublished": "${new Date().toISOString()}",
//           "publisher": {
//             "@type": "Organization",
//             "name": "TechNews",
//             "logo": {
//               "@type": "ImageObject",
//               "url": "https://example.com/logo.png"
//             }
//           }
//         }
//       `}
//     </script>
//   </Helmet>
// );

// // Performance optimized image component
// const OptimizedImage = ({ src, alt, className }) => (
//   <LazyLoadImage
//     src={src}
//     alt={alt}
//     effect="blur"
//     className={className}
//     loading="lazy"
//     placeholderSrc={`${src}?w=50`}
//   />
// );

// // Reading Progress Bar
// const ReadingProgress = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const updateProgress = () => {
//       const scrolled = window.scrollY;
//       const height = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (scrolled / height) * 100;
//       setProgress(progress);
//     };

//     window.addEventListener("scroll", updateProgress);
//     return () => window.removeEventListener("scroll", updateProgress);
//   }, []);

//   return (
//     <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//       <div
//         className="h-full bg-red-500 transition-all duration-200"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// };

// // Table of Contents
// const TableOfContents = ({ content }) => {
//   const [headings, setHeadings] = useState([]);
//   const [activeId, setActiveId] = useState("");

//   useEffect(() => {
//     const elements = document.querySelectorAll("h2, h3");
//     const headingsData = Array.from(elements).map((element) => ({
//       id: element.id,
//       text: element.textContent,
//       level: element.tagName === "H2" ? 2 : 3,
//     }));
//     setHeadings(headingsData);

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveId(entry.target.id);
//           }
//         });
//       },
//       { rootMargin: "-20% 0px -80% 0px" }
//     );

//     elements.forEach((elem) => observer.observe(elem));
//     return () => observer.disconnect();
//   }, [content]);

//   return (
//     <nav className="sticky top-20 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
//       <h4 className="text-lg font-bold mb-4 dark:text-white">Mục lục</h4>
//       <ul className="space-y-2">
//         {headings.map((heading) => (
//           <li
//             key={heading.id}
//             style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
//           >
//             <a
//               href={`#${heading.id}`}
//               className={`block py-1 text-sm ${
//                 activeId === heading.id
//                   ? "text-red-500 font-medium"
//                   : "text-gray-600 dark:text-gray-400 hover:text-red-500"
//               }`}
//             >
//               {heading.text}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// // Component Header
// const Header = ({ darkMode, setDarkMode, searchTerm, setSearchTerm }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogoClick = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     setTimeout(() => {
//       window.location.href = "/news";
//       setIsLoading(false);
//     }, 1000); // Thời gian chờ 1 giây
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-40">
//       <div className="container mx-auto px-4">
//         <div className="h-16 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <a
//               href="/news"
//               onClick={handleLogoClick}
//               className="flex items-center space-x-2 relative"
//             >
//               {isLoading ? (
//                 <div className="w-6 h-6 border-2 border-t-2 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
//               ) : (
//                 <FiMonitor className="text-red-500" size={24} />
//               )}
//               <h1 className="text-xl font-bold dark:text-white">TechNews</h1>
//             </a>
//           </div>

//           <div className="flex-1 max-w-2xl mx-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm tin tức..."
//                 className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FiSearch
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 size={20}
//               />
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="hover:text-red-500 dark:text-gray-300">
//               <FiBookmark size={20} />
//             </button>
//             <button className="hover:text-red-500 dark:text-gray-300">
//               <FiHeart size={20} />
//             </button>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="hover:text-red-500 dark:text-gray-300"
//             >
//               {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Component Navigation
// const Navigation = ({
//   categories = [],
//   selectedCategory,
//   setSelectedCategory,
// }) => {
//   if (!Array.isArray(categories) || categories.length === 0) return null;

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-sm mb-6 overflow-x-auto">
//       <div className="container mx-auto px-4">
//         <div className="flex space-x-4 py-3">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
//                 selectedCategory === category
//                   ? "bg-red-500 text-white"
//                   : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Custom hook for filtering news
// const useNewsFiltering = (newsData, filters) => {
//   const {
//     selectedCategory,
//     searchTerm,
//     dateRange,
//     selectedTags,
//     sortBy,
//     bookmarks,
//   } = filters;

//   return useMemo(() => {
//     let filtered = [...newsData];

//     if (selectedCategory === "Đã Lưu") {
//       filtered = filtered.filter((news) => bookmarks.includes(news.id));
//     } else if (selectedCategory !== "Tất cả") {
//       filtered = filtered.filter((news) =>
//         news.tags.includes(selectedCategory)
//       );
//     }

//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       const searchTerms = searchLower
//         .split(" ")
//         .filter((term) => term.length > 0);
//       filtered = filtered.filter((news) =>
//         searchTerms.every(
//           (term) =>
//             news.title.toLowerCase().includes(term) ||
//             news.description.toLowerCase().includes(term) ||
//             news.tags.some((tag) => tag.toLowerCase().includes(term))
//         )
//       );
//     }

//     if (dateRange.start && dateRange.end) {
//       const startDate = new Date(dateRange.start);
//       const endDate = new Date(dateRange.end);
//       filtered = filtered.filter((news) => {
//         const newsDate = new Date(news.date);
//         return newsDate >= startDate && newsDate <= endDate;
//       });
//     }

//     if (selectedTags.length > 0) {
//       filtered = filtered.filter((news) =>
//         selectedTags.every((tag) => news.tags.includes(tag))
//       );
//     }

//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "date-desc":
//           return new Date(b.date) - new Date(a.date);
//         case "date-asc":
//           return new Date(a.date) - new Date(b.date);
//         case "title":
//           return a.title.localeCompare(b.title);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [
//     newsData,
//     selectedCategory,
//     searchTerm,
//     dateRange,
//     selectedTags,
//     sortBy,
//     bookmarks,
//   ]);
// };

// // Utility function for API error handling
// const getErrorMessage = (error) => {
//   if (!navigator.onLine) {
//     return "Không có kết nối internet. Vui lòng kiểm tra lại kết nối và thử lại.";
//   }
//   if (error.code === "ECONNABORTED") {
//     return "Server phản hồi quá chậm. Vui lòng thử lại sau.";
//   }
//   if (error.response?.status === 404) {
//     return "Không tìm thấy dữ liệu tin tức.";
//   }
//   if (error.response?.status >= 500) {
//     return "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";
//   }
//   return "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
// };

// // Main NewsPage Component
// const NewsPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [isLoadingApi, setIsLoadingApi] = useState(false);
//   const [error, setError] = useState(null);
//   const [retryAttempt, setRetryAttempt] = useState(0);
//   const maxRetries = 3;
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("Tất cả");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedNews, setSelectedNews] = useState(null);
//   const [sortBy, setSortBy] = useState("date-desc");
//   const [darkMode, setDarkMode] = useState(false);
//   const [fontSize, setFontSize] = useState("text-base");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   // Use custom hook for localStorage states
//   const [comments, setComments] = useLocalStorage("newsComments", {});
//   const [hearts, setHearts] = useLocalStorage("newsHearts", {});
//   const [readHistory, setReadHistory] = useLocalStorage("readHistory", []);
//   const [bookmarks, setBookmarks] = useLocalStorage("newsBookmarks", []);
//   const [searchHistory, setSearchHistory] = useLocalStorage(
//     "searchHistory",
//     []
//   );
//   const [ratings, setRatings] = useLocalStorage("ratings", {});
//   const itemsPerPage = 9;
//   const [categories, setCategories] = useState(["Tất cả"]);

//   // Fetch dữ liệu từ API
//   let isInitialMount = true;
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setIsLoadingApi(true);
//         setError(null);

//         const response = await axios.get(
//           "https://ngochieuwedding.io.vn/api/su/news",
//           {
//             timeout: 8000,
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         if (!response.data?.data) {
//           throw new Error("Không có dữ liệu tin tức");
//         }

//         const formattedNews = response.data.data.map((item) => ({
//           id: item._id || Math.random().toString(36).substr(2, 9),
//           title: item.title || "Không có tiêu đề",
//           description: item.description || "Không có mô tả",
//           content: item.body || "",
//           image: item.thumbnail || "https://via.placeholder.com/400x300",
//           date: item.createdAt
//             ? new Date(item.createdAt).toLocaleDateString("vi-VN")
//             : "Không rõ",
//           category: "Tin tức",
//           tags: Array.isArray(item.tags) ? item.tags : [],
//           created_by: item.created_by || "Admin",
//           wordCount: (item.description || "").split(" ").length || 0,
//         }));

//         setNewsData(formattedNews);
//         const uniqueTags = [
//           "Tất cả",
//           ...new Set(formattedNews.flatMap((item) => item.tags)),
//         ];
//         setCategories(uniqueTags);
//         setRetryAttempt(0); // Reset retry counter on success
//       } catch (err) {
//         console.error("Lỗi khi tải tin tức:", err);

//         if (!isInitialMount) {
//           if (retryAttempt < maxRetries) {
//             setRetryAttempt((prev) => prev + 1);
//             setTimeout(() => fetchNews(), 2000);
//           } else {
//             const errorMessage = getErrorMessage(err);
//             setError(errorMessage);
//           }
//         }
//       } finally {
//         setIsLoadingApi(false);
//         isInitialMount = false;
//       }
//     };

//     fetchNews();
//   }, []);

//   // Thêm hàm retry thủ công
//   const handleRetry = useCallback(() => {
//     setRetryAttempt(0);
//     setError(null);
//     isInitialMount = false;
//     setIsLoadingApi(true);
//     const fetchNews = async () => {
//       try {
//         setIsLoadingApi(true);
//         setError(null);

//         const response = await axios.get(
//           "https://ngochieuwedding.io.vn/api/su/news",
//           {
//             timeout: 8000,
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         if (!response.data?.data) {
//           throw new Error("Không có dữ liệu tin tức");
//         }

//         const formattedNews = response.data.data.map((item) => ({
//           id: item._id || Math.random().toString(36).substr(2, 9),
//           title: item.title || "Không có tiêu đề",
//           description: item.description || "Không có mô tả",
//           content: item.body || "",
//           image: item.thumbnail || "https://via.placeholder.com/400x300",
//           date: item.createdAt
//             ? new Date(item.createdAt).toLocaleDateString("vi-VN")
//             : "Không rõ",
//           category: "Tin tức",
//           tags: Array.isArray(item.tags) ? item.tags : [],
//           created_by: item.created_by || "Admin",
//           wordCount: (item.description || "").split(" ").length || 0,
//         }));

//         setNewsData(formattedNews);
//         const uniqueTags = [
//           "Tất cả",
//           ...new Set(formattedNews.flatMap((item) => item.tags)),
//         ];
//         setCategories(uniqueTags);
//         setRetryAttempt(0);
//       } catch (err) {
//         console.error("Lỗi khi tải tin tức:", err);
//         if (retryAttempt < maxRetries) {
//           setRetryAttempt((prev) => prev + 1);
//           setTimeout(() => fetchNews(), 2000);
//         } else {
//           const errorMessage = getErrorMessage(err);
//           setError(errorMessage);
//         }
//       } finally {
//         setIsLoadingApi(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // Use custom hook for filtering
//   const filteredNews = useNewsFiltering(newsData, {
//     selectedCategory,
//     searchTerm,
//     dateRange,
//     selectedTags,
//     sortBy,
//     bookmarks,
//   });

//   const paginatedNews = useMemo(() => {
//     return filteredNews.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );
//   }, [filteredNews, currentPage, itemsPerPage]);

//   const totalPages = useMemo(
//     () => Math.ceil(filteredNews.length / itemsPerPage),
//     [filteredNews.length, itemsPerPage]
//   );

//   const getReadingTime = (wordCount) => Math.ceil(wordCount / 200);

//   const handleShare = (news, platform) => {
//     if (!news) return;

//     try {
//       const url = `${window.location.origin}/news/${news.id}`;
//       const text = encodeURIComponent(news.title);

//       if (platform === "copy") {
//         navigator.clipboard.writeText(url);
//       } else if (platform === "facebook") {
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
//       } else if (platform === "twitter") {
//         window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
//       }
//     } catch (error) {
//       console.error("Error sharing news:", error);
//     }
//   };

//   const handleSave = (news) => {
//     setBookmarks((prev) =>
//       prev.includes(news.id)
//         ? prev.filter((id) => id !== news.id)
//         : [...prev, news.id]
//     );
//   };

//   const handleHeart = (newsId) => {
//     if (!newsId) return;

//     setHearts((prev) => {
//       const newHearts = { ...prev, [newsId]: !prev[newsId] };
//       return newHearts;
//     });
//   };

//   const handleComment = (newsId, commentText) => {
//     if (!newsId || !commentText?.trim()) return;

//     const newComment = {
//       id: Date.now(),
//       text: commentText,
//       date: new Date().toLocaleString("vi-VN"),
//       author: "Người dùng",
//       avatar: "https://via.placeholder.com/40",
//       likes: 0,
//     };

//     setComments((prev) => {
//       const updatedComments = {
//         ...prev,
//         [newsId]: [...(prev[newsId] || []), newComment],
//       };
//       console.log("Updated comments:", updatedComments); // Debug
//       return updatedComments;
//     });
//   };

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//   };

//   const handleNewsClick = (news) => {
//     if (!news) return;

//     setSelectedNews(news);
//     if (!readHistory.includes(news.id)) {
//       setReadHistory((prev) => [...prev, news.id].slice(0, 10));
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.pageYOffset > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const NewsDetail = ({ news, onBack }) => {
//     const [newComment, setNewComment] = useState("");
//     const relatedNews = newsData
//       .filter((n) => n.category === news.category && n.id !== news.id)
//       .slice(0, 3);

//     useEffect(() => {
//       console.log("NewsDetail mounted:", news);
//       console.log("Comments for this news:", comments[news.id]); // Debug
//     }, [news, comments]);

//     return (
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//         <div className="relative h-96">
//           <OptimizedImage
//             src={news.image}
//             alt={news.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//           <button
//             onClick={onBack}
//             className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
//           >
//             <FiArrowLeft size={24} />
//           </button>
//         </div>

//         <div className="p-8">
//           <div className="flex flex-wrap gap-2 mb-4">
//             {news.tags?.map((tag) => (
//               <span
//                 key={tag}
//                 className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           <h1 className="text-3xl font-bold mb-4 dark:text-white">
//             {news.title}
//           </h1>

//           <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-6">
//             <div className="flex items-center">
//               <FiClock className="mr-2" />
//               <span>{getReadingTime(news.wordCount)} phút đọc</span>
//             </div>
//             <div className="flex items-center">
//               <FiCalendar className="mr-2" />
//               <span>{new Date(news.date).toLocaleDateString("vi-VN")}</span>
//             </div>
//           </div>

//           <div className="prose dark:prose-invert max-w-none mb-8">
//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//               {news.description || "Không có mô tả"}
//             </p>
//             {news.content && (
//               <div className="mt-4">
//                 <h3 className="text-xl font-semibold dark:text-white">
//                   Nội dung chi tiết
//                 </h3>
//                 <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleHeart(news.id);
//                 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
//                   hearts[news.id]
//                     ? "bg-red-50 text-red-500 dark:bg-gray-700"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 <FiHeart className={hearts[news.id] ? "fill-current" : ""} />
//                 <span>{hearts[news.id] ? "Đã thích" : "Thích"}</span>
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleBookmark(news);
//                 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
//                   bookmarks.includes(news.id)
//                     ? "bg-yellow-50 text-yellow-500 dark:bg-gray-700"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 <FiBookmark
//                   className={bookmarks.includes(news.id) ? "fill-current" : ""}
//                 />
//                 <span>
//                   {bookmarks.includes(news.id) ? "Đã lưu" : "Lưu tin"}
//                 </span>
//               </button>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleShare(news, "facebook");
//                 }}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
//               >
//                 <FiFacebook size={20} />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleShare(news, "twitter");
//                 }}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
//               >
//                 <FiTwitter size={20} />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleShare(news, "copy");
//                 }}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
//               >
//                 <FiLink size={20} />
//               </button>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-4 dark:text-white">
//               Bình luận ({(comments[news.id] || []).length})
//             </h3>
//             <div className="flex gap-4 mb-6">
//               <input
//                 type="text"
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Viết bình luận của bạn..."
//                 className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-red-400 dark:text-white"
//               />
//               <button
//                 onClick={() => {
//                   if (newComment.trim()) {
//                     handleComment(news.id, newComment);
//                     setNewComment("");
//                   }
//                 }}
//                 className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 Gửi
//               </button>
//             </div>
//             <CommentSection
//               comments={comments[news.id] || []}
//               onAddComment={(text) => handleComment(news.id, text)}
//               onAddReply={(commentId, replyText) => {
//                 const newReply = {
//                   id: Date.now(),
//                   content: replyText,
//                   date: new Date().toLocaleString("vi-VN"),
//                   author: "Người dùng",
//                   avatar: "https://via.placeholder.com/32",
//                   likes: 0,
//                 };
//                 setComments((prev) => ({
//                   ...prev,
//                   [news.id]: (prev[news.id] || []).map((c) =>
//                     c.id === commentId
//                       ? { ...c, replies: [...(c.replies || []), newReply] }
//                       : c
//                   ),
//                 }));
//               }}
//             />
//           </div>

//           {relatedNews.length > 0 && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4 dark:text-white">
//                 Tin tức liên quan
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {relatedNews.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                     onClick={() => setSelectedNews(item)}
//                   >
//                     <OptimizedImage
//                       src={item.image}
//                       alt={item.title}
//                       className="w-24 h-24 object-cover rounded-lg"
//                     />
//                     <div>
//                       <h4 className="font-medium mb-2 line-clamp-2 dark:text-white">
//                         {item.title}
//                       </h4>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {new Date(item.date).toLocaleDateString("vi-VN")}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleRating = (newsId, rating) => {
//     setRatings((prev) => ({
//       ...prev,
//       [newsId]: rating,
//     }));
//   };

//   const handleBookmark = (news) => {
//     if (!news) return;

//     setBookmarks((prev) => {
//       const newBookmarks = prev.includes(news.id)
//         ? prev.filter((id) => id !== news.id)
//         : [...prev, news.id];
//       return newBookmarks;
//     });
//   };

//   const RatingStars = ({ newsId }) => {
//     const currentRating = ratings[newsId] || 0;
//     return (
//       <div className="flex items-center space-x-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <FiStar
//             key={star}
//             className={`cursor-pointer ${
//               star <= currentRating
//                 ? "text-yellow-500 fill-current"
//                 : "text-gray-400"
//             }`}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleRating(newsId, star);
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   const AdvancedSearch = () => (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Từ ngày
//           </label>
//           <input
//             type="date"
//             value={dateRange.start}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, start: e.target.value }))
//             }
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Đến ngày
//           </label>
//           <input
//             type="date"
//             value={dateRange.end}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, end: e.target.value }))
//             }
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//         </div>
//       </div>
//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//           Tags
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {getAllTags().map((tag) => (
//             <button
//               key={tag}
//               onClick={() =>
//                 setSelectedTags((prev) =>
//                   prev.includes(tag)
//                     ? prev.filter((t) => t !== tag)
//                     : [...prev, tag]
//                 )
//               }
//               className={`px-3 py-1 rounded-full text-sm ${
//                 selectedTags.includes(tag)
//                   ? "bg-red-500 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//               }`}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const getAllTags = () => {
//     const allTags = newsData.reduce((tags, news) => {
//       return [...tags, ...(news.tags || [])];
//     }, []);
//     return [...new Set(allTags)];
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     setShowSearchSuggestions(false);
//     if (!searchHistory.includes(term)) {
//       const newHistory = [term, ...searchHistory].slice(0, 5);
//       setSearchHistory(newHistory);
//     }
//   };

//   const handleQuickLinkClick = (tag) => {
//     setSelectedCategory(tag);
//     setCurrentPage(1);
//     const newsSection = document.getElementById("news-section");
//     if (newsSection) {
//       newsSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <SEO
//         title="TechNews - Tin tức công nghệ mới nhất"
//         description="Cập nhật tin tức công nghệ, đánh giá sản phẩm, khuyến mãi và nhiều hơn nữa"
//         image="https://example.com/og-image.jpg"
//         url={window.location.href}
//       />
//       <ReadingProgress />

//       <div
//         className={`min-h-screen ${
//           darkMode ? "dark bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <Header
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         />

//         <main className="container mx-auto px-4 pt-20">
//           <Navigation
//             categories={categories}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />

//           {selectedNews ? (
//             <NewsDetail
//               news={selectedNews}
//               onBack={() => setSelectedNews(null)}
//             />
//           ) : (
//             <div className="space-y-6">
//               <Breadcrumb
//                 items={[
//                   { label: "Trang chủ", path: "/" },
//                   { label: "Tin tức", path: "/news" },
//                 ]}
//               />

//               {isLoadingApi && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {Array(6)
//                     .fill()
//                     .map((_, i) => (
//                       <NewsCardSkeleton key={i} />
//                     ))}
//                 </div>
//               )}

//               {error && (
//                 <div className="text-center py-10">
//                   <p className="text-red-500 text-xl font-semibold mb-4">
//                     {error}
//                   </p>
//                   <button
//                     onClick={handleRetry}
//                     className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                   >
//                     Thử lại
//                   </button>
//                 </div>
//               )}

//               {!isLoadingApi && !error && newsData.length > 0 && (
//                 <>
//                   <QuickLinks onCategoryClick={handleQuickLinkClick} />
//                   <button
//                     onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
//                     className="mb-4 px-4 py-2 bg-red-500 text-white rounded-full"
//                   >
//                     {showAdvancedSearch
//                       ? "Ẩn tìm kiếm nâng cao"
//                       : "Tìm kiếm nâng cao"}
//                   </button>
//                   {showAdvancedSearch && <AdvancedSearch />}
//                   <MemoizedBannerSlider news={newsData} />
//                 </>
//               )}

//               <div id="news-section">
//                 {selectedCategory !== "Tất cả" ? (
//                   <MemoizedNewsGrid
//                     title={`Tin tức ${selectedCategory}`}
//                     news={paginatedNews}
//                     onNewsClick={handleNewsClick}
//                     bookmarks={bookmarks}
//                     hearts={hearts}
//                     handleBookmark={handleBookmark}
//                     handleHeart={handleHeart}
//                     handleShare={handleShare}
//                   />
//                 ) : (
//                   <>
//                     <MemoizedNewsGrid
//                       title="Tin tức nổi bật"
//                       news={newsData
//                         .filter((news) => news.tags?.includes("ưu đãi"))
//                         .slice(0, 6)}
//                       onNewsClick={handleNewsClick}
//                       bookmarks={bookmarks}
//                       hearts={hearts}
//                       handleBookmark={handleBookmark}
//                       handleHeart={handleHeart}
//                       handleShare={handleShare}
//                     />
//                     <MemoizedNewsGrid
//                       title="Tin tức mới nhất"
//                       news={paginatedNews}
//                       onNewsClick={handleNewsClick}
//                       bookmarks={bookmarks}
//                       hearts={hearts}
//                       handleBookmark={handleBookmark}
//                       handleHeart={handleHeart}
//                       handleShare={handleShare}
//                     />
//                   </>
//                 )}
//               </div>

//               {filteredNews.length > itemsPerPage && (
//                 <div className="flex justify-center gap-2 py-6">
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
//                   >
//                     Trang trước
//                   </button>
//                   {Array.from(
//                     { length: Math.ceil(filteredNews.length / itemsPerPage) },
//                     (_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`px-4 py-2 rounded-full ${
//                           currentPage === i + 1
//                             ? "bg-red-500 text-white"
//                             : "bg-gray-200 dark:bg-gray-700"
//                         }`}
//                       >
//                         {i + 1}
//                       </button>
//                     )
//                   )}
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) =>
//                         Math.min(
//                           prev + 1,
//                           Math.ceil(filteredNews.length / itemsPerPage)
//                         )
//                       )
//                     }
//                     disabled={
//                       currentPage ===
//                       Math.ceil(filteredNews.length / itemsPerPage)
//                     }
//                     className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
//                   >
//                     Trang sau
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {showScrollTop && (
//             <button
//               onClick={scrollToTop}
//               className="fixed bottom-8 right-8 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
//             >
//               <FiArrowUp size={24} />
//             </button>
//           )}
//         </main>
//       </div>
//     </>
//   );
// };

// export default NewsPage;

import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Breadcrumb,
  QuickLinks,
  BannerSlider,
  SEO,
  ReadingProgress,
  Header,
  Navigation,
  AdvancedSearch,
  NewsCardSkeleton,
  NewsGrid,
  NewsDetail,
} from "../components/news";
import { FiArrowUp } from "react-icons/fi";

// Custom hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

// Custom hook for filtering news
const useNewsFiltering = (newsData, filters) => {
  const {
    selectedCategory,
    searchTerm,
    dateRange,
    selectedTags,
    sortBy,
    bookmarks,
  } = filters;

  return useMemo(() => {
    let filtered = [...newsData];

    if (selectedCategory === "Đã Lưu") {
      filtered = filtered.filter((news) => bookmarks.includes(news.id));
    } else if (selectedCategory !== "Tất cả") {
      filtered = filtered.filter((news) =>
        news.tags.includes(selectedCategory)
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const searchTerms = searchLower
        .split(" ")
        .filter((term) => term.length > 0);
      filtered = filtered.filter((news) =>
        searchTerms.every(
          (term) =>
            news.title.toLowerCase().includes(term) ||
            news.description.toLowerCase().includes(term) ||
            news.tags.some((tag) => tag.toLowerCase().includes(term))
        )
      );
    }

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filtered = filtered.filter((news) => {
        const newsDate = new Date(news.date);
        return newsDate >= startDate && newsDate <= endDate;
      });
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((news) =>
        selectedTags.every((tag) => news.tags.includes(tag))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    newsData,
    selectedCategory,
    searchTerm,
    dateRange,
    selectedTags,
    sortBy,
    bookmarks,
  ]);
};

// Utility function for API error handling
const getErrorMessage = (error) => {
  if (!navigator.onLine) {
    return "Không có kết nối internet. Vui lòng kiểm tra lại kết nối và thử lại.";
  }
  if (error.code === "ECONNABORTED") {
    return "Server phản hồi quá chậm. Vui lòng thử lại sau.";
  }
  if (error.response?.status === 404) {
    return "Không tìm thấy dữ liệu tin tức.";
  }
  if (error.response?.status >= 500) {
    return "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";
  }
  return "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
};

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [error, setError] = useState(null);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const maxRetries = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc");
  const [darkMode, setDarkMode] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedTags, setSelectedTags] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Use custom hook for localStorage states
  const [comments, setComments] = useLocalStorage("newsComments", {});
  const [hearts, setHearts] = useLocalStorage("newsHearts", {});
  const [readHistory, setReadHistory] = useLocalStorage("readHistory", []);
  const [bookmarks, setBookmarks] = useLocalStorage("newsBookmarks", []);
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "searchHistory",
    []
  );
  const [ratings, setRatings] = useLocalStorage("ratings", {});
  const itemsPerPage = 9;
  const [categories, setCategories] = useState(["Tất cả"]);

  // Fetch dữ liệu từ API
  let isInitialMount = true;
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoadingApi(true);
        setError(null);

        const response = await axios.get(
          "https://ngochieuwedding.io.vn/api/su/news",
          {
            timeout: 8000,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.data?.data) {
          throw new Error("Không có dữ liệu tin tức");
        }

        const formattedNews = response.data.data.map((item) => ({
          id: item._id || Math.random().toString(36).substr(2, 9),
          title: item.title || "Không có tiêu đề",
          description: item.description || "Không có mô tả",
          content: item.body || "",
          image: item.thumbnail || "https://via.placeholder.com/400x300",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("vi-VN")
            : "Không rõ",
          category: "Tin tức",
          tags: Array.isArray(item.tags) ? item.tags : [],
          created_by: item.created_by || "Admin",
          wordCount: (item.description || "").split(" ").length || 0,
        }));

        setNewsData(formattedNews);
        const uniqueTags = [
          "Tất cả",
          ...new Set(formattedNews.flatMap((item) => item.tags)),
        ];
        setCategories(uniqueTags);
        setRetryAttempt(0);
      } catch (err) {
        console.error("Lỗi khi tải tin tức:", err);

        if (!isInitialMount) {
          if (retryAttempt < maxRetries) {
            setRetryAttempt((prev) => prev + 1);
            setTimeout(() => fetchNews(), 2000);
          } else {
            const errorMessage = getErrorMessage(err);
            setError(errorMessage);
          }
        }
      } finally {
        setIsLoadingApi(false);
        isInitialMount = false;
      }
    };

    fetchNews();
  }, []);

  // Thêm hàm retry thủ công
  const handleRetry = useCallback(() => {
    setRetryAttempt(0);
    setError(null);
    isInitialMount = false;
    setIsLoadingApi(true);
    const fetchNews = async () => {
      try {
        setIsLoadingApi(true);
        setError(null);

        const response = await axios.get(
          "https://ngochieuwedding.io.vn/api/su/news",
          {
            timeout: 8000,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.data?.data) {
          throw new Error("Không có dữ liệu tin tức");
        }

        const formattedNews = response.data.data.map((item) => ({
          id: item._id || Math.random().toString(36).substr(2, 9),
          title: item.title || "Không có tiêu đề",
          description: item.description || "Không có mô tả",
          content: item.body || "",
          image: item.thumbnail || "https://via.placeholder.com/400x300",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("vi-VN")
            : "Không rõ",
          category: "Tin tức",
          tags: Array.isArray(item.tags) ? item.tags : [],
          created_by: item.created_by || "Admin",
          wordCount: (item.description || "").split(" ").length || 0,
        }));

        setNewsData(formattedNews);
        const uniqueTags = [
          "Tất cả",
          ...new Set(formattedNews.flatMap((item) => item.tags)),
        ];
        setCategories(uniqueTags);
        setRetryAttempt(0);
      } catch (err) {
        console.error("Lỗi khi tải tin tức:", err);
        if (retryAttempt < maxRetries) {
          setRetryAttempt((prev) => prev + 1);
          setTimeout(() => fetchNews(), 2000);
        } else {
          const errorMessage = getErrorMessage(err);
          setError(errorMessage);
        }
      } finally {
        setIsLoadingApi(false);
      }
    };
    fetchNews();
  }, []);

  // Use custom hook for filtering
  const filteredNews = useNewsFiltering(newsData, {
    selectedCategory,
    searchTerm,
    dateRange,
    selectedTags,
    sortBy,
    bookmarks,
  });

  const paginatedNews = useMemo(() => {
    return filteredNews.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredNews, currentPage, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredNews.length / itemsPerPage),
    [filteredNews.length, itemsPerPage]
  );

  const handleShare = (news, platform) => {
    if (!news) return;

    try {
      const url = `${window.location.origin}/news/${news.id}`;
      const text = encodeURIComponent(news.title);

      if (platform === "copy") {
        navigator.clipboard.writeText(url);
      } else if (platform === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
      } else if (platform === "twitter") {
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
      }
    } catch (error) {
      console.error("Error sharing news:", error);
    }
  };

  const handleBookmark = (news) => {
    if (!news) return;

    setBookmarks((prev) =>
      prev.includes(news.id)
        ? prev.filter((id) => id !== news.id)
        : [...prev, news.id]
    );
  };

  const handleHeart = (newsId) => {
    if (!newsId) return;

    setHearts((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  };

  const handleComment = (newsId, commentText) => {
    if (!newsId || !commentText?.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      date: new Date().toLocaleString("vi-VN"),
      author: "Người dùng",
      avatar: "https://via.placeholder.com/40",
      likes: 0,
    };

    setComments((prev) => ({
      ...prev,
      [newsId]: [...(prev[newsId] || []), newComment],
    }));
  };

  const handleNewsClick = (news) => {
    if (!news) return;

    setSelectedNews(news);
    if (!readHistory.includes(news.id)) {
      setReadHistory((prev) => [...prev, news.id].slice(0, 10));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLinkClick = (tag) => {
    setSelectedCategory(tag);
    setCurrentPage(1);
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SEO
        title="TechNews - Tin tức công nghệ mới nhất"
        description="Cập nhật tin tức công nghệ, đánh giá sản phẩm, khuyến mãi và nhiều hơn nữa"
        image="https://example.com/og-image.jpg"
        url={window.location.href}
      />
      <ReadingProgress />

      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="container mx-auto px-4 pt-20">
          <Navigation
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {selectedNews ? (
            <NewsDetail
              news={selectedNews}
              onBack={() => setSelectedNews(null)}
              comments={comments}
              setComments={setComments}
              hearts={hearts}
              setHearts={setHearts}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              handleShare={handleShare}
              handleBookmark={handleBookmark}
              handleHeart={handleHeart}
              handleComment={handleComment}
              newsData={newsData}
            />
          ) : (
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { label: "Trang chủ", path: "/" },
                  { label: "Tin tức", path: "/news" },
                ]}
              />

              {isLoadingApi && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6)
                    .fill()
                    .map((_, i) => (
                      <NewsCardSkeleton key={i} />
                    ))}
                </div>
              )}

              {error && (
                <div className="text-center py-10">
                  <p className="text-red-500 text-xl font-semibold mb-4">
                    {error}
                  </p>
                  <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {!isLoadingApi && !error && newsData.length > 0 && (
                <>
                  <QuickLinks onCategoryClick={handleQuickLinkClick} />
                  <button
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="mb-4 px-4 py-2 bg-red-500 text-white rounded-full"
                  >
                    {showAdvancedSearch
                      ? "Ẩn tìm kiếm nâng cao"
                      : "Tìm kiếm nâng cao"}
                  </button>
                  {showAdvancedSearch && (
                    <AdvancedSearch
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      getAllTags={() => [
                        ...new Set(newsData.flatMap((item) => item.tags)),
                      ]}
                    />
                  )}
                  <BannerSlider news={newsData} />
                </>
              )}

              <div id="news-section">
                {selectedCategory !== "Tất cả" ? (
                  <NewsGrid
                    title={`Tin tức ${selectedCategory}`}
                    news={paginatedNews}
                    onNewsClick={handleNewsClick}
                    bookmarks={bookmarks}
                    hearts={hearts}
                    handleBookmark={handleBookmark}
                    handleHeart={handleHeart}
                    handleShare={handleShare}
                  />
                ) : (
                  <>
                    <NewsGrid
                      title="Tin tức nổi bật"
                      news={newsData
                        .filter((news) => news.tags?.includes("ưu đãi"))
                        .slice(0, 6)}
                      onNewsClick={handleNewsClick}
                      bookmarks={bookmarks}
                      hearts={hearts}
                      handleBookmark={handleBookmark}
                      handleHeart={handleHeart}
                      handleShare={handleShare}
                    />
                    <NewsGrid
                      title="Tin tức mới nhất"
                      news={paginatedNews}
                      onNewsClick={handleNewsClick}
                      bookmarks={bookmarks}
                      hearts={hearts}
                      handleBookmark={handleBookmark}
                      handleHeart={handleHeart}
                      handleShare={handleShare}
                    />
                  </>
                )}
              </div>

              {filteredNews.length > itemsPerPage && (
                <div className="flex justify-center gap-2 py-6">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                  >
                    Trang trước
                  </button>
                  {Array.from(
                    { length: Math.ceil(filteredNews.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-full ${
                          currentPage === i + 1
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredNews.length / itemsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredNews.length / itemsPerPage)
                    }
                    className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                  >
                    Trang sau
                  </button>
                </div>
              )}
            </div>
          )}

          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <FiArrowUp size={24} />
            </button>
          )}
        </main>
      </div>
    </>
  );
};

export default NewsPage;
