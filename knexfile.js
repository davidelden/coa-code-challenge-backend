module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'coa_gtfs_cap_metro_data',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host:     process.env.POSTGRESQL_HOST_STAGING,
      database: process.env.POSTGRESQL_DB_NAME_STAGING,
      user:     process.env.POSTGRESQL_USER_STAGING,
      password: process.env.POSTGRESQL_PASSWORD_STAGING
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host:     process.env.POSTGRESQL_HOST,
      database: process.env.POSTGRESQL_DB_NAME,
      user:     process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

};
