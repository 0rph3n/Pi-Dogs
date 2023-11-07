export default function validations(input) {
  const error = {};
  if (!/^[a-zA-Z]{3,}$/.test(input.name)) {
    error.name =
      "El nombre debe tener mas de 3 caracteres y no puede ser números o simbolos";
  }
  if (!/^[0-9]+$/.test(input.life_span)) {
    error.life_span = "Tiene que ser un numero";
  }
  if (!/^[0-9]+$/.test(input.heightMin)) {
    error.heightMin = "Tiene que ser un numero";
  }
  if (!/^[0-9]+$/.test(input.heightMax)) {
    error.heightMax = "Tiene que ser un numero";
  }
  if (input.heightMin > input.heightMax) {
    error.heightMin = "El numero no debe ser mayor a la altura maxima";
  }
  if (!/^[0-9]+$/.test(input.weightMin)) {
    error.weightMin = "Tiene que ser un numero";
  }
  if (!/^[0-9]+$/.test(input.weightMax)) {
    error.weightMax = "Tiene que ser un numero";
  }
  if (input.weightMin > input.weightMax) {
    error.weightMin = "El peso minimo no puede ser mayor al peso maximo";
  }
  if (input.temperaments.length === 0) {
    error.temperaments = "Debe seleccionar al menos un temperamento";
  }
  if (
    !/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i.test(
      input.image
    )
  ) {
    error.image = "No es una URL valida";
  }
  return error;
}
