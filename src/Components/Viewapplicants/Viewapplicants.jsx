import React, { useEffect, useState } from 'react';
import "./Viewapplicants.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from "../../assets/Logo/Logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, 
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
const Viewapplicants = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const jobId = state?.jobId;
 

  const [applicantsdata, setApplicantsdata] = useState([]);
  const [resumeurl, setResumeurl] = useState([]);
  const [link, setLink] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [jobStatus, setJobStatus] = useState({});

  const AppilcantsData = async () => {
    try {
      const response = await axios.post("https://jobquest-backend-l0ol.onrender.com/applicantsdata", { jobId });
      setApplicantsdata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (jobId) AppilcantsData();
  }, [jobId]);

  useEffect(() => {
    if (applicantsdata?.candidates) {
      const extractedLinks = applicantsdata.candidates.map((val) => val.resumelink);
      setLink(extractedLinks);

      const statusObj = {};
      applicantsdata.candidates.forEach((val) => {
        statusObj[val._id] = val.status || 'Pending'; 
      });
      setJobStatus(statusObj);
    }
  }, [applicantsdata]);

  const sendurl = async () => {
    try {
      const response = await axios.post("https://jobquest-backend-l0ol.onrender.com/getresumeurl", { link });
      setResumeurl(response.data);
    } catch (error) {
      console.log("Error fetching resume URLs:", error.message);
    }
  };

  useEffect(() => {
    if (link.length > 0) {
      sendurl();
    }
  }, [link]);

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      setJobStatus((prevStatus) => ({ ...prevStatus, [applicantId]: newStatus }));
      const response = await axios.post("https://jobquest-backend-l0ol.onrender.com/updatestatus", {
        applicantId,
        jobId,
        newStatus,
      });
      console.log(`Status updated for ${applicantId}: ${newStatus}`, response.data);
    } catch (error) {
      console.log("Error updating job status:", error.message);
    }
  };

  const back=()=>{
    navigate("/Employe")
  }

  const LogoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  return (
    <>
      <div className="userprofilepage">
        <div className="left">
          <div className="logo-containerimg">
       <Link to={"/Employe"}>
       <img src={Logo} alt=""  height={"100vh"} width={"160vw"}/>
       </Link>    

          </div>
        </div>
        <div className="right">
          {/* <button onClick={back}>Back</button>
          <button className="logout-btn" onClick={LogoutHandle}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button> */}
      <DropdownButton id="dropdown-basic-button" title="Profile">
     <Dropdown.Item href="#/action-2" onClick={back}>Back</Dropdown.Item>

     
     <Dropdown.Item href="#/action-2" onClick={LogoutHandle}>Logout</Dropdown.Item>

   </DropdownButton>
        </div>
      </div>
      
      <br />
      <div className="items">
        <div className="view">
          {applicantsdata?.candidates?.map((val, index) => (
            <div className="details-card" key={index}>
              <h3>{val.username}</h3>
              <p>Email: {val.email}</p>
              <p>Experience: {val.experience} years</p>
              <p>Status: {jobStatus[val._id]}</p>

              <div className="actions">
                <button onClick={() => setSelectedResume(resumeurl[index]?.url)}>
                  View Resume
                </button>
                <select
                  value={jobStatus[val._id]}
                  onChange={(e) => handleStatusChange(val._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))
          }
            {applicantsdata?.candidates?.length === 0 && (
    <h5 className="no-applicants">No applicants for this job.</h5>
  )}
        </div>
      </div>
      
      {selectedResume && (
        <div className="modal-overlay" onClick={() => setSelectedResume(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Resume Preview</h3>
            <iframe
              src={selectedResume}
              width="100%"
              height="400px"
              title="Resume Viewer"
            />
            <button className="close-btn" onClick={() => setSelectedResume(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Viewapplicants;
