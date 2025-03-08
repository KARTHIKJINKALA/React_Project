import { useState } from "react";
// import "./Loginpage.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Emplogin.css"
const Emplogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [message, SetMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, password, role);  // Now role will correctly store "applicant" or "employe"

    const formData = {
      username: username,
      password: password,
      role: "employe",
    };

    try {
      const response = await axios.post(
        "https://jobquest-backend-l0ol.onrender.com/login",
        formData
      );
      console.log(response.data);

      SetMessage(response.data.message);
      localStorage.setItem("token", response.data.token);

      if (response.data.message == "Login succesfull") {
        navigate(`${response.data.redirecturl}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = () => {
    navigate("/Signup");
  };

  return (
    <>
      <Navbar />
      <div className="mainemplogin">
      <div className="containeremp">
        <h2 >Employe Login</h2>
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
          <br />

          {/* <div>
            <label>Applicant</label>
            <input
              type="radio"
              name="role"
              value="applicant"

              onChange={(e) => setRole(e.target.value)}
              required
            />

            <label>Employee</label>
            <input
              type="radio"
              name="role"
              value="employe"
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div> */}

          <button type="submit">Login</button>
        </form>

        {message ? message : " "}
      </div>

      </div>

      
    </>
  );
};

export default Emplogin;
