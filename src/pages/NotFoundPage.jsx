import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";
import "../compunents/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-image">
          <img
            src="https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741955990/5340.jpg_wh860_le0isk.jpg"
            alt="404 Error"
            className="error-illustration"
          />
        </div>
        <h1>404</h1>
        <h2>Không tìm thấy trang</h2>
        <p>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="action-buttons">
          <Link to="/" className="action-button home-button">
            <FiHome className="icon" />
            Về trang chủ
          </Link>
          <button
            onClick={() => window.history.back()}
            className="action-button back-button"
          >
            <FiArrowLeft className="icon" />
            Quay lại
          </button>
          <Link to="/search" className="action-button search-button">
            <FiSearch className="icon" />
            Tìm kiếm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
