import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext"; 
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { TypeAnimation } from "react-type-animation";
import Card from "../../components/Card";
import InteractiveCircles from "../../components/InteractiveCircles";
import "./Home.css";
import Navbar from '../../components/navbar/Navbar'

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <>
        <Navbar />
        <div className={`home-container ${theme === "dark" ? "home-dark" : "home-light"}`}>
            <div className="home-content">
                <div className="home-header">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="home-header-left"
                >
                    <h1 className="home-title">
                    Welcome to HackVishwa
                    <TypeAnimation
                        sequence={["Innovate", 1000, "Create", 1000, "Collaborate", 1000]}
                        wrapper="span"
                        repeat={Infinity}
                        className="home-type-animation"
                    />
                    </h1>
                    <p className="home-subtitle">
                    Join us for an exciting journey of innovation and creativity!
                    </p>
                    <AwesomeButton
                    type="primary"
                    ripple={true}
                    onPress={() => navigate("/analyze")}
                    className="home-get-started-button"
                    >
                    Get Started
                    </AwesomeButton>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="home-header-right"
                >
                    <img
                    src="https://www.bing.com/th/id/OGC.acfb21492e4ca7931158f14dd1808ead?pid=1.7&rurl=https%3a%2f%2fcdnb.artstation.com%2fp%2fassets%2fimages%2fimages%2f058%2f523%2f795%2foriginal%2fteetuch-timgasigum-star-space.gif%3f1674371659&ehk=%2fSDDwlxE0ouTDLJHGWpHup5Q68MIMzfzL4cQ3Rhb8oQ%3d"
                    alt="Space Animation"
                    className="home-header-image"
                    />
                    <InteractiveCircles />
                </motion.div>
                </div>

            
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="home-project-details"
                >
                <h2 className="home-project-title">Project Details</h2>
                <p className="home-project-description">
                    Our hackathon project aims to solve real-world problems using cutting-edge technology.
                    We're focusing on creating innovative solutions in areas such as AI, blockchain, and IoT.
                </p>
                </motion.div>

                {/* Cards Section */}
                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="home-cards-container"
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
    </>
    
  );
};

export default Home;
