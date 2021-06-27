exports.up = (knex) =>
  knex.schema.alterTable("professores", (table) => {
    table.timestamp("deleted_at");
  });

  exports.down = (knex) =>
  knex.schema.alterTable("professores", (table) => {
    table.dropColumn("deleted_at");
  });

