import Card from "../Card/Card.component";
import "./Cards.styles.css";

function Cards({ allDogs }) {
  const dogsList = allDogs;

  return (
    <div className="tarjetas">
      {dogsList ? (
        dogsList.map((dog) => <Card dog={dog} key={dog.id} />)
      ) : (
        <p>No hay perros disponibles.</p>
      )}
    </div>
  );
}

export default Cards;
