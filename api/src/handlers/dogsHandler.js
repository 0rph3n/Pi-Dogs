const getDogsApi = require("../controllers/getDogsApi");
const getDogsByIdRaza = require("../controllers/getDogsByIdRaza");
const getDogsByName = require("../controllers/getDogsByName");
const getDogsDb = require("../controllers/getDogsDb");
const postDogs = require("../controllers/postDogs");
const { Dog } = require("../db");

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
      console.error("Error en getAllDogs:", error.message);
      res
        .status(400)
        .json({ error: "Error al obtener los perros. " + error.message });
    }
  },
  getDogById: async (req, res) => {
    try {
      const dogByRaza = await getDogsByIdRaza(req);
      res.status(200).json(dogByRaza);
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
  deleteDog: async (req, res) => {
    try {
      const { id } = req.params;
      const validacion = await getDogsByIdRaza(req);
      if (validacion) await Dog.destroy({ where: { id: id } });
      res.status(200).send({ message: "Se elimino el perro con exito" });
    } catch (error) {
      res.status(400).json({
        error: "No se pudo eliminar el perro solicitado porque",
        message: error.message,
      });
    }
  },
};
