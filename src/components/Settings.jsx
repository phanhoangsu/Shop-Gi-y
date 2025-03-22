/**
 * Component cài đặt hệ thống
 * Props:
 * - onUpdatePassword: Callback cập nhật mật khẩu
 * 
 * Chức năng:
 * - Đổi mật khẩu người dùng
 * - Kiểm tra mật khẩu hiện tại
 * - Validate mật khẩu mới:
 *   + Độ dài tối thiểu 4 ký tự
 *   + Khớp với xác nhận mật khẩu
 * - Hiển thị thông báo lỗi
 * - Reset form sau khi đổi thành công
 */
import React, { useState } from "react";

const Settings = ({ onUpdatePassword }) => {
  // State quản lý form đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  /**
   * Xử lý thay đổi giá trị input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Xử lý submit form đổi mật khẩu
   * - Kiểm tra mật khẩu hiện tại
   * - Validate mật khẩu mới
   * - Gọi callback cập nhật
   * - Reset form và thông báo
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Kiểm tra mật khẩu hiện tại (giả lập là "1234", bạn có thể thay đổi logic này)
    if (currentPassword !== "1234") {
      setError("Mật khẩu hiện tại không đúng!");
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp với xác nhận!");
      return;
    }

    // Kiểm tra độ dài tối thiểu của mật khẩu mới
    if (newPassword.length < 4) {
      setError("Mật khẩu mới phải có ít nhất 4 ký tự!");
      return;
    }

    // Gọi callback cập nhật mật khẩu
    onUpdatePassword(newPassword);
    
    // Reset form và thông báo thành công
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    alert("Mật khẩu đã được cập nhật thành công!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Cài đặt hệ thống
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        {/* Mật khẩu hiện tại */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
        </div>

        {/* Mật khẩu mới */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu mới
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Xác nhận mật khẩu mới"
            required
          />
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Nút gửi */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() =>
              setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Xóa trắng
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
