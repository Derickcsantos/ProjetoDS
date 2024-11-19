const bcrypt = require('bcryptjs');
const db = require('../config/database');

class User{
    async createUser(username,password){
        const hashedPassword = await bcrypt.hash(password,10);

        const [result] = await db.query(
            'INSERT INTO usuario (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return{ id: result.insertId, username};
    }
    async findUserByUsername(username){
        const [rows] = await db.query('SELECT * FROM usuario WHERE username =?', [username]);
        return rows[0];
    }

    async validatePassword(user,password){
        return bcrypt.compare(password,user.password);
    }
}

module.exports = new User();