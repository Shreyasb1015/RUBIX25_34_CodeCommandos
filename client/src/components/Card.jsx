import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center transition-all duration-300 ease-in-out"
    >
      <div className="text-4xl text-cyan-500 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default Card;
