require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getDogsByName = async (name) => {
  try {
    const dogByNameDb = await Dog.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (Array.isArray(dogByNameDb) && dogByNameDb.length > 0) {
      const dogDb = dogByNameDb.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperament: dog.Temperaments.map((temp) => temp.name),
        created: dog.createInDb,
      }));
      return dogDb;
    }

    const { data } = await axios(
      `https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=${name}`
    );
    const dogApi = data.map((dog) => ({
      id: dog.id,
      name: dog.name,
      image: dog.image.url,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      temperament: dog.temperament ? dog.temperament.split(", ") : [],
    }));
    return dogApi;
  } catch (error) {
    throw new Error("No se encontraron perros. " + error.message);
  }
};

module.exports = getDogsByName;
