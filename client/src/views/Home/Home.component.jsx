import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getDogsByName } from "../../redux/actions";
import Navbar from "../../components/Navbar/Navbar.component";
import Cards from "../../components/Cards/Cards.component";
import Filters from "../../components/Filters/Filters.component";
import Paginado from "../../components/Paginado/Paginado.component";
import "./Home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentsDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //*Filtro por nombre

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(searchString));
  }

  //*Dispatch que trae a todos los perros
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  //!AVERIGUAR SOBRE CLEAR DETAIL Y COMO APLICARLO, SIRVE PARA QUE AL ENTRAR AL DETALLE DE UN PERRO Y VOLVER AL HOME, EL DETALLE NO QUEDE GUARDADO EN SEGUANDO PLANO, ASI AL VOLVER A INGRESAR AL DETALLE DE OTRO PERRO NO SIGA MOSTRANDO EL DEL ANTERIOR. ESTO ES UNA ACTION
  // const histori = useNavigate();

  // const handlerExit = () => {
  //   dispatch(CleanDetail());
  //   histori("/home");
  // };

  return (
    <div className="home">
      <h1 className="titulo">Api Dogs</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Filters />
      <Cards currentsDogs={currentsDogs} />
      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
