// src/services/livroService.js
const Livro = require("../models/Livro");

const livros = [];
let proximoId = 1;

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

// Cria os livros iniciais: IDs 1 e 2
criarLivro({ titulo: "Clean Code", autor: "Robert C. Martin", preco: 89.9, estoque: 12, categoria: "Programação" });
criarLivro({ titulo: "Eloquent JavaScript", autor: "Marijn Haverbeke", preco: 45.0, estoque: 20, categoria: "Programação" });

function listarLivros(filtros = {}) {
  let resultado = livros;
  if (filtros.autor) resultado = resultado.filter((l) => l.autor.toLowerCase().includes(filtros.autor.toLowerCase()));
  if (filtros.titulo) resultado = resultado.filter((l) => l.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()));
  if (filtros.precoMax) resultado = resultado.filter((l) => l.preco <= Number(filtros.precoMax));
  if (filtros.precoMin) resultado = resultado.filter((l) => l.preco >= Number(filtros.precoMin));
  return resultado.map((l) => l.toJSON());
}

function buscarLivroPorId(id) {
  if (id === undefined || id === null) return null;
  const idNumerico = Number(id);
  const livro = livros.find((l) => l.id === idNumerico);
  return livro ? livro.toJSON() : null;
}

function criarLivro(dados) {
  const novoLivro = new Livro(dados.titulo, dados.autor, dados.preco, dados.estoque, dados.categoria);
  novoLivro.id = proximoId;
  proximoId++;
  livros.push(novoLivro);
  return novoLivro.toJSON();
}

function atualizarLivro(id, dados) {
  const idNumerico = Number(id);
  const livro = livros.find((l) => l.id === idNumerico);
  if (!livro) return null;

  livro.titulo = dados.titulo || livro.titulo;
  livro.autor = dados.autor || livro.autor;
  livro.preco = dados.preco !== undefined ? dados.preco : livro.preco;
  livro.estoque = dados.estoque !== undefined ? dados.estoque : livro.estoque;
  livro.categoria = dados.categoria || livro.categoria;

  return livro.toJSON();
}

function atualizarParcialLivro(id, dados) {
  const idNumerico = Number(id);
  const livro = livros.find((l) => l.id === idNumerico);
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  if (dados.categoria !== undefined) livro.categoria = dados.categoria;

  return livro.toJSON();
}

function deletarLivro(id) {
  const idNumerico = Number(id);
  const posicao = livros.findIndex((l) => l.id === idNumerico);
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
