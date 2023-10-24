require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");



const getDogsByName = async (name) => {
  //? Se realiza una findAll a mi base para traer todos los perros donde la name que me ingresa coincida con el registrado, se utiliza Op.iLike ya que debe ser casa insensitive.
  try {
    const dogByNameDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
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
      const dogDb = await dogByNameDB.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperament: dog.temperament.map((temp) => temp.name),
      }));
      return dogDb;
    }
    //?Genero la petición de la data a mi Api y luego realizo un mapeo de la misma, almaceno la información que necesito, ademas realizo un split de la información que me llega de temperamentos.
    const { data } = await axios(
      `https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=${name}`
    );
    const dogApi = await data.map((dog) => ({
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

// // Busqueda todos los perro y por query //
// const allPerritos = async (raza) => {
//   //-- Peticiones a la DB y a la API --//
//   const pichichosDB = await Dog.findAll();
//   const {data} = await axios.get(https://api.thedogapi.com/v1/breeds?api_key=${API_KEY})

//   const todosLosPerritos = [...pichichosDB, ...data];

//   if (raza){
//       const perritosQuery = todosLosPerritos.filter(pichicho => {
//           return pichicho.name.toLowerCase().includes(raza.toLowerCase())
//       })
//       if (perritosQuery.length < 1){
//           return CatDog
//       } else {
//           return perritosQuery
//       }
//   } else {
//       return todosLosPerritos
//   }
// }
