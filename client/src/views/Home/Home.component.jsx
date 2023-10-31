import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import Cards from "../../components/Cards/Cards.component";
import Filters from "../../components/Filters/Filters.component";
import Paginado from "../../components/Paginado/Paginado.component";
import "./Home.styles.css";

function Home() {
  return (
    <div className="home">
      <h1 className="titulo">Api Dogs</h1>
      <Navbar />
      <Filters />
      <Cards />
      <Paginado />
    </div>
  );
}

export default Home;
