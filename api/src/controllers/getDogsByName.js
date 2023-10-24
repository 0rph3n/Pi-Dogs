const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getDogsByName = async (req) => {
  //?Se realiza destructuring sobre el req y se le aplica metodo para que sea toda la palabra en minuscula.
  const name = req.query.name.toLowerCase();
  //? Se realiza una findAll a mi base para traer todos los perros donde la name que me ingresa coincida con el registrado, se utiliza Op.iLike ya que debe ser casa insensitive.
  try {
    const dogByNameDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: "name",
        through: {
          attributes: [],
        },
      },
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    //?Chequeo que mi array no este vacio y realizo un mapeo trayendo las propiedades que necesito.
    if (dogByNameDB.length > 0) {
      const dogDb = dogByNameDB.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperament: dog.temperament.map((t) => temp.name),
      }));

      return dogDb;
    } else throw new Error("No se encontro un perro con esa raza");
  } catch (error) {
    throw new Error("No se encontraron perros");
  }
};

module.exports = getDogsByName;
