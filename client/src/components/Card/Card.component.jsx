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
        {image ? (
          <img src={image} alt=""></img>
        ) : (
          <img
            src="https://res.cloudinary.com/dzdgpwtox/image/upload/w_600,c_scale,f_auto,q_auto/v1622293248/designer-tool-uploads/bucket_4052/1622293241335.png"
            alt=""
          ></img>
        )}
      </Link>
    </div>
  );
}

export default Card;
