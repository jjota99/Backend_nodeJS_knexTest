
exports.up = knex => knex.schema.createTable("relacao_aula", table => {
  table.integer("matricula_professor").references("professores.matricula").notNullable()
  table.integer("matricula_aluno").references("alunos.matricula").notNullable()
})

exports.down = knex => knex.schema.dropTable("relacao_aula")
