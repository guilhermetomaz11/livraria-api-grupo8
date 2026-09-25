// src/routes/livroRoutes.js
const express = require("express");
const livroController = require("../controllers/livroController");
const router = express.Router();

// Rotas já existentes (GET e POST)
router.get("/", livroController.listar);
router.get("/:indice", livroController.buscarPorIndice);    
router.post("/", livroController.criar);

// ADICIONADO: Rotas para a Atividade 12 (PUT, PATCH e DELETE)
router.put("/:indice", livroController.atualizarCompleto);
router.patch("/:indice", livroController.atualizarParcial);
router.delete("/:indice", livroController.deletar);

module.exports = router;
