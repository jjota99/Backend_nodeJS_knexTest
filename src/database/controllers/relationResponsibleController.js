const knex = require("../../database/index");

module.exports = {
  async registerRelationResponsible(req, res) {
    const { aluno_matricula, responsavel_cpf } = req.body;

    const result = await knex("responsavel_aluno")
      .count()
      .where({ aluno_matricula, responsavel_cpf });

    if (result[0].count >= 1) {
      res.status(201).json("Relação já existente!");
    }

    const responsibleLimit = await knex("responsavel_aluno")
      .count("responsavel_cpf", "=", responsavel_cpf)
      .where({ aluno_matricula });

    if (responsibleLimit[0].count >= 2) {
      res.status(201).json("Limite de dois responsáveis atingido!");
    }

    await knex("responsavel_aluno").insert({
      aluno_matricula,
      responsavel_cpf,
    });

    res.status(201).send();
  },

  async deleteRelationResponsible(req, res, next) {
    try {
      const { aluno_matricula, responsavel_cpf } = req.body;

      await knex("responsavel_aluno")
        .where({ aluno_matricula, responsavel_cpf })
        .del();

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
