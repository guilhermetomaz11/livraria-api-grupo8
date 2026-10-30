// src/controllers/livroController.js
const livroService = require("../services/livroService");

// GET /livros - Lista todos os livros
async function listar(req, res) {
  try {
    const livros = await livroService.listarLivros(req.query);
    return res.status(200).json(livros);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao buscar livros no banco de dados" });
  }
}

// GET /livros/:id - Busca um livro por id
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const livro = await livroService.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro nao encontrado" });
    }
    return res.status(200).json(livro);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao buscar livro no banco de dados" });
  }
}

// POST /livros - Cadastra um novo livro no banco (Seção 3.3)
async function criar(req, res) {
  try {
    const erroValidacao = livroService.validarLivro(req.body, true);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const livroCriado = await livroService.criarLivro(req.body);
    return res.status(201).json(livroCriado);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao cadastrar livro no banco de dados" });
  }
}

// PUT /livros/:id - Atualização completa do livro no banco (Seção 4.3)
async function atualizar(req, res) {
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
    return res.status(500).json({ erro: "Erro ao atualizar livro no banco de dados" });
  }
}

// PATCH /livros/:id - Atualização parcial do livro no banco (Seção 4.3)
async function atualizarParcial(req, res) {
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
    return res.status(500).json({ erro: "Erro ao atualizar livro no banco de dados" });
  }
}

// DELETE /livros/:id - Apaga um livro do banco (Seção 5.2)
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const removido = await livroService.deletarLivro(id);

    if (!removido) {
      return res.status(404).json({ erro: "Livro nao encontrado" });
    }
    return res.status(204).send();
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao deletar livro no banco de dados" });
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