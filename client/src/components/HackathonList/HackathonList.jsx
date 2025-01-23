import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'; // Assuming it exists
import Footer from '../Footer/Footer'; // Assuming it exists
import { GET_ACTIVE_UPCOMING_HACKATHONS_ROUTE } from '../../utils/Routes';
import styles from './HackthonList.module.css';
import HackathonCard from '../HackthonCard/HackthonCard';

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ACTIVE_UPCOMING_HACKATHONS_ROUTE, { withCredentials: true });
        setHackathons(response.data.data.hackathons);
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
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon._id} hackathon={hackathon}/>
        ))}
        {hackathons.length === 0 && <p className={styles.noHackathons}>No hackathons found.</p>}
      </div>
      <Footer />
    </div>
  );
};

export default HackathonList;