// src/routes/index.js
const express = require("express");
const router = express.Router();
const livroRoutes = require("./livroRoutes");
const categoriaRoutes = require("./categoriaRoutes");

// Vinculação das rotas principais da aplicação
router.use("/livros", livroRoutes);
router.use("/categorias", categoriaRoutes);

module.exports = router;