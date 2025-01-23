import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import AboutUs from "./components/AboutUS/AboutUs"; 
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Home from "./components/Home/Home"; 
import Card from "./components/Card"; 
import Welcome from "./components/welcome/Welcome";
import { AnimatePresence } from "framer-motion";
import Login from './components/login/Login'
import Register from './components/register/Register'
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            
            <Route path='/' element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
};

export default App;
