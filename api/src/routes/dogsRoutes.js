const { Router } = require("express");
//Importamos los controllers de cada ruta
const {
  getAllDogs,
  getDogById,
  createDog,
  deleteDog,
} = require("../handlers/dogsHandler");

const dogsRouter = Router();

//Generamos las rutas correspondiente para cada petición

dogsRouter.get("/", getAllDogs);

dogsRouter.get("/:id", getDogById);

dogsRouter.get("/:name", getAllDogs);

dogsRouter.post("/", createDog);

dogsRouter.delete("/:id", deleteDog);

module.exports = dogsRouter;
