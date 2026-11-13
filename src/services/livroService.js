// src/services/livroService.js
const { db } = require("../config/db");

function validarLivro(dados, completo) {
  if (!dados) return "Envie os dados do livro em JSON";

  if (completo && !dados.titulo) return "O titulo e obrigatorio";
  if (completo && !dados.autor) return "O autor e obrigatorio";
  if (completo && dados.preco === undefined) return "O preco e obrigatorio";
  if (completo && dados.estoque === undefined) return "O estoque e obrigatorio";

  if (
    dados.preco !== undefined &&
    (typeof dados.preco !== "number" || dados.preco < 0)
  ) {
    return "O preco deve ser um numero maior ou igual a zero";
  }
  if (
    dados.estoque !== undefined &&
    (typeof dados.estoque !== "number" || dados.estoque < 0)
  ) {
    return "O estoque deve ser um numero maior ou igual a zero";
  }
  if (
    dados.categoria_id !== undefined &&
    typeof dados.categoria_id !== "number"
  ) {
    return "O categoria_id deve ser um numero";
  }

  return null;
}

// 1. GET: Lista todos os livros do banco com o nome da categoria
async function listarLivros(filtros = {}) {
  const [linhas] = await db.query(
    "SELECT livros.*, categorias.nome AS categoria FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id"
  );
  let resultado = linhas;

  if (filtros.autor) {
    resultado = resultado.filter((l) =>
      l.autor.toLowerCase().includes(filtros.autor.toLowerCase())
    );
  }
  if (filtros.titulo) {
    resultado = resultado.filter((l) =>
      l.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
    );
  }
  if (filtros.precoMax) {
    resultado = resultado.filter((l) => l.preco <= Number(filtros.precoMax));
  }
  if (filtros.precoMin) {
    resultado = resultado.filter((l) => l.preco >= Number(filtros.precoMin));
  }

  return resultado;
}

// 2. GET POR ID: Busca um único livro por id com o nome da categoria
async function buscarLivroPorId(id) {
  const [linhas] = await db.query(
    "SELECT livros.*, categorias.nome AS categoria FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id WHERE livros.id = ?",
    [id]
  );
  return linhas[0] || null;
}

// 3. POST: Cadastra um novo livro no MySQL com categoria_id
async function criarLivro(dados) {
  const [resultado] = await db.query(
    "INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES (?, ?, ?, ?, ?)",
    [dados.titulo, dados.autor, dados.preco, dados.estoque, dados.categoria_id]
  );
  return await buscarLivroPorId(resultado.insertId);
}

// 4. PUT: Altera um livro completo no MySQL
async function atualizarLivro(id, dados) {
  const [resultado] = await db.query(
    "UPDATE livros SET titulo = ?, autor = ?, preco = ?, estoque = ?, categoria_id = ? WHERE id = ?",
    [
      dados.titulo,
      dados.autor,
      dados.preco,
      dados.estoque,
      dados.categoria_id,
      id,
    ]
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarLivroPorId(id);
}

// 5. PATCH: Atualização parcial
async function atualizarParcialLivro(id, dados) {
  const livro = await buscarLivroPorId(id);
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  if (dados.categoria_id !== undefined) livro.categoria_id = dados.categoria_id;

  return await atualizarLivro(id, livro);
}

// 6. DELETE: Apaga um livro do MySQL
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