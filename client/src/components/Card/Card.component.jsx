import "./Card.styles.css";
import { Link } from "react-router-dom";

function Card({ dog }) {
  const { id, name, temperament, weight, image } = dog;
  return (
    <div className="tarjeta">
      <Link to={`/dogs/${id}`}>
        <h2>{name}</h2>
        <p>{temperament.join(", ")}</p>
        <p>{weight}</p>
        <img src={image} alt=""></img>
      </Link>
    </div>
  );
}

export default Card;
