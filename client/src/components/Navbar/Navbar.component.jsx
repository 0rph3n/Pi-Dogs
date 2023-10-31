import React from "react";
import SearchBar from "../SearchBar/SearchBar.component";
import "./Navbar.styles.css";

function Navbar() {
  return (
    <nav className="navbar">
      <SearchBar />
    </nav>
  );
}

export default Navbar;
