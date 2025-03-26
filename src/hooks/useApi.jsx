// import { useState } from "react";

// const BASE_URL = "https://ngochieuwedding.io.vn/api";

// const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const request = async (method, endpoint, data = {}, id = "") => {
//     setLoading(true);
//     console.log(
//       "Request started - loading:",
//       true,
//       "method:",
//       method,
//       "endpoint:",
//       endpoint,
//       "id:",
//       id,
//       "data:",
//       data
//     );

//     try {
//       const url = id ? `${BASE_URL}${endpoint}${id}` : `${BASE_URL}${endpoint}`;
//       const resp = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: method !== "GET" ? JSON.stringify(data) : undefined,
//       });

//       const result = await resp.json();
//       console.log("Response received:", resp.status, result);

//       if (!resp.ok) {
//         throw new Error(
//           result.message || `Request failed with status ${resp.status}`
//         );
//       }

//       setLoading(false);
//       console.log("Request completed - loading:", false);
//       return result;
//     } catch (err) {
//       console.error("Request error:", err);
//       setError(err.message);
//       setLoading(false);
//       console.log("Request failed - loading:", false);
//       throw err;
//     }
//   };

//   return { request, loading, error };
// };

// export default useApi;

import { useState } from "react";

// Đặt URL gốc cho API
const BASE_URL = "https://ngochieuwedding.io.vn/api";

const useApi = () => {
  // State để theo dõi trạng thái loading
  const [loading, setLoading] = useState(false);
  // State để lưu thông báo lỗi khi request thất bại
  const [error, setError] = useState(null);

  /**
   * @function request
   * @description Hàm gửi request đến API
   * @param {string} method - Phương thức HTTP (GET, POST, PUT, PATCH, DELETE)
   * @param {string} endpoint - Đường dẫn API (ví dụ: "/su/product")
   * @param {object} data - Dữ liệu gửi lên (nếu có)
   * @param {string} id - ID của đối tượng (nếu có)
   * @returns {Promise<any>} - Kết quả trả về từ API
   */
  const request = async (method, endpoint, data = {}, id = "") => {
    setLoading(true); // Bắt đầu request → chuyển trạng thái loading thành true
    console.log(
      "Request started - loading:",
      true,
      "method:",
      method,
      "endpoint:",
      endpoint,
      "id:",
      id,
      "data:",
      data
    );

    try {
      // Tạo URL đầy đủ từ BASE_URL, endpoint và id (nếu có)
      const url = id ? `${BASE_URL}${endpoint}${id}` : `${BASE_URL}${endpoint}`;

      // Gửi request đến API bằng fetch
      const resp = await fetch(url, {
        method, // Phương thức HTTP
        headers: {
          "Content-Type": "application/json", // Đặt kiểu dữ liệu JSON
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined, // Chỉ gửi body nếu không phải GET
      });

      // Chuyển kết quả trả về từ JSON thành object
      const result = await resp.json();
      console.log("Response received:", resp.status, result);

      // Kiểm tra trạng thái HTTP (nếu mã không phải 200-299 thì ném lỗi)
      if (!resp.ok) {
        throw new Error(
          result.message || `Request failed with status ${resp.status}`
        );
      }

      setLoading(false); // Thành công → chuyển trạng thái loading về false
      console.log("Request completed - loading:", false);

      return result; // Trả về kết quả thành công
    } catch (err) {
      console.error("Request error:", err);
      setError(err.message); // Lưu thông báo lỗi vào state
      setLoading(false); // Thất bại → chuyển trạng thái loading về false
      console.log("Request failed - loading:", false);
      throw err; // Ném lỗi để xử lý ở component gọi request
    }
  };

  // Trả về các giá trị và hàm để sử dụng trong component
  return { request, loading, error };
};

export default useApi;
