import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaClock,
  FaLaptop,
  FaTrophy,
  FaCode,
  FaUsers,
} from "react-icons/fa";
import { GET_HACKATHON_BY_ID_ROUTE } from "../../utils/Routes";
import Navbar from "../../components/Navbar/Navbar";
import "./HackathonDetail.css";
import Timeline from "../Timeline/Timeline";

const HackathonDetail = () => {
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await axios.get(
          `${GET_HACKATHON_BY_ID_ROUTE}/${hackathonId}`,
          { withCredentials: true }
        );
        console.log(response);
        setHackathon(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [hackathonId]);

  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  if (loading) return <div className="loading">Loading...</div>;
  if (!hackathon) return <div>Hackathon not found</div>;

  return (
    <div className={`hackathon-detail ${theme}`}>
      <Navbar />
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="banner-section"
        >
          <img
            src={hackathon.bannerImage}
            alt={hackathon.name}
            className="banner-image"
          />
        </motion.div>

        <div className="details-container">
          <div className="header">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="title"
            >
              {hackathon.name}
            </motion.h1>
            <span className={`status-badge ${hackathon.status}`}>
              {hackathon.status}
            </span>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="info-grid"
          >
            <div className="info-card">
              <FaCalendar className="icon" />
              <div>
                <h3>Timeline</h3>
                <p>
                  {new Date(hackathon.startingDate).toLocaleDateString()} -{" "}
                  {new Date(hackathon.endingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="info-card">
              <FaClock className="icon" />
              <div>
                <h3>Duration</h3>
                <p>{hackathon.duration}</p>
              </div>
            </div>
            <div className="info-card">
              <FaCode className="icon" />
              <div>
                <h3>Domain</h3>
                <p>{hackathon.domain}</p>
              </div>
            </div>
            <div className="info-card">
              <FaLaptop className="icon" />
              <div>
                <h3>Mode</h3>
                <p>{hackathon.mode}</p>
              </div>
            </div>
            <div className="info-card">
              <FaTrophy className="icon" />
              <div>
                <h3>Prize Pool</h3>
                <p>{hackathon.prize}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="description-section"
          >
            <h2>About the Hackathon</h2>
            <p>{hackathon.description}</p>
          </motion.div>

          {/* View Timeline Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="view-timeline-btn"
            onClick={toggleDialog}
          >
            View Timeline
          </motion.button>

          {/* Participate Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="participate-btn"
            onClick={() => navigate(`/participate/${hackathonId}`)}
          >
            Participate Now
          </motion.button>
        </div>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <Timeline steps={hackathon.hackathonSteps}/>
            <button onClick={toggleDialog} className="close-dialog-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonDetail;