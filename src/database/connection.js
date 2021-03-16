const knex = require('knex');
const dotenv = require('dotenv').config();

const configurationJSON = {
    client: 'pg',
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
    pool: {
        min: 2,
        max: 10
    }    
};

const connection = knex(configurationJSON);

module.exports = connection;