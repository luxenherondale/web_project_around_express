const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const { PORT = 3000 } = process.env;

// Uso de las rutas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Manejo de rutas no existentes
app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
