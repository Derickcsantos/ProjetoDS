const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'login'
});


module.exports = pool.promise();