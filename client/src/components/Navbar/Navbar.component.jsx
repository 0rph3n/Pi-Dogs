import React from "react";
import SearchBar from "../SearchBar/SearchBar.component";
import "./Navbar.styles.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/dogs/:id">Detail</Link>
        <Link to="/create">Crear Perro</Link>
      </div>
      <SearchBar />
    </nav>
  );
}

export default Navbar;
