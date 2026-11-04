function tratarErros(err, req, res, next) {
  // 1. Mostra o código e a mensagem no terminal (Seção 2)
  console.log("ERRO:", err.code, err.message);

  // 2. Banco fora do ar (Seção 4)
  if (err.code === "ECONNREFUSED") {
    res.status(503).json({ erro: "Banco de dados indisponivel" });
    return;
  }

  // 3. Dado grande demais para a coluna do banco (Seção 4)
  if (err.code === "ER_DATA_TOO_LONG" || err.code === "ER_WARN_DATA_OUT_OF_RANGE") {
    res.status(400).json({ erro: "Algum valor e grande demais para o banco" });
    return;
  }

  // 4. JSON mal escrito enviado pelo cliente (Seção 7)
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ erro: "O JSON enviado esta mal escrito" });
    return;
  }

  // 5. Se não cair em nenhum if acima, mantém o 500 genérico (Seção 4)
  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;