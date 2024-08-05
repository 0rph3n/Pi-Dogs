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
    //!CREO LA NUEVA ACTIVIDAD
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    //!LIMPIO MI ARRAY DE COUNTRIES, BUSCO LOS PAISES QUE ESTAN EN MI ARRAY DENTRO DE MI MODELO DE COUNTRIES
    const temperamentsNames = temperaments.map((temp) => temp.trim());
    const allTemperament = await Promise.all(
      temperamentsNames.map((t) =>
        Temperament.findOrCreate({ where: { name: t } })
      )
    );
    //!RELACIONO A MI NUEVA ACTIVIDAD CON CADA PAIS QUE TENGO EN MI ARRAY
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
