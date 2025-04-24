const db = require("./db");

async function insert(req, res) {
  try {
    const { name } = req.body;

    if (name ) {
      // Insere os dados na tabela e retorna o registro criado
      const result = await db.query(
        "INSERT INTO professor (name) VALUES ($1) RETURNING *",
        [name]
      );
      res.json(result.rows[0]);
    } else {
      res.status(400).json({ message: "Nome é obrigatório" });
    }
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function select(req, res) {
  try {
    const result = await db.query("SELECT * FROM professor ORDER BY name");
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
        "DELETE FROM professor WHERE idprofessor=$1 RETURNING *",
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
      const { name } = req.body;
      const { id } = req.params;
  
      if (id && name) {
        // Insere os dados na tabela e retorna o registro criado
        const result = await db.query(
          "UPDATE professor SET name=$1 WHERE idprofessor=$2 RETURNING *",
          [name, id]
        );
        res.json(result.rows[0]);
      } else {
        res.status(400).json({ message: "ID e nome são obrigatórios" });
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
