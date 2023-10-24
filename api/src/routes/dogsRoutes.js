const { Router } = require("express");
//Importamos los controllers de cada ruta
const getDogs = require("../controllers/getDogs");
const getDogsByIdRaza = require("../controllers/getDogsByIdRaza");
const getDogsByName = require("../controllers/getDogsByName");
const postDogs = require("../controllers/postDogs");

const dogsRouter = Router();

//Generamos las rutas correspondiente para cada petición
//!Hacer dos rutas una para traer todo de la bd y otra de la Api para luego usar los filtros en el front.
dogsRouter.get("/", async (req, res) => {
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
});

dogsRouter.get("/:id", async (req, res) => {
  try {
    const dogByRaza = await getDogsByIdRaza(req);
    res.status(200).send(dogByRaza);
  } catch (error) {
    res.status(404).json("No se accedio a los perros. " + error.message);
  }
});

dogsRouter.post("/", async (req, res) => {
  try {
    const newDog = await postDogs(req);
    res.status(201).json({ message: "Perro creado con exito", dog: newDog });
  } catch (error) {
    res
      .status(400)
      .json({ error: "No se pudo crear el perro", message: error.message });
  }
});

module.exports = dogsRouter;
