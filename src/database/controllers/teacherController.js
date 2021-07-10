const knex = require("../../database/index");

module.exports = {
  async findAllTeacher(req, res) {
    const infos = await knex("professores").where("deleted_at", null);
    return res.json(infos);
  },

  async registerTeacher(req, res, next) {
    const { nome, cpf, materia } = req.body;
    const selectCPF = JSON.stringify({ cpf });
    const selectMateria = JSON.stringify({ materia });
    const converterCPF = parseInt(selectCPF);
    const converterMateria = parseInt(selectMateria);
    const resultCPF = await knex("professores")
      .count(converterCPF)
      .where({ cpf });
    const resultMateria = await knex("professores")
      .count(converterMateria)
      .where({ materia });

    if (resultCPF[0].count >= 1) {
      res.status(400).json("CPF já existente!");
    }

    if (resultMateria[0].count >= 1) {
      res.status(400).json("Materia já existente!");
    }

    await knex("professores").insert({
      nome,
      cpf,
      materia,
    });

    return res.status(201).send();
  },

  async updateTeacher(req, res, next) {
    try {
      const { matricula } = req.params;
      const { nome, cpf, materia } = req.body;

      await knex("professores")
        .update({ nome, cpf, materia })
        .where({ matricula });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async deleteTeacher(req, res, next) {
    try {
      const { matricula } = req.params;

      await knex("professores")
        .where({ matricula })
        .update("deleted_at", new Date());

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async classTeacher(req, res) {
    const { matricula_professor } = req.query;

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
        "alunos.nome as aluno_nome",
        "relacao_aula.matricula_professor",
        "professores.nome as professor_nome",
        "professores.materia"
      );

    if (matricula_professor) {
      query.where({ matricula_professor });
    }

    const retorno = await query;

    let listProfessores = [];

    retorno.forEach((professorPercorrendo) => {
      const professorExistente = listProfessores.find(
        (professorDaLista) =>
          professorDaLista.matricula_professor ===
          professorPercorrendo.matricula_professor
      );

      if (!professorExistente) {
        listProfessores.push({
          matricula_professor: professorPercorrendo.matricula_professor,
          nome: professorPercorrendo.professor_nome,
          materia: professorPercorrendo.materia,
        });
      }
    });

    listProfessores = listProfessores.map((professorPercorrido) => {
      let registros = retorno.filter(
        (registro) =>
          registro.matricula_professor ===
          professorPercorrido.matricula_professor
      );

      registros = registros.map((registro) => {
        return {
          matricula_aluno: registro.matricula_aluno,
          aluno_nome: registro.aluno_nome,
        };
      });

      return {
        ...professorPercorrido,
        aulas: registros,
      };
    });

    return res.json(listProfessores);
  },
};
