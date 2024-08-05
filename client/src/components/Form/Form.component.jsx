import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Form.styles.css";
import validations from "../validations/validations";
import { getTemperaments, postDog } from "../../redux/actions";

function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const navigate = useNavigate();
  const [selects, setSelects] = useState([
    { id: 0, selectedTemperament: "all" },
  ]);

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    temperaments: [],
    newTemperament: "",
    image: "",
    createInDb: true,
  });

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  // const handleChange = (e) => {
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  //   setError(validations({ ...input, [e.target.name]: e.target.value }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validamos si el valor es un número (excepto si está vacío)
    if (
      name === "life_span" ||
      name === "heightMin" ||
      name === "heightMax" ||
      name === "weightMin" ||
      name === "weightMax"
    ) {
      if (value !== "" && !/^\d+$/.test(value)) {
        setError((prevError) => ({
          ...prevError,
          [name]: "Por favor, ingresa un valor numérico.",
        }));
        return;
      }
    }

    // Actualizamos solo el campo específico que está cambiando
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    // Validamos solo para el campo activo (excepto la validación numérica)
    setError((prevError) => ({
      ...prevError,
      [name]: validations({ ...input, [name]: value })[name],
      heightMax:
        name === "heightMax" && value < input.heightMin
          ? "La altura máxima no puede ser menor que la altura mínima"
          : "",
      heightMin:
        name === "heightMin" && value > input.heightMax
          ? "La altura mínima no puede ser mayor que la altura máxima"
          : "",
      weightMax:
        name === "weightMax" && value < input.weightMin
          ? "El peso máximo no puede ser menor que el peso mínimo"
          : "",
      weightMin:
        name === "weightMin" && value > input.weightMax
          ? "El peso mínimo no puede ser mayor que el peso máximo"
          : "",
    }));
  };

  const handleAddSelect = () => {
    const newIndex = selects.length;
    setSelects([...selects, { id: newIndex, selectedTemperament: "all" }]);
  };

  const handleSelectChange = (selectId, selectedValue) => {
    if (
      selects.every(
        (select) =>
          select.id === selectId || select.selectedTemperament !== selectedValue
      )
    ) {
      const updatedSelects = selects.map((select) =>
        select.id === selectId
          ? { ...select, selectedTemperament: selectedValue }
          : select
      );
      setSelects(updatedSelects);

      const selectedTemperaments = updatedSelects
        .map((select) => select.selectedTemperament)
        .filter((t) => t !== "all");

      setInput({
        ...input,
        temperaments: selectedTemperaments,
      });
      setError(validations({ ...input, [e.target.name]: e.target.value }));
    } else {
      setError({
        ...error,
        duplicateTemperament: "No se admiten temperamentos duplicados",
      });
    }
  };

  const handleAddNewTemperament = () => {
    if (input.newTemperament.trim() !== "") {
      setInput({
        ...input,
        temperaments: [...input.temperaments, input.newTemperament],
        newTemperament: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Tu perro se creo con exito!");
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      temperaments: [],
      newTemperament: "",
      image: "",
      createInDb: true,
    });
    navigate(`/home`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="divContainer">
          <label>Raza</label>
          <input
            name="name"
            value={input.name}
            placeholder="Ingresa la raza"
            onChange={handleChange}
          />
          <span className="error">{error.name}</span>
        </div>
        <div className="divContainer">
          <label>Espectativa de Vida</label>
          <input
            name="life_span"
            value={input.life_span}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span className="error">{error.life_span}</span>
        </div>
        <div className="divContainer">
          <label>Altura maxima</label>
          <input
            name="heightMax"
            value={input.heightMax}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span className="error">{error.heightMax}</span>
          <label>Altura minima</label>
          <input
            name="heightMin"
            value={input.heightMin}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span className="error">{error.heightMin}</span>
        </div>
        <div className="divContainer">
          <label>Peso maximo</label>
          <input
            name="weightMax"
            value={input.weightMax}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span className="error">{error.weightMax}</span>
          <label>Peso minimo</label>
          <input
            name="weightMin"
            value={input.weightMin}
            placeholder="Ingrese un número"
            onChange={handleChange}
          />
          <span className="error">{error.weightMin}</span>
        </div>
        <div className="divContainer">
          <label>Url imagen</label>
          <input name="image" value={input.image} onChange={handleChange} />
          <span className="error">{error.image}</span>
        </div>
        <div className="divContainerTemps">
          <label>Seleccionar temperamentos</label>
          {selects.map((select) => (
            <div key={select.id}>
              <select
                value={select.selectedTemperament}
                onChange={(e) => handleSelectChange(select.id, e.target.value)}
                className="selectTemps"
              >
                <option value="all">Todos los Temperamentos</option>
                {temperaments
                  ? temperaments.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))
                  : []}
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAddSelect} className="botonTemp">
            +
          </button>
          <input
            name="newTemperament"
            value={input.newTemperament}
            onChange={handleChange}
            placeholder="Crea un temperamento"
          />
          <button
            type="button"
            onClick={handleAddNewTemperament}
            className="botonTemp"
          >
            Añadir Temperamento
          </button>
          {error.duplicateTemperament && (
            <div className="error">{error.duplicateTemperament}</div>
          )}
          <span className="error">{error.temperaments}</span>
        </div>
        <div className="divContainer">
          {Object.values(error).every(
            (errorMessage) => errorMessage === "" || errorMessage === undefined
          ) &&
            input.name.trim() !== "" &&
            input.heightMin.trim() !== "" &&
            input.heightMax.trim() !== "" &&
            input.weightMin.trim() !== "" &&
            input.weightMax.trim() !== "" &&
            input.life_span.trim() !== "" &&
            input.image.trim() !== "" && (
              <button type="submit" className="botonTemp">
                Crear
              </button>
            )}
        </div>
      </form>
    </div>
  );
}

export default Form;
