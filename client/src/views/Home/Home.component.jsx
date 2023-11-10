import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getDogsByName } from "../../redux/actions";
import Navbar from "../../components/Navbar/Navbar.component";
import Cards from "../../components/Cards/Cards.component";
import Filters from "../../components/Filters/Filters.component";
import Paginado from "../../components/Paginado/Paginado.component";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [searchString, setSearchString] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentsDogs = allDogs
    ? allDogs.slice(indexOfFirstDog, indexOfLastDog)
    : [];

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(searchString));
  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="titulo">Api Dogs</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
      <p>{order}</p>
      {currentsDogs.length === 0 ? (
        <PageNotFound />
      ) : (
        <Cards currentsDogs={currentsDogs} />
      )}
      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs ? allDogs.length : 0}
        paginado={paginado}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
