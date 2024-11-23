const User = require('../models/User');

class AuthController {
    async register(req, res) {
        try {
            console.log('Body Recebido', req.body);
            const {username,password} = req.body;
            console.log('Username:', username);
            console.log('Password:', password);

            if (!username || !password) {
                return res.status(400).send('Usuário e senha são obrigatórios.');
            }

            const existingUser = await User.findUserByUsername(username);
            if (existingUser) {
                return res.status(400).send('Usuário já existe.');
            }

            const user = await User.createUser(username, password);

            return res.redirect('/login');

        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
    
            if (!username) {
                return res.status(400).send('Usuário é obrigatório.');
            }
    
            if (!password) {
                return res.status(400).send('Senha é obrigatória.');
            }
    
            const user = await User.findUserByUsername(username);
    
            if (!user || !(await User.validatePassword(password, user.password))) {
                return res.status(401).send('Credenciais inválidas.');
            }
    
            req.session.userId = user.id;
            res.redirect('/logado');
    
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    }
    

    logout(req, res) {
        if (!req.session || !req.session.userId) {
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
