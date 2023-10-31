import React from "react";
import "./SearchBar.styles.css";

function SearchBar() {
  return (
    <div className="container">
      <form action="">
        <input placeholder="Busqueda" type="text" className="search" />
        <button className="butonSearch">Buscar</button>
      </form>
    </div>
  );
}

export default SearchBar;
