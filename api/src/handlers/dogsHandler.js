const getDogsApi = require("../controllers/getDogsApi");
const getDogsByIdRaza = require("../controllers/getDogsByIdRaza");
const getDogsByName = require("../controllers/getDogsByName");
const getDogsDb = require("../controllers/getDogsDb");
const postDogs = require("../controllers/postDogs");

//!Hacer dos rutas una para traer todo de la bd y otra de la Api para luego usar los filtros en el front.

module.exports = {
  getAllDogs: async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const dogByName = await getDogsByName(name);
        res.status(200).send(dogByName);
      } else {
        const dogApi = await getDogsApi();
        const dogDb = await getDogsDb();

        res.status(200).send([...dogApi, ...dogDb]);
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: "Error al obtener los perros. " + error.message });
    }
  },
  getDogById: async (req, res) => {
    try {
      const dogByRaza = await getDogsByIdRaza(req);
      res.status(200).send(dogByRaza);
    } catch (error) {
      res.status(404).json({ error: "Hubo un error, " + error.message });
    }
  },
  createDog: async (req, res) => {
    try {
      const newDog = await postDogs(req);
      res.status(201).json({ message: "Perro creado con exito", dog: newDog });
    } catch (error) {
      res
        .status(400)
        .json({ error: "No se pudo crear el perro", message: error.message });
    }
  },
};
