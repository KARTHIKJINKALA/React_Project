import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Userinfoupdate = () => {
 var Navigate=useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [file, setResume] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validation Functions
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validateMobile = (mobile) => /^[6789]\d{9}$/.test(mobile);

  // Handle File Selection
  const handleFileChange = (e) => {
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
  const handleSubmit = async (e) => {
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
      const response = await axios.patch("https://jobquest-backend-l0ol.onrender.com//resumes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });

      console.log(response.data);
      // console.log(formData)
      setSuccessMessage("User information updated successfully!");
    } catch (error) {
      console.error(error);
      setError("Error updating user information.");
    }
  };

  const backHandle=()=>{
    Navigate("/profile")
   
  }

  return (
    
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>Update User Info</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email (@gmail.com only):</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Mobile (10 digits):</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div>
          <label>Upload Resume (PDF/DOCX):</label>
          <input type="file" accept=".pdf" onChange={handleFileChange} required />
        </div>
        <button type="submit">Update</button>
        <button onClick={backHandle}>Back</button>
      </form>
    </div>
  );
};
