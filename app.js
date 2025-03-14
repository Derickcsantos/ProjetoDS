const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const { createClient } = require('@supabase/supabase-js'); // Importa o cliente Supabase

// Configurações do Supabase
const supabaseUrl = 'https://vxbwunqfjatjxmvxwhka.supabase.co'; // Substitua com seu URL do Supabase
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Ynd1bnFmamF0anhtdnh3aGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MTIwMDAsImV4cCI6MjA1NzQ4ODAwMH0.KZSXVHfx-0ZhyT78H2_AIIvM37D_kIkT9gRs1LOhdXY'; // Substitua com sua chave de API do Supabase

// Cria o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseApiKey);

const app = express();

// Configurações de middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true,
}));

// Configuração de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.use('/auth', authRoutes);

// Rotas para páginas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));
app.get('/land', (req, res) => res.sendFile(path.join(__dirname, 'views/principal.html')));
app.get('/logado', (req, res) => res.sendFile(path.join(__dirname, 'views/logado.html'))); // Nova rota para logado.html

// Inicializar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});