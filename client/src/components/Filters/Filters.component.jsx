import React, { useEffect, useState } from "react";
import "./Filters.styles.css";
import {
  getTemperaments,
  temperamentsFilter,
  dogByOrigin,
  orderByName,
  orderByWeight,
  resetFilters,
  getDogs,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Filters({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    if (!e.target.value) return;
    dispatch(temperamentsFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`En orden de ${e.target.value}`);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(dogByOrigin(e.target.value));
    setCurrentPage(1);
    setOrder(`En orden de ${e.target.value}`);
  };
  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`En orden de ${e.target.value}`);
  };
  const handleOrderWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`En orden de ${e.target.value}`);
  };
  const handleReset = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
    setOrder(``);
    dispatch(getDogs());
  };

  return (
    <div className="filters">
      <select onChange={handleChange}>
        <option value="all">Todos los Temperamentos</option>
        {temperaments
          ? temperaments.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))
          : []}
      </select>
      <select onChange={handleFilterCreated}>
        <option value="all">Todos los perros</option>
        <option value="createInDb">Creados</option>
        <option value="api">Api</option>
      </select>
      <select onChange={handleOrderName}>
        <option value="all">Ordenar Alfabeticamente</option>
        <option value="Az">A-Z</option>
        <option value="Za">Z-A</option>
      </select>
      <select onChange={handleOrderWeight}>
        <option value="all">Ordenar por Peso</option>
        <option value="maxWeight">Mayor Peso</option>
        <option value="minWeight">Menor Peso</option>
      </select>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Filters;
