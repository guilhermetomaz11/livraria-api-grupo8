// src/services/livroService.js
const { db } = require("../config/db"); // Importa a conexão com o MySQL

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

// 1. GET: Lista todos os livros do banco
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

// 2. GET POR ID: Busca um único livro por id
async function buscarLivroPorId(id) {
  const [linhas] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);
  return linhas[0];
}

// 3. POST: Cadastra um novo livro no MySQL (Seção 3.1)
async function criarLivro(dados) {
  const [resultado] = await db.query(
    "INSERT INTO livros (titulo, autor, preco, estoque) VALUES (?, ?, ?, ?)",
    [dados.titulo, dados.autor, dados.preco, dados.estoque]
  );
  return await buscarLivroPorId(resultado.insertId);
}

// 4. PUT: Altera um livro completo no MySQL (Seção 4.1)
async function atualizarLivro(id, dados) {
  const [resultado] = await db.query(
    "UPDATE livros SET titulo = ?, autor = ?, preco = ?, estoque = ? WHERE id = ?",
    [dados.titulo, dados.autor, dados.preco, dados.estoque, id]
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarLivroPorId(id);
}

// 5. PATCH: Atualização parcial (Seção 4.2)
async function atualizarParcialLivro(id, dados) {
  const livro = await buscarLivroPorId(id);
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;

  return await atualizarLivro(id, livro);
}

// 6. DELETE: Apaga um livro do MySQL (Seção 5.1)
async function deletarLivro(id) {
  const [resultado] = await db.query("DELETE FROM livros WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
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