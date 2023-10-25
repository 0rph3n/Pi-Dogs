const { Router } = require("express");
//Importamos los controllers de cada ruta
const {
  getAllDogs,
  getDogById,
  createDog,
} = require("../handlers/dogsHandler");

const dogsRouter = Router();

//Generamos las rutas correspondiente para cada petición

dogsRouter.get("/", getAllDogs);

dogsRouter.get("/:id", getDogById);

dogsRouter.post("/", createDog);

module.exports = dogsRouter;
