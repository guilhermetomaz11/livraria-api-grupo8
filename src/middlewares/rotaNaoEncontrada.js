function rotaNaoEncontrada(req, res) {
  res.status(404).json({ erro: "Rota nao encontrada" });
}

module.exports = rotaNaoEncontrada;