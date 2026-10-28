const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  decimalNumbers: true,
});

async function testarConexao() {
  try {
    await db.query("SELECT 1");
    console.log("Conectado ao MySQL!");
  } catch (erro) {
    console.log("ERRO ao conectar no MySQL:", erro.message);
  }
}

module.exports = { db, testarConexao };