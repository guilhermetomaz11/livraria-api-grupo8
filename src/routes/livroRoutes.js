// src/routes/livroRoutes.js
const express = require("express");
const livroController = require("../controllers/livroController");
const router = express.Router();

// Rotas da API REST mapeadas por ID (:id)
router.get("/", livroController.listar);
router.get("/:id", livroController.buscarPorId);          // Alterado de /:indice e buscarPorIndice para /:id e buscarPorId
router.post("/", livroController.criar);
router.put("/:id", livroController.atualizar);            // Alterado de /:indice e atualizarCompleto para /:id e atualizar
router.patch("/:id", livroController.atualizarParcial);   // Alterado de /:indice para /:id
router.delete("/:id", livroController.deletar);          // Alterado de /:indice para /:id

module.exports = router;