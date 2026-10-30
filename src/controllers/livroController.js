// src/controllers/livroController.js
const livroService = require("../services/livroService");

// GET /livros - Lista todos os livros
async function listar(req, res) {
  const livros = await livroService.listarLivros(req.query);
  return res.status(200).json(livros);
}

// GET /livros/:id - Busca um livro por id (Aula 28)
async function buscarPorId(req, res) {
  const id = req.params.id;
  const livro = await livroService.buscarLivroPorId(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }
  return res.status(200).json(livro);
}

// POST /livros - Seção 3.3: Cadastra um novo livro no banco
async function criar(req, res) {
  const erroValidacao = livroService.validarLivro(req.body, true);
  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  const livroCriado = await livroService.criarLivro(req.body);
  return res.status(201).json(livroCriado);
}

// PUT /livros/:id - Seção 4.3: Atualização completa do livro no banco
async function atualizar(req, res) {
  const id = req.params.id;
  const erroValidacao = livroService.validarLivro(req.body, true);
  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  const livroAtualizado = await livroService.atualizarLivro(id, req.body);
  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }
  return res.status(200).json(livroAtualizado);
}

// PATCH /livros/:id - Seção 4.3: Atualização parcial do livro no banco
async function atualizarParcial(req, res) {
  const id = req.params.id;
  const erroValidacao = livroService.validarLivro(req.body, false);
  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  const livroAtualizado = await livroService.atualizarParcialLivro(id, req.body);
  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }
  return res.status(200).json(livroAtualizado);
}

// DELETE /livros/:id - Seção 5.2: Apaga um livro do banco
async function deletar(req, res) {
  const id = req.params.id;
  const removido = await livroService.deletarLivro(id);

  if (!removido) {
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