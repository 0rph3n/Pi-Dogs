const { Router } = require("express");
//Importamos los controllers de cada ruta
const getDogs = require("../controllers/getDogs");
const getDogsByIdRaza = require("../controllers/getDogsByIdRaza");
const getDogsByName = require("../controllers/getDogsByName");

const dogsRouter = Router();

//Generamos las rutas correspondiente para cada petición

dogsRouter.get("/", async (req, res) => {
  try {
    const allDogs = await getDogs();
    res.status(200).send(allDogs);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener los perros" + error.message });
  }
});

dogsRouter.get("/:id", async (req, res) => {
  try {
    const dogByRaza = await getDogsByIdRaza(req);
    res.status(200).send(dogByRaza);
  } catch (error) {
    res.status(400).json("No se accedio a los perros. " + error.message);
  }
});

dogsRouter.get("/name?=", async (req, res) => {
  try {
    const dogByName = getDogsByName(req);
    res.status(200).send(dogByName);
  } catch (error) {
    res
      .status(400)
      .json("No se pudo acceder a la busqueda por nombre. " + error.message);
  }
});

module.exports = dogsRouter;
