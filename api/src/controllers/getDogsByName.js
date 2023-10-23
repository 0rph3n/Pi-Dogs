const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getDogsByName = async () => {
  
};

module.exports = getDogsByName;
