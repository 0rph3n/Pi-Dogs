const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getDogsApi = async () => {
  try {
    //?Hago una solicitud de tipo axios.get a mi api key y desgloso la respuesta con el destructuring de data ya que en la misma se almacena mi respuesta
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    //?Realizo el mapeo de data para obtener las propiedades que necesito y ademas añado la propiedad created: false que me indica que toda esta información viene de la Api y no fue creada por el usuario, esto lo almaceno en mi variable apiResponse.
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
