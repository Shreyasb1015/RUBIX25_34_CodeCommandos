import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext"; // Import the useTheme hook

const AboutUs = () => {
  const { theme, toggleTheme } = useTheme(); // Get the current theme and the toggle function
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
    handleScroll(); // Check initial visibility on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} transition-colors duration-300`}
    >
      <div className="w-full px-4 py-12"> {/* Use w-full here to take the full width */}

        <h1
          className={`text-4xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-800"} transition-colors`}
        >
          About Us
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <figure
              key={index}
              id="about-us-content"
              className={`md:flex rounded-xl p-8 md:p-0 ${
                theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100 text-gray-800"
              } transition-all transform ${isVisible ? "opacity-100" : "opacity-0"} ease-in-out duration-500 hover:scale-105 hover:shadow-xl`}
            >
              <img
                className="w-20 h-20 md:w-32 md:h-32 md:rounded-none rounded-full mx-auto"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt="Sarah Dayan"
                width="384"
                height="512"
              />
              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium transition-all">
                    “Tailwind CSS is the only framework that I've seen scale
                    on large teams. It’s easy to customize, adapts to any design,
                    and the build size is tiny.”
                  </p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-sky-500 dark:text-sky-400">
                    Sarah Dayan
                  </div>
                  <div className="text-slate-700 dark:text-slate-500">
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
