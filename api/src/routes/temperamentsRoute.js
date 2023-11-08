const { Router } = require("express");
const getTemperaments = require("../controllers/getTemperaments");

const temperamentsRouter = Router();

temperamentsRouter.get("/", async (req, res) => {
  try {
    const allTemps = await getTemperaments();
    res.status(200).send(allTemps);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener los temperamentos. " + error.message });
  }
});

module.exports = temperamentsRouter;
