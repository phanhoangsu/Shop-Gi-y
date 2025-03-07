import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
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
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Download_on_the_App_Store_Badge.svg/512px-Download_on_the_App_Store_Badge.svg.png"
              alt="App Store"
              className="w-32"
            />
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold">Pages</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li>Home it work</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Demo</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold">Service</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li>Shopify</li>
            <li>WordPress</li>
            <li>UI/UX Design</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li className="flex items-center space-x-2">
              <FaPhone className="text-blue-500" />
              <span>(406) 555-0120</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-500" />
              <span>mangcoding123@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
