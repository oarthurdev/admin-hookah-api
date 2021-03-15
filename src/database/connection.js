const knex = require('knex');
const dotenv = require('dotenv').config();

const configurationJSON = {
    client: 'pg',
    connection: {
        user: 'tvlvyzvopblhzl',
        password: '0405b758acee723819abe7551ab191b22f4e28aa2b752381646b3c71e63d8e4f',
        host: 'postgres://tvlvyzvopblhzl:0405b758acee723819abe7551ab191b22f4e28aa2b752381646b3c71e63d8e4f@ec2-34-195-233-155.compute-1.amazonaws.com:5432/d9mtlc60qsnv11',
        database: 'd9mtlc60qsnv11',
        port: 5432
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