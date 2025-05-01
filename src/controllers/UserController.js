const db = require("./db");

async function insert(req, res) {
  try {
    const { name, mail, password } = req.body;

    if (name && mail && password) {
      // Insere os dados na tabela e retorna o registro criado
      const result = await db.query(
        "INSERT INTO users (name, mail, password) VALUES ($1, $2, $3) RETURNING iduser, name, mail",
        [name, mail, password]
      );
      res.json(result.rows[0]);
    } else {
      res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function login(req, res) {
    try {
      const { mail, password } = req.body;
  
      if (mail && password) {
        // Insere os dados na tabela e retorna o registro criado
        const result = await db.query(
          "SELECT iduser,name,mail FROM users WHERE mail=$1 AND password=$2",
          [mail, password]
        );
        if( result.rows.length == 1 ){
            res.json(result.rows[0]);
        } else {
            res.status(400).json({ message: "Dados de login não conferem" });
        }
      } else {
        res.status(400).json({ message: "E-mail e senha são obrigatórios" });
      }
    } catch (e) {
        console.log(e.message )
      res.status(500).json({ message: "Erro ao processar a requisição" });
    }
  }

  module.exports = {
    insert,
    login
  };