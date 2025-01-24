import React, { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Editor from "react-simple-code-editor";
import Modal from "react-modal";
import "./SubmitProjectForm.css";
import defaultProfilePic from "../../assets/badges/default-logo.png";

Modal.setAppElement("#root");

const SubmitProjectForm = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    projectName: "",
    projectLink: "",
    projectDescription: "",
    projectImage: defaultProfilePic,
  });
  const [preview, setPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedProject, setSubmittedProject] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      projectImage: file,
    });
  };

  const handleEditorChange = (value) => {
    setFormData({
      ...formData,
      projectDescription: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validLinkPattern = /^(https?:\/\/)?(www\.)?(github\.com|youtube\.com|youtu\.be|[\w-]+\.[a-z]{2,})/i;

    if (!validLinkPattern.test(formData.projectLink)) {
      alert(
        "Invalid link! Please provide a valid GitHub, YouTube, or deployed website link."
      );
      return;
    }

    setSubmittedProject(formData);
    setSubmitted(true);

    // Reset form data after submission
    setFormData({
      projectName: "",
      projectLink: "",
      projectDescription: "",
      projectImage: defaultProfilePic,
    });
  };

  const closeModal = () => {
    setSubmitted(false);
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className={`submit-project-page ${theme}`}>
      <Navbar />
      <h2 className="form-title">Submit Your Project</h2>
      <div className="form-container">
        <form className="submit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              required
              placeholder="Enter your project name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectLink">Project Link:</label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleInputChange}
              required
              placeholder="Enter GitHub, YouTube, or deployed website link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Project Description:</label>
            <Editor
              value={formData.projectDescription}
              onValueChange={handleEditorChange}
              highlight={(code) => code}
              padding={10}
              className="code-editor"
              placeholder="Title or Tagline, followed by details..."
            />
            <button
              type="button"
              className="preview-button"
              onClick={togglePreview}
            >
              {preview ? "Hide Preview" : "Show Preview"}
            </button>
            {preview && (
              <div className="markdown-preview">
                <h4>Preview:</h4>
                <p>{formData.projectDescription}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="projectImage">Upload Project Image:</label>
            <input type="file" id="projectImage" onChange={handleFileChange} />
          </div>
          <button type="submit" className="submit-button">
            Submit Project
          </button>
        </form>
      </div>
      {submittedProject && (
        <div className="project-card">
          <h3>{submittedProject.projectName}</h3>
          {submittedProject.projectImage && (
            <img
              src={URL.createObjectURL(submittedProject.projectImage)}
              alt={submittedProject.projectName}
              className="project-image"
            />
          )}
          <p>
            <strong>Title/Tagline:</strong> {submittedProject.projectDescription}
          </p>
          <p>
            <a
              href={submittedProject.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </p>
        </div>
      )}
      <Modal
        isOpen={submitted}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Project Submitted!</h2>
        <p>Thank you for submitting your project.</p>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </Modal>
      <Footer />
    </div>
  );
};

export default SubmitProjectForm;
