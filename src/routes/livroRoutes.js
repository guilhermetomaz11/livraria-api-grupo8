// src/routes/livroRoutes.js
const express = require("express");
const router = express.Router();
const livroController = require("../controllers/livroController");
const validarId = require("../middlewares/validarId");

// Rotas sem ID
router.get("/", livroController.listar);
router.post("/", livroController.criar);

// Rotas com parâmetro ID (passam pelo middleware validarId)
router.get("/:id", validarId, livroController.buscarPorId);
router.put("/:id", validarId, livroController.atualizar);
router.patch("/:id", validarId, livroController.atualizarParcial);
router.delete("/:id", validarId, livroController.deletar);

module.exports = router;