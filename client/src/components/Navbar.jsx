import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav
      className={`${
        theme === "light"
          ? "bg-gradient-to-r from-blue-500 to-purple-500"
          : "bg-gradient-to-r from-gray-900 to-blue-800"
      } p-2 md:p-4 sticky top-0 z-10 opacity-90 shadow-lg transition-colors duration-500`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Navbar Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/")}
            className={`text-2xl md:text-3xl font-bold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            HackVishwa
          </button>
        </motion.div>

        {/* Navbar Links */}
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-6 md:space-x-8 items-center"
        >
          {["Home", "About", "Contact", "Help"].map((item) => (
            <li key={item}>
              <button
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                className={`text-lg md:text-xl font-medium relative group ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                {item}
                {/* Hover Underline Effect */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 ${
                    theme === "light" ? "bg-black" : "bg-white"
                  } transition-transform scale-x-0 group-hover:scale-x-100 origin-bottom-left`}
                  style={{
                    transition: "transform 0.3s ease-out",
                  }}
                ></span>
              </button>
            </li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default Navbar;
