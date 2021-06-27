const knex = require("../../database/index")

module.exports = {
  async index (req,res) {
  const infos = await knex("professores").where("deleted_at", null)
  return res.json(infos)
  },
  
  async create(req, res, next) {
    
    const {nome, cpf, materia} = req.body;
    const selectCPF = JSON.stringify({ cpf });
    const selectMateria = JSON.stringify({ materia })
    const converterCPF = parseInt(selectCPF);
    const converterMateria = parseInt(selectMateria)
    const resultCPF = await knex("professores").count(converterCPF).where({ cpf })
    const resultMateria = await knex("professores").count(converterMateria).where({ materia })
    
    if(resultCPF[0].count >= 1) {
      res.status(400).json("CPF já existente!")
    }

    if (resultMateria[0].count >= 1) {
      res.status(400).json("Materia já existente!")
    }

    await knex("professores").insert({
      nome,
      cpf,
      materia,
    })

    return res.status(201).send();
  },
  
  async update(req, res, next) {
    try {
      const { matricula } = req.params;
      const { nome, cpf, materia } = req.body;

      await knex("professores").update({ nome, cpf, materia }).where({ matricula })

      return res.status(201).send();
    } catch (error) {
      next(error)
    }
  },
  
  async delete(req, res, next) {
    try {
      const { matricula } = req.params;

      await knex("professores").where({ matricula }).update("deleted_at", new Date())

      return res.status(201).send();
    } catch (error) {
      next(error)
    }
  },
  
  };
  