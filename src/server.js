const express = require("express");
const routes = require("./route")
const app = express();

app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log("Servidor rodando!"))