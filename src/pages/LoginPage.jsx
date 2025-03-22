/**
 * LoginPage Component
 * 
 * Chức năng chính:
 * 1. Authentication:
 *    - User login
 *    - User registration
 *    - Password reset
 *    - Form validation
 * 
 * 2. State Management:
 *    - Login/Register toggle
 *    - Form input handling
 *    - Loading states
 *    - Error handling
 * 
 * 3. Security Features:
 *    - Password validation
 *    - Email validation
 *    - Local storage management
 *    - Password visibility toggle
 * 
 * 4. User Experience:
 *    - Toast notifications
 *    - Loading indicators
 *    - Responsive design
 *    - Keyboard navigation
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * LoginPage Component
 * @component
 * @description Handles user authentication, registration, and password reset
 */
const LoginPage = () => {
  // Form State
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks
  const { login } = useCart();
  const navigate = useNavigate();

  /**
   * Toggles between login and registration forms
   */
  const toggleForm = () => setIsLogin(!isLogin);

  /**
   * Validates email format
   * @param {string} email
   * @returns {boolean}
   */
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /**
   * Validates password length
   * @param {string} password
   * @returns {boolean}
   */
  const validatePassword = (password) => password.length >= 6;

  /**
   * Handles user login
   */
  const handleLogin = async () => {
    setIsLoading(true);
    const result = await login(username, password);
    if (result.success) {
      toast.success("Đăng nhập thành công!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  /**
   * Handles user registration
   */
  const handleRegister = () => {
    setIsLoading(true);
    if (!username || !email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ!");
      setIsLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      setIsLoading(false);
      return;
    }
    try {
      const storedUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      if (storedUsers.some((u) => u.username === username)) {
        toast.error("Tên đăng nhập đã tồn tại!");
        setIsLoading(false);
        return;
      }
      if (storedUsers.some((u) => u.email === email)) {
        toast.error("Email đã được sử dụng!");
        setIsLoading(false);
        return;
      }
      const newUser = { username, email, password };
      storedUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsLogin(true);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng ký!");
    }
    setIsLoading(false);
  };

  /**
   * Handles password reset
   */
  const handleResetPassword = () => {
    setIsLoading(true);
    if (!email) {
      toast.error("Vui lòng nhập email!");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ!");
      setIsLoading(false);
      return;
    }
    if (!newPassword || !validatePassword(newPassword)) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
      setIsLoading(false);
      return;
    }
    try {
      const storedUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const userIndex = storedUsers.findIndex((u) => u.email === email);
      if (userIndex === -1) {
        toast.error("Không tìm thấy email này!");
        setIsLoading(false);
        return;
      }
      storedUsers[userIndex].password = newPassword;
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.");
      setIsResetPassword(false);
      setIsLogin(true);
      setEmail("");
      setNewPassword("");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đặt lại mật khẩu!");
    }
    setIsLoading(false);
  };

  /**
   * Handles key press event
   * @param {KeyboardEvent} e
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isResetPassword) handleResetPassword();
      else if (isLogin) handleLogin();
      else handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Panel bên trái */}
        <div
          className={`w-full md:w-1/2 bg-blue-600 p-8 text-white flex flex-col justify-center items-center transition-all duration-500 transform ${
            isLogin ? "md:order-1" : "md:order-2"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? "Chào Mừng Trở Lại!" : "Xin Chào!"}
          </h2>
          <p className="text-sm mb-6 text-center">
            {isLogin
              ? "Đăng nhập để tiếp tục mua sắm"
              : "Tạo tài khoản để bắt đầu trải nghiệm"}
          </p>
          <button
            onClick={toggleForm}
            className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            {isLogin ? "Đăng Ký" : "Đăng Nhập"}
          </button>
        </div>

        {/* Form container */}
        <div className="w-full md:w-1/2 p-8">
          {/* Form Đăng ký */}
          <div className={`${isLogin || isResetPassword ? "hidden" : "block"}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng Ký</h2>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Đăng Ký
              </button>
            </div>
          </div>

          {/* Form Đăng nhập */}
          <div
            className={`${isLogin && !isResetPassword ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng Nhập</h2>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
              <div className="text-right">
                <button
                  onClick={() => {
                    setIsResetPassword(true);
                    setUsername("");
                    setPassword("");
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Đăng Nhập
              </button>
            </div>
          </div>

          {/* Form Đặt lại mật khẩu */}
          <div className={`${isResetPassword ? "block" : "hidden"}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đặt Lại Mật Khẩu
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Đặt Lại Mật Khẩu
              </button>
              <button
                onClick={() => setIsResetPassword(false)}
                className="w-full text-blue-600 text-sm hover:underline"
              >
                Quay lại Đăng Nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
