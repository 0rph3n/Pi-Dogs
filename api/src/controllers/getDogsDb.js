const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
// const db = require("../db");
// const { API_KEY } = process.env;

const getDogsDb = async () => {
  try {
    // //?Realizo un busqueda en mi base de datos de todo lo que posee mi modelo Dog e incluyo la información de temperamento, especificamente el atributo name, almaceno la información en mi variable dogsDb.
    const dogsDb = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    //?Realizo el mapeo de mi información extrayendo los datos que necesito y ademas mapeo el temperamento para extraer el dato de name.
    const dbResponse = dogsDb.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperament: dog.Temperaments.map((temp) => temp.name),
        created: dog.createInDb,
      };
    });
    return dbResponse;
  } catch (error) {
    throw new Error(
      "No se pudieron obtener los datos de los perros desde la base de datos."
    );
  }
};
module.exports = getDogsDb;
