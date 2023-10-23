const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getDogs = async () => {
  try {
    const { data } = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const apiResponse = await data.map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        temperament: dog.temperament,
        created: false,
      };
    });
    const dogsBd = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return [...apiResponse, ...dogsBd];
  } catch (error) {
    console.error("Error en la solicitud a la API:", error);
    throw new Error("No se pudieron obtener los datos de la API externa.");
  }
};

module.exports = getDogs;
