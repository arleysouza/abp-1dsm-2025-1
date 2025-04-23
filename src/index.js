// Importa os módulos necessários
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const degree = require("./routes/degree");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Instancia a aplicação Express
const app = express();

// Define a porta que será usada pelo servidor
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Inicia o servidor e escuta na porta definida
app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use("/degree", degree);

app.use(function(req, res){
  res.status(404).json({message:"Recurso inexistente"})
});