import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom
import styles from './HackthonCard.module.css'
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from 'react-router-dom';
const HackathonCard = ({ hackathon }) => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate(`/hackathons/${hackathon._id}`);
  };
  return (
    <div className={styles.hackathoncard}>
  <div className="hackathon-header">
    <Link to={`/hackathons/${hackathon._id}`}> 
      <h3>{hackathon.name}</h3>
    </Link>
    <p className="hackathon-type">Hackathon</p>
  </div>
  <div className={styles.bannerImage}>
    <img src={hackathon.bannerImage} alt={hackathon.name} />
  </div>
  <div className="hackathondetails">
    <div className={styles.hackathonmatadata}>
      <span className={styles.mode}>{hackathon.mode}</span> 
      <span>  •  </span>
      <span className={styles.date}>{new Date(hackathon.startingDate).toDateString()}</span> 
    </div>
  </div>
  <div className="hackathonorganizers">
    {/* Display organizer avatars here (if available) */}
    <p>+1000 Participating</p> 
  </div>
  <div className={styles.detail}>
    <Link to={`/hackathons/${hackathon._id}`} className="button">
      Explore
    </Link>
  </div>
  <AwesomeButton type="primary" ripple={true} onPress={handleRegister} className="get-started-btn mt-4">
    Register
    </AwesomeButton>
</div>

  );
};

export default HackathonCard;