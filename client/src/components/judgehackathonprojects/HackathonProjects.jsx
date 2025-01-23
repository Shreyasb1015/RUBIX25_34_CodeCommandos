import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaRobot, FaUsers, FaProjectDiagram, FaCodeBranch, FaBug, FaCode, FaStar } from 'react-icons/fa';
import { BiGitPullRequest } from 'react-icons/bi';
import Navbar from '../Navbar/Navbar';
import './HackathonProjects.css';
import { GET_TEAM_BY_ID_ROUTE, GET_AI_REVIEW } from '../../utils/Routes';
import { toast } from 'react-toastify';

const HackathonProjects = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [repoMetrics, setRepoMetrics] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`${GET_TEAM_BY_ID_ROUTE}/${teamId}`, {
          withCredentials: true
        });
        setTeam(response.data.data);
      } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to fetch team details");
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, [teamId]);

  const handleAnalyze = async () => {
    if (!team?.projectLink) {
      toast.error("No GitHub URL found!");
      return;
    }
    setAnalysisLoading(true);
    try {
      const response = await axios.post(GET_AI_REVIEW, {
        github_url: team.projectLink
      });
      setAnalysis(response.data.analysis);
      setRepoMetrics({
        ...response.data.metrics,
        ...response.data.repository_info
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error("Failed to analyze repository");
    } finally {
      setAnalysisLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!team) return <div className="not-found">Team not found</div>;

  return (
    <div className="project-review-container">
      <Navbar />
      <div className="project-content">
        <div className="team-info-card">
          <h1>{team.name}</h1>
          
          <div className="info-grid">
            <div className="info-item">
              <FaUsers className="info-icon" />
              <div>
                <h3>Team Size</h3>
                <p>{team.membersId?.length || 0} Members</p>
              </div>
            </div>

            <div className="info-item">
              <FaProjectDiagram className="info-icon" />
              <div>
                <h3>Project</h3>
                <p>{team.projectName}</p>
              </div>
            </div>

            {team.projectLink && (
              <a 
                href={team.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <FaGithub /> View on GitHub
              </a>
            )}
          </div>

          <button 
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={analysisLoading}
          >
            <FaRobot /> {analysisLoading ? 'Analyzing...' : 'Analyze Project'}
          </button>

          {repoMetrics && (
            <div className="metrics-section">
              <h2>Repository Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <FaCodeBranch className="metric-icon" />
                  <span className="metric-value">{repoMetrics.total_commits}</span>
                  <span className="metric-label">Commits</span>
                </div>
                <div className="metric-card">
                  <FaBug className="metric-icon" />
                  <span className="metric-value">{repoMetrics.total_issues}</span>
                  <span className="metric-label">Issues</span>
                </div>
                <div className="metric-card">
                  <BiGitPullRequest className="metric-icon" />
                  <span className="metric-value">{repoMetrics.total_prs}</span>
                  <span className="metric-label">Pull Requests</span>
                </div>
                <div className="metric-card">
                  <FaCode className="metric-icon" />
                  <span className="metric-value">{repoMetrics.language}</span>
                  <span className="metric-label">Language</span>
                </div>
              </div>
            </div>
          )}

          {analysis && (
            <div className="analysis-section">
              <h2>AI Analysis Score</h2>
              <div className="scores-grid">
                <div className="score-card">
                  <h3>Overall</h3>
                  <div className="score">{analysis.scores.overall}</div>
                </div>
                <div className="score-card">
                  <h3>Technical</h3>
                  <div className="score">{analysis.scores.technical}</div>
                </div>
                <div className="score-card">
                  <h3>Innovation</h3>
                  <div className="score">{analysis.scores.innovation}</div>
                </div>
                <div className="score-card">
                  <h3>Documentation</h3>
                  <div className="score">{analysis.scores.documentation}</div>
                </div>
              </div>

              <div className="analysis-text">
                <h3>Overview</h3>
                <p>{analysis.overview}</p>

                <h3>Strengths</h3>
                <ul>
                  {analysis.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>

                <h3>Areas for Improvement</h3>
                <ul>
                  {analysis.improvements.map((improvement, idx) => (
                    <li key={idx}>{improvement}</li>
                  ))}
                </ul>

                <h3>Verdict</h3>
                <p>{analysis.verdict}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonProjects;