import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext"; // Import the custom hook
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const roles = JSON.parse(localStorage.getItem('user')).roles
  let items
  switch (roles) {
    case "organizer":
      items = ["Home","Create-hackathon","Discuss","Profile",];
      break;
    case "participant":
      items = ["Home", "Find", "MyProfile", "Discuss"];
      break;
    case "judge":
      items = ["Home", "Review", "MyProfile"];  
      break;
    default:
      items = []
      break;
  }
  return (
    <nav
      className={`navbar ${
        theme === "light"
          ? "navbar-light"
          : "navbar-dark"
      }`}
    >
      <div className="navbar-container">
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

        {/* Centered Create Hackathon Button */}
        {/* <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="navbar-create-hackathon"
        >
          <button
            onClick={() => navigate("/create-hackathon")}
            className="create-hackathon-btn"
          >
            Create Hackathon
          </button>
        </motion.div> */}

        {/* Navbar Links */}
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="navbar-links"
        >
          {items.map((item) => (
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
