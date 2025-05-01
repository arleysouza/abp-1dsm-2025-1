// Importa os módulos necessários
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const degree = require("./routes/degree");
const professor = require("./routes/professor");
const user = require("./routes/user");

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
app.use("/professor", professor);
app.use("/user", user);

// Rotas para arquivos estáticos
app.get("/login", function(req,res){
  res.sendFile(path.join(__dirname,"..","public","login.html"));
});

app.get("/register", function(req,res){
  res.sendFile(path.join(__dirname,"..","public","register.html"));
});

app.get("/horarios", function(req,res){
  res.sendFile(path.join(__dirname,"..","public","horarios.html"));
});

app.use(function(req, res){
  res.status(404).json({message:"Recurso inexistente"})
});