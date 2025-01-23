import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./CreateHackathon.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CREATE_HAKATHON_ROUTE } from "../../utils/Routes";

const CreateHackathon = () => {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const [steps, setSteps] = useState([
    { text: "", date: "" }, 
  ]);

  const handleStepInputChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { text: "", date: "" }]); // Add a new step
  };

  const removeStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const [bannerFile, setBannerFile] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
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

  const handleCreate = async () => {
    const formData = new FormData();

    // Append the banner file if it exists
    if (bannerFile) {
      formData.append("bannerImage", bannerFile);
    }
    if(steps.length==0){
      toast.success("Add atleast 1 step!!", toastOptions);
    }
    const user = JSON.parse(localStorage.getItem("user"))._id
    formData.append("name", hackathonDetails.name);
    formData.append("organizerId",user);
    formData.append("startingDate", hackathonDetails.startDate);
    formData.append("endingDate", hackathonDetails.endDate);
    formData.append("hackathonSteps", steps);
    formData.append("domain", hackathonDetails.domain);
    formData.append("prize", hackathonDetails.prizePool1st);
    formData.append("duration", hackathonDetails.duration);
    formData.append("mode", hackathonDetails.mode);

    try {
      const response = await axios.post(CREATE_HAKATHON_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Hackathon Created!!", toastOptions);
        setBannerFile(null);
        setHackathonDetails({
          prizePool1st: "",
          prizePool2nd: "",
          prizePool3rd: "",
        });
        setShowPreview(false);
      } else {
        toast.error("Failed to create hackathon!!", toastOptions);
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
      toast.error("Failed to create hackathon!!", toastOptions);
    }
  };

  return (
    <div className="create-hackathon">
      <Navbar />
      <div className="form-nd-preview">
        <div className="create-hackathon-form-container">
          <h1 className="create-hackathon-title">Create Your Hackathon</h1>
          <form className="create-hackathon-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="bannerFile">
                Hackathon Banner (Upload Image)
              </label>
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
              {steps.map((step, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  <label>
                    Step Text:
                    <input
                      type="text"
                      className="create-hackathon-input"
                      value={step.text}
                      onChange={(e) =>
                        handleStepInputChange(index, "text", e.target.value)
                      }
                      required
                    />
                  </label>
                  <label>
                    Step Date:
                    <input
                      type="date"
                      className="create-hackathon-input"
                      value={step.date}
                      onChange={(e) =>
                        handleStepInputChange(index, "date", e.target.value)
                      }
                      required
                    />
                  </label>
                  <p>Add / Remove Steps</p>
                  <button
                    type="button"
                    className="create-hackathon-input"
                    onClick={() => removeStep(index)}
                    disabled={steps.length === 1}
                  >
                    Remove Step
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="create-hackathon-input"
                onClick={addStep}
              >
                Add Step
              </button>
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
          </form>
        </div>
        {showPreview && (
          <div className="preview-dialog">
            <h1 className="create-hackathon-title">Preview Your Hackathon</h1>
            <img
              src={bannerFile ? URL.createObjectURL(bannerFile) : ""}
              alt="Hackathon Banner"
              className="preview-banner"
            />
            <div className="preview-details">
              <p>
                <strong>Name:</strong> {hackathonDetails.name}
              </p>
              <p>
                <strong>Start Date:</strong> {hackathonDetails.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {hackathonDetails.endDate}
              </p>
              <p>
                <strong>Domain:</strong> {hackathonDetails.domain}
              </p>
              <p>
                <strong>Steps:</strong>
              </p>
              <ul>
                {steps &&
                  steps
                    .map((step, index) => <li key={index}>{`${step.text} : ${step.date}`}</li>)}
              </ul>
              <p>
                <strong>1st Place Prize:</strong>{" "}
                {hackathonDetails.prizePool1st}
              </p>
              <p>
                <strong>Duration:</strong> {hackathonDetails.duration}
              </p>
              <p>
                <strong>Mode:</strong> {hackathonDetails.mode}
              </p>
            </div>
            <button className="create-hackathon-btn" onClick={handleCreate}>
              Create Hackathon
            </button>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CreateHackathon;
