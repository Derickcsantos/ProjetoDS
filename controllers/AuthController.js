const User = require('../models/User');

class AuthController{
    async register(req,res){
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).send('Usuário e senha são obrigatórios.');
        }
        const existingUser = User.findUserByUsername(username);
        if(existingUser){
            return res.status(400).send('Usuário já existe.');
        }

        const user = await User.createUser(username, password);
        return res.status(201).send(`Usuário Registrado: ${user.username}`);
    }
    async login(req, res){
        const {username, password} = req.body;
        const user = User.findUserByUsername(username);

        if(!user || !(await User.validatePassword(user,password))){
            return res.status(401).send('Credenciais inválidas.');
        }

        req.session.userId = user.id_usuario;
        res.send('Login bem sucedido!');
    }
    logout(req,res){
        req.session.destroy();
        res.send('Logout realizado com sucesso.');
    }
}
module.exports = new AuthController();