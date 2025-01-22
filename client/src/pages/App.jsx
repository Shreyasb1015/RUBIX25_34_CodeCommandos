import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import your ThemeProvider
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs"; // Import the AboutUs component
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home"; // Import the Home component
import Card from "./components/Card"; // Import the Card
import Timeline from "./components/Timeline"; // Import the Timeline
import { AnimatePresence } from "framer-motion"; // Framer Motion for animations

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar /> {/* Navbar stays static across pages */}
        <AnimatePresence mode="wait">
          <Routes>
            {/* Redirect default path '/' to '/home' */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            {/* You can add more routes as needed */}
          </Routes>
        </AnimatePresence>
        {/* Show Timeline only on Home Page */}
        <Routes>
          <Route path="/home" element={<Timeline />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
