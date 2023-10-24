const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getDogs = async () => {
  try {
    //?Hago una solicitud de tipo axios(promesa) a mi api key y desgloso la respuesta con el destructuring de data ya que en la misma se almacena mi respuesta
    const { data } = await axios(
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
        temperament: dog.temperament,
        created: false,
      };
    });
    //?Realizo un busqueda en mi base de datos de todo lo que posee mi modelo Dog e incluyo la información de temperamento, especificamente el atributo name, almaceno la información en mi variable dogsDb.
    const dogsBd = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //!FALTA TRAER LOS DATOS QUE SON DE LOS PERROS COMO HACEMOS DESDE LA API
    //Este no es necesariamente el lugar final donde van
    //
    //
    //
    //
    //?Realizo un return de la información en forma de array haciendo spread de la respuesta de mi base de datos y api.
    return [...apiResponse, ...dogsBd];
  } catch (error) {
    console.error("Error en la solicitud a la API:", error);
    throw new Error("No se pudieron obtener los datos de la API externa.");
  }
};

module.exports = getDogs;
