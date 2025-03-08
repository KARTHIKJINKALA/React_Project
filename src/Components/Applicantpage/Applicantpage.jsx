import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBookmark, 
  faLocationDot, 
  faBriefcase, 
  faLayerGroup,
  faSearch,
  faUser,
  faSignOutAlt,
  faBuilding,
  faDoorOpen,
  faMoneyBillWave,
  faGraduationCap,
  faCalendarAlt,
  faTags
} from "@fortawesome/free-solid-svg-icons";

import "./Applicantpage.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

export const Applicantpage = () => {
  const [filter, setFilter] = useState({
    keywords: "",
    location: "",
    emptype: [],
    explevel: [],
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isSaved, setIsSaved] = useState({});
  const [applyMessage, setApplyMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jobquest-backend-l0ol.onrender.com/jobsdata")
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  // Real-time filtering based on filter state
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesKeyword = job.title
        .toLowerCase()
        .includes(filter.keywords.toLowerCase());
      const matchesLocation =
        filter.location === "" ||
        job.location.toLowerCase() === filter.location.toLowerCase();
      const matchesEmpType =
        filter.emptype.length === 0 ||
        filter.emptype.includes(job.employmenttype);
      const matchesExpLevel =
        filter.explevel.length === 0 ||
        filter.explevel.includes(job.experiencelevel);

      return matchesKeyword && matchesLocation && matchesEmpType && matchesExpLevel;
    });

    setFilteredJobs(filtered);
  }, [filter, jobs]);

  // Navigation Handlers
  const profileHandle = () => navigate("/profile");
  const LogoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Checkbox Handler for filters
  const handleCheckboxChange = (category, value) => {
    setFilter((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  // Save or remove job for later
  const handleSaveToggle = async (index) => {
    setIsSaved((prev) => {
      const updatedState = { ...prev, [index]: !prev[index] };
      if (!prev[index]) saveJob(index);
      else removeJob(index);
      return updatedState;
    });
  };

  const saveJob = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found!");
      const response = await axios.put(
        "https://jobquest-backend-l0ol.onrender.com/savedjobs",
        { token, savedjobindex: index }
      );
      // console.log(response.data);
    } catch (error) {
      console.error("Error saving job:", error.message);
    }
  };

  const removeJob = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found!");
      const response = await axios.delete("https://jobquest-backend-l0ol.onrender.com/savedjobs", {
        data: { token, savedjobindex: index },
      });
      // console.log(response.data);
    } catch (error) {
      console.error("Error removing job:", error.message);
    }
  };

  // Apply to job handler with message display
  const Apply = async (index) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "https://jobquest-backend-l0ol.onrender.com/appliedjobs",
        { appliedjobindex: index },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplyMessage((prev) => ({ ...prev, [index]: { message: "✅ Applied successfully!", type: "success" } }));
      setTimeout(() => {
        setApplyMessage((prev) => ({ ...prev, [index]: null }));
      }, 3000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.response?.data || error.message;
      setApplyMessage((prev) => ({ ...prev, [index]: { message: `Error: ${errorMsg}`, type: "error" } }));
      setTimeout(() => {
        setApplyMessage((prev) => ({ ...prev, [index]: null }));
      }, 3000);
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <>
      <div className="Applicantpage">
        <div className="left">
          {/* <img src={logo} alt="Job Search Platform Logo" />
           */}
            <img src="..\src\Components\Landingpage\svgviewer-png-output (2).png" alt=""  height={"100vh"} width={"160vw"}/>

        </div>
        
        <div className="right">
          {/* <button onClick={profileHandle}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </button>
          <button onClick={LogoutHandle}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button> */}
      <DropdownButton id="dropdown-basic-button" title="Profile">
      <Dropdown.Item href="#/action-1" onClick={profileHandle}>Profile</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={LogoutHandle}>Logout</Dropdown.Item>

    </DropdownButton>
        </div>
      </div>

      <div className="filters">
        <div className="sidebar">
          <h2>Find Your Perfect Job</h2>
          <div className="search">
            <div>
              <h3>Search By Keywords</h3>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={filter.keywords}
                  onChange={(e) =>
                    setFilter({ ...filter, keywords: e.target.value })
                  }
                  placeholder="Job title, keywords, company..."
                />
              </div>
            </div>

            <div>
              <h3>Location</h3>
              <select
                value={filter.location}
                onChange={(e) =>
                  setFilter({ ...filter, location: e.target.value })
                }
              >
                <option value="">All Locations</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <h3>Employment Type</h3>
              <div className="jobtype">
                <label>
                  <input
                    type="checkbox"
                    checked={filter.emptype.includes("Full Time")}
                    onChange={() => handleCheckboxChange("emptype", "Full Time")}
                  />
                  Full-time
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filter.emptype.includes("Part Time")}
                    onChange={() => handleCheckboxChange("emptype", "Part Time")}
                  />
                  Part-time
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebarright">
          {loading ? (
            <div className="loading-spinner">Loading jobs...</div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div className="jobscard" key={index}>
                {applyMessage[index] && (
                  <div className={`status-message ${applyMessage[index].type}`}>
                    {applyMessage[index].message}
                  </div>
                )}

                
                <Link to={"/Jobdesc"} state={{ jobId: job._id,ind:index}}>
                 <div className="job-details">
                  <h3 className="job-title">
                    <FontAwesomeIcon icon={faBriefcase} className="detail-icon" />
                    {job.title}
                  </h3>
                  
                  <h3 className="company-name">
                    <FontAwesomeIcon icon={faBuilding} className="detail-icon" />
                    {job.companyname}
                  </h3>
                  
                  <h3 className="job-openings">
                    <FontAwesomeIcon icon={faDoorOpen} className="detail-icon" />
                    Openings: {job.openings}
                  </h3>
                  
                  {/* <h3 className="job-salary">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="detail-icon" />
                    {job.salary}
                  </h3> */}
                  
                  {/* <h3 className="job-qualification">
                    <FontAwesomeIcon icon={faGraduationCap} className="detail-icon" />
                    {job.qualification}
                  </h3> */}
                  
                  <h3 className="job-postdate">
                    <FontAwesomeIcon icon={faCalendarAlt} className="detail-icon" />
                    Posted: {job.postdate}
                  </h3>
                  
                  {/* <div className="job-skills">
                    <FontAwesomeIcon icon={faTags} className="detail-icon" />
                    Skills: 
                    {job.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div> */}
                </div>
                
                <div className="job-meta">
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {job.location}
                  </span>
                  {/* <span>
                    <FontAwesomeIcon icon={faBriefcase} />
                    {job.employmenttype}
                  </span>
                  {job.experiencelevel && (
                    <span>
                      <FontAwesomeIcon icon={faLayerGroup} />
                      {job.experiencelevel}
                    </span>
                  )} */}
                </div>
                
                <p>{truncateText(job.description)}</p>
                
                </Link>
               
{/*                 
                <div className="job-actions">
                  <button 
                    className={`bookmark-btn ${isSaved[index] ? 'saved' : ''}`}
                    onClick={() => handleSaveToggle(index)}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                    {isSaved[index] ? 'Saved' : 'Save Job'}
                  </button>
                  
                  <button 
                    className="apply-btn"
                    onClick={() => Apply(index)}
                  >
                    Apply Now
                  </button>
                </div> */}
              </div>
            ))
          ) : (
            <div className="no-jobs-message">
              <FontAwesomeIcon icon={faSearch} size="2x" />
              <p>No jobs found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};