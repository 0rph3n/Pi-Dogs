export default function validations(input) {
  const error = {};
  if (!/[A-Za-z]{3,}/.test(input.name)) {
    error.name = "Tiene que tener 3 o más caracteres";
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
  if (!/^[0-9]+$/.test(input.weightMin)) {
    error.weightMin = "Tiene que ser un numero";
  }
  if (!/^[0-9]+$/.test(input.weightMax)) {
    error.weightMax = "Tiene que ser un numero";
  }
  if (!input.temperament.length) {
    error.temperament = "Selecciona o crea al menos un temperamento";
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
