// src/controllers/livroController.js
const livroService = require("../services/livroService");

// GET /livros - Lista todos os livros
async function listar(req, res, next) {
  try {
    const livros = await livroService.listarLivros(req.query);
    return res.status(200).json(livros);
  } catch (erro) {
    next(erro);
  }
}

// GET /livros/:id - Busca um livro por id
async function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const livro = await livroService.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro nao encontrado" });
    }
    return res.status(200).json(livro);
  } catch (erro) {
    next(erro);
  }
}

// POST /livros - Cadastra um novo livro no banco
async function criar(req, res, next) {
  try {
    const erroValidacao = livroService.validarLivro(req.body, true);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const livroCriado = await livroService.criarLivro(req.body);
    return res.status(201).json(livroCriado);
  } catch (erro) {
    next(erro);
  }
}

// PUT /livros/:id - Atualização completa do livro no banco
async function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const erroValidacao = livroService.validarLivro(req.body, true);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const livroAtualizado = await livroService.atualizarLivro(id, req.body);
    if (!livroAtualizado) {
      return res.status(404).json({ erro: "Livro nao encontrado" });
    }
    return res.status(200).json(livroAtualizado);
  } catch (erro) {
    next(erro);
  }
}

// PATCH /livros/:id - Atualização parcial do livro no banco
async function atualizarParcial(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const erroValidacao = livroService.validarLivro(req.body, false);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const livroAtualizado = await livroService.atualizarParcialLivro(id, req.body);
    if (!livroAtualizado) {
      return res.status(404).json({ erro: "Livro nao encontrado" });
    }
    return res.status(200).json(livroAtualizado);
  } catch (erro) {
    next(erro);
  }
}

// DELETE /livros/:id - Apaga um livro do banco
async function deletar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const removido = await livroService.deletarLivro(id);

    if (!removido) {
      return res.status(404).json({ erro: "Livro nao encontrado" });
    }
    return res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar,
};