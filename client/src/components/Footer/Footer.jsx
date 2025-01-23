import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext"; // Assuming you have a ThemeContext
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Import react-icons

const Footer = () => {
  const { theme } = useTheme(); // Get current theme from context

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        theme === "dark"
          ? "bg-gradient-to-b from-black to-blue-900"
          : "bg-gradient-to-b from-blue-500 to-purple-500"
      } text-white py-6 opacity-90 shadow-lg`} // Footer class with dynamic theme-based styles
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Hackathon</h3>
          <p className="text-sm opacity-75">Innovate. Create. Collaborate.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-400 hover:bg-blue-400 hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-800 hover:bg-blue-800 hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-pink-500 hover:bg-pink-500 hover:text-white transition"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center md:text-right">
          <p className="text-xs opacity-75">
            &copy; {new Date().getFullYear()} Hackathon. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;