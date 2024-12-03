// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Styles/UserLogin.css";

// const UserLogin = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const response = await axios.post("http://localhost:8000/api/login/", formData);
//             if (response.status === 200) {
//                 // Redirect to the dashboard if login is successful
//                 navigate("/UserDashboard");
//             }
//         } catch (err) {
//             setError(err.response?.data?.error || "Something went wrong.");
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit} className="login-form">
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <p>
//                 Don't have an account? <a href="/usersignup">Sign Up</a>
//             </p>
//         </div>
//     );
// };

// export default UserLogin;





//by chatgpt loginpageupdated code

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Styles/UserLogin.css";

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/login/", formData);
            if (response.status === 200) {
                // Redirect to the dashboard if login is successful
                navigate("/UserDashboard");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div id="parent"className="user-login" >
            <div id="child">
                <h3>RecruitSmart</h3>
                <h3>Sign In</h3>

                {error && <p className="error-message">{error}</p>}

                <form id="login-form" onSubmit={handleSubmit}>
                    <span>
                        <label htmlFor="email">Email: &nbsp;</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </span>
                    <span>
                        <label htmlFor="password">Password: &nbsp;</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </span>

                    <div id="login-container">
                        <button id="button" type="submit">
                            Login
                        </button>
                        <a href="/forgotpw" id="forgotpw">
                            Forgot Password?
                        </a>
                    </div>
                </form>

                <h3>
                    Don't have an Account? &nbsp;&nbsp; <a href="/usersignup">Register</a>
                </h3>
            </div>
        </div>
    );
};

export default UserLogin;
