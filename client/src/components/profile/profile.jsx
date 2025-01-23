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

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
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

  const renderBadges = (level) => {
    const badges = [];
    for (let i = 0; i < 5; i++) {
      badges.push(i < level ? "★" : "☆");
    }
    return badges.join(" ");
  };

  return (
    <div className={`profile-page ${theme}`}>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={updatedUser.profileImage || "/default-avatar.png"}
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
          <h3>Badges</h3>
          <div className="badge-levels">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="badge">
                <h4>Level {level}</h4>
                <div>{renderBadges(level)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
