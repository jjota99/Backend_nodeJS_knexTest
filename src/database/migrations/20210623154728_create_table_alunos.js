
exports.up = knex => knex.schema.createTable("alunos", table => {
  table.increments("matricula")
  table.text("nome").notNullable()
  table.string("cpf", 14).unique().notNullable()
  table.date("data_nascimento").notNullable()

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("alunos")
