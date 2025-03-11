import React, { useState } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Sliding Background */}
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
          {/* Register Form */}
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
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
              </span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Register
            </button>
          </div>

          {/* Login Form */}
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
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 mb-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
              </span>
            </div>
            <a
              href="#"
              className="block text-right text-sm text-blue-500 hover:underline mb-4"
            >
              Forgot Password?
            </a>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Login
            </button>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center py-6">
          <p className="text-gray-500 text-sm mb-4">or login with socials</p>
          <div className="flex space-x-4">
            <button className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.49.5.09.68-.22.68-.49v-1.71c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.31 1.07 2.87.82.09-.64.35-1.07.63-1.32-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.115 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.82.56 1.66v2.46c0 .28.18.58.69.49A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 11v2.4h3.97c-.16 1.03-.78 1.91-1.66 2.48A4.996 4.996 0 017 19a5 5 0 010-10c1.39 0 2.64.56 3.54 1.46l1.89-1.89A7.986 7.986 0 007 5a8 8 0 000 16c2.21 0 4.21-.89 5.66-2.34A7.966 7.966 0 0015 13h-8z" />
                <path d="M18 13c0-.55-.05-1.09-.14-1.62l-2.06 1.59c.09.53.14 1.07.14 1.62 0 2.76-2.24 5-5 5v-2c1.66 0 3-1.34 3-3h2z" />
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-9.5 5.5a3 3 0 100 6 3 3 0 000-6zm9.47 2.18a.5.5 0 00-.5-.5h-1.5a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5v-.5zM9.5 6a5 5 0 110 10 5 5 0 010-10zm5 5a4 4 0 104 4 4 4 0 00-4-4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
