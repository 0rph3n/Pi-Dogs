import React, { useState } from "react";
import "./Form.styles.css";
import validations from "../validations/validations";


//! CORROBORAR QUE ESTE COLOCANDO PRIMERO EL PESO MENOR Y LUEGO EL PESO MAYOR, LO MISMO CON LA ALTURA.

function Form() {
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
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
    image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validations({ ...input, [e.target.name]: e.target.value }));
  }
  const handleSubmit = async () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Raza</label>
          <input name="name" value={input.value} onChange={handleChange} />
          <span>{error.name}</span>
        </div>
        <div>
          <label>Espectativa de Vida</label>
          <input name="life_span" value={input.value} onChange={handleChange} />
          <span>{error.life_span}</span>
        </div>
        <div>
          <label>Altura minima</label>
          <input name="heightMin" value={input.value} onChange={handleChange} />
          <span>{error.heightMin}</span>
        </div>
        <div>
          <label>Altura maxima</label>
          <input name="heightMax" value={input.value} onChange={handleChange} />
          <span>{error.heightMax}</span>
        </div>
        <div>
          <label>Peso minimo</label>
          <input name="weightMin" value={input.value} onChange={handleChange} />
          <span>{error.weightMin}</span>
        </div>
        <div>
          <label>Peso maximo</label>
          <input name="weightMax" value={input.value} onChange={handleChange} />
          <span>{error.weightMax}</span>
        </div>
        <div>
          <label>Seleccionar temperamento o crear uno nuevo</label>
          <input
            name="temperament"
            value={input.value}
            onChange={handleChange}
          />
          <span>{error.temperament}</span>
        </div>
        <div>
          <label>Url imagen</label>
          <input name="image" value={input.value} onChange={handleChange} />
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
