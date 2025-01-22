import React, { createContext, useState, useContext, useEffect } from "react";

// Create the ThemeContext
const ThemeContext = createContext();

// ThemeProvider to manage and provide theme functionality
export const ThemeProvider = ({ children }) => {
  // Initialize the theme state (saved in localStorage or defaults to 'light')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Toggle the theme and save the new theme in localStorage
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Apply the theme to the HTML root element dynamically
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.backgroundColor = "#121212"; // Deep dark background
      root.style.color = "#ffffff"; // White text
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.backgroundColor = "#ffffff"; // Light background
      root.style.color = "#000000"; // Black text
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
