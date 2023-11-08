import React from "react";
import "./Landing.styles.css";
import { Link } from "react-router-dom";
import gitHub from "../../assets/github-mark.svg";
import linkedIn from "../../assets/icons8-linkedin---in-logo-used-for-professional-networking,-96.png";

export default function Landing() {
  return (
    <div className="landingContainer">
      <div className="boton">
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <div className="iconos">
        <a href="https://github.com/0rph3n/Pi-Dogs" rel="nofollow">
          <img src={gitHub} alt="gitHub Icon" />
        </a>
        <a href="https://www.linkedin.com/in/leandrofarnochi/" rel="nofollow">
          <img src={linkedIn} alt="linkedIn Icon" />
        </a>
      </div>
    </div>
  );
}
