// import React, { useState } from "react";
// import { IoMdCloseCircleOutline } from "react-icons/io";

// const ManPage = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [showSizeChart, setShowSizeChart] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const itemsPerPage = 4; // Số sản phẩm trên mỗi trang

//   const sampleProducts = [
//     {
//       id: "01",
//       name: "Giày lecos",
//       price: "1.200.000đ",
//       image:
//         "https://bizweb.dktcdn.net/100/527/490/products/giay-nam-cao-cap-da-that-lecos-lg8-2-1731770099469.jpg?v=1731771540970",
//       colors: ["Đỏ", "Trắng"],
//       sizes: [10, 10.5, 8, 9, 5.5, 6, 6.5, 7, 7.5, 8.5, 9.5],
//       description:
//         "Giày da cao cấp Lecos, thiết kế sang trọng, phù hợp với các dịp quan trọng. Chất liệu da thật, độ bền cao và thoải mái khi sử dụng. Sản phẩm được gia công tỉ mỉ, mang lại cảm giác sang trọng và đẳng cấp cho người dùng.",
//     },
//     {
//       id: "02",
//       name: "Giày sneaker",
//       price: "950.000đ",
//       image:
//         "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyx1zah6468x27",
//       colors: ["Xanh", "Đen"],
//       sizes: [40, 41, 42, 43],
//       description:
//         "Sneaker phong cách trẻ trung, nhẹ nhàng, lý tưởng cho đi học và dạo phố. Đệm êm ái, hỗ trợ vận động tốt. Thiết kế hiện đại với chất liệu cao cấp, phù hợp cho mọi lứa tuổi.",
//     },
//     {
//       id: "03",
//       name: "Giày thể thao cao cấp",
//       price: "1.500.000đ",
//       image: "https://example.com/giay-the-thao-cao-cap.jpg", // Thay bằng URL ảnh thực tế
//       colors: ["Đen", "Xám", "Trắng"],
//       sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
//       description:
//         "Giày thể thao cao cấp với công nghệ chống trơn trượt, phù hợp cho tập luyện chuyên sâu. Thiết kế hiện đại, thoáng khí, hỗ trợ tối đa cho các vận động viên.",
//     },
//     {
//       id: "04",
//       name: "Giày da nam sang trọng",
//       price: "1.800.000đ",
//       image: "https://example.com/giay-da-nam-sang-trong.jpg", // Thay bằng URL ảnh thực tế
//       colors: ["Nâu", "Đen", "Xám"],
//       sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
//       description:
//         "Giày da nam cao cấp, phong cách lịch lãm, phù hợp với công việc và sự kiện trang trọng. Chất liệu da bò tự nhiên, gia công thủ công, mang lại độ bền cao.",
//     },
//     {
//       id: "05",
//       name: "Giày chạy bộ chuyên nghiệp",
//       price: "1.300.000đ",
//       image: "https://example.com/giay-chay-bo-chuyen-nghiep.jpg", // Thay bằng URL ảnh thực tế
//       colors: ["Xanh", "Đỏ", "Trắng"],
//       sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5],
//       description:
//         "Giày chạy bộ chuyên nghiệp, hỗ trợ giảm chấn, tăng hiệu suất vận động. Thiết kế tối ưu cho người yêu thể thao, phù hợp cho chạy đường dài.",
//     },
//     {
//       id: "06",
//       name: "Giày thời trang phong cách",
//       price: "1.100.000đ",
//       image: "https://example.com/giay-thoi-trang-phong-cach.jpg", // Thay bằng URL ảnh thực tế
//       colors: ["Đen", "Trắng", "Xanh"],
//       sizes: [8, 8.5, 9, 9.5, 10, 10.5],
//       description:
//         "Giày thời trang với thiết kế độc đáo, phù hợp cho các buổi hẹn hò hoặc dạo chơi. Chất liệu cao cấp, bền đẹp, phong cách cá tính.",
//     },
//     {
//       id: "07",
//       name: "Giày thể thao năng động",
//       price: "1.000.000đ",
//       image: "https://example.com/giay-the-thao-nang-dong.jpg", // Thay bằng URL ảnh thực tế
//       colors: ["Đỏ", "Xám", "Đen"],
//       sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5],
//       description:
//         "Giày thể thao năng động, nhẹ nhàng, hỗ trợ tối đa cho các hoạt động ngoài trời. Thiết kế hiện đại, trẻ trung, phù hợp cho phong cách năng động.",
//     },
//   ];

//   const openPopup = (product) => {
//     setSelectedProduct(product);
//     setSelectedColor(product.colors ? product.colors[0] : null);
//     setSelectedSize(product.sizes ? product.sizes[0] : null);
//     setQuantity(1);
//   };

//   const addToCart = () => {
//     if (selectedProduct.sizes && !selectedSize) {
//       alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
//       return;
//     }
//     console.log(
//       `Thêm ${quantity} sản phẩm "${selectedProduct.name}" ${
//         selectedColor ? `(Màu: ${selectedColor})` : ""
//       } ${selectedSize ? `(Size: ${selectedSize})` : ""} vào giỏ hàng!`
//     );
//     setSelectedProduct(null);
//   };

//   const sizeChart = {
//     5.5: { length: "22.5 cm", width: "8.5 cm" },
//     6: { length: "23 cm", width: "8.7 cm" },
//     6.5: { length: "23.5 cm", width: "8.9 cm" },
//     7: { length: "24 cm", width: "9.0 cm" },
//     7.5: { length: "24.5 cm", width: "9.2 cm" },
//     8: { length: "25 cm", width: "9.4 cm" },
//     8.5: { length: "25.5 cm", width: "9.6 cm" },
//     9: { length: "26 cm", width: "9.8 cm" },
//     9.5: { length: "26.5 cm", width: "10.0 cm" },
//     10: { length: "27 cm", width: "10.2 cm" },
//     10.5: { length: "27.5 cm", width: "10.4 cm" },
//   };

//   // Logic phân trang
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = sampleProducts.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(sampleProducts.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Giày nam</h1>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {currentProducts.map((product) => (
//           <div
//             key={product.id}
//             className="border p-2 rounded-lg cursor-pointer hover:shadow-lg"
//             onClick={() => openPopup(product)}
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
//             <p className="text-red-500 font-bold">{product.price}</p>
//           </div>
//         ))}
//       </div>

//       {/* Phân trang */}
//       <div className="mt-4 flex justify-center items-center space-x-2">
//         <button
//           onClick={prevPage}
//           className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             className={`px-4 py-2 ${
//               currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
//             } rounded`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           onClick={nextPage}
//           className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//         <span>
//           Trang {currentPage} / {totalPages}
//         </span>
//       </div>

//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto">
//             <button
//               className="absolute top-2 right-2 text-gray-500"
//               onClick={() => setSelectedProduct(null)}
//             >
//               <IoMdCloseCircleOutline size={24} />
//             </button>
//             <img
//               src={selectedProduct.image}
//               alt={selectedProduct.name}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h2 className="text-xl font-bold mt-2">{selectedProduct.name}</h2>
//             <p className="text-red-500 font-bold">{selectedProduct.price}</p>

//             {/* Phần giới thiệu sản phẩm */}
//             <div className="mt-2">
//               <p className="font-semibold">Giới thiệu:</p>
//               <p className="text-gray-600">{selectedProduct.description}</p>
//             </div>

//             {selectedProduct.colors && (
//               <div className="mt-2">
//                 <p className="font-semibold">Màu sắc:</p>
//                 <div className="flex space-x-2 mt-1">
//                   {selectedProduct.colors.map((color) => (
//                     <button
//                       key={color}
//                       className={`p-2 border rounded-full ${
//                         selectedColor === color
//                           ? "border-black bg-gray-200"
//                           : "border-gray-300"
//                       }`} // Thêm bg-gray-200 khi chọn
//                       onClick={() => setSelectedColor(color)}
//                     >
//                       <span
//                         className={`w-4 h-4 inline-block rounded-full ${
//                           color === "Đỏ"
//                             ? "bg-red-500"
//                             : color === "Trắng"
//                             ? "bg-white border"
//                             : color === "Xanh"
//                             ? "bg-blue-500"
//                             : color === "Xám"
//                             ? "bg-gray-500"
//                             : color === "Nâu"
//                             ? "bg-yellow-800"
//                             : "bg-black"
//                         }`}
//                       ></span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedProduct.sizes && (
//               <div className="mt-2">
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold">Size:</p>
//                   <button
//                     className="text-blue-500 underline"
//                     onClick={() => setShowSizeChart(true)}
//                   >
//                     Bảng số đo
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-6 gap-2 mt-1">
//                   {selectedProduct.sizes.map((size) => (
//                     <button
//                       key={size}
//                       className={`p-2 border rounded ${
//                         selectedSize === size ? "border-black bg-gray-200" : ""
//                       }`}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mt-2">
//               <p className="font-semibold">Số lượng:</p>
//               <div className="flex items-center space-x-2 mt-1">
//                 <button
//                   className="border p-2"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 >
//                   -
//                 </button>
//                 <span>{quantity}</span>
//                 <button
//                   className="border p-2"
//                   onClick={() => setQuantity(quantity + 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <button
//               className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
//               onClick={addToCart}
//             >
//               Thêm vào giỏ hàng
//             </button>
//           </div>
//         </div>
//       )}

//       {showSizeChart && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative max-h-[80vh] overflow-y-auto">
//             <button
//               className="absolute top-2 right-2 text-gray-500"
//               onClick={() => setShowSizeChart(false)}
//             >
//               <IoMdCloseCircleOutline size={24} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Bảng số đo</h2>
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Size</th>
//                   <th className="border p-2">Chiều dài</th>
//                   <th className="border p-2">Chiều rộng</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(sizeChart).map(([size, measurements]) => (
//                   <tr key={size}>
//                     <td className="border p-2">{size}</td>
//                     <td className="border p-2">{measurements.length}</td>
//                     <td className="border p-2">{measurements.width}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManPage;

import React, { useState } from "react";
import { IoMdCloseCircleOutline, IoMdSearch } from "react-icons/io";

const ManPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const itemsPerPage = 4;

  const sampleProducts = [
    {
      id: "01",
      name: "Giày lecos",
      price: "1.200.000đ",
      image:
        "https://bizweb.dktcdn.net/100/527/490/products/giay-nam-cao-cap-da-that-lecos-lg8-2-1731770099469.jpg?v=1731771540970",
      colors: ["Đỏ", "Trắng"],
      sizes: [10, 10.5, 8, 9, 5.5, 6, 6.5, 7, 7.5, 8.5, 9.5],
      description:
        "Giày da cao cấp Lecos, thiết kế sang trọng, phù hợp với các dịp quan trọng. Chất liệu da thật, độ bền cao và thoải mái khi sử dụng. Sản phẩm được gia công tỉ mỉ, mang lại cảm giác sang trọng và đẳng cấp cho người dùng.",
    },
    {
      id: "02",
      name: "Giày sneaker",
      price: "950.000đ",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyx1zah6468x27",
      colors: ["Xanh", "Đen"],
      sizes: [40, 41, 42, 43],
      description:
        "Sneaker phong cách trẻ trung, nhẹ nhàng, lý tưởng cho đi học và dạo phố. Đệm êm ái, hỗ trợ vận động tốt. Thiết kế hiện đại với chất liệu cao cấp, phù hợp cho mọi lứa tuổi.",
    },
    {
      id: "03",
      name: "Giày thể thao cao cấp",
      price: "1.500.000đ",
      image: "https://example.com/giay-the-thao-cao-cap.jpg",
      colors: ["Đen", "Xám", "Trắng"],
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
      description:
        "Giày thể thao cao cấp với công nghệ chống trơn trượt, phù hợp cho tập luyện chuyên sâu. Thiết kế hiện đại, thoáng khí, hỗ trợ tối đa cho các vận động viên.",
    },
    {
      id: "04",
      name: "Giày da nam sang trọng",
      price: "1.800.000đ",
      image: "https://example.com/giay-da-nam-sang-trong.jpg",
      colors: ["Nâu", "Đen", "Xám"],
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
      description:
        "Giày da nam cao cấp, phong cách lịch lãm, phù hợp với công việc và sự kiện trang trọng. Chất liệu da bò tự nhiên, gia công thủ công, mang lại độ bền cao.",
    },
    {
      id: "05",
      name: "Giày chạy bộ chuyên nghiệp",
      price: "1.300.000đ",
      image: "https://example.com/giay-chay-bo-chuyen-nghiep.jpg",
      colors: ["Xanh", "Đỏ", "Trắng"],
      sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5],
      description:
        "Giày chạy bộ chuyên nghiệp, hỗ trợ giảm chấn, tăng hiệu suất vận động. Thiết kế tối ưu cho người yêu thể thao, phù hợp cho chạy đường dài.",
    },
    {
      id: "06",
      name: "Giày thời trang phong cách",
      price: "1.100.000đ",
      image: "https://example.com/giay-thoi-trang-phong-cach.jpg",
      colors: ["Đen", "Trắng", "Xanh"],
      sizes: [8, 8.5, 9, 9.5, 10, 10.5],
      description:
        "Giày thời trang với thiết kế độc đáo, phù hợp cho các buổi hẹn hò hoặc dạo chơi. Chất liệu cao cấp, bền đẹp, phong cách cá tính.",
    },
    {
      id: "07",
      name: "Giày thể thao năng động",
      price: "1.000.000đ",
      image: "https://example.com/giay-the-thao-nang-dong.jpg",
      colors: ["Đỏ", "Xám", "Đen"],
      sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5],
      description:
        "Giày thể thao năng động, nhẹ nhàng, hỗ trợ tối đa cho các hoạt động ngoài trời. Thiết kế hiện đại, trẻ trung, phù hợp cho phong cách năng động.",
    },
  ];

  const openPopup = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors ? product.colors[0] : null);
    setSelectedSize(product.sizes ? product.sizes[0] : null);
    setQuantity(1);
  };

  const addToCart = () => {
    if (selectedProduct.sizes && !selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }
    console.log(
      `Thêm ${quantity} sản phẩm "${selectedProduct.name}" ${
        selectedColor ? `(Màu: ${selectedColor})` : ""
      } ${selectedSize ? `(Size: ${selectedSize})` : ""} vào giỏ hàng!`
    );
    setSelectedProduct(null);
  };

  const sizeChart = {
    5.5: { length: "22.5 cm", width: "8.5 cm" },
    6: { length: "23 cm", width: "8.7 cm" },
    6.5: { length: "23.5 cm", width: "8.9 cm" },
    7: { length: "24 cm", width: "9.0 cm" },
    7.5: { length: "24.5 cm", width: "9.2 cm" },
    8: { length: "25 cm", width: "9.4 cm" },
    8.5: { length: "25.5 cm", width: "9.6 cm" },
    9: { length: "26 cm", width: "9.8 cm" },
    9.5: { length: "26.5 cm", width: "10.0 cm" },
    10: { length: "27 cm", width: "10.2 cm" },
    10.5: { length: "27.5 cm", width: "10.4 cm" },
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header với tiêu đề và ô tìm kiếm */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Giày nam</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdSearch size={24} />
          </button>
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Tìm giày..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
              }}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48 transition-all duration-300"
            />
          )}
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="border p-2 rounded-lg cursor-pointer hover:shadow-lg"
              onClick={() => openPopup(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-red-500 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Không tìm thấy sản phẩm nào.
        </p>
      )}

      {/* Phân trang */}
      {filteredProducts.length > 0 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              } rounded`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
      )}

      {/* Popup sản phẩm */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedProduct(null)}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{selectedProduct.name}</h2>
            <p className="text-red-500 font-bold">{selectedProduct.price}</p>

            <div className="mt-2">
              <p className="font-semibold">Giới thiệu:</p>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>

            {selectedProduct.colors && (
              <div className="mt-2">
                <p className="font-semibold">Màu sắc:</p>
                <div className="flex space-x-2 mt-1">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`p-2 border rounded-full ${
                        selectedColor === color
                          ? "border-black bg-gray-200"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span
                        className={`w-4 h-4 inline-block rounded-full ${
                          color === "Đỏ"
                            ? "bg-red-500"
                            : color === "Trắng"
                            ? "bg-white border"
                            : color === "Xanh"
                            ? "bg-blue-500"
                            : color === "Xám"
                            ? "bg-gray-500"
                            : color === "Nâu"
                            ? "bg-yellow-800"
                            : "bg-black"
                        }`}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.sizes && (
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Size:</p>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowSizeChart(true)}
                  >
                    Bảng số đo
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2 mt-1">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`p-2 border rounded ${
                        selectedSize === size ? "border-black bg-gray-200" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-2">
              <p className="font-semibold">Số lượng:</p>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  className="border p-2"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="border p-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}

      {/* Popup bảng số đo */}
      {showSizeChart && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowSizeChart(false)}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Bảng số đo</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Chiều dài</th>
                  <th className="border p-2">Chiều rộng</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(sizeChart).map(([size, measurements]) => (
                  <tr key={size}>
                    <td className="border p-2">{size}</td>
                    <td className="border p-2">{measurements.length}</td>
                    <td className="border p-2">{measurements.width}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManPage;
