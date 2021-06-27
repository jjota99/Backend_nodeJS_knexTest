exports.up = (knex) =>
  knex.schema.alterTable("alunos", (table) => {
    table.timestamp("deleted_at");
  });

  exports.down = (knex) =>
  knex.schema.alterTable("alunos", (table) => {
    table.dropColumn("deleted_at");
  });

