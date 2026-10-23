function tratarErros(err, req, res, next) {
  console.log("ERRO:", err.message);
  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;