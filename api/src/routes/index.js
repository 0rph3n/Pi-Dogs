const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogsRoutes");
const temperamentsRouter = require("./temperamentsRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRouter); //llamo a mi controller que me trae todos los perros dentro de mi bd y mi api al hacer un get a la ruta dogs
router.use("/temperaments", temperamentsRouter);
router.use("/", (req, res) => {
  res.send("Bienvenidos a mi Dog API");
});

module.exports = router;
