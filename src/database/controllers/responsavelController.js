const knex = require("../../database/index")

module.exports = {
  async index (req,res) {
  const infos = await knex("responsavel").where("deleted_at", null)

  return res.json(infos);
  },
  
  async create(req, res, next) {
  const {nome, cpf, telefone} = req.body;
  const selectCPF = JSON.stringify({ cpf });
  const selectTelefone = JSON.stringify({ telefone });
  const converterCPF = parseInt(selectCPF);
  const converterTelefone = parseInt(selectTelefone)

  const resultCPF = await knex("responsavel").count(converterCPF).where({ cpf });
  const resultTelefone = await knex("responsavel").count(converterTelefone).where({ telefone });

  if(resultCPF[0].count >= 1) {
    res.status(400).json("CPF já existente!")
  }

  if(resultTelefone[0].count >= 1) {
    res.status(400).json("Telefone já existente!")
  }

  await knex("responsavel").insert({
    nome,
    cpf,
    telefone,
  })

  return res.status(201).send();
  },
  
  async update(req, res, next) {
    try {
      const { cpf } = req.params;
      const { nome, telefone } = req.body;
      
      await knex("responsavel").update({ nome, telefone }).where({ cpf });

      return res.status(201).send();
    } catch (error) {
      next(error)
    }
  },
  
  async delete(req, res, next) {
    try {
      const { cpf } = req.params;
      
      await knex("responsavel").where({ cpf }).update("deleted_at", new Date());
      
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  
  };
  