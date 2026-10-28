// src/controllers/livroController.js
const livroService = require("../services/livroService");

function listar(req, res) {
  const livros = livroService.listarLivros(req.query);
  return res.status(200).json(livros);
}

function buscarPorId(req, res) {
  const id = req.params.id;
  const livro = livroService.buscarLivroPorId(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }
  return res.status(200).json(livro);
}

function criar(req, res) {
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }

  const novoLivro = livroService.criarLivro(req.body);
  return res.status(201).json(novoLivro);
}

function atualizar(req, res) {
  const erro = livroService.validarLivro(req.body, false);
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

function atualizarParcial(req, res) {
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