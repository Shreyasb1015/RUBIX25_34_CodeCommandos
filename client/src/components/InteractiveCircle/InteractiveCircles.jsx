import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "../ThemeToggleButton.jsx";
import { CHATBOT_URL } from "../../utils/Routes.js";
import axios from 'axios';
import GoogleTranslate from "../google-translate/GoogleTranslate.jsx";

const InteractiveCircles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageChange = () => {
    setShowLanguageDialog(!showLanguageDialog);
    setIsOpen(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post(
        CHATBOT_URL, 
        {
          user_input: input, 
        },
        {
          withCredentials: true, 
        }
      );

      const data = response.data;
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  const handleChatBotClick = () => {
    setShowChatDialog(true);
    setIsOpen(false);
  };

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
            onClick={handleChatBotClick}
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

      <AnimatePresence>
        {showChatDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="chat-dialog fixed bottom-20 right-20 w-[400px] h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50"
          >
            <div className="chat-header flex justify-between items-center p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold">HackVishwa Assistant</h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowChatDialog(false)}
              >
                ×
              </button>
            </div>

            <div className="chat-messages flex-1 overflow-y-auto p-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    msg.isUser ? "user-message" : "bot-message"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="chat-input p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-md outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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
