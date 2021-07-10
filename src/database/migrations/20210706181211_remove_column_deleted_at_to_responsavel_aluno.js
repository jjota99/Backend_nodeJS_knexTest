exports.up = (knex) =>
  knex.schema.alterTable("responsavel_aluno", (table) => {
    table.dropColumn("deleted_at");
  });

exports.down = (knex) =>
  knex.schema.alterTable("responsavel_aluno", (table) => {
    table.timestamp("deleted_at");
  });
