// src/controllers/livroController.js
const livroService = require("../services/livroService");

function listar(req, res) {
  const livros = livroService.listarLivros();
  res.json(livros);
}

function buscarPorIndice(req, res) {
  const indice = req.params.indice;
  const livro = livroService.buscarLivroPorIndice(Number(indice)); // Convertido para número

  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }

  res.json(livro);
}

function criar(req, res) {
  // Tratamento de erro sugerido na Parte 3 (caso esqueçam o Content-Type)
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(500).json({ erro: "Falha ao criar livro. Verifique o Content-Type: application/json nos headers." });
  }

  const novoLivro = livroService.criarLivro(req.body);
  res.status(201).json(novoLivro); // 201 Created exigido na tabela de testes
}

// ADICIONADO: Função PUT para Atualização Completa
function atualizarCompleto(req, res) {
  const indice = Number(req.params.indice);
  const livroAtualizado = livroService.atualizarCompletoLivro(indice, req.body);

  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }

  res.status(200).json(livroAtualizado); // 200 OK conforme tabela de testes
}

// ADICIONADO: Função PATCH para Atualização Parcial
function atualizarParcial(req, res) {
  const indice = Number(req.params.indice);
  const livroAtualizado = livroService.atualizarParcialLivro(indice, req.body);

  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }

  res.status(200).json(livroAtualizado); // 200 OK conforme tabela de testes
}

// ADICIONADO: Função DELETE para remover o livro do array
function deletar(req, res) {
  const indice = Number(req.params.indice);
  const sucesso = livroService.deletarLivro(indice);

  if (!sucesso) {
    return res.status(404).json({ erro: "Livro nao encontrado" });
  }

  // Correção explícita do checklist do PDF: 204 No Content sem corpo de resposta
  res.status(204).send(); 
}

// Exportando as funções antigas e as novas para as rotas utilizarem
module.exports = { 
  listar, 
  buscarPorIndice, 
  criar,
  atualizarCompleto,
  atualizarParcial,
  deletar
};