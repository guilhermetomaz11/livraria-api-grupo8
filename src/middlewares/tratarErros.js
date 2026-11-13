// src/middlewares/tratarErros.js
function tratarErros(err, req, res, next) {
  // 1. Mostra o código e a mensagem no terminal
  console.log("ERRO:", err.code, err.message);

  // 2. Banco fora do ar
  if (err.code === "ECONNREFUSED") {
    res.status(503).json({ erro: "Banco de dados indisponivel" });
    return;
  }

  // 3. Dado grande demais para a coluna do banco
  if (
    err.code === "ER_DATA_TOO_LONG" ||
    err.code === "ER_WARN_DATA_OUT_OF_RANGE"
  ) {
    res.status(400).json({ erro: "Algum valor e grande demais para o banco" });
    return;
  }

  // 4. JSON mal escrito enviado pelo cliente
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ erro: "O JSON enviado esta mal escrito" });
    return;
  }

  // 5. Chave estrangeira: tentou vincular livro a uma categoria que não existe
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    res.status(400).json({ erro: "A categoria informada nao existe" });
    return;
  }

  // 6. Chave estrangeira: tentou apagar uma categoria que ainda possui livros
  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    res
      .status(409)
      .json({ erro: "A categoria tem livros e nao pode ser apagada" });
    return;
  }

  // 7. Se não cair em nenhum if acima, mantém o 500 genérico
  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;