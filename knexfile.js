// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'devschool',
      user:     'devschool',
      password: 'devschool'
    }
  },
    migrations: {
      tableName: 'knex_migrations'
    }
  };

  