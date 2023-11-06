import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import "./Detail.styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDogDetail, cleanDetail } from "../../redux/actions";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogById = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]); //*Este es el array de dependencias de los hooks, este array contiene todas las dependencias que el hook debe tener en cuenta para su ejecución, le paso dispatch y id ya que puedo volver a solicitar el detail de otro perro lo que genera un nuevo dispatch y el id tambien va cambiar.

  const back = useNavigate();

  const handleDetail = () => {
    dispatch(cleanDetail());
    back("/home");
  };

  return (
    <div>
      <h2>Esto es detail</h2>
      <Navbar />
      <button onClick={handleDetail}>Back</button>
      <h3>Nombre: {dogById.name}</h3>
      <h4>Id: {dogById.id}</h4>
      <h4>Temperamento: {dogById.temperament}</h4>
      <h4>Peso: {dogById.weight}Kg</h4>
      <h4>Altura: {dogById.height}cm</h4>
      <h4>Tiempo de vida: {dogById.life_span}</h4>
      <img src={dogById.image} alt=""></img>
    </div>
  );
}

export default Detail;
