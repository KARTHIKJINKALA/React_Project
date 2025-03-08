import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Jobdesc.css";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

export const Jobdesc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;
  const indval = location.state?.ind;
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false); 
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://jobquest-backend-l0ol.onrender.com/jobsdata");
        const filteredJob = response.data.find((val) => val._id === jobId);
        setJob(filteredJob);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const checkIfSaved = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const response = await axios.get("https://jobquest-backend-l0ol.onrender.com/savedjobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.savedjobindex.includes(indval)) {
          setIsSaved(true);
          setMessage("This job is already saved.");
        }
      } catch (error) {
        console.error("Error checking saved jobs:", error);
      }
    };

    if (jobId) {
      fetchJobs();
      checkIfSaved();
    }
  }, [jobId, indval]);

  // Hide the message after 3 seconds with fade effect
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const profileHandle = () => navigate("/profile");

  const logoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!job) {
    return <p style={{color:"white"}}>Redirecting...</p>;
  }

  const toggleSaveJob = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found!");

      if (isSaved) {
        await axios.delete("https://jobquest-backend-l0ol.onrender.com//savedjobs", {
          data: { token, savedjobindex: indval },
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessage("Job removed from saved list.");
      } else {
        await axios.put(
          "https://jobquest-backend-l0ol.onrender.com/savedjobs",
          { token, savedjobindex: indval },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessage("Job saved successfully!");
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving/removing job:", error.message);
    }
  };


  const Apply = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "https://jobquest-backend-l0ol.onrender.com/appliedjobs",
        { appliedjobindex: indval },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage("Job applied successfully!");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.response?.data || error.message;
      setMessage(errorMsg); // Set error message
    }
  };
  
// console.log(indval)

  return (
    <>
      <div className="Applicantpage">
        <div className="left">
<Link to={"/Applicant"}>          <img
            src="../src\Components\Landingpage\svgviewer-png-output (2).png"
            alt=""
        
          /></Link>
        </div>

        <div className="right">
        <DropdownButton id="dropdown-basic-button" title="Profile">
      <Dropdown.Item href="#/action-1" >Profile</Dropdown.Item>
      <Dropdown.Item href="#/action-2" >Logout</Dropdown.Item>

    </DropdownButton>
        </div>
      </div>

      <div className="jobdesc-containerdec">
        {/* Left Side - Job Details */}
        <div className="job-detailsdec">
          <h1>{job.title}</h1>
          <p>
            <strong>Company:</strong> {job.companyname}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
        </div>

        {/* Right Side - Actions */}
        <div className="job-actionsdec">
          {/* Display message */}
          {message && (
  <p className={`message ${isSaved ? "success" : "error"}`}>
    {message}
  </p>
)}
          <button onClick={toggleSaveJob}>
            {isSaved ? "Remove Job" : "Save Job"}
          </button>
          <button onClick={Apply}>Apply Job</button>
        </div>
      </div>
    </>
  );
};
