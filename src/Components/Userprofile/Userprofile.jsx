import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBookmark, 
  faLocationDot, 
  faBriefcase, 
  faMoneyBillWave,
  faBuilding,
  faGraduationCap,
  faCalendarAlt,
  faDoorOpen,
  faLayerGroup,
  faUser,
  faSignOutAlt,
  faUserEdit,
  faClipboardCheck,
  faSearch,
  faFileAlt,
  faEnvelope,
  faMobile,
  faChevronLeft,
  faTimes,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Userprofile = () => {
  const [storedjobs, setStoredjobs] = useState([]); // Stores all jobs from API
  const [filteredJobs, setFilteredJobs] = useState([]); // Stores filtered jobs
  const [backendjobs, setBackendjobs] = useState({ savedarray: [] }); // Backend response
  const [profile, setProfile] = useState("");
  const [userdetails, setUserdetails] = useState([]);
  const [appliedjobs, setAppliedjobs] = useState([]);
  const [appliedfilter, setAppliedFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  // Add modal state and form data state
  const [showModal, setShowModal] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jobquest-backend-l0ol.onrender.com/jobsdata")
      .then((response) => {
        setStoredjobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  // When backendjobs updates, filter stored jobs
  useEffect(() => {
    if (storedjobs.length > 0 && backendjobs.savedarray) {
      const out = storedjobs.filter((_, index) =>
        backendjobs.savedarray.includes(index + 1)
      );
      setFilteredJobs(out); // Update state with filtered jobs
    }
  }, [backendjobs, storedjobs]); // Runs when backendjobs or storedjobs changes

  useEffect(() => {
    if (storedjobs.length > 0 && appliedjobs) {
      const out = storedjobs.filter((_, index) =>
        appliedjobs.includes(index + 1)
      );
      setAppliedFilter(out); // Update state with filtered jobs
    }
  }, [appliedjobs, storedjobs]);

  // Set initial user data in the form when userdetails changes


  const jobs = async () => {
    setProfile("savedjobs");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const userdata = { token: token, message: "hello" };

      const response = await axios.post(
        "https://jobquest-backend-l0ol.onrender.com/jobsaved",
        userdata
      );

      setBackendjobs(response.data); // This triggers the useEffect above
      setLoading(false);
    } catch (error) {
      console.error("Error fetching saved jobs:", error.message);
      setLoading(false);
    }
  };

  const userinfo = async () => {
    setProfile("Profile");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const userdata = { token: token, message: "hello" };

      const response = await axios.post(
        "https://jobquest-backend-l0ol.onrender.com/userinfo",
        userdata
      );

      setUserdetails(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching saved jobs:", error.message);
      setLoading(false);
    }
  };

  const LogoutHandle = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  // Modified to show modal instead of navigating
  const updateinfo = () => {
    // Instead of navigating, show the modal
    setShowModal(true);
  };

  // New functions for modal
  const closeModal = () => {
    setShowModal(false);
  };

  const Browseback = () => {
    Navigate("/Applicant");
  };

  const applieddisp = () => {
    setProfile("Appliedjobs");
    setLoading(true);

    const token = localStorage.getItem("token");
    
    axios.post("https://jobquest-backend-l0ol.onrender.com/applieddata", {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setAppliedjobs(response.data.appliejobs);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    });
  };

  const remove = async (id) => {
    try {
      const index = storedjobs.findIndex((val) => val._id === id);
      const token = localStorage.getItem("token");
  
      if (!token) return console.error("No token found!");
  
      const response = await axios.delete("https://jobquest-backend-l0ol.onrender.com/removeone", {
        data: { token, savedjobindex: index + 1 },
      });
  
      if (response.data.message === "Removed saved job successfully") {
        // Remove the job from the UI
        setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.error("Error removing job:", error.message);
    }
  };
  

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // console.log(userdetails)




// update model




const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [mobile, setMobile] = useState("");
const [file, setResume] = useState(null);
const [error, setError] = useState("");
// const [successMessage, setSuccessMessage] = useState("");

// Validation Functions
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
const validateMobile = (mobile) => /^[6789]\d{9}$/.test(mobile);

// Handle File Selection
const getfile= (e) => {
  const file = e.target.files[0];
  if (
    file &&
    (file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  ) {
    setResume(file);
  } else {
    setError("Invalid file type. Please upload a PDF or DOCX file.");
    setResume(null);
  }
};

// Handle Form Submission
const modelForm= async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setError("Email must be a valid @gmail.com address.");
    return;
  }
  if (!validateMobile(mobile)) {
    setError("Mobile number must be exactly 10 digits.");
    return;
  }
  if (!file) {
    setError("Please upload a valid resume.");
    return;
  }

  setError("");
  var token=localStorage.getItem("token")

  // Create FormData and append values
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("file", file); // Make sure the key matches the backend's "file"
  

  try {
    const response = await axios.patch("https://jobquest-backend-l0ol.onrender.com/resumes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    });

    // console.log("res:"+response.data);
  
    // console.log(response.data.message)
  if(response.data.message){
    alert("Useinfo updated succesfully")
  setName("");
setEmail("");
setMobile("");
 setResume("");
 setError("");
  }
   

  } catch (error) {
    console.error(error);
    setError("Error updating user information.");
  }

 console.log("hello")
};



  return (
    <>
      <div className="userprofilepage">
        <div className="left">
          {/* <img src="src/Components/Logo.jpg" alt="Job Search Platform Logo" /> */}

<Link to="/Applicant">
<img src="..\src\Components\Landingpage\svgviewer-png-output (2).png" alt=""  height={"100vh"} width={"160vw"}/>
</Link>
        </div>
        <div className="right">
          {/* <button className="nav-buttonsaved" onClick={jobs}>
            <FontAwesomeIcon icon={faBookmark} /> Saved 
          </button>
          <button className="nav-button" onClick={LogoutHandle}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button> */}
              <DropdownButton id="dropdown-basic-button" title="profile">
      <Dropdown.Item href="#/action-1" onClick={jobs}>Saved Jobs</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={LogoutHandle}>Logout</Dropdown.Item>
      {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
    </DropdownButton>
        </div>
      </div>

      <div className="section">
        <div className="sidebaruser">
          <button className="sidebar-button" onClick={userinfo}>
            <FontAwesomeIcon icon={faUserEdit} /> Update Profile
          </button>
          <button className="sidebar-button" onClick={applieddisp}>
            <FontAwesomeIcon icon={faClipboardCheck} /> Applied Jobs
          </button>
          <button className="sidebar-button" onClick={Browseback}>
            <FontAwesomeIcon icon={faSearch} /> Browse Jobs
          </button>
        </div>

        <div className="rightsidebaruser">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : profile === "Profile" ? (
            <div className="userinfo-card">
              <h2 className="section-title">
                <FontAwesomeIcon icon={faUser} /> User Profile
              </h2>
              
              {Object.keys(userdetails).length > 0 ? (
                <div className="profile-details">

                  <div className="details">
                  <div className="profile-item">
                    <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    <div className="profile-text">
                      <label>Name</label>
                      <p>{userdetails.name || "Not available"}</p>
                    </div>
                  </div>
                  
                  <div className="profile-item">
                    <FontAwesomeIcon icon={faEnvelope} className="profile-icon" />
                    <div className="profile-text">
                      <label>Email</label>
                      <p>{userdetails?.email || "Not available"}</p>
                    </div>
                  </div>
                  
                  <div className="profile-item">
                    <FontAwesomeIcon icon={faMobile} className="profile-icon" />
                    <div className="profile-text">
                      <label>Mobile</label>
                      <p>{userdetails.mobile || "Not available"}</p>
                    </div>
                  </div>
                  </div>
                
                  
                  <div className="resume">
                  {userdetails.resume && (
                    <div className="profile-resume">
                      <div className="resume-header">
                        <FontAwesomeIcon icon={faFileAlt} className="profile-icon" />
                        <label>Resume</label>
                      </div>
                      <iframe 
                        src={userdetails.resume} 
                        title="User Resume" 
                        className="resume-frame"
                      />
                    </div>
                  )}
                        <div className="update">
                  <button className="update-profile-btn" onClick={updateinfo} style={{backgroundColor:"lightgreen"}}>
                    <FontAwesomeIcon icon={faUserEdit} /> Update Profile
                  </button>
                  </div>
                  </div>
                </div>
              ) : (
                <p className="no-data-message">No profile information available.</p>
              )}
            </div>


            
          ) : profile === "savedjobs" ? (
            <div className="saved-jobs-container">
              <h2 className="section-title">
                <FontAwesomeIcon icon={faBookmark} /> Saved Jobs
              </h2>
              
              {filteredJobs.length > 0 ? (
                <div className="saved-jobs-list">
                  {filteredJobs.map((job, index) => (
                    <div className="saved-job-card" key={index}>
                      <div className="saved-job-header">
                        <h3 className="job-title">
                          <FontAwesomeIcon icon={faBriefcase} className="job-icon" />
                          {job.title}
                        </h3>
                        <button 
                          className="remove-btn" 
                          onClick={() => remove(job._id)}
                          title="Remove from saved jobs"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                      
                      <div className="job-company">
                        <FontAwesomeIcon icon={faBuilding} className="job-icon" />
                        {job.companyname}
                      </div>
                      
                      <div className="job-details-grid">
                        <div className="job-detail">
                          <FontAwesomeIcon icon={faLocationDot} className="job-icon" />
                          {job.location}
                        </div>
                        
                        <div className="job-detail">
                          <FontAwesomeIcon icon={faBriefcase} className="job-icon" />
                          {job.employmenttype}
                        </div>
                        
                        <div className="job-detail">
                          <FontAwesomeIcon icon={faMoneyBillWave} className="job-icon" />
                          {job.salary}
                        </div>
                        
                        <div className="job-detail">
                          <FontAwesomeIcon icon={faCalendarAlt} className="job-icon" />
                          Posted: {job.postdate}
                        </div>
                      </div>
                      
                      <p className="job-description">{truncateText(job.description)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data-container">
                  <FontAwesomeIcon icon={faBookmark} size="3x" className="no-data-icon" />
                  <p className="no-data-message">No saved jobs found. Browse and save jobs to see them here.</p>
                  <button className="browse-btn" onClick={Browseback}>
                    <FontAwesomeIcon icon={faSearch} /> Browse Jobs
                  </button>
                </div>
              )}
            </div>
          ) : profile === "Appliedjobs" ? (
            
            <div className="applied-jobs-container">
              <h2 className="section-title">
                <FontAwesomeIcon icon={faClipboardCheck} /> Applied Jobs
              </h2>
              
              {appliedfilter.length > 0 ? (
                <div className="applied-jobs-list">
                  {appliedfilter.map((job, index) => (
                    <div className="applied-job-card" key={index}>
                      <div className="applied-job-header">
                        <h3 className="job-title">
                          <FontAwesomeIcon icon={faBriefcase} className="job-icon" />
                          {job.title}
                        </h3>
                        <span className="company-name">
                          <FontAwesomeIcon icon={faBuilding} className="job-icon" />
                          {job.companyname}
                        </span>
                      </div>
                      
                      <div className="job-info-grid">
                        <div className="info-item">
                          <FontAwesomeIcon icon={faLocationDot} className="info-icon" />
                          <div>
                            <label>Location</label>
                            <p>{job.location}</p>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <FontAwesomeIcon icon={faBriefcase} className="info-icon" />
                          <div>
                            <label>Type</label>
                            <p>{job.employmenttype}</p>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <FontAwesomeIcon icon={faMoneyBillWave} className="info-icon" />
                          <div>
                            <label>Salary</label>
                            <p>{job.salary}</p>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <FontAwesomeIcon icon={faDoorOpen} className="info-icon" />
                          <div>
                            <label>Openings</label>
                            <p>{job.openings}</p>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <FontAwesomeIcon icon={faGraduationCap} className="info-icon" />
                          <div>
                            <label>Qualification</label>
                            <p>{job.qualification}</p>
                          </div>
                        </div>
                        
                 
                        
         
                      </div>
                      

                      
                      <div className="application-status">
                        <span className="status-badge">Application Submitted</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data-container">
                  <FontAwesomeIcon icon={faClipboardCheck} size="3x" className="no-data-icon" />
                  <p className="no-data-message">You haven't applied to any jobs yet.</p>
                  <button className="browse-btn" onClick={Browseback}>
                    <FontAwesomeIcon icon={faSearch} /> Browse Jobs
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="welcome-container">
              <h2>Welcome to Your Profile</h2>
              <p>Select an option from the sidebar to view your saved jobs, applied jobs, or update your profile information.</p>
            </div>
          )}
        </div>
      </div>




      {/* Add Modal Component */}
      {showModal && (
        <div className="update-modal-overlay">
          <div className="update-modal">


            <div className="update-modal-header"> 
              <h3><FontAwesomeIcon icon={faUserEdit} /> Update</h3>
              <button onClick={closeModal} className="modal-close-btn">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

        <div className="update-modal-body">
        {error && <p style={{ color: "red" }}>{error}</p>}

              <form onSubmit={modelForm}>
              <div>
          <FontAwesomeIcon icon={faUser} />
          <label>Name</label>
          <input type="text"  value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div >
        <FontAwesomeIcon icon={faEnvelope} /> 
          <label>Email (@gmail.com only)</label>
          <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
        <FontAwesomeIcon icon={faMobile} />
          <label>Mobile (10 digits):</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div>
        <FontAwesomeIcon icon={faFileAlt} />
          <label>Upload Resume (PDF/DOCX):</label>
          <input type="file" accept=".pdf" onChange={getfile} required />

        </div>
        <button type="submit" required>Update</button>

              </form>
       
            </div>
          </div>
        </div>
      )}
    </>
  );
};