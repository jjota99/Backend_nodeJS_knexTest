const express = require("express");
const routes = express.Router();
const studentController = require("./database/controllers/studentController");
const teacherController = require("./database/controllers/teacherController");
const responsibleController = require("./database/controllers/responsibleController");
const classController = require("./database/controllers/classController");
const relationResponsibleController = require("./database/controllers/relationResponsibleController");

// routes alunos
routes
  .get("/alunos", studentController.findAllStudent)
  .post("/alunos", studentController.registerStudent)
  .put("/alunos/:matricula", studentController.updateStudent)
  .delete("/alunos/:matricula", studentController.deleteStudent)

  // routes professores
  .get("/professores", teacherController.findAllTeacher)
  .post("/professores", teacherController.registerTeacher)
  .put("/professores/:matricula", teacherController.updateTeacher)
  .delete("/professores/:matricula", teacherController.deleteTeacher)

  // routes responsavel
  .get("/responsavel", responsibleController.findAllResponsible)
  .post("/responsavel", responsibleController.registerResponsible)
  .put("/responsavel/:cpf", responsibleController.updateResponsible)
  .delete("/responsavel/:cpf", responsibleController.deleteResponsible)

  // routes relacao_aula
  .get("/relacaoaulaprofessor", teacherController.classTeacher)
  .get("/relacaoaulaaluno", studentController.classStudent)
  .post("/relacaoaula", classController.registerRelationClass)
  .delete("/relacaoaula", classController.deleteRelationClass)

  // routes responsavel_aluno
  .get("/responsavelaluno", studentController.responsibleStudent)
  .post(
    "/responsavelaluno",
    relationResponsibleController.registerRelationResponsible
  )
  .delete(
    "/responsavelaluno",
    relationResponsibleController.deleteRelationResponsible
  );

module.exports = routes;
