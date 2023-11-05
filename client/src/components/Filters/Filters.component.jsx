import React, { useEffect, useState } from "react";
import "./Filters.styles.css";
import {
  getDogs,
  getTemperaments,
  temperamentsFilter,
  dogByOrigin,
  orderByName,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Filters({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //*Con esto tengo un boton que resetea los perros y los trae nuevamente.
  const handleDogs = (e) => {
    e.preventDefault();
    dispatch(getDogs);
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (!e.target.value) return;
    dispatch(temperamentsFilter(e.target.value));
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(dogByOrigin(e.target.value));
  };
  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };
  return (
    <div>
      <select onChange={handleChange}>
        <option value="all">Todos los Temperamentos</option>
        {temperaments.map((t) => (
          <option key={t.id} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      <select onChange={handleFilterCreated}>
        <option value="all">Todos los perros</option>
        <option value="createInDb">Creados</option>
        <option value="api">Api</option>
      </select>
      <select onChange={handleOrderName}>
        <option value="Az">A-Z</option>
        <option value="Za">Z-A</option>
      </select>
      <button name="maxWeight">Mayor Peso</button>
      <button name="minWieght">Menor Peso</button>
      <button
        onClick={(e) => {
          handleDogs(e);
        }}
      >
        Reset Dogs
      </button>
    </div>
  );
}

export default Filters;
