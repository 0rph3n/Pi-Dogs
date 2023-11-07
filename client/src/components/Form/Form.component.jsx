import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Form.styles.css";
import validations from "../validations/validations";
import { getTemperaments } from "../../redux/actions";

function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    temperaments: [],
    image: "",
    createInDb: true,
  });

  const [error, setError] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    temperaments: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validations({ ...input, [e.target.name]: e.target.value }));
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  };
  const handleTemp = (e) => {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  };
  const handleSubmit = async () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Raza</label>
          <input
            name="name"
            value={input.name}
            placeholder="Ingresa la raza de su perro"
            onChange={handleChange}
          />
          <span>{error.name}</span>
        </div>
        <div>
          <label>Espectativa de Vida</label>
          <input
            name="life_span"
            value={input.life_span}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span>{error.life_span}</span>
        </div>
        <div>
          <label>Altura minima</label>
          <input
            name="heightMin"
            value={input.heightMin}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <label>Altura maxima</label>
          <input
            name="heightMax"
            value={input.heightMax}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span>{error.heightMin}</span>
          <span>{error.heightMax}</span>
        </div>
        <div>
          <label>Peso minimo</label>
          <input
            name="weightMin"
            value={input.weightMin}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <label>Peso maximo</label>
          <input
            name="weightMax"
            value={input.weightMax}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span>{error.weightMin}</span>
          <span>{error.weightMax}</span>
        </div>
        <div>
          <label>Seleccionar temperamentos o crea uno nuevo</label>
          <div className="temperamentsContainer">
            {temperaments.map((t) => (
              <div key={t.id} className="temperamentsStyles">
                <label>{t.name}</label>
                <input
                  type="checkbox"
                  name="temperament"
                  value={t.id}
                  onChange={handleCheck}
                />
              </div>
            ))}
          </div>
          <input
            name="temperament"
            value={input.temperaments}
            onChange={handleTemp}
            placeholder="Crea un temperamento"
          />
          <span>{error.temperaments}</span>
        </div>
        <div>
          <label>Url imagen</label>
          <input name="image" value={input.image} onChange={handleChange} />
          <span>{error.image}</span>
        </div>
        <div>
          {Object.values(error).every((errorMessage) => errorMessage === "") &&
            input.name.trim() !== "" &&
            input.heightMin.trim() !== "" &&
            input.heightMax.trim() !== "" &&
            input.weightMin.trim() !== "" &&
            input.weightMax.trim() !== "" &&
            input.life_span.trim() !== "" &&
            input.image.trim() !== "" && <button type="submit">Crear</button>}
        </div>
      </form>
    </div>
  );
}

export default Form;
