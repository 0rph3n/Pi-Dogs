import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import "./Detail.styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../redux/actions";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogById = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]); //*Este es el array de dependencias de los hooks, este array contiene todas las dependencias que el hook debe tener en cuenta para su ejecución, le paso dispatch y id ya que puedo volver a solicitar el detail de otro perro lo que genera un nuevo dispatch y el id tambien va cambiar.

  return (
    <div>
      <p>Esto es detail</p>
      <Navbar />
      <h1>Nombre: {dogById.name}</h1>
      <h2>Id: {dogById.id}</h2>
      <h2>Temperamento: {dogById.temperament}</h2>
      <h2>Peso: {dogById.weight}Kg</h2>
      <h2>Altura: {dogById.height}cm</h2>
      <h2>Tiempo de vida: {dogById.life_span}</h2>
      <img src={dogById.image} alt=""></img>
    </div>
  );
}

export default Detail;
