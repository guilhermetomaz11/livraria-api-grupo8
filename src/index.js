// src/index.js
require("dotenv").config(); // 1. Garante a leitura do arquivo .env

const express = require("express");
const routes = require("./routes");
const logger = require("./middlewares/logger");
const rotaNaoEncontrada = require("./middlewares/rotaNaoEncontrada");
const tratarErros = require("./middlewares/tratarErros");
const { testarConexao } = require("./config/db"); // Importa a função de conexão do MySQL

const app = express();
const PORTA = 3000;

// 1. Middleware para interpretar requisições com corpo em JSON
app.use(express.json());

// 2. Logger e rotas principais da API
app.use(logger);
app.use(routes);

// 3. Rotas auxiliares/base
app.get("/", (req, res) => {
  res.send("API da Livraria no ar!");
});

app.get("/sobre", (req, res) => {
  res.send("Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1");
});

// 4. Middlewares de erro (Obrigatório vir por último, logo antes do app.listen)
app.use(rotaNaoEncontrada);
app.use(tratarErros);

// 5. Inicialização do servidor
app.listen(PORTA, () => {
  console.log("Servidor rodando em http://localhost:" + PORTA);
  testarConexao(); // Testa a conexão com o banco assim que o servidor subir
});