const dotenv = require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME
    },
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
    connection: 'postgres://tvlvyzvopblhzl:0405b758acee723819abe7551ab191b22f4e28aa2b752381646b3c71e63d8e4f@ec2-34-195-233-155.compute-1.amazonaws.com:5432/d9mtlc60qsnv11',
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