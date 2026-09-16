function logger(req, res, next) {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
