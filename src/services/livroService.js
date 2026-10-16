// src/services/livroService.js
const Livro = require("../models/Livro");

// 1. Lista de livros em memória e contador do ID
const livros = [];
let proximoId = 1;

// 2. Cadastro dos livros iniciais (gera os IDs 1 e 2 automaticamente)
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

// 3. Buscar pelo ID
function buscarLivroPorId(id) {
  const livro = livros.find((l) => l.id === Number(id));
  if (!livro) return null;
  return typeof livro.toJSON === "function" ? livro.toJSON() : livro;
}

// 4. Criar livro atribuindo e incrementando o proximoId
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

// 5. Método PUT (Atualização completa por ID)
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

// 6. Método PATCH (Atualização parcial por ID)
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

// 7. Método DELETE (Remover livro por ID via findIndex)
function deletarLivro(id) {
  const posicao = livros.findIndex((l) => l.id === Number(id));
  if (posicao === -1) return false;

  livros.splice(posicao, 1);
  return true;
}

module.exports = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro,
};