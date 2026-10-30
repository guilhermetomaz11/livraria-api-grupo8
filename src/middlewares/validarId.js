// src/middlewares/validarId.js
function validarId(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ erro: "O id deve ser um numero positivo" });
  }
  next();
}

module.exports = validarId;