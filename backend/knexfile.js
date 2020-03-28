// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3', // vamos usar esse, deixa
    connection: {
      filename: './src/database/db.sqlite' // arquivo que armazenará dados da minha base
    },
    migrations: {
      directory: './src/database/migrations' // crie esse diretório para add migrations/tabelas
    },
    useNullAsDefault: true, // para que valor padrão das tabelas seja null
  },

  staging: { // ambiente de prod para time de desenvolvimento, para testar app online
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
