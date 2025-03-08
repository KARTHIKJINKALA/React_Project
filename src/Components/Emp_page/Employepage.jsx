import React, { useEffect, useState } from "react";
import "./Employepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, 
  faSignOutAlt, 
  faBriefcase, 
  faListAlt, 
  faUsers, 
  faTasks,
  faTrash,
  faEdit,
  faEye,
  faDollarSign,
  faMapMarkerAlt,
  faGraduationCap,
  faCogs,
  faCalendarAlt,
  faUserTie,
  faCheckCircle,
  faExclamationCircle,
  faTimes,
  faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Employerpage = () => {
  const Navigator = useNavigate();

  const [profile, setProfile] = useState("");
  const [totaljobs, setTotaljobs] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    companyname: "",
    openings: "",
    salary: "$",
    qualification: "",
    skills: "",
    employmenttype: "",
    location: "",
    experience: "",
    postdate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  // Function to show toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    // Auto hide after 5 seconds
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 5000);
  };

  // Function to hide toast manually
  const hideToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://jobquest-backend-l0ol.onrender.com/employepost", jobDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Show toast notification instead of alert
        showToast(`"${jobDetails.title}" job posted successfully!`);
        
        setJobDetails({
          title: "",
          description: "",
          companyname: "",
          openings: "",
          salary: "$",
          qualification: "",
          skills: "",
          employmenttype: "",
          location: "",
          experience: "",
          postdate: new Date().toISOString().split("T")[0],
        });
        // Refresh job list after posting
        TotaljobsHandle();
      }
    } catch (error) {
      console.error("Error posting job:", error);
      // Show error toast
      showToast("Failed to post the job. Please try again.", "error");
    }
  };

  const TotaljobsHandle = async () => {
    setProfile("total jobs");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://jobquest-backend-l0ol.onrender.com/employepostarray",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotaljobs(response.data.filterdata);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showToast("Failed to load jobs. Please try again.", "error");
    }
  };

  const viewapplicants = (jobId) => {
    Navigator("/viewapplicants", { state: { jobId } });
  };

  const jobdelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://jobquest-backend-l0ol.onrender.com/deletejob/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Show toast notification instead of alert
        showToast("Job deleted successfully!");
        // Update UI instantly
        setTotaljobs((prevJobs) => prevJobs.filter((job) => job._id.toString() !== id.toString()));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      showToast("Failed to delete the job. Please try again.", "error");
    }
  };

  const updatejob = (jobId) => {
    Navigator("/updatejob", { state: { jobId } });
  };

  useEffect(() => {
    // Load total jobs by default on page load
    TotaljobsHandle();
  }, []);


  const LogoutHandle = () => {
    localStorage.removeItem("token");
    Navigator("/");
  };


  
  

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === "success" ? (
              <FontAwesomeIcon icon={faCheckCircle} />
            ) : (
              <FontAwesomeIcon icon={faExclamationCircle} />
            )}
          </div>
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close" onClick={hideToast}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      <div className="userprofilepage">
        <div className="leftone">
          <div className="logo-container">
      <img src="../src\Components\Landingpage\svgviewer-png-output (2).png" alt=""  height={"100vh"} width={"160vw"}/>
            
           
          </div>
        </div>
        <div className="rightone">
          {/* <button className="logout-btn" onClick={LogoutHandle}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button> */}
        <DropdownButton id="dropdown-basic-button" title="profile">
      <Dropdown.Item href="#/action-1" onClick={LogoutHandle}>Logout</Dropdown.Item>
     

    </DropdownButton>
        </div>
      </div>

      <div className="section">
        <div className="sidebaruser">
          <button 
            className={profile === "post a job" ? "active" : ""} 
            onClick={() => setProfile("post a job")}
          >
            <FontAwesomeIcon icon={faBriefcase} /> Post Job
          </button>

          <button 
            className={profile === "no of applicants" ? "active" : ""} 
            onClick={() => setProfile("no of applicants")}
          >
            <FontAwesomeIcon icon={faUsers} /> Applicants
          </button>
          <button 
            className={profile === "my posts" ? "active" : ""} 
            onClick={() => setProfile("my posts")}
          >
            <FontAwesomeIcon icon={faTasks} /> Manage Posts
          </button>
        </div>

        <div className="rightsidebaruser">
          {profile === "post a job" && (
            <div className="post-job-container">
              <h1><FontAwesomeIcon icon={faBriefcase} /> Post a New Job</h1>
              <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faBriefcase} /> Job Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Senior React Developer"
                    value={jobDetails.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faBuilding} /> Company Name</label>
                  <input
                    type="text"
                    name="companyname"
                    placeholder="Your company name"
                    value={jobDetails.companyname}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faUsers} /> Number of Openings</label>
                  <input
                    type="number"
                    name="openings"
                    placeholder="e.g. 5"
                    value={jobDetails.openings}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faDollarSign} /> Salary</label>
                  <input
                    type="text"
                    name="salary"
                    placeholder="e.g. $80,000 - $100,000"
                    value={jobDetails.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faGraduationCap} /> Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="e.g. Bachelor's in Computer Science"
                    value={jobDetails.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faCogs} /> Skills</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="e.g. React, Node.js, MongoDB"
                    value={jobDetails.skills}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faUserTie} /> Employment Type</label>
                  <input
                    type="text"
                    name="employmenttype"
                    placeholder="e.g. Full-time, Contract"
                    value={jobDetails.employmenttype}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. New York, NY or Remote"
                    value={jobDetails.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label><FontAwesomeIcon icon={faUserTie} /> Experience Required</label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g. 3+ years"
                    value={jobDetails.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group full-width">
                  <label><FontAwesomeIcon icon={faListAlt} /> Job Description</label>
                  <textarea
                    name="description"
                    placeholder="Detailed job description..."
                    value={jobDetails.description}
                    onChange={handleChange}
                    required
                    rows="5"
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  <FontAwesomeIcon icon={faBriefcase} /> Post Job
                </button>
              </form>
            </div>
          )}

          {["my posts", "no of applicants", "total jobs"].includes(profile) && (
            <div className="jobs-container">
              <h1>
                {profile === "total jobs" && <><FontAwesomeIcon icon={faListAlt} /> Your Job Listings</>}
                {profile === "my posts" && <><FontAwesomeIcon icon={faTasks} /> Manage Your Posts</>}
                {profile === "no of applicants" && <><FontAwesomeIcon icon={faUsers} /> Job Applicants</>}
              </h1>
              
              {totaljobs.length === 0 ? (
                <div className="no-jobs">
                  <p>No jobs found. Start by posting a new job!</p>
                </div>
              ) : (
                <div className="jobs-grid">
                  {totaljobs.map((val) => (
                    <div key={val._id} className="job-card">
                      <div className="job-header">
                        
                        <h2><FontAwesomeIcon icon={faBuilding} /> {val.companyname}</h2>
                        <span className="job-date">
                          <FontAwesomeIcon icon={faCalendarAlt} /> Posted: {val.postdate}</span>
                          {profile === "my posts" && (
    <div className="cart-container">
      <div className="cart">
        <FontAwesomeIcon icon={faEllipsisVertical} />
        <div className="cart-dropdown">
          <li style={{ listStyle: "none" }} onClick={() => updatejob(val)}>Update</li>
          <li style={{ listStyle: "none" }} onClick={() => jobdelete(val._id)}>Delete</li>
        </div>
      </div>
    </div>
  )}


                      </div>
                      
                      <h3 className="job-title">{val.title}</h3>
                      
                      
                      <div className="job-details">
                        
                        <div className="job-meta">
                          
                          <span><FontAwesomeIcon icon={faUserTie} /> {val.employmenttype}</span>
                          <span><FontAwesomeIcon icon={faUserTie} /> {val.experience} exp</span>
                          <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {val.location}</span>
                          <span><FontAwesomeIcon icon={faUsers} /> {val.openings} openings</span>
                          <span><FontAwesomeIcon icon={faDollarSign} /> {val.salary}</span>
                       
                        </div>
                      </div>

                      <div className="job-actions">
                        {profile === "my posts" && (
                          <>
                            {/* <button className="delete-btn" onClick={() => jobdelete(val._id)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                            <button className="update-btn" onClick={() => updatejob(val._id)}>
                              <FontAwesomeIcon icon={faEdit} /> Update
                            </button> */}
                          </>
                        )}
                        



                        {profile === "no of applicants" && (
                          <button className="view-btn" onClick={() => viewapplicants(val._id)}>
                            <FontAwesomeIcon icon={faEye} /> View Applicants
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Employerpage;