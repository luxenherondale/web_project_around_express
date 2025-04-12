const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

// Función para leer el archivo de tarjetas
const readCards = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "..", "data", "cards.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error al leer el archivo de tarjetas: ${err.message}`);
    return [];
  }
};

router.get("/", async (req, res) => {
  try {
    const cards = await readCards();
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error en el servidor" });
  }
});

module.exports = router;
