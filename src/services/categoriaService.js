// src/services/categoriaService.js
const Categoria = require("../models/Categoria");

const categorias = [];
let proximoId = 1;

// Função de validação dos dados da categoria
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

// Cadastro inicial de categorias de teste
criarCategoria({
  nome: "Ficção",
  descricao: "Romances, fantasia e ficção científica",
});

criarCategoria({ nome: "Tecnologia", descricao: "Programação e afins" });

// Atualizado para suportar o filtro por nome: GET /categorias?nome=fic
function listarCategorias(filtros = {}) {
  if (filtros && filtros.nome) {
    const termoBusca = filtros.nome.toLowerCase();
    return categorias.filter((categoria) =>
      categoria.nome.toLowerCase().includes(termoBusca)
    );
  }
  return categorias;
}

function buscarCategoriaPorId(id) {
  return categorias.find((categoria) => categoria.id === Number(id));
}

function criarCategoria(dados) {
  const novaCategoria = new Categoria(dados.nome, dados.descricao);
  novaCategoria.id = proximoId;
  proximoId++;
  categorias.push(novaCategoria);
  return novaCategoria;
}

function atualizarCategoria(id, dados) {
  const categoria = buscarCategoriaPorId(id);
  if (!categoria) return null;
  categoria.nome = dados.nome;
  categoria.descricao = dados.descricao;
  return categoria;
}

function atualizarParcialCategoria(id, dados) {
  const categoria = buscarCategoriaPorId(id);
  if (!categoria) return null;
  if (dados.nome !== undefined) categoria.nome = dados.nome;
  if (dados.descricao !== undefined) categoria.descricao = dados.descricao;
  return categoria;
}

function deletarCategoria(id) {
  const posicao = categorias.findIndex(
    (categoria) => categoria.id === Number(id)
  );
  if (posicao === -1) return false;
  categorias.splice(posicao, 1);
  return true;
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