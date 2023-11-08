const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getDogsApi = async () => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const apiResponse = await data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        temperament: dog.temperament ? dog.temperament.split(", ") : [],
        created: false,
      };
    });
    return apiResponse;
  } catch (error) {
    throw new Error(
      "No se pudieron obtener los datos de los perros desde mi Api."
    );
  }
};

module.exports = getDogsApi;
