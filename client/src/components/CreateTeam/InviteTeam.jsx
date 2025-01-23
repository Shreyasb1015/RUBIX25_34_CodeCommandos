import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InviteTeam.css';
import { FETCH_RELEVANT_TEAMMATES } from '../../utils/Routes';

const InviteTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("User from localStorage:", user); 
    const userInterests =
      user?.interests?.length > 0 ? user.interests : ['Machine Learning', 'Statistics'];

    axios
      .post(FETCH_RELEVANT_TEAMMATES, { interests: userInterests }, { withCredentials: true })
      .then((response) => {
        const relevantUsers = response.data.relevant_users.documents[0] || [];
        const parsedUsers = relevantUsers.map((doc) => {
          const usernameMatch = doc.match(/Username: (.*?) /);
          const emailMatch = doc.match(/Email: (.*?) /);
          const interestsMatch = doc.match(/Interests: (.*)/);

          return {
            username: usernameMatch ? usernameMatch[1] : 'N/A',
            email: emailMatch ? emailMatch[1] : 'N/A',
            interests: interestsMatch
              ? interestsMatch[1].split(',').map((i) => i.trim())
              : [],
          };
        });
        setSuggestedUsers(parsedUsers);
      })
      .catch((error) => {
        console.error('Error fetching relevant users:', error);
        setSuggestedUsers([]);
      });
  }, []);

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember({ name: '', email: '' });
    }
  };

  const handleSendRequest = (member) => {
    console.log(`Invitation sent to ${member.name || member.username} (${member.email})`);
  };

  return (
    <div className="create-team-grid">
      <div className="left-section">
        <div className="team-member self">
          <div className="member-name">Your Name</div>
        </div>

        <div className="add-member-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div>
                <div className="member-name">{member.name}</div>
                <div className="member-email">{member.email}</div>
              </div>
              <button
                onClick={() => handleSendRequest(member)}
                className="send-request"
              >
                Invite
              </button>
            </div>
          ))}

          <div className="add-member">
            <input
              type="text"
              placeholder="Name"
              style={{ color: 'white' }}
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              style={{ color: 'white' }}
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
            />
            <button onClick={handleAddMember} className="add-button">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="suggested-users">
          <h3>Suggested Users</h3>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.map((user, index) => (
              <div key={index} className="suggested-user">
                <div className="user-info">
                  <div className="user-name">{user.username}</div>
                  <div className="user-email">{user.email}</div>
                  <div className="user-interests">
                    <strong>Interests:</strong> {user.interests.join(', ') || 'N/A'}
                  </div>
                </div>
                <button
                  onClick={() => handleSendRequest(user)}
                  className="send-request"
                >
                  Invite
                </button>
              </div>
            ))
          ) : (
            <p>No users found. Try different interests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteTeam;
