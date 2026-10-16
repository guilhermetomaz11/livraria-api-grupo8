// src/controllers/livroController.js
const livroService = require("../services/livroService");

// GET /livros
function listar(req, res) {
  const livros = livroService.listarLivros(req.query);
  return res.status(200).json(livros);
}

// GET /livros/:id
function buscarPorId(req, res) {
  const id = req.params.id; // Alterado de req.params.indice para req.params.id
  const livro = livroService.buscarLivroPorId(id); // Chama buscarLivroPorId no service

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado." });
  }

  return res.status(200).json(livro);
}

// POST /livros
function criar(req, res) {
  const novoLivro = livroService.criarLivro(req.body);
  return res.status(201).json(novoLivro);
}

// PUT /livros/:id
function atualizar(req, res) {
  const id = req.params.id; // Alterado de req.params.indice para req.params.id
  const livroAtualizado = livroService.atualizarCompletoLivro(id, req.body);

  if (!livroAtualizado) {
    return res.status(404).json({ mensagem: "Livro não encontrado para atualização." });
  }

  return res.status(200).json(livroAtualizado);
}

// PATCH /livros/:id
function atualizarParcial(req, res) {
  const id = req.params.id; // Alterado de req.params.indice para req.params.id
  const livroAtualizado = livroService.atualizarParcialLivro(id, req.body);

  if (!livroAtualizado) {
    return res.status(404).json({ mensagem: "Livro não encontrado para atualização." });
  }

  return res.status(200).json(livroAtualizado);
}

// DELETE /livros/:id
function deletar(req, res) {
  const id = req.params.id; // Alterado de req.params.indice para req.params.id
  const apagado = livroService.deletarLivro(id);

  if (!apagado) {
    return res.status(404).json({ mensagem: "Livro não encontrado para remoção." });
  }

  return res.status(204).send();
}

// Exportação das funções atualizadas
module.exports = {
  listar,
  buscarPorId, // Alterado de buscarPorIndice para buscarPorId
  criar,
  atualizar,
  atualizarParcial,
  deletar,
};