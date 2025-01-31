import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HackathonDetail from "./components/hackathondetail/HackathonDetail.jsx";
// Importing Components
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUS/AboutUs";
import Welcome from "./components/welcome/Welcome";
import Login from './components/login/Login';
import Register from './components/register/Register';
import CreateHackathon from "../src/components/createHackathon/createHackathon.jsx";
import HackathonListPage from "./pages/HackthonListPage.jsx"; 
import Profile from "./components/profile/profile.jsx"; 
import FetchAllToJudgePage from  './pages/FetchAllToJudgePage.jsx'
import HackathonDetail2 from "./components/JudgeSubmissions/HackathonDetail2.jsx";
import JudgeTeams from "./components/judge-hackathon-teams/JudgeTeams.jsx";
import HackathonProjects from "./components/judgehackathonprojects/HackathonProjects.jsx";
import CreateTeamPage from './pages/CreateTeamPage.jsx'


const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/create-hackathon" element={<CreateHackathon />} /> 
            <Route path="/hackathons/:hackathonId" element={<HackathonDetail />} />
            <Route path="/find" element={<HackathonListPage />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/myhackathons" element={<FetchAllToJudgePage />} />
            <Route path="/judge/hackathons/:hackathonId" element={<HackathonDetail2 />}/>
            <Route path="/judgeteams/:hackathonId" element={<JudgeTeams />} />
            <Route path="/team/review/:teamId" element={<HackathonProjects />} />
            <Route path="/create-team/:hackathonId" element={<CreateTeamPage />} />


          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
};

export default App;