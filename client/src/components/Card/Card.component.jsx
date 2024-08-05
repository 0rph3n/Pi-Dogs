import "./Card.styles.css";
import { Link } from "react-router-dom";

function Card({ dog }) {
  const { id, name, temperament, weight, image } = dog;

  const fontSize = name.length > 20 ? "1.4rem" : "1.5rem";

  return (
    <div className="tarjeta">
      <Link to={`/dogs/${id}`} className="link">
        <div className="contenido-superior">
          <h2 style={{ fontSize }}>{name}</h2>
          <p>Temperamentos: {temperament.join(", ")}</p>
          <p>Peso mínimo: {weight.split("-")[0].trim()} Kg</p>
          <p>Peso máximo: {weight.split("-")[1]} Kg</p>
        </div>
        <div className="imagen-inferior">
          {image ? (
            <img src={image} alt="" />
          ) : (
            <img
              src="https://res.cloudinary.com/dzdgpwtox/image/upload/w_600,c_scale,f_auto,q_auto/v1622293248/designer-tool-uploads/bucket_4052/1622293241335.png"
              alt=""
            />
          )}
        </div>
      </Link>
    </div>
  );
}

export default Card;
