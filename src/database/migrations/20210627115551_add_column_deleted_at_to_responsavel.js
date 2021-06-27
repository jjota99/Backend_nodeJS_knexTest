exports.up = (knex) =>
  knex.schema.alterTable("responsavel", (table) => {
    table.timestamp("deleted_at");
  });

  exports.down = (knex) =>
  knex.schema.alterTable("responsavel", (table) => {
    table.dropColumn("deleted_at");
  });

