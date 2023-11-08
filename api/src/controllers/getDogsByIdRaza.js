const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getDogsByIdRaza = async (req) => {
  const { id } = req.params;

  if (isNaN(id)) {
    try {
      const dogByRazaDb = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
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
        created: true,
      };
      return dogByRaza;
    } catch (error) {
      throw new Error("el perro no existe");
    }
  } else {
    try {
      const { data } = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );

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
