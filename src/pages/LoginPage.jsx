import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCart();
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await login(username, password);
    if (result.success) {
      toast.success("Đăng nhập thành công!");
      setTimeout(() => navigate("/cart"), 1000);
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      isLogin ? handleLogin() : handleRegister();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div
          className={`absolute top-0 w-1/2 h-full bg-blue-600 rounded-r-[100px] transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome Back!" : "Hello, Welcome!"}
            </h2>
            <p className="text-white mt-2 text-sm">
              {isLogin ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={toggleForm}
              className="mt-4 px-6 py-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </div>

        <div className="flex">
          <div
            className={`w-1/2 p-10 transition-opacity duration-500 ${
              isLogin ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Registration
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-10 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
              </span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Register
            </button>
          </div>

          <div
            className={`w-1/2 p-10 transition-opacity duration-500 ${
              isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-10 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
              </span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Chức năng quên mật khẩu chưa được triển khai!");
              }}
              className="block text-right text-sm text-blue-500 hover:underline mb-4"
            >
              Forgot Password?
            </a>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
