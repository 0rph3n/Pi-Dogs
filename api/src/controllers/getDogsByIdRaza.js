const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getDogsByIdRaza = async (req) => {
  //?Realizamos un destructuring del id que nos llega por parametro, comenzamos validando si lo que nos llega es un UUID(letras y numeros) que corresponde a nuestra base de datos o si es numero que corresponde a la API.
  //?Para ello validamos preguntando si el id es un NaN(not a number)
  const { id } = req.params;

  if (isNaN(id)) {
    try {
      //?Una vez cumplida la validación del if buscamos en nuestra base de datos por id que nos entra
      const dogByRazaDb = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          trough: { attributes: [] },
        },
      });

      const dogByRaza = {
        id: dogByRazaDb.id,
        name: dogByRazaDb.name,
        image: dogByRazaDb.image,
        height: dogByRazaDb.height,
        weight: dogByRazaDb.weight,
        life_span: dogByRazaDb.life_span,
        temperament: dogByRazaDb.Temperaments.map((temp) => temp.name),
      };
      return dogByRaza;
    } catch (error) {
      throw new Error("el perro no existe");
    }
  } else {
    try {
      //?Si el if que valida si es un UUID arroja false entonces realizamos la busqueda en nuestra API
      const { data } = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      //?Con la respues de nuestra petición hacemos un find y almacenamos solo la información necesaria en una nueva variable.
      const response = await data.find((dog) => dog.id == id);
      if (!response) {
        throw new Error("No se encontraron perros en la Api Externa");
      }
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
      throw new Error("No se encontraron perros en la Api Externa");
    }
  }
};

module.exports = getDogsByIdRaza;
