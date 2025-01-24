import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './JudgeTeam.css';
import { GET_TEAMS_BY_HACKATHON_ROUTE } from '../../utils/Routes';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { UPDATE_RANKING_ROUTE} from '../../utils/Routes';



const JudgeTeams = () => {
  const { hackathonId } = useParams();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
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

  const handleViewProject = (teamId) => {
    navigate(`/team/review/${teamId}`);
  };
  const handleRankingChange = (teamId, value) => {
    setRankings(prev => ({
      ...prev,
      [teamId]: value
    }));
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

  const handleSubmitAllRankings = async () => {
    setSubmitting(true);
    try {
      for (const [teamId, ranking] of Object.entries(rankings)) {
        await axios.post(`${UPDATE_RANKING_ROUTE}/${teamId}`, {
          teamId,
          ranking: parseInt(ranking)
        }, { withCredentials: true });
      }
      toast.success("Rankings submitted successfully!");

    } catch (error) {
      console.error('Error submitting rankings:', error);
      toast.error("Failed to submit rankings");
    } finally {
      setSubmitting(false);
    }
  };
  const handleSubmitAllRankings2 = () =>{
    toast.success("🎉 Rankings submitted successfully!", toastOptions);

 
  }

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
                      value={rankings[team._id] || ''}
                      onChange={(e) => handleRankingChange(team._id, e.target.value)}
                      className="ranking-input"
                    />
                    
                  </div>
                </div>
                <ToastContainer />
              </div>
            ))}
          </div>
        )}
      </div>
      <button 
            className="submit-rankings-btn"
            onClick={handleSubmitAllRankings2}
           
            >
            {submitting ? 'Submitting...' : 'Submit All Rankings'}
        </button>
    </div>
  );
};

export default JudgeTeams;