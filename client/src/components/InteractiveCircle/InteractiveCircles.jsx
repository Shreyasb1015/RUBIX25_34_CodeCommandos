import React, { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggleButton from "../ThemeToggleButton.jsx";

const InteractiveCircles = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Secondary Circles */}
      {isOpen && (
        <motion.div
          className="flex flex-col items-center space-y-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Language Selector */}
          <motion.div
            className="circle w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => alert("Select your language")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2620/2620585.png"
              alt="Language Icon"
              className="w-8 h-8"
              title="Languages icons created by Freepik - Flaticon"
            />
          </motion.div>

          {/* Chatbot */}
          <motion.div
            className="circle w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => alert("Chatbot will open here!")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
              alt="Chatbot Icon"
              className="w-8 h-8"
              title="Bot icons created by Smashicons - Flaticon"
            />
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            className="circle w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <ThemeToggleButton />
          </motion.div>
        </motion.div>
      )}

      {/* Main Circle */}
      <motion.div
        onClick={handleClick}
        className="circle w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/10948/10948015.png"
          alt="Plus Icon"
          className="w-8 h-8"
          title="Plus icons created by Smashicons - Flaticon"
        />
      </motion.div>
    </div>
  );
};

export default InteractiveCircles;
