const express = require("express");
const routes = express.Router();
const alunosController = require("./database/controllers/alunosController")
const professoresController = require("./database/controllers/professoresController")
const responsavelController = require("./database/controllers/responsavelController")

// routes alunos
routes
.get("/alunos", alunosController.index)
.post("/alunos", alunosController.create)
.put("/alunos/:matricula", alunosController.update)
.delete("/alunos/:matricula", alunosController.delete)

// routes professores
.get("/Professores", professoresController.index)
.post("/Professores", professoresController.create)
.put("/Professores/:matricula", professoresController.update)
.delete("/Professores/:matricula", professoresController.delete)

// routes responsavel
.get("/responsavel", responsavelController.index)
.post("/responsavel", responsavelController.create)
.put("/responsavel/:cpf", responsavelController.update)
.delete("/responsavel/:cpf", responsavelController.delete)

module.exports = routes;