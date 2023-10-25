const getDogs = require("../controllers/getDogs");
const getDogsByIdRaza = require("../controllers/getDogsByIdRaza");
const getDogsByName = require("../controllers/getDogsByName");
const postDogs = require("../controllers/postDogs");

module.exports = {
  getAllDogs: async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const dogByName = await getDogsByName(name);
        res.status(200).send(dogByName);
      } else {
        const allDogs = await getDogs();
        res.status(200).send(allDogs);
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
