import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Ensure this path is correct
import InterviewPage from "./components/UserDashboard/Interviewpage"; // Ensure this path is correct
import Dashboard from './components/Dashboard';
import UserLogin from './components/UserDashboard/UserLogin.jsx';
import UserSignup from './components/UserDashboard/UserSignup';
import AdminLogin from './components/AdminDashboard/AdminLogin.jsx'
import UserDashboard from './components/UserDashboard/UserDashboard.jsx';
import Home from './components/LandingPages/home.jsx';
function App(){
  return (
    <Router>
      <Routes>
        <Route path="/InterviewPage" element={<InterviewPage />} />
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
