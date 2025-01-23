import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'; // Assuming it exists
import Footer from '../Footer/Footer'; // Assuming it exists
import { GET_ALL_JUDGES_HACKATHON_ROUTE } from '../../utils/Routes';
import styles from './JudgeAll.module.css';
import HackathonCard from '../HackthonCard/HackthonCard';

const JudgeAll = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_JUDGES_HACKATHON_ROUTE, { withCredentials: true });
        console.log(response)
        setHackathons(response.data.data.activeHackathons || []);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.hackathonList}>
      <Navbar />
      <div className={styles.hackathonGrid}>
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <HackathonCard key={hackathon._id} hackathon={hackathon}/>
          ))
        ) : (
          <p className={styles.noHackathons}>No hackathons found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JudgeAll;
