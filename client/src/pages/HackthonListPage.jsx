import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import HackathonList from '../components/HackathonList/HackathonList';
const HackathonListPage = () => {
  return (
    <div className="hackathon-page">
      <Navbar/>
      <HackathonList/>
      <Footer/>
    </div>
  );
};

export default HackathonListPage;