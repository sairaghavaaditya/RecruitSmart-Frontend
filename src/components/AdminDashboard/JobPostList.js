import React, { useEffect, useState } from "react";
import axios from "axios";

const JobPostList = () => {
    const [jobPosts, setJobPosts] = useState([]);

    const fetchJobPosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/admin-dashboard/list-job-posts/");
            setJobPosts(response.data.job_posts);
        } catch (error) {
            console.error("Error fetching job posts:", error);
        }
    };

    useEffect(() => {
        fetchJobPosts();
    }, []);

    return (
        <div>
            <h2>Job Posts</h2>
            <ul>
                {jobPosts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobPostList;
