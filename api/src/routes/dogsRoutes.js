const { Router } = require("express");

const {
  getAllDogs,
  getDogById,
  createDog,
  deleteDog,
} = require("../handlers/dogsHandler");

const dogsRouter = Router();

dogsRouter.get("/", getAllDogs);

dogsRouter.get("/:id", getDogById);

dogsRouter.get("/:name", getAllDogs);

dogsRouter.post("/", createDog);

dogsRouter.delete("/:id", deleteDog);

module.exports = dogsRouter;
