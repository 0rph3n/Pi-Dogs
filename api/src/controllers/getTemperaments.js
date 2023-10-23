require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async () => {
  try {
    //?Realizo mi petición de todos los perros a mi API y la almaceno directamente en data al hacer destructuring
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    //?Mapeo mi data para obtener los todos los temperamentos almacenados en la propiedad temperament
    const temperaments = data.map((dog) => dog.temperament);

    //?Almaceno en un array todos los temperamentos y los separo con ","
    let arrayTemp = temperaments.join().split(",");

    //?Como los elementos cuentan con espacios vacios mapeo nuevamente el array y los elimino con el metodo trim.
    arrayTemp = arrayTemp.map((el) => el.trim());
    //? Creo un array que va a contener los temperamentos sin repetirlos
    const cleanTemps = [];
    //?Realizo un bucle forEach para recorrer el array y verificar que el mismo no se encuentre ya dentro del array, si no lo esta realiza un push del elemento
    arrayTemp.forEach((temp) => {
      if (!cleanTemps.includes(temp)) {
        cleanTemps.push(temp);
      }
    });
    //?Por cada temperamento en el array verifica que el temperamento no sea un string vacio y luego lo busca o lo crea en la base de datos de Temperamentos.
    cleanTemps.forEach((t) => {
      if (t !== "") {
        Temperament.findOrCreate({ where: { name: t } });
      }
    });
    //?Finalmente realizo un findAll para traer todos los temperamentos de la base de datos y retorno el mismo.
    const allTemperaments = await Temperament.findAll();

    return allTemperaments;
  } catch (error) {
    console.error("Error en la solicitud a la API:", error);
    throw new Error("No se pudieron obtener los datos de la API externa.");
  }
};

module.exports = getTemperaments;
