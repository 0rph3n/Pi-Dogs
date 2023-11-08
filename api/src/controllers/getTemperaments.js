require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async () => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const temperaments = data.map((dog) => dog.temperament);

    let arrayTemp = temperaments.join().split(",");

    arrayTemp = arrayTemp.map((el) => el.trim());
    const cleanTemps = [];
    arrayTemp.forEach((temp) => {
      if (!cleanTemps.includes(temp)) {
        cleanTemps.push(temp);
      }
    });
    cleanTemps.forEach((t) => {
      if (t !== "") {
        Temperament.findOrCreate({ where: { name: t } });
      }
    });
    const allTemperaments = await Temperament.findAll();
    return allTemperaments;
  } catch (error) {
    console.error("Error en la solicitud a la API:", error);
    throw new Error("No se pudieron obtener los datos de la API externa.");
  }
};

module.exports = getTemperaments;
