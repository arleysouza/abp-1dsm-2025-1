const db = require("./db");

async function insert(req, res) {
  try {
    const { name, period } = req.body;

    if (name && period) {
      // Insere os dados na tabela e retorna o registro criado
      const result = await db.query(
        "INSERT INTO degree (name, period) VALUES ($1, $2) RETURNING *",
        [name, period]
      );
      res.json(result.rows[0]);
    } else {
      res.status(400).json({ message: "Nome e período são obrigatórios" });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function select(req, res) {
  try {
    const result = await db.query("SELECT * FROM degree ORDER BY name");
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    if (id) {
      // Insere os dados na tabela e retorna o registro criado
      const result = await db.query(
        "DELETE FROM degree WHERE iddegree=$1 RETURNING *",
        [id]
      );
      res.json(result.rows[0]);
    } else {
      res.status(400).json({ message: "O ID é necessário" });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function update(req, res) {
    try {
      const { name, period } = req.body;
      const { id } = req.params;
  
      if (id && name && period) {
        // Insere os dados na tabela e retorna o registro criado
        const result = await db.query(
          "UPDATE degree SET name=$1, period=$2 WHERE iddegree=$3 RETURNING *",
          [name, period, id]
        );
        res.json(result.rows[0]);
      } else {
        res.status(400).json({ message: "ID, nome e período são obrigatórios" });
      }
    } catch (e) {
      res.status(500).json({ message: "Erro ao processar a requisição" });
    }
  }

module.exports = {
  insert,
  select,
  remove,
  update
};
