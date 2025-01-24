import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InviteTeam.css';
import { FETCH_RELEVANT_TEAMMATES } from '../../utils/Routes';
import { SEND_TEAM_INVITE_ROUTE } from '../../utils/Routes';
import { ToastContainer,toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const InviteTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { hackathonId } = useParams()
  const user_emails={
    "ShreyasBagwe":"bagweshreyas1015@gmail.com",
    "ToshitHole":"2022.toshit.hole@ves.ac.in",
    "GauravMahadeshwar":"mahadeshwargaurav11@gmail.com",
    "SuryanaryanPanigrahy":"panigrahisurya360@gmail.com"
} 
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
  const handleInvite = async (userEmail) => {
    setLoading(true);
    try {
      const team = JSON.parse(localStorage.getItem('team'));
      if (!team) {
        toast.error("Please create a team first!");
        return;
      }

      await axios.post(`${SEND_TEAM_INVITE_ROUTE}`, {
        email: userEmail,
        teamId: team._id,
        hackathonId
      }, { withCredentials: true });

      toast.success(`Invitation sent to ${userEmail}!`);
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(error.response?.data?.message || "Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember({ name: '', email: '' });
    }
  };



  return (
    <div className="invite-team-grid">
      <div className="invite-team-left-section">
        <div className="invite-team-team-member self">
          <div className="invite-team-member-name">Your Name</div>
        </div>

        <div className="invite-team-add-member-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="invite-team-team-member">
              <div>
                <div className="invite-team-member-name">{member.name}</div>
                <div className="invite-team-member-email">{member.email}</div>
              </div>
              <button
                onClick={() => handleInvite(member.email)}
                className="invite-team-send-request"
              >
                Invite
              </button>
            </div>
          ))}

          <div className="invite-team-add-member">
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
            <button onClick={handleAddMember} className="invite-team-add-button">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="invite-team-right-section">
        <div className="invite-team-suggested-users">
          <h3>Suggested Users</h3>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.map((user, index) => (
              <div key={index} className="invite-team-suggested-user">
                <div className="invite-team-user-info">
                  <div className="invite-team-user-name">{user.username}</div>
                  <div className="invite-team-user-email">{user_emails[user.username]}</div>
                  <div className="invite-team-user-interests">
                    <strong>Interests:</strong> {user.interests.join(', ') || 'N/A'}
                  </div>
                </div>
                <button
                  onClick={() => handleInvite(user_emails[user.username])}
                  className="invite-team-send-request"
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
