
exports.up = knex => knex.schema.createTable("responsavel_aluno", table => {
  table.integer("aluno_matricula").references("alunos.matricula").notNullable()
  table.string("responsavel_cpf",14).references("responsavel.cpf").notNullable()
})

exports.down = knex => knex.schema.dropTable("responsavel_aluno")
