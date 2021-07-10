exports.up = (knex) =>
  knex.schema.alterTable("relacao_aula", (table) => {
    table.timestamp("deleted_at");
  });

  exports.down = (knex) =>
  knex.schema.alterTable("relacao_aula", (table) => {
    table.dropColumn("deleted_at");
  });

