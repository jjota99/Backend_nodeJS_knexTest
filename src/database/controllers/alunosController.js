const knex = require("../../database/index.js")

module.exports = {
 async index (req,res) {

  const infos = await knex("alunos").where("deleted_at", null);

  return res.json(infos);
},

async create( req, res ) {

  const { nome, cpf, data_nascimento } = req.body;
  const selectCPF = JSON.stringify({ cpf });
  const converterCPF = parseInt(selectCPF);
  const resultCPF =  await knex("alunos").count(converterCPF).where({ cpf });
  
  if (resultCPF[0].count >= 1) {
   res.status(400).json("CPF já existente!")
  }
 
  await knex("alunos").insert({ nome, cpf, data_nascimento, })
  
  return res.status(201).send();
},

async update(req, res, next) {
  try {
    const { matricula } = req.params;
    const { nome, cpf, data_nascimento } = req.body;

    await knex("alunos").update({ nome, cpf, data_nascimento }).where({ matricula });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
},

async delete(req, res, next) {
  try {
    const { matricula } = req.params;

    await knex("alunos").where({ matricula }).update("deleted_at", new Date()) 
    return res.send();
  } catch (error) {
    next(error)
  }
},

};
