import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext"; // Import the ThemeContext
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./profile.css";

const Profile = () => {
  const { theme } = useContext(ThemeContext); // Use theme from context
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  // Badge levels and corresponding images
  const levels = ["Beginner", "Intermediate", "Pro", "Master", "Legend"];
  const badgeImages = {
    Beginner: "/assets/badges/beginner.png",
    Intermediate: "/assets/badges/intermediate.png",
    Pro: "/assets/badges/pro.png",
    Master: "/assets/badges/master.png",
    Legend: "/assets/badges/legend.png",
  };

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    // Check if the user is a participant and assign "Beginner" badge by default if no level exists
    if (localStorageUser?.roles?.includes("participant")) {
      if (!localStorageUser?.level) {
        localStorageUser.level = "Beginner"; // Assign "Beginner" badge if no level exists
        localStorage.setItem("user", JSON.stringify(localStorageUser));
      }
    }

    setUser(localStorageUser);
    setUpdatedUser(localStorageUser || {}); // Set initial data for editing
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleInterestChange = (e) => {
    const interestsArray = e.target.value.split(",").map((item) => item.trim());
    setUpdatedUser({
      ...updatedUser,
      interests: interestsArray,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedUser({
      ...updatedUser,
      profileImage: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleSaveChanges = () => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setUpdatedUser(user); // Reset changes
    setIsEditing(false);
  };

  const renderBadgeGallery = () => {
    // Get the user's current level and display the corresponding badges
    const userLevel = user.level || "Beginner"; // Default to "Beginner" if no level exists
    const userLevelIndex = levels.indexOf(userLevel); // Get the index of the user's current level

    // Show badges up to the user's current level
    return (
      <div className="badge-gallery">
        {levels.slice(0, userLevelIndex + 1).map((level, index) => (
          <div key={index} className="badge">
            <img
              src={badgeImages[level]} // Display the appropriate badge image
              alt={`${level} Badge`}
              className="badge-image"
            />
            <h4>{level}</h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`profile-page ${theme}`}>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={updatedUser.profileImage || "/default-logo.png"}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="profile-info">
            <h2>{updatedUser.username}</h2>
            <p>{updatedUser.email}</p>
            <div className="profile-stats">
              {/* Check and display stats based on the user's roles */}
              {updatedUser.roles?.includes("judge") && (
                <p>Hackathons Judged: {updatedUser.hackathonJudged || 0}</p>
              )}
              {updatedUser.roles?.includes("organizer") && (
                <p>Hackathons Created: {updatedUser.hackathonCreated || 0}</p>
              )}
              {updatedUser.roles?.includes("participant") && (
                <>
                  <p>Hackathons Participated: {updatedUser.hackathonParticipation || 0}</p>
                  <p>Hackathons Won: {updatedUser.hackathonWins || 0}</p>
                </>
              )}
            </div>
            <div className="profile-interests">
              <h4>Interests:</h4>
              <div className="interest-list">
                {updatedUser.interests && updatedUser.interests.length > 0 ? (
                  updatedUser.interests.map((interest, index) => (
                    <span key={index} className="interest-item">
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="interest-item">No interests added</span>
                )}
              </div>
            </div>
            <button onClick={handleEditClick} className="edit-button">
              Edit Profile
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="edit-profile-form">
            <h3>Edit Profile</h3>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
            />
            <label>Profile Picture:</label>
            <input type="file" onChange={handleFileChange} />
            <label>Interests (comma separated):</label>
            <input
              type="text"
              name="interests"
              value={updatedUser.interests.join(", ")}
              onChange={handleInterestChange}
            />
            <div className="btn">
              <button onClick={handleSaveChanges} className="save-button">
                Save Changes
              </button>
              <button onClick={handleCancelEdit} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="profile-badges">
          <h3>Badges Gallery</h3>
          {renderBadgeGallery()} {/* Display badges gallery */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
