const { Router } = require("express");
//Importamos los controllers de cada ruta
const {
  getAllDogs,
  getDogById,
  createDog,
} = require("../handlers/dogsHandler");

const dogsRouter = Router();

//Generamos las rutas correspondiente para cada petición
//!Hacer dos rutas una para traer todo de la bd y otra de la Api para luego usar los filtros en el front.
dogsRouter.get("/", getAllDogs);

dogsRouter.get("/:id", getDogById);

dogsRouter.post("/", createDog);

module.exports = dogsRouter;
