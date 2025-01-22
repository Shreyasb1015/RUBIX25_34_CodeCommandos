import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-200 ${
        theme === "light"
          ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
          : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggleButton;
