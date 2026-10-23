// src/services/livroService.js
const Livro = require("../models/Livro");

// 1. Lista de livros em memória e contador do ID
const livros = [];
let proximoId = 1;

// 2. Função de validação dos dados do livro
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

// 3. Cadastro dos livros iniciais (gera os IDs 1 e 2 automaticamente)
criarLivro({
  titulo: "Clean Code",
  autor: "Robert C. Martin",
  preco: 89.9,
  estoque: 12,
  categoria: "Programação",
});

criarLivro({
  titulo: "Eloquent JavaScript",
  autor: "Marijn Haverbeke",
  preco: 45.0,
  estoque: 20,
  categoria: "Programação",
});

// Listar livros (com suporte aos filtros por query string)
function listarLivros(filtros = {}) {
  let resultado = livros;

  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())
    );
  }

  if (filtros.titulo) {
    resultado = resultado.filter((livro) =>
      livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
    );
  }

  if (filtros.precoMax) {
    resultado = resultado.filter(
      (livro) => livro.preco <= Number(filtros.precoMax)
    );
  }

  if (filtros.precoMin) {
    resultado = resultado.filter(
      (livro) => livro.preco >= Number(filtros.precoMin)
    );
  }

  return resultado.map((l) =>
    typeof l.toJSON === "function" ? l.toJSON() : l
  );
}

// Buscar pelo ID
function buscarLivroPorId(id) {
  const livro = livros.find((l) => l.id === Number(id));
  if (!livro) return null;
  return typeof livro.toJSON === "function" ? livro.toJSON() : livro;
}

// Criar livro atribuindo e incrementando o proximoId
function criarLivro(dados) {
  const novoLivro = new Livro(
    dados.titulo,
    dados.autor,
    dados.preco,
    dados.estoque,
    dados.categoria
  );

  novoLivro.id = proximoId;
  proximoId++;

  livros.push(novoLivro);
  return typeof novoLivro.toJSON === "function"
    ? novoLivro.toJSON()
    : novoLivro;
}

// Método PUT (Atualização completa por ID)
function atualizarLivro(id, dados) {
  const livro = livros.find((l) => l.id === Number(id));
  if (!livro) return null;

  livro.titulo = dados.titulo;
  livro.autor = dados.autor;
  livro.preco = dados.preco;
  livro.estoque = dados.estoque;
  if (dados.categoria !== undefined) livro.categoria = dados.categoria;

  return typeof livro.toJSON === "function" ? livro.toJSON() : livro;
}

// Método PATCH (Atualização parcial por ID)
function atualizarParcialLivro(id, dados) {
  const livro = livros.find((l) => l.id === Number(id));
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  if (dados.categoria !== undefined) livro.categoria = dados.categoria;

  return typeof livro.toJSON === "function" ? livro.toJSON() : livro;
}

// Método DELETE (Remover livro por ID via findIndex)
function deletarLivro(id) {
  const posicao = livros.findIndex((l) => l.id === Number(id));
  if (posicao === -1) return false;

  livros.splice(posicao, 1);
  return true;
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