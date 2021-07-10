const knex = require("../../database/index");

module.exports = {
  async findAllResponsible(req, res) {
    const infos = await knex("responsavel").where("deleted_at", null);

    return res.json(infos);
  },

  async registerResponsible(req, res, next) {
    try {
      const { nome, cpf, telefone } = req.body;

      const resultCPF = await knex("responsavel").count().where({ cpf });
      const resultTelefone = await knex("responsavel")
        .count()
        .where({ telefone });
      const resultCombination = await knex("responsavel")
        .count()
        .where({ cpf, telefone });

      if (resultCombination[0].count >= 1) {
        res.status(400).json("CPF e Telefone existentes!");
      }

      if (resultCPF[0].count >= 1) {
        res.status(400).json("CPF já existente!");
      }

      if (resultTelefone[0].count >= 1) {
        res.status(400).json("Telefone já existente!");
      }

      await knex("responsavel").insert({
        nome,
        cpf,
        telefone,
      });

      return res.status(201).send();
    } catch {
      return res.status(400).json("Ocorreu um erro ao registrar usuário!");
    }
  },

  async updateResponsible(req, res) {
    const { cpf } = req.params;
    const { nome, telefone } = req.body;

    const resultCheck = await knex("responsavel")
      .count()
      .where({ telefone })
      .where("cpf", "!=", cpf);

    if (resultCheck[0].count >= 1) {
      return res.status(400).json("Telefone já existente!");
    }

    await knex("responsavel").update({ nome, telefone }).where({ cpf });

    return res.status(201).send();
  },

  async deleteResponsible(req, res, next) {
    try {
      const { cpf } = req.params;

      await knex("responsavel").where({ cpf }).update("deleted_at", new Date());

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
