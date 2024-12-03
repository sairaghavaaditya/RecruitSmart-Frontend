import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const goToAdmin = () => navigate('/adminlogin');
    const goToUserLogin = () => navigate('/userlogin/');

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Main Dashboard</h1>
            <button onClick={goToAdmin} style={{ margin: '10px', padding: '10px 20px' }}>
                Admin
            </button>
            <button onClick={goToUserLogin} style={{ margin: '10px', padding: '10px 20px' }}>
                User
            </button>
        </div>
    );
};

export default Dashboard;
    