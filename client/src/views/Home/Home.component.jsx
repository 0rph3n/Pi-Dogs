import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import Cards from "../../components/Cards/Cards.component";
import Filters from "../../components/Filters/Filters.component";
import Paginado from "../../components/Paginado/Paginado.component";

function Home() {
  return (
    <div>
      <Navbar />
      <Filters />
      <Cards />
      <Paginado />
    </div>
  );
}

export default Home;
