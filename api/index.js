const express = require("express");
const user = require("./components/user/network");
const { api } = require("../config");

const app = express();

app.use(express.json());
// Rutas

app.use("/api/user", user);

app.listen(api.port, () => console.log("Servidor en el puerto", api.port));
