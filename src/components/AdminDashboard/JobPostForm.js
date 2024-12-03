import React, { useState } from "react";
import axios from "axios";

const JobPostForm = ({ fetchJobPosts }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/admin-dashboard/create-job-post/", {
                title,
                description,
            });
            fetchJobPosts(); // Refresh the job list
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating job post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Job Post</h2>
            <div>
                <label>Title:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default JobPostForm;
