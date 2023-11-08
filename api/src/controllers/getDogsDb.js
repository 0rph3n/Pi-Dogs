const { Dog, Temperament } = require("../db");

const getDogsDb = async () => {
  try {
    const dogsDb = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

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
