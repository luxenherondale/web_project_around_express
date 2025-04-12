const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

// Función para leer el archivo de usuarios
const readUsers = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "..", "data", "users.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error al leer el archivo de usuarios: ${err.message}`);
    return [];
  }
};

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await readUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Error en el servidor" });
  }
});

// Ruta para obtener un usuario específico por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readUsers();
    const user = users.find((item) => item._id === id);

    if (!user) {
      return res.status(404).send({ message: "ID de usuario no encontrado" });
    }

    return res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error en el servidor" });
  }
});

module.exports = router;
