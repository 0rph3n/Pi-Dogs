require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getDogsByName = async (name) => {
  //? Se realiza una findAll a mi base para traer todos los perros donde la name que me ingresa coincida con el registrado, se utiliza Op.iLike ya que debe ser casa insensitive.
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

    //?Chequeo que mi array no este vacio y realizo un mapeo trayendo las propiedades que necesito. Estoy trayendo todas las coincidencias, si quisiera solo una podria crear una variable firstDog = dogByNameDb[0] y en dogDb elimino el map y llamo a firstDog.atributos
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
    //?Genero la petición de la data a mi Api y luego realizo un mapeo de la misma, almaceno la información que necesito, ademas realizo un split de la información que me llega de temperamentos.
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
