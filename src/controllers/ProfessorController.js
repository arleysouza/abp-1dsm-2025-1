const db = require("./db");

async function list(req, res) {
  try {
    const result = await db.query("SELECT * FROM professor ORDER BY name");
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

module.exports = {
  list
};
