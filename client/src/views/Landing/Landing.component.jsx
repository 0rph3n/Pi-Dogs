import React from "react";
import "./Landing.styles.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="boton">
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}
