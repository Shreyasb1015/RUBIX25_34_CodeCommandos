import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaRegLightbulb,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext"; // Import the custom hook

const Timeline = () => {
  const { theme } = useTheme(); // Access the current theme

  const isDarkTheme = theme === "dark"; // Determine the theme

  const events = [
    {
      date: "2022",
      title: "Launched Our Platform",
      description:
        "We took our first step into the tech world with a successful launch.",
      icon: <FaRocket />,
      color: "bg-cyan-500",
    },
    {
      date: "2023",
      title: "Innovative Features",
      description:
        "Introduced cutting-edge features to enhance user experience.",
      icon: <FaRegLightbulb />,
      color: "bg-green-500",
    },
    {
      date: "2024",
      title: "Major Milestone",
      description: "Achieved a significant milestone with 1 million active users.",
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      date: "2025",
      title: "Expanded Horizons",
      description: "Ventured into new domains and reached global markets.",
      icon: <FaGraduationCap />,
      color: "bg-purple-500",
    },
    {
      date: "2026",
      title: "Record Growth",
      description: "Achieved exponential growth with cutting-edge analytics.",
      icon: <FaChartLine />,
      color: "bg-orange-500",
    },
    {
      date: "2027",
      title: "Global Impact",
      description: "Made a significant global impact with innovative solutions.",
      icon: <FaGlobe />,
      color: "bg-teal-500",
    },
  ];

  const themeStyles = {
    background: isDarkTheme ? "#1f2937" : "#ffffff", // Dark or light background
    color: isDarkTheme ? "#f9fafb" : "#1f2937", // Light or dark text
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Consistent shadow
    transition: "background 0.3s ease, color 0.3s ease", // Smooth transitions
  };

  const arrowStyle = {
    borderRight: `7px solid ${isDarkTheme ? "#1f2937" : "#ffffff"}`, // Dynamic arrow
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <h1
        className={`text-4xl font-bold mb-8 ${
          isDarkTheme ? "text-cyan-300" : "text-cyan-500"
        }`}
      >
        Our Journey
      </h1>
      <VerticalTimeline>
        {events.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={themeStyles}
            contentArrowStyle={arrowStyle}
            date={event.date}
            dateClassName={`${
              isDarkTheme ? "text-gray-300" : "text-gray-700"
            } font-medium`}
            iconStyle={{
              background: `${event.color}`,
              color: "#fff",
            }}
            icon={event.icon}
          >
            <h3
              className={`text-xl font-bold ${
                isDarkTheme ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {event.title}
            </h3>
            <p
              className={`${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              } leading-relaxed`}
            >
              {event.description}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </motion.div>
  );
};

export default Timeline;
