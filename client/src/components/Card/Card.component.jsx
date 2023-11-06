import "./Card.styles.css";
import { Link } from "react-router-dom";

function Card({ dog }) {
  const { id, name, temperament, weight, image } = dog;
  return (
    <div className="tarjeta">
      <Link to={`/dogs/${id}`} className="link">
        <h2>{name}</h2>
        <p>Temperaments: {temperament.join(", ")}</p>
        <p>Min Weight: {weight.split("-")[0].trim()}Kg</p>
        <p>Max Weight: {weight.split("-")[1]}Kg</p>
        <img src={image} alt=""></img>
      </Link>
    </div>
  );
}

export default Card;
