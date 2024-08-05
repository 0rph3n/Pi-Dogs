export default function validations(input) {
  const error = {};
  if (!/^[a-zA-Z]{3,}$/.test(input.name)) {
    error.name = "3 caracteres o más, no puede usar simbolos";
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
