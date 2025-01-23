import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext"; // Import the custom hook
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav
      className={`navbar ${
        theme === "light"
          ? "navbar-light"
          : "navbar-dark"
      }`}
    >
      <div className="navbar-container">
        {/* Navbar Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="navbar-logo"
        >
          <button
            onClick={() => navigate("/")}
            className={`navbar-logo-btn ${
              theme === "light" ? "text-light" : "text-dark"
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
          className="navbar-links"
        >
          {["Home", "About", "Contact", "Help"].map((item) => (
            <li key={item} className="navbar-item">
              <button
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                className={`navbar-link ${
                  theme === "light" ? "text-light" : "text-dark"
                }`}
              >
                {item}
                {/* Hover Underline Effect */}
                <span
                  className={`navbar-underline ${
                    theme === "light" ? "underline-light" : "underline-dark"
                  }`}
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