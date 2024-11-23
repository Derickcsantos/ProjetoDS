const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // Método para criar um novo usuário
    async createUser(username, password) {
    
        if (!username || !password) {
            throw new Error('Username e password são obrigatórios');
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await pool.query(
                'INSERT INTO usuario (username, password) VALUES (?, ?)',
                [username, hashedPassword]
            );

            return { id: result.insertId, username };
        } catch (error) {
            console.error('Erro ao criar usuário:', error.message);
            throw new Error('Não foi possível criar o usuário');
        }
    }

    // Método para encontrar um usuário pelo nome
    async findUserByUsername(username) {
        const [rows] = await pool.query(
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