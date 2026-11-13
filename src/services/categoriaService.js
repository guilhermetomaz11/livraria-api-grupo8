// SERVICE: executa a lógica de Categoria.
const { db } = require("../config/db");

async function listarCategorias(filtros = {}) {
  const [linhas] = await db.query("SELECT * FROM categorias");
  let resultado = linhas;

  if (filtros && filtros.nome) {
    resultado = resultado.filter((categoria) =>
      categoria.nome.toLowerCase().includes(filtros.nome.toLowerCase())
    );
  }

  return resultado;
}

async function buscarCategoriaPorId(id) {
  const [linhas] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);
  return linhas[0];
}

function validarCategoria(dados, completo) {
  if (!dados) return "Envie os dados da categoria em JSON";
  if (completo && !dados.nome) return "O nome e obrigatorio";
  if (
    dados.nome !== undefined &&
    (typeof dados.nome !== "string" || dados.nome.length < 3)
  ) {
    return "O nome deve ter pelo menos 3 letras";
  }
  return null;
}

async function criarCategoria(dados) {
  const [resultado] = await db.query(
    "INSERT INTO categorias (nome, descricao) VALUES (?, ?)",
    [dados.nome, dados.descricao]
  );
  return await buscarCategoriaPorId(resultado.insertId);
}

async function atualizarCategoria(id, dados) {
  const [resultado] = await db.query(
    "UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?",
    [dados.nome, dados.descricao, id]
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarCategoriaPorId(id);
}

async function atualizarParcialCategoria(id, dados) {
  const categoria = await buscarCategoriaPorId(id);
  if (!categoria) return null;

  if (dados.nome !== undefined) categoria.nome = dados.nome;
  if (dados.descricao !== undefined) categoria.descricao = dados.descricao;

  return await atualizarCategoria(id, categoria);
}

async function deletarCategoria(id) {
  const [resultado] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  validarCategoria,
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialCategoria,
  deletarCategoria,
};