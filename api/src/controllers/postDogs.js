const { Dog, Temperament } = require("../db");

const postDogs = async (req) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    temperaments,
    image,
  } = req.body;
  const height = heightMin + " - " + heightMax;
  const weight = weightMin + " - " + weightMax;
  try {
    if (!name || !height || !weight || !life_span || !image) {
      throw new Error("Faltan datos para crear un perro");
    }
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    const temperamentsNames = temperaments.map((temp) => temp.trim());
    const allTemperament = await Promise.all(
      temperamentsNames.map((t) =>
        Temperament.findOrCreate({ where: { name: t } })
      )
    );
    await newDog.setTemperaments(
      allTemperament.map(([temperament]) => temperament)
    );
    const finalDog = {
      id: newDog.id,
      name: newDog.name,
      height: newDog.height,
      weight: newDog.weight,
      life_span: newDog.life_span,
      image: newDog.image,
      temperament: allTemperament.map(([temperament]) => temperament.name),
    };
    return finalDog;
  } catch (error) {
    throw new Error("No fue posible crear el perro. " + error.message);
  }
};

module.exports = postDogs;
