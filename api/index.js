const express = require("express");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const { api } = require("../config");
const errors = require("../network/errors");

const app = express();

app.use(express.json());
// Rutas

app.use("/api/user", user);
app.use("/api/login", auth);

app.use(errors);

app.listen(api.port, () => console.log("Servidor en el puerto", api.port));
