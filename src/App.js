import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Ensure this path is correct
import InterviewPage from "./components/UserDashboard/Simulation/Interviewpage"; // Ensure this path is correct
import Dashboard from './components/Home/Dashboard.jsx';
import UserLogin from './components/UserDashboard/LoginUser/UserLogin.jsx';
import UserSignup from './components/UserDashboard/SignupUser/UserSignup';
import AdminLogin from './components/AdminDashboard/AdminLogin.jsx'
import UserDashboard from './components/UserDashboard/DashboardUser/UserDashboard.jsx';
import Home from './components/Home/Homepage.jsx'


function App(){
  return (
    <Router>
      <Routes>
        <Route path="/InterviewPage/:command_id" element={<InterviewPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
