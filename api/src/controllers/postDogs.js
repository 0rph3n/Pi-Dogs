const { Dog, Temperament } = require("../db");

const postDogs = async (req) => {
  const { name, height, weight, life_span, temperaments } = req.body;
  //?Verifico que todos los campos esten completados caso contrario devuelvo un error
  try {
    if (!name || !height || !weight || !life_span) {
      throw new Error("Faltan datos para crear un perro");
    }
    //?Creo el nuevo perro con los datos obtenidos
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
    });
    //?Manejo los temperamentos que me llegan y los formateo, si algún temperamento no existe lo creo.
    const temperamentsNames = temperaments
      .split(", ")
      .map((temp) => temp.trim());
    const allTemperament = await Promise.all(
      temperamentsNames.map((t) =>
        Temperament.findOrCreate({ where: { name: t } })
      )
    );
    //?Relaciono el temperamento con el nuevo perro que acabo de crear para mi base de datos
    await newDog.setTemperaments(
      allTemperament.map(([temperament]) => temperament)
    );
    //?Finalmento formateo la información y la retorno.
    const finalDog = {
      id: newDog.id,
      name: newDog.name,
      height: newDog.height,
      weight: newDog.weight,
      life_span: newDog.life_span,
      temperament: allTemperament.map(([temperament]) => temperament.name),
    };
    return finalDog;
  } catch (error) {
    throw new Error("No fue posible crear el perro. " + error.message);
  }
};

module.exports = postDogs;
