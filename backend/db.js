// using pg node module to connect to postgres database
const { Pool } = require('pg');
const pool = new Pool({

    user :"postgres",
    password:<personal password>,
    host:"localhost",
    port:5432,
    database:"codez"

});

module.exports = pool;
