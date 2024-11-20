const express = require('express');
const bodyParser = require('body-parser');
const session = require ('express-session');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

//Configurações

app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
}));

//Configuração de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Rotas
app.use('/auth',authRoutes);

//Rotas para páginas 
app.get('/', (req,res)=> res.sendFile(path.join(__dirname,'views/login.html')));
app.get('/register',(req,res)=> res.sendFile(path.join(__dirname,'views/register.html')));
app.get('/land', (req,res)=>res.sendFile(path.join(__dirname, 'views/principal.html')));

//Inicializar Servidor

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});