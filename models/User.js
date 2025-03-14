const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Configuração do Supabase
const supabaseUrl = 'https://vxbwunqfjatjxmvxwhka.supabase.co'; // Seu URL do Supabase
const supabaseApiKey = 'sua_chave_api'; // Sua chave API do Supabase
const supabase = createClient(supabaseUrl, supabaseApiKey);

class User {
    // Método para criar um novo usuário
    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha

        // Insere o novo usuário no Supabase
        const { data, error } = await supabase
            .from('usuarios') // Tabela de usuários no Supabase
            .insert([{ username, password: hashedPassword }]);

        if (error) {
            throw new Error(error.message);
        }

        return { id: data[0].id, username };
    }

    // Método para encontrar um usuário pelo nome
    async findUserByUsername(username) {
        const { data, error } = await supabase
            .from('usuarios') // Tabela de usuários no Supabase
            .select('*')
            .eq('username', username)
            .single(); // Retorna um único usuário

        if (error) {
            throw new Error(error.message);
        }

        return data; // Retorna o usuário encontrado ou null
    }

    // Método para validar a senha
    async validatePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword); // Verifica se as senhas são iguais
    }
}

module.exports = new User();
