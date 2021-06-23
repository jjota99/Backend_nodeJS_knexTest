module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "devschool",
      user: "devschool",
      password: "devschool",
    },

    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },

    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};