import React, { useState } from 'react';
import './CreateTeam.css';
import InviteTeam from './InviteTeam';
import { toast,ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom';
import { CREATE_TEAM_ROUTE } from '../../utils/Routes';
import axios from 'axios';

const CreateTeam = () => {
  const { hackathonId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const toastOptions = {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };


  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(CREATE_TEAM_ROUTE, {
        name: teamName,
        leaderId: user._id,
        hackathonId
      }, { withCredentials: true });

      localStorage.setItem('team', JSON.stringify(response.data.team));
      
      toast.success("Team created successfully! 🎉",toastOptions);
      setTeamName('');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-team-form">
      <h2>Create Your Team</h2>
      <div className="create-team-form-group">
        <label htmlFor="team-name">Team Name</label>
        <input
          type="text"
          id="team-name"
          style={{ color: 'white' }}
          placeholder="Enter your team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <button 
        className="create-team-btn"
        onClick={handleCreateTeam}
        disabled={!teamName}
        style={{width:'30%'}}
      >
        Create Team
      </button>
      <h2>Invite Teammates</h2>
      <InviteTeam />
      <ToastContainer />
    </div>
  );
};

export default CreateTeam;
