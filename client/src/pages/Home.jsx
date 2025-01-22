import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Import ThemeContext
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { TypeAnimation } from "react-type-animation";
import Card from "./Card.jsx";
import InteractiveCircles from "./InteractiveCircles";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); 

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center px-4 py-12 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section with Animation and Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left"
          >
            <h1
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                theme === "dark" ? "dark:text-slate-300" : "text-gray-800"
              }`}
            >
              Welcome to Our HackVishwa
              <span>
                <TypeAnimation
                  sequence={["Innovate", 1000, "Create", 1000, "Collaborate", 1000]}
                  wrapper="h2"
                  repeat={Infinity}
                  className={`text-3xl lg:text-4xl font-semibold ${
                    theme === "dark" ? "text-cyan-300" : "text-cyan-500"
                  }`}
                />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`mt-4 text-xl ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Join us for an exciting journey of innovation and creativity!
            </motion.p>
            <AwesomeButton
              type="primary"
              ripple={true}
              onPress={() => navigate("/analyze")}
              className="mt-4"
            >
              Get Started
            </AwesomeButton>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 relative"
          >
            <img
              src="https://www.bing.com/th/id/OGC.acfb21492e4ca7931158f14dd1808ead?pid=1.7&rurl=https%3a%2f%2fcdnb.artstation.com%2fp%2fassets%2fimages%2fimages%2f058%2f523%2f795%2foriginal%2fteetuch-timgasigum-star-space.gif%3f1674371659&ehk=%2fSDDwlxE0ouTDLJHGWpHup5Q68MIMzfzL4cQ3Rhb8oQ%3d"
              alt="Image"
              className="w-full max-h-[400px] object-cover rounded-md shadow-md"
            />
            <InteractiveCircles />
          </motion.div>
        </div>

        {/* Project Details Section with Animated Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2
            className={`text-3xl lg:text-4xl font-bold mb-4 ${
              theme === "dark" ? "dark:text-cyan-300" : "text-gray-900"
            }`}
          >
            Project Details
          </h2>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Our hackathon project aims to solve real-world problems using cutting-edge technology.
            We're focusing on creating innovative solutions in areas such as AI, blockchain, and IoT.
          </p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8"
        >
          <Card
            title="User Reviews"
            description="Read real experiences from our community members."
            icon="⭐"
          />
          <Card
            title="Customer Support"
            description="Get assistance with any issues or questions."
            icon="💬"
          />
          <Card
            title="Help 24/7"
            description="Our team is available around the clock to assist you."
            icon="🕒"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
