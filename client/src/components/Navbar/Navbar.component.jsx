import React from "react";
import SearchBar from "../SearchBar/SearchBar.component";
import "./Navbar.styles.css";
import { Link } from "react-router-dom";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/create">Crear Perro</Link>
      </div>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
    </nav>
  );
}

export default Navbar;
