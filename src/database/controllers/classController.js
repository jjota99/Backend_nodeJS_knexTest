const knex = require("../../database/index");

module.exports = {
  async registerRelationClass(req, res) {
    const { matricula_aluno, matricula_professor } = req.body;

    const result = await knex("relacao_aula")
      .count()
      .where({ matricula_aluno, matricula_professor });

    if (result[0].count >= 1) {
      res.status(201).json("Relação já existente!");
    }

    await knex("relacao_aula").insert({
      matricula_aluno,
      matricula_professor,
    });

    return res.status(201).send();
  },

  async deleteRelationClass(req, res, next) {
    try {
      const { matricula_aluno, matricula_professor } = req.body;

      await knex("relacao_aula")
        .where({ matricula_aluno, matricula_professor })
        .del();

      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
