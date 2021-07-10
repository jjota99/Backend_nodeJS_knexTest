const knex = require("../../database/index.js");

module.exports = {
  async findAllStudent(req, res) {
    const infos = await knex("alunos").where("deleted_at", null);

    return res.json(infos);
  },

  async registerStudent(req, res) {
    const { nome, cpf, data_nascimento } = req.body;
    const selectCPF = JSON.stringify({ cpf });
    const converterCPF = parseInt(selectCPF);
    const resultCPF = await knex("alunos").count(converterCPF).where({ cpf });

    if (resultCPF[0].count >= 1) {
      res.status(400).json("CPF já existente!");
    }

    await knex("alunos").insert({ nome, cpf, data_nascimento });

    return res.status(201).send();
  },

  async updateStudent(req, res, next) {
    try {
      const { matricula } = req.params;
      const { nome, cpf, data_nascimento } = req.body;

      await knex("alunos")
        .update({ nome, cpf, data_nascimento })
        .where({ matricula });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async deleteStudent(req, res, next) {
    try {
      const { matricula } = req.params;

      await knex("alunos")
        .where({ matricula })
        .update("deleted_at", new Date());
      return res.send();
    } catch (error) {
      next(error);
    }
  },

  async classStudent(req, res) {
    const { matricula_aluno } = req.query;

    const query = knex("relacao_aula")
      .join("alunos", "alunos.matricula", "=", "relacao_aula.matricula_aluno")
      .join(
        "professores",
        "professores.matricula",
        "=",
        "relacao_aula.matricula_professor"
      )
      .select(
        "relacao_aula.matricula_aluno",
        "alunos.nome",
        "relacao_aula.matricula_professor",
        "professores.nome as professor_nome",
        "professores.materia"
      );

    if (matricula_aluno) {
      query.where({ matricula_aluno });
    }

    const retorno = await query;

    let listAlunos = [];

    retorno.forEach((alunoPercorrendo) => {
      const alunoExistente = listAlunos.find(
        (alunoDaLista) =>
          alunoDaLista.matricula_aluno === alunoPercorrendo.matricula_aluno
      );

      if (!alunoExistente) {
        listAlunos.push({
          matricula_aluno: alunoPercorrendo.matricula_aluno,
          nome: alunoPercorrendo.nome,
        });
      }
    });

    listAlunos = listAlunos.map((alunoPercorrido) => {
      let registros = retorno.filter(
        (registro) =>
          registro.matricula_aluno === alunoPercorrido.matricula_aluno
      );

      registros = registros.map((registro) => {
        return {
          matricula_professor: registro.matricula_professor,
          professor_nome: registro.professor_nome,
          materia: registro.materia,
        };
      });

      return {
        ...alunoPercorrido,
        aulas: registros,
      };
    });

    return res.json(listAlunos);
  },

  async responsibleStudent(req, res) {
    const { aluno_matricula } = req.query;

    const query = knex("responsavel_aluno")
      .join(
        "alunos",
        "alunos.matricula",
        "=",
        "responsavel_aluno.aluno_matricula"
      )
      .join(
        "responsavel",
        "responsavel.cpf",
        "=",
        "responsavel_aluno.responsavel_cpf"
      )
      .select(
        "responsavel_aluno.aluno_matricula",
        "alunos.nome",
        "responsavel.nome as responsavel_nome",
        "responsavel_aluno.responsavel_cpf",
        "responsavel.telefone as responsavel_telefone"
      );

    if (aluno_matricula) {
      query.where({ aluno_matricula });
    }

    const retorno = await query;

    let listAlunos = [];

    retorno.forEach((alunoPercorrendo) => {
      const alunoExistente = listAlunos.find(
        (alunoDaLista) =>
          alunoDaLista.aluno_matricula === alunoPercorrendo.aluno_matricula
      );

      if (!alunoExistente) {
        listAlunos.push({
          aluno_matricula: alunoPercorrendo.aluno_matricula,
          nome: alunoPercorrendo.nome,
        });
      }
    });

    listAlunos = listAlunos.map((alunoPercorrido) => {
      let registros = retorno.filter(
        (registro) =>
          registro.aluno_matricula === alunoPercorrido.aluno_matricula
      );

      registros = registros.map((registro) => {
        return {
          responsavel_nome: registro.responsavel_nome,
          responsavel_cpf: registro.responsavel_cpf,
          responsavel_telefone: registro.responsavel_telefone,
        };
      });

      return {
        ...alunoPercorrido,
        responsaveis: registros,
      };
    });

    return res.json(listAlunos);
  },
};
