import React, { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import "./AboutUs.css";

const AboutUs = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-us-content");
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`aboutus-container ${
        theme === "dark" ? "aboutus-container-dark" : "aboutus-container-light"
      }`}
    >
      <div className="aboutus-content">
        <h1
          className={`aboutus-heading ${
            theme === "dark" ? "text-dark" : "text-light"
          }`}
        >
          About Us
        </h1>

        <div className="aboutus-grid">
          {[...Array(6)].map((_, index) => (
            <figure
              key={index}
              id="about-us-content"
              className={`aboutus-card ${
                theme === "dark" ? "aboutus-card-dark" : "aboutus-card-light"
              } ${isVisible ? "aboutus-card-visible" : ""}`}
            >
              <img
                className="aboutus-card-image"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt="Sarah Dayan"
              />
              <div className="aboutus-card-details">
                <blockquote>
                  <p className="aboutus-card-quote">
                    “Tailwind CSS is the only framework that I've seen scale on
                    large teams. It’s easy to customize, adapts to any design,
                    and the build size is tiny.”
                  </p>
                </blockquote>
                <figcaption className="aboutus-card-figcaption">
                  <div className="aboutus-card-author">Sarah Dayan</div>
                  <div className="aboutus-card-role">
                    Staff Engineer, Algolia
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
