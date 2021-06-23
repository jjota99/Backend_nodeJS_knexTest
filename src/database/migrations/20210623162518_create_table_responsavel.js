exports.up = knex => knex.schema.createTable("responsavel", table => {
  table.text("nome").notNullable()
  table.string("cpf", 14).primary().notNullable()
  table.string("telefone", 11).unique().notNullable()

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("responsavel")
