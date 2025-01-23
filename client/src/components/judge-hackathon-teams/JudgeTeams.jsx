import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './JudgeTeam.css';
import { GET_TEAMS_BY_HACKATHON_ROUTE } from '../../utils/Routes';
import { useNavigate } from 'react-router-dom';


const JudgeTeams = () => {
  const { hackathonId } = useParams();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewProject = (teamId) => {
    navigate(`/team/review/${teamId}`);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${GET_TEAMS_BY_HACKATHON_ROUTE}/${hackathonId}`,{ withCredentials: true });
        console.log(response);
        setTeams(response.data.data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [hackathonId]);

  const handleRankingSubmit = async (teamId, ranking) => {
    try {
      await axios.post(`/api/v1/teams/rank`, {
        teamId,
        ranking
      });
      setTeams(teams.map(team => 
        team._id === teamId ? { ...team, ranking } : team
      ));
    } catch (error) {
      console.error('Error updating ranking:', error);
    }
  };

  return (
    <div className="judge-teams-container">
      <Navbar />
      <div className="teams-content">
        <h1>Judge Teams</h1>
        {loading ? (
          <div className="loading">Loading teams...</div>
        ) : (
          <div className="teams-grid">
            {teams.map((team) => (
              <div key={team._id} className="team-card">
                <div className="team-header">
                  <h2>{team.name}</h2>
                  <span className={`progress-badge ${team.progress.toLowerCase()}`}>
                    {team.progress}
                  </span>
                </div>
                
                <div className="team-info">
                  <p><strong>Project:</strong> {team.projectName}</p>
                  <p><strong>Team Size:</strong> {team.membersId.length}</p>
                </div>

                <div className="team-actions">
                <button 
                    className="view-project-btn"
                    onClick={() => handleViewProject(team._id)}
                    >
                        View Project
                    </button>
                  
                  <div className="ranking-section">
                    <label>Ranking:</label>
                    <input 
                      type="number"
                      min="1"
                      max="100"
                      value={team.ranking || ''}
                      onChange={(e) => handleRankingSubmit(team._id, e.target.value)}
                      className="ranking-input"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgeTeams;