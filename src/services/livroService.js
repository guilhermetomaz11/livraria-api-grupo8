// src/services/livroService.js
const { db } = require("../config/db"); // Importa a conexão com o MySQL
const Livro = require("../models/Livro");

function validarLivro(dados, completo) {
  if (!dados) return "Envie os dados do livro em JSON";

  if (completo && !dados.titulo) return "O titulo e obrigatorio";
  if (completo && !dados.autor) return "O autor e obrigatorio";
  if (completo && dados.preco === undefined) return "O preco e obrigatorio";
  if (completo && dados.estoque === undefined) return "O estoque e obrigatorio";

  if (dados.preco !== undefined && (typeof dados.preco !== "number" || dados.preco < 0)) {
    return "O preco deve ser um numero maior ou igual a zero";
  }
  if (dados.estoque !== undefined && (typeof dados.estoque !== "number" || dados.estoque < 0)) {
    return "O estoque deve ser um numero maior ou igual a zero";
  }

  return null;
}

// Busca todos os livros no MySQL e aplica os filtros necessários
async function listarLivros(filtros = {}) {
  const [linhas] = await db.query("SELECT * FROM livros");
  let resultado = linhas;

  if (filtros.autor) {
    resultado = resultado.filter((l) => l.autor.toLowerCase().includes(filtros.autor.toLowerCase()));
  }
  if (filtros.titulo) {
    resultado = resultado.filter((l) => l.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()));
  }
  if (filtros.precoMax) {
    resultado = resultado.filter((l) => l.preco <= Number(filtros.precoMax));
  }
  if (filtros.precoMin) {
    resultado = resultado.filter((l) => l.preco >= Number(filtros.precoMin));
  }

  return resultado;
}

// Busca um único livro direto do banco de dados (Aula 28)
async function buscarLivroPorId(id) {
  const [linhas] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);
  return linhas[0];
}

function criarLivro(dados) {
  // Lógica de inserção (mantida temporariamente até as próximas aulas)
  return null;
}

function atualizarLivro(id, dados) {
  // Ajustado temporariamente para não causar erro de referência (ReferenceError)
  return null;
}

function atualizarParcialLivro(id, dados) {
  // Ajustado temporariamente para não causar erro de referência (ReferenceError)
  return null;
}

function deletarLivro(id) {
  return false;
}

module.exports = {
  validarLivro,
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro,
};
a