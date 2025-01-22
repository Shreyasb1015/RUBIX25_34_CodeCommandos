/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode,FaRocket } from 'react-icons/fa';
import './Welcome.css';
import logo from '../../assets/HackVishwa-logo.png';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); 
    const navigationTimer = setTimeout(() => {
      navigate('/'); 
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);  
    };
  }, []);

  return (
    <div className="welcome-page">
      <motion.div
        className="welcome-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          className="welcome-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="welcome-text-container">
          <motion.h1
            className="welcome-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          >
            {['H', 'a', 'c', 'k', 'V', 'i', 's', 'h', 'w', 'a'].map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="welcome-char"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="welcome-slogan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
          >
            Empowering Innovators, Building the Future
          </motion.p>
        </div>
        <motion.div
          className="welcome-icons-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: 'easeInOut' }}
        >
          <FaCode size={60} className="welcome-icon-style" />
          <FaLaptopCode size={60} className="welcome-icon-style" />
          <FaRocket size={60} className="welcome-icon-style" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
