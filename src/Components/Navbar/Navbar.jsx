import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbarhome">
      <div className="nav-cont">
        <div className="nav-logo">
          <Link to="/">
            <img
              src=".\src\Components\Landingpage\svgviewer-png-output (2).png"
              alt="Logo"
              className="ig"
            />
          </Link>
        </div>
        <div className="btnv">
          <button onClick={() => navigate("/login")}>User</button>
          <button onClick={() => navigate("/Signup")}>Sign Up</button>
          <button onClick={() => navigate("/Emplogin")}>Post Job</button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
