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

    //!AVERIGUAR SOBRE CLEAR DETAIL Y COMO APLICARLO, SIRVE PARA QUE AL ENTRAR AL DETALLE DE UN PERRO Y VOLVER AL HOME, EL DETALLE NO QUEDE GUARDADO EN SEGUANDO PLANO, ASI AL VOLVER A INGRESAR AL DETALLE DE OTRO PERRO NO SIGA MOSTRANDO EL DEL ANTERIOR.
    //?Cuando queremos desmontar un componente en un useEffect debemos retornar algo, por lo que si queremos desmontar el detail debemos retornar algo que lo limpie ademas
    // return (() =>{clearDetail()})
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="titulo">Api Dogs</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Filters />
      <Cards allDogs={allDogs} />
      <Paginado />
    </div>
  );
}

export default Home;
