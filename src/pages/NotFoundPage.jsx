import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mt-2">
          Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            to="/"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Về Trang Chủ
          </Link>
          <Link
            to="/list/man"
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
          >
            Xem Sản Phẩm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
