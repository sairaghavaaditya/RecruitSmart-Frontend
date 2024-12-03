// import React from "react";
// import JobPostForm from "./JobPostForm";
// import JobPostList from "./JobPostList";

// const AdminDashboard = () => {
//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//             <JobPostForm />
//             <JobPostList />
//         </div>
//     );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Fetch job posts when the component loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin-dashboard/list-job-posts/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch job posts.");
        }
        return response.json();
      })
      .then((data) => setJobPosts(data))
      .catch((error) => console.error("Error fetching job posts:", error));
  }, []);

  // Handle job post creation
  const handleCreateJobPost = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/admin-dashboard/create-job-post/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create job post.");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message || "Job post created successfully!");
        setJobPosts([...jobPosts, { id: data.job_post_id, title, description }]);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error creating job post:", error);
        setMessage("Failed to create job post.");
      });
  };
  
  

  // Handle job post deletion
  const handleDeleteJobPost = (id) => {
    fetch(`http://127.0.0.1:8000/admin-dashboard/delete-job-post/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete job post.");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message || "Job post deleted successfully!");
        setJobPosts(jobPosts.filter((job) => job.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting job post:", error);
        setMessage("Failed to delete job post.");
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Here, admins can manage job posts and view applications.</p>

      {/* Job Post Form */}
      <form onSubmit={handleCreateJobPost} style={{ marginBottom: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ marginRight: "10px", padding: "5px", verticalAlign: "top" }}
          ></textarea>
          <button type="submit" style={{ padding: "5px 10px" }}>
            Create Job Post
          </button>
        </div>
      </form>

      {/* Message */}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Job Posts List */}
      <h3>Job Posts</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {jobPosts.length > 0 ? (
          jobPosts.map((job) => (
            <li
              key={job.id}
              style={{
                border: "1px solid #ddd",
                margin: "10px 0",
                padding: "10px",
              }}
            >
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <button
                onClick={() => handleDeleteJobPost(job.id)}
                style={{ padding: "5px 10px", background: "red", color: "#fff" }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No job posts available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;



