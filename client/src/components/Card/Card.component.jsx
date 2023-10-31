import React from "react";
import "./Card.styles.css";
import { Link } from "react-router-dom";

function Card({ dog }) {
  const { id, name, temperament, weight, image } = dog;
  return (
    <div className="tarjeta">
      <h2>{name}</h2>
      <p>{temperament}</p>
      <p>{weight}</p>
      <Link to={`/detail/${id}`}>
        <img src={image} alt=""></img>
      </Link>
    </div>
  );
}

export default Card;
