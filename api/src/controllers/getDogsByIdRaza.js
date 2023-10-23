const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const validateUUID = require("../utils/validateUUID");

const getDogsByIdRaza = async (req) => {
  const { id } = req.params;
  if (validateUUID(id)) {
    try {
      const dogByRazaDb = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          trough: { attributes: [] },
        },
      });
      if (!dogByRazaDb) throw new Error("Perro no encontrado");
      else return dogByRazaDb;
    } catch (error) {
      throw new Error("No se recibio respuesta");
    }
  } else {
    try {
      const { data } = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const response = await data.find((dog) => (dog.id = id));
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
