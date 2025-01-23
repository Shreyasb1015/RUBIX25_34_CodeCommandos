import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./CreateHackathon.css";

const CreateHackathon = () => {
  const [bannerFile, setBannerFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hackathonDetails, setHackathonDetails] = useState({
    prizePool1st: "",
    prizePool2nd: "",
    prizePool3rd: "",
  });

  const handleInputChange = (e) => {
    setHackathonDetails({
      ...hackathonDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBannerUpload = (e) => {
    setBannerFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleCreate = () => {
    alert("Hackathon Created!");
    // Reset form values
    setBannerFile(null);
    setHackathonDetails({
      prizePool1st: "",
      prizePool2nd: "",
      prizePool3rd: "",
    });
    setShowPreview(false);
  };

  return (
    <div className="create-hackathon">
      <Navbar />
      <div className="create-hackathon-form-container">
        <h1 className="create-hackathon-title">Create Your Hackathon</h1>
        <form className="create-hackathon-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="bannerFile">Hackathon Banner (Upload Image)</label>
            <input
              type="file"
              id="bannerFile"
              name="bannerFile"
              className="create-hackathon-input"
              accept="image/*"
              onChange={handleBannerUpload}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Hackathon Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="create-hackathon-input"
              placeholder="Enter Hackathon Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="create-hackathon-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="create-hackathon-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="steps">Hackathon Steps</label>
            <textarea
              id="steps"
              name="steps"
              className="create-hackathon-input"
              placeholder="Enter steps for the hackathon (one per line)"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="domain">Hackathon Domain</label>
            <input
              type="text"
              id="domain"
              name="domain"
              className="create-hackathon-input"
              placeholder="Enter Hackathon Domain"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="prizePool1st">Prize Pool (1st Place)</label>
            <input
              type="text"
              id="prizePool1st"
              name="prizePool1st"
              className="create-hackathon-input"
              placeholder="Enter 1st Place Prize"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="prizePool2nd">Prize Pool (2nd Place)</label>
            <input
              type="text"
              id="prizePool2nd"
              name="prizePool2nd"
              className="create-hackathon-input"
              placeholder="Enter 2nd Place Prize"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="prizePool3rd">Prize Pool (3rd Place)</label>
            <input
              type="text"
              id="prizePool3rd"
              name="prizePool3rd"
              className="create-hackathon-input"
              placeholder="Enter 3rd Place Prize"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="duration">Hackathon Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="create-hackathon-input"
              placeholder="Enter Duration (e.g., 48 hours)"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="mode">Hackathon Mode</label>
            <select
              id="mode"
              name="mode"
              className="create-hackathon-input"
              onChange={handleInputChange}
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <button type="submit" className="create-hackathon-btn">
            Preview Hackathon
          </button>
        </form>
      </div>
      {showPreview && (
        <div className="preview-dialog">
          <h2 className="preview-dialog-header">Preview Hackathon</h2>
          <img
            src={bannerFile ? URL.createObjectURL(bannerFile) : ""}
            alt="Hackathon Banner"
            className="preview-banner"
          />
          <div className="preview-details">
            <p><strong>Name:</strong> {hackathonDetails.name}</p>
            <p><strong>Start Date:</strong> {hackathonDetails.startDate}</p>
            <p><strong>End Date:</strong> {hackathonDetails.endDate}</p>
            <p><strong>Domain:</strong> {hackathonDetails.domain}</p>
            <p><strong>Steps:</strong> {hackathonDetails.steps}</p>
            <p><strong>1st Place Prize:</strong> {hackathonDetails.prizePool1st}</p>
            <p><strong>2nd Place Prize:</strong> {hackathonDetails.prizePool2nd}</p>
            <p><strong>3rd Place Prize:</strong> {hackathonDetails.prizePool3rd}</p>
            <p><strong>Duration:</strong> {hackathonDetails.duration}</p>
            <p><strong>Mode:</strong> {hackathonDetails.mode}</p>
          </div>
          <button className="create-hackathon-btn" onClick={handleCreate}>
            Create Hackathon
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CreateHackathon;
