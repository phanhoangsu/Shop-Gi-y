/**
 * Component Footer
 *
 * Chức năng chính:
 * 1. Hiển thị thông tin liên hệ:
 *    - Số điện thoại
 *    - Email
 *    - Địa chỉ
 *
 * 2. Hiển thị liên kết:
 *    - Menu điều hướng
 *    - Mạng xã hội
 *    - Tải ứng dụng
 *
 * 3. Đăng ký newsletter:
 *    - Form đăng ký email
 *    - Xử lý submit form
 *    - Thông báo đăng ký
 */

import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

/**
 * Component Footer
 * @component
 * @description Hiển thị phần chân trang của website
 */
const Footer = () => {
  // State quản lý email đăng ký newsletter
  const [email, setEmail] = useState("");

  /**
   * Xử lý đăng ký newsletter
   * @param {Event} e - Event từ form submit
   */
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi email (có thể gọi API ở đây)
    alert(`Subscribed with email: ${email}`);
    setEmail(""); // Reset input sau khi gửi
  };

  return (
    <footer className="bg-white border-t shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + App Links */}
        <div>
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded">
              mangcoding
            </span>
          </h2>
          <p className="text-gray-600 mt-3">
            Download the app by clicking the link below:
          </p>
          <div className="flex space-x-3 mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play"
              className="w-32"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/480px-App_Store_%28iOS%29.svg.png"
              alt="App Store"
              className="w-32"
            />
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold">Pages</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">Home it work</li>
            <li className="hover:text-blue-500 cursor-pointer">Pricing</li>
            <li className="hover:text-blue-500 cursor-pointer">Blog</li>
            <li className="hover:text-blue-500 cursor-pointer">Demo</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold">Service</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">Shopify</li>
            <li className="hover:text-blue-500 cursor-pointer">WordPress</li>
            <li className="hover:text-blue-500 cursor-pointer">UI/UX Design</li>
          </ul>
        </div>

        {/* Contact + Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li className="flex items-center space-x-2">
              <FaPhone className="text-blue-500" />
              <span>(+84) 971-443-902</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-500" />
              <span>suhoang0971@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
            </li>
          </ul>
          {/* Social Media Links */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-blue-500 hover:text-blue-700 text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-500 hover:text-blue-700 text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-blue-500 hover:text-blue-700 text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-6xl mx-auto px-6 py-6 border-t">
        <h3 className="text-lg font-semibold text-center">
          Subscribe to Our Newsletter
        </h3>
        <form
          onSubmit={handleNewsletterSubmit}
          className="mt-4 flex justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full max-w-xs px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 py-4 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} mangcoding. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
