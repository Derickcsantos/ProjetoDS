// Importando a biblioteca pg (PostgreSQL)
const { Pool } = require('pg');

// Configuração da conexão com o banco de dados Supabase
const pool = new Pool({
  host: 'db.supabase.co',       // Substitua com o host fornecido pelo Supabase
  port: 5432,                   // A porta padrão para PostgreSQL
  user: 'seu_usuario',          // Substitua com o usuário fornecido pelo Supabase
  password: 'sua_senha',        // Substitua com a senha fornecida pelo Supabase
  database: 'seu_banco',        // Substitua com o nome do banco de dados fornecido pelo Supabase
  ssl: { rejectUnauthorized: false }  // Necessário para a conexão segura com o Supabase
});

// Exportando o pool de conexões
module.exports = pool;
