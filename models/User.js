const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // Método para criar um novo usuário
    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Reduzimos o salt rounds para 10

        const [result] = await db.query(
            'INSERT INTO usuario (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        return { id: result.insertId, username };
    }

    // Método para encontrar um usuário pelo nome
    async findUserByUsername(username) {
        const [rows] = await db.query(
            'SELECT * FROM usuario WHERE username = ?',
            [username]
        );

        return rows[0]; // Retorna o primeiro usuário encontrado ou undefined
    }

    // Método para validar a senha
    async validatePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);  // Certifique-se de que os parâmetros estão corretos
    }
}

module.exports = new User();