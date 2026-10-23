// src/controllers/categoriaController.js
const categoriaService = require("../services/categoriaService");

function listar(req, res) {
  const categorias = categoriaService.listarCategorias(req.query);
  return res.status(200).json(categorias);
}

function buscarPorId(req, res) {
  const id = req.params.id;
  const categoria = categoriaService.buscarCategoriaPorId(id);

  if (!categoria) {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  return res.status(200).json(categoria);
}

function criar(req, res) {
  // Validação completa (nome é obrigatório)
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const novaCategoria = categoriaService.criarCategoria(req.body);
  return res.status(201).json(novaCategoria);
}

function atualizar(req, res) {
  // Validação completa no PUT (nome é obrigatório)
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const id = req.params.id;
  const categoriaAtualizada = categoriaService.atualizarCategoria(id, req.body);

  if (!categoriaAtualizada) {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  return res.status(200).json(categoriaAtualizada);
}

function atualizarParcial(req, res) {
  // Validação parcial no PATCH (somente valida se o nome for enviado)
  const erro = categoriaService.validarCategoria(req.body, false);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const id = req.params.id;
  const categoriaAtualizada = categoriaService.atualizarParcialCategoria(id, req.body);

  if (!categoriaAtualizada) {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  return res.status(200).json(categoriaAtualizada);
}

function deletar(req, res) {
  const id = req.params.id;
  const apagado = categoriaService.deletarCategoria(id);

  if (!apagado) {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  return res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar,
};