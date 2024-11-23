const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@Daiane10',
    database: 'login'
});


module.exports = pool.promise();