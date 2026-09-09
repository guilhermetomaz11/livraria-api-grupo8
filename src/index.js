const express = require("express");
const livroRoutes = require("./routes/livroRoutes");

const app = express();
const PORTA = 3000;

app.use("/livros", livroRoutes);

app.get("/", (req, res) => {
  res.send("API da Livraria no ar!");
});

app.listen(PORTA, () => {
  console.log("Servidor rodando em http://localhost:" + PORTA);
});

app.get("/sobre", (req, res) => {
res.send("Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1");
});