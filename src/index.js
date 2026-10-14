const express = require("express");
const routes = require("./routes");
const logger = require("./middlewares/logger");

const app = express();
const PORTA = 3000;

// ⚠️ OBRIGATÓRIO: Permite ao Express ler o corpo das requisições em formato JSON (req.body)
app.use(express.json());

app.use(logger);
app.use(routes);

app.get("/", (req, res) => {
  res.send("API da Livraria no ar!");
});

app.get("/sobre", (req, res) => {
  res.send("Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1");
});

app.listen(PORTA, () => {
  console.log("Servidor rodando em http://localhost:" + PORTA);
});