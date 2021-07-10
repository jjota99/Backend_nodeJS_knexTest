
exports.up = knex => knex.schema.alterTable("relacao_aula", table => {
  table.unique(["matricula_professor", "matricula_aluno"])
  table.dropColumn("deleted_at")
  
})

exports.down = knex => knex.schema.alterTable("relacao_aula", table => {
  table.dropUnique(["matricula_professor", "matricula_aluno"])
  table.timestamp("deleted_at");  
})