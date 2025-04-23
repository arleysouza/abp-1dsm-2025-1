const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres", // Altere conforme o seu usuário
  password: "123", // Altere conforme a sua senha
  database: "bdaula", // Nome do banco criado no pgAdmin
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
