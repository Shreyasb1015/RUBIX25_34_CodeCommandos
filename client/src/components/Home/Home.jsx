import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext.jsx"; 
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { TypeAnimation } from "react-type-animation";
import Card from "../Card.jsx";
import InteractiveCircles from "../InteractiveCircle/InteractiveCircles.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from '../Footer/Footer.jsx'
import homegif from '../../assets/work.gif'
import {useSelector} from 'react-redux'
const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); 
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
          <Navbar />
          <div
                className={`home-container w-full min-h-screen flex items-center justify-center px-4 py-12 ${
                  theme === "dark" ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <div className="content-container w-full max-w-7xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="left-section lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left"
                    >
                      <h1
                        className={`title text-3xl lg:text-4xl font-bold mb-4 ${
                          theme === "dark" ? "dark:text-slate-300" : "text-gray-800"
                        }`}
                      >
                        Welcome to Our HackVishwa
                        <span>
                          <TypeAnimation
                            sequence={["Innovate", 1000, "Create", 1000, "Collaborate", 1000]}
                            wrapper="h2"
                            repeat={Infinity}
                            className={`highlighted-text text-3xl lg:text-4xl font-semibold ${
                              theme === "dark" ? "text-cyan-300" : "text-cyan-500"
                            }`}
                          />
                        </span>
                      </h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`description mt-4 text-xl ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Welcome to the ultimate virtual hackathon platform! We empower innovators 
                        to showcase their talents, collaborate remotely, and build groundbreaking 
                        solutions. Our AI-powered project evaluation system ensures fair and 
                        comprehensive assessment of your hackathon submissions.

                        <p style={{color:'orange',marginTop:'5px',marginBottom:'8px'}}>Join us for an exciting journey of innovation and creativity!</p>
                      </motion.p>
                      <AwesomeButton
                        type="primary"
                        ripple={true}
                        onPress={() => navigate("/analyze")}
                        className="get-started-btn mt-4"
                      >
                        Get Started
                      </AwesomeButton>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="right-section lg:w-1/2 relative"
                    >
                      <div className="spline-container w-full h-[400px] lg:h-[500px]">
                          <img src={homegif} className="homegif" alt="" style={{ marginLeft: '25px',marginTop:'50px', borderRadius:'20px',boxShadow: theme === 'dark' ? '0 0 25px rgba(156, 163, 175, 0.3)' : '0 0 25px rgba(55, 65, 81, 0.2)' }}  />
                      </div>
                      <InteractiveCircles />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="project-details mt-16"
                  >
                    <h2
                      className={`project-title text-3xl lg:text-4xl font-bold mb-4 ${
                        theme === "dark" ? "dark:text-cyan-300" : "text-gray-900"
                      }`}
                    >
                      HackVishwa - Your Ultimate Hackathon Platform
                    </h2>
                    <p
                      className={`project-description text-xl ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Experience the future of hackathons with HackVishwa. Our platform offers seamless 
                    project submissions, AI-powered evaluation, and a collaborative environment for 
                    participants and organizers. Join the revolution in virtual hackathon experiences.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8"
                  >
                    <Card
                      title="Multilingual Support"
                      description="Read real experiences from our community memberBreaking language barriers with support for multiple languages, making hackathons globally accessible."
                      icon="🌍"
                    />
                    <Card
                      title="Virtual Collaboration"
                      description="Real-time collaboration tools and project submission platform for remote teams."
                      icon="🌐"
                    />
                    <Card
                      title="Smart Judging"
                      description="Transparent scoring system with comprehensive metrics and instant results."
                      icon="🕒"
                    />
                  </motion.div>
                </div>
              </div>
              <Footer />

    </>
    
  );
};

export default Home;
