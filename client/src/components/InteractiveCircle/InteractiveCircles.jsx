import React, { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import ThemeToggleButton from "../ThemeToggleButton.jsx";
import GoogleTranslate from "../google-translate/GoogleTranslate.jsx";

const InteractiveCircles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleLanguageChange=()=>{
    setShowLanguageDialog(!showLanguageDialog);
    setIsOpen(false);
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {isOpen && (
        <motion.div
          className="flex flex-col items-center space-y-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="circle w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={handleLanguageChange}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2620/2620585.png"
              alt="Language Icon"
              className="w-8 h-8"
              title="Languages icons created by Freepik - Flaticon"
            />
          </motion.div>

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

      
          <motion.div
            className="circle w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <ThemeToggleButton />
          </motion.div>
        </motion.div>
      )}

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
      <AnimatePresence>
        {showLanguageDialog && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="language-dialog absolute bottom-[120%] right-[120%] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-50 min-w-[200px]"
          >
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Select Language</h3>
                <button 
                  onClick={() => setShowLanguageDialog(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>
            <div className="dialog-content">
              <GoogleTranslate />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveCircles;
