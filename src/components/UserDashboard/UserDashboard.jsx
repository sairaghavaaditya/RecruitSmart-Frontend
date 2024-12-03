
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import './Styles/UserDashboard.css'

const UserDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // React Router hook for navigation

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/jobs/");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching job posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleTakeInterview = (jobId) => {
        // Redirect to the Interview page with the job ID
        // navigate(`/Interviewpage/${jobId}`);
        navigate(`/Interviewpage`);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>User Dashboard</h2>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="userlogin">Logout</a></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Welcome to the Job Portal</h1>
                </div>
                <div className="jobs">
                    <h3>Available Jobs</h3>
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : jobs.length === 0 ? (
                        <p>No jobs available at the moment.</p>
                    ) : (
                        <ul>
                            {jobs.map((job) => (
                                <li key={job.id} className="job-card">
                                    <h4>{job.title}</h4>
                                    <p>{job.description}</p>
                                    <span>Posted on: {new Date(job.created_at).toLocaleDateString()}</span>
                                    <br />
                                    <button
                                        className="take-interview-btn"
                                        onClick={() => handleTakeInterview(job.id)}
                                    >
                                        Take Interview
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
