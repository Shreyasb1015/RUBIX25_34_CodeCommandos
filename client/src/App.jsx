import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HackathonDetail from "./components/hackathondetail/HackathonDetail.jsx";
// Importing Components
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUS/AboutUs";
import Welcome from "./components/welcome/Welcome";
import Login from './components/login/Login';
import Register from './components/register/Register';
import CreateHackathon from "../src/components/createHackathon/createHackathon.jsx"; // Importing CreateHackathon

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/create" element={<CreateHackathon />} /> 
            <Route path="/hackathons/:hackathonId" element={<HackathonDetail />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
};

export default App;