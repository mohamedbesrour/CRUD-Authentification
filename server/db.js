const Pool = require('pg').Pool
require('dotenv').config()
// const pool = new Pool({
//     user: "postgres",
//     password: "root",
//     host: "localhost",
//     port: 5432,
//     database: 'authentification'
//  });
const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'authentification'
});

module.exports = pool