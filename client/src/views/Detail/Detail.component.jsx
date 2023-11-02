import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import Card from "../../components/Card/Card.component";
import "./Detail.styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch();
  const dogById = useSelector(); //!aca debe ir el estado inicial de details del reducer chequear el componente HOME PARA REFERENCIA

  const { id } = useParams();

  //! FALTA CREAR LA ACCIÓN Y EL REDUCER PARA TRAER EL PERRO POR ID

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div>
      <p>Esto es detail</p>
      <Navbar />
      <Card />
    </div>
  );
}

export default Detail;
