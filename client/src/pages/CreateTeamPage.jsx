import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import CreateTeam from '../components/CreateTeam/CreateTeam';
const CreateTeamPage = () => {
  return (
    <div className="hackathon-page">
      <Navbar/>
      <CreateTeam/>

    </div>
  );
};

export default CreateTeamPage;