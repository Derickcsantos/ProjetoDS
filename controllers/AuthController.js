const { createClient } = require('@supabase/supabase-js');

// Configurações do Supabase
const supabaseUrl = 'https://vxbwunqfjatjxmvxwhka.supabase.co'; // Substitua com seu URL do Supabase
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Ynd1bnFmamF0anhtdnh3aGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MTIwMDAsImV4cCI6MjA1NzQ4ODAwMH0.KZSXVHfx-0ZhyT78H2_AIIvM37D_kIkT9gRs1LOhdXY'; // Substitua com sua chave de API do Supabase

// Cria o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseApiKey);

class AuthController {
    // Método para registrar um novo usuário
    async register(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                console.error('Usuário e senha são obrigatórios.');
                return res.status(400).send('Usuário e senha são obrigatórios.');
            }

            console.log('Verificando se o usuário já existe...');
            const { data: existingUser, error: existingUserError } = await supabase
                .from('usuario')
                .select('*')
                .eq('username', username)
                .single();

            if (existingUserError && existingUserError.code !== 'PGRST116') {
                console.error('Erro ao verificar usuário existente:', existingUserError);
                return res.status(500).send('Erro ao verificar usuário existente.');
            }

            if (existingUser) {
                console.error('Usuário já existe.');
                return res.status(400).send('Usuário já existe.');
            }

            console.log('Registrando novo usuário...');
            const { data: user, error } = await supabase
                .from('usuario')
                .insert([{ username, password }])
                .single();

            if (error) {
                console.error('Erro ao registrar usuário:', error);
                throw error;
            }

            console.log(`Usuário Registrado: ${user.username}`);
            return res.status(201).send(`Usuário Registrado: ${user.username}`);
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    }

    // Método para login do usuário
    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                console.error('Usuário e senha são obrigatórios.');
                return res.status(400).send('Usuário e senha são obrigatórios.');
            }

            const { data: user, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();

            if (error || !user) {
                console.error('Credenciais inválidas.');
                return res.status(401).send('Credenciais inválidas.');
            }

            req.session.userId = user.id;
            res.redirect('/logado'); // Redireciona para a página logado.html
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    }

    // Método para logout do usuário
    logout(req, res) {
        if (!req.session || !req.session.userId) {
            console.error('Usuário não está autenticado.');
            return res.status(400).send('Usuário não está autenticado.');
        }

        req.session.destroy(err => {
            if (err) {
                console.error('Erro ao destruir sessão:', err);
                return res.status(500).send('Erro ao realizar logout.');
            }
            res.send('Logout realizado com sucesso.');
        });
    }
}

module.exports = new AuthController();