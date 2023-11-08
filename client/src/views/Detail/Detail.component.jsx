import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import "./Detail.styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDogDetail, cleanDetail, deleteDog } from "../../redux/actions";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogById = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]); //*Este es el array de dependencias de los hooks, este array contiene todas las dependencias que el hook debe tener en cuenta para su ejecución, le paso dispatch y id ya que puedo volver a solicitar el detail de otro perro lo que genera un nuevo dispatch y el id tambien va cambiar.

  const back = useNavigate();

  const handleDelete = () => {
    console.log(id);
    dispatch(deleteDog(id));
    alert("Perro eliminado con exito");
    back("/home");
  };

  const handleDetail = () => {
    dispatch(cleanDetail());
    back("/home");
  };

  return (
    <div className="container">
      <h2>Esto es detail</h2>
      <Navbar />
      <button onClick={handleDetail} className="buttonBack">Back</button>
      <div className="tarjetaDetail">
        {dogById.created && (
          <button type="button" onClick={handleDelete}>
            Eliminar Perro
          </button>
        )}
        <h3>Nombre: {dogById.name}</h3>
        <h4>Id: {dogById.id}</h4>
        <h4>Temperamento: {dogById.temperament}</h4>
        <h4>Peso: {dogById.weight}Kg</h4>
        <h4>Altura: {dogById.height}cm</h4>
        <h4>Tiempo de vida: {dogById.life_span}</h4>
        {dogById.image ? (
          <img src={dogById.image} alt=""></img>
        ) : (
          <img
            src="https://res.cloudinary.com/dzdgpwtox/image/upload/w_600,c_scale,f_auto,q_auto/v1622293248/designer-tool-uploads/bucket_4052/1622293241335.png"
            alt=""
          ></img>
        )}
      </div>
    </div>
  );
}

export default Detail;
