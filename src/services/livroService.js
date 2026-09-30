// src/services/livroService.js
const { Livro } = require("../models/Livro");

// Banco de dados simulado (com dados iniciais atualizados)
const livros = [
  new Livro("Clean Code", "Robert C. Martin", 89.9, 12, "Programação"),
  new Livro("Eloquent JavaScript", "Marjin Haverbeke", 45.0, 20, "Programação"),
];

// Agora recebe os filtros por parâmetro ou retorna todos caso venha vazio
function listarLivros(filtros = {}) {
  let resultado = livros;

  // Filtro por autor (ignora maiúsculas/minúsculas)
  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())
    );
  }

  // Filtro por preço máximo (converte a string para número)
  if (filtros.precoMax) {
    resultado = resultado.filter((livro) => 
      livro.preco <= Number(filtros.precoMax)
    );
  }

  // Retorna os livros (filtrados ou todos) convertidos para JSON para não expor os campos privados (#) diretamente
  return resultado.map(l => typeof l.toJSON === 'function' ? l.toJSON() : l);
}

function buscarLivroPorIndice(indice) {
  const livro = livros[indice];
  if (!livro) return null;
  return typeof livro.toJSON === 'function' ? livro.toJSON() : livro;
}

function criarLivro(dados) {
  const novoLivro = new Livro(
    dados.titulo,
    dados.autor,
    dados.preco,
    dados.estoque,
    dados.categoria
  );
  livros.push(novoLivro);
  return typeof novoLivro.toJSON === 'function' ? novoLivro.toJSON() : novoLivro;
}

// Método PUT (Atualização completa)
function atualizarCompletoLivro(indice, dados) {
  if (!livros[indice]) return null;

  // Substitui todos os campos usando os setters do modelo
  livros[indice].titulo = dados.titulo;
  livros[indice].autor = dados.autor;
  livros[indice].preco = dados.preco;
  livros[indice].estoque = dados.estoque;
  if (dados.categoria) livros[indice].categoria = dados.categoria;

  return livros[indice].toJSON();
}

// Método PATCH (Atualização parcial com validação !== undefined)
function atualizarParcialLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  // Critério de correção do checklist: garante alteração apenas dos campos enviados
  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  if (dados.categoria !== undefined) livro.categoria = dados.categoria;

  return livro.toJSON();
}

// Método DELETE (Remover livro)
function deletarLivro(indice) {
  if (!livros[indice]) return false;
  
  // Remove o elemento do array baseado no índice de forma correta
  livros.splice(indice, 1);
  return true;
}

// Exportando as funções prontas para o controller utilizar
module.exports = { 
  listarLivros, 
  buscarLivroPorIndice, 
  criarLivro,
  atualizarCompletoLivro,
  atualizarParcialLivro,
  deletarLivro
};
