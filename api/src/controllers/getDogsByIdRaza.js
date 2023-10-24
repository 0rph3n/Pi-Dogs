const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const validateUUID = require("../utils/validateUUID");

const getDogsByIdRaza = async (req) => {
  //?Realizamos un destructuring del id que nos llega por parametro, comenzamos validando si lo que nos llega es un UUID(letras y numeros) que corresponde a nuestra base de datos o si es numero que corresponde a la API.
  //?Para ello creamos un función que se encarga de validar si es un UUIDv4 en la carpeta utils/validateUUID.js
  const { id } = req.params;
  if (validateUUID(id)) {
    try {
      //?Una vez cumplida la validación del if buscamos en nuestra base de datos por id que nos entra
      const dogByRazaDb = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          trough: { attributes: [] },
        },
      });
      //?Puede darse el caso de que ingrese un Id UUID pero no se encuentre en la base de datos, para ello tiramos un error si dogByRazaDb no devuelve nada.
      if (!dogByRazaDb) throw new Error("Perro no encontrado");
      //!FALTA TRAER LOS DATOS QUE SON DE LOS PERROS COMO HACEMOS DESDE LA API
      //este no es necesariamente el lugar donde van, investigar
      //
      //
      //
      //
      //
      //
      //
      else return dogByRazaDb;
    } catch (error) {
      throw new Error("No se recibio respuesta");
    }
  } else {
    try {
      //?Si el if que valida si es un UUID arroja false entonces realizamos la busqueda en nuestra API
      const { data } = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      //?Con la respues de nuestra petición hacemos un find y almacenamos solo la información necesaria en una nueva variable.
      const response = await data.find((dog) => dog.id == id);
      const dogByRazaApi = {
        id: response.id,
        name: response.name,
        image: response.image.url,
        height: response.height.metric,
        weight: response.weight.metric,
        life_span: response.life_span,
        temperament: response.temperament,
        created: false,
      };
      return dogByRazaApi;
    } catch (error) {
      throw new Error("No se encontraron perros");
    }
  }
};

module.exports = getDogsByIdRaza;
