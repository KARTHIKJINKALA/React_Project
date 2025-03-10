import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Updatejob.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, 
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
export const Updatejob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = location.state || {};
  // console.log(jobId)

  const id=jobId._id
  // console.log(id)

  
  
  const [jobDetails, setJobDetails] = useState({
    title: jobId.title,
    description: jobId.description,
    companyname: jobId.companyname,
    openings: jobId.openings,
    salary: jobId.salary,
    qualification: jobId.qualification,
    skills: jobId.skills,
    employmenttype: jobId.employmenttype,
    location: jobId.location,
    experience: jobId.experience,
    postdate: jobId.postdate,
  });

  const [updateSuccess, setUpdateSuccess] = useState(false); // ✅ Track update status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("jobId", jobId);

      Object.entries(jobDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.put(
        `https://jobquest-backend-l0ol.onrender.com/updatejobdetails/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setUpdateSuccess(true); // 🎉 Show success message
        setTimeout(() => navigate("/Employe"), 2000); // ⏳ Redirect after 2s
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update the job. Please try again.");
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

     
     <Dropdown.Item href="#/action-2"  onClick={LogoutHandle}>Logout</Dropdown.Item>

   </DropdownButton>
            </div>
          </div>
      <div className="update-job-container">
        <h1 className="update-job-title">Update Job Details</h1>
        <form onSubmit={handleSubmit} className="job-form">
          {[
            { name: "title", placeholder: "Job Title" },
            { name: "description", placeholder: "Job Description" },
            { name: "companyname", placeholder: "Company Name" },
            { name: "openings", placeholder: "Openings", type: "number" },
            { name: "salary", placeholder: "Salary" },
            { name: "qualification", placeholder: "Qualification" },
            { name: "skills", placeholder: "Skills (comma separated)" },
            { name: "employmenttype", placeholder: "Employment Type" },
            { name: "location", placeholder: "Location" },
            { name: "experience", placeholder: "Experience" },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={jobDetails[name] || ""}
              onChange={handleChange}
            />
          ))}
          <button type="submit">Update Job</button>
          
        </form>
        {updateSuccess && (
          <div className="update-success-message">
            <i className="fas fa-check-circle"></i> Job updated successfully!
          </div>
        )}
      </div>
    </>
  );
};
