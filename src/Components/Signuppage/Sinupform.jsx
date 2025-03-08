import { useState } from "react";
import "./Sinupform.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const navigator=useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState("");

const validateUsername = (name) => {
  return /^[A-Z][a-zA-Z]{4,5}$/.test(name); 
};


const validatePassword = (pass) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,13}$/.test(pass);
};

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateUsername(username)) {
      setError(
        "Username must start with a capital letter, contain only letters, and be 5 to 6 characters long."
      );
      return;
    }
    
    if (!validatePassword(password)) {
      setError(
        "Password must be between 6 and 13 characters, containing letters, numbers, and at least one special character."
      );
      return;
    }
    if (!role) {
      setError("Please select a role: Applicant or Employer.");
      return;
    }

    setError(""); // Clear previous errors

    const formdata = {
      username: username,
      password: password,
      role: role, // Send the selected role
    };

    try {
      const response = await axios.post(
        "https://jobquest-backend-l0ol.onrender.com/userdetails",
        formdata
      );
      console.log(response.data);
      if(response.data=="Username already exists"){
      alert("Username already exists try with another username")
      }
      if(response.data=="Succesfully Register"){
      alert("Succesfully Registered") 
      navigator("/")  
      }
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/Signup");
  };

  return (
    <>
<Navbar/>
<div className="mainsign">
<div className="containersign">
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              
            />
            
          </div>
          <div>
       
            <div className="radio">
              <input
                type="radio"
                name="role"
                value="applicant"
                checked={role === "applicant"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label>Applicant</label>
            </div>
            
            <div className="radio1">
              <input
                type="radio"
                name="role"
                value="Employe"
                checked={role === "Employe"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label>Employe</label>
              
            </div>
          </div>
          <br />

          <button type="submit">Register</button>
        </form>
      </div>

</div>

    </>
  );
};

export default Register;
