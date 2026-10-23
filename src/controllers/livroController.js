// src/controllers/livroController.js
const livroService = require("../services/livroService");

// GET /livros
function listar(req, res) {

  const livros = livroService.listarLivros(req.query);
  return res.status(200).json(livros);
}

// GET /livros/:id
function buscarPorId(req, res) {
  const id = req.params.id;
  const livro = livroService.buscarLivroPorId(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }

  return res.status(200).json(livro);
}

// POST /livros
function criar(req, res) {
  // Validação completa (todos os campos são obrigatórios)
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const novoLivro = livroService.criarLivro(req.body);
  return res.status(201).json(novoLivro);
}

// PUT /livros/:id
function atualizar(req, res) {
  // Validação completa (todos os campos são obrigatórios no PUT)
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const id = req.params.id;
  const livroAtualizado = livroService.atualizarLivro(id, req.body);

  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }

  return res.status(200).json(livroAtualizado);
}

// PATCH /livros/:id
function atualizarParcial(req, res) {
  // Validação parcial (somente confere o que foi enviado no PATCH)
  const erro = livroService.validarLivro(req.body, false);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const id = req.params.id;
  const livroAtualizado = livroService.atualizarParcialLivro(id, req.body);

  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }

  return res.status(200).json(livroAtualizado);
}

// DELETE /livros/:id
function deletar(req, res) {
  const id = req.params.id;
  const apagado = livroService.deletarLivro(id);

  if (!apagado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
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