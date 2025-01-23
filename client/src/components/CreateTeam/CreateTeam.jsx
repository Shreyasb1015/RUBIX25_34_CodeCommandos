import React, { useState, useEffect } from 'react';
import './CreateTeam.css';
import InviteTeam from './InviteTeam';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = () => {
    console.log('Team Name:', teamName);
    // Proceed to the next step (e.g., navigating to InviteTeam component)
  };

  return (
    <div className="create-team-form">
      <h2>Create Your Team</h2>
      <div className="form-group">
        <label htmlFor="team-name">Team Name</label>
        <input
          type="text"
          id="team-name"
          style={{color:'white'}}
          placeholder="Enter your team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <h2>Invite Teammates</h2>

      <InviteTeam/>
    </div>
  );
};

export default CreateTeam;
