const express = require("express");
const livroRoutes = require("./livroRoutes");
// const categoriaRoutes = require("./categoriaRoutes");

const router = express.Router();

router.use("/livros", livroRoutes);
// router.use("/categorias", categoriaRoutes);

module.exports = router;