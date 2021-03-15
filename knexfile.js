const dotenv = require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://tvlvyzvopblhzl:0405b758acee723819abe7551ab191b22f4e28aa2b752381646b3c71e63d8e4f@ec2-34-195-233-155.compute-1.amazonaws.com:5432/d9mtlc60qsnv11',
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
};