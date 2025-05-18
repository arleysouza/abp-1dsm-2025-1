const db = require("./db");

/*
Para retornar os dados no formato JSON, com os objetos degree e professor aninhados
dentro de cada course. Foi necessário construir os objetos explicitamente no SQL usando json_build_object.
*/
async function list(req, res) {
  try {
    const result = await db.query(`
        SELECT 
          a.idcourse,
          a.name,
          a.semester,
          json_build_object(
            'iddegree', c.iddegree,
            'name', c.name,
            'acronym', c.acronym,
            'period', c.period
          ) as degree,
          json_build_object(
            'idprofessor', b.idprofessor,
            'name', b.name
          ) as professor
        FROM course AS a
        LEFT JOIN professor AS b ON a.idprofessor = b.idprofessor
        LEFT JOIN degree AS c ON a.iddegree = c.iddegree
        ORDER BY a.semester,a.name
      `);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function listByDegree(req, res) {
  const iddegree = req.params.iddegree;
  try {
    const result = await db.query(`
        SELECT 
          a.iddegree,
          a.idcourse,
          a.name,
          a.semester,
          json_build_object(
            'idprofessor', b.idprofessor,
            'name', b.name
          ) as professor
        FROM course AS a
        LEFT JOIN professor AS b ON a.idprofessor = b.idprofessor
        WHERE a.iddegree=$1
        ORDER BY a.semester,a.name
      `,[iddegree]);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

module.exports = {
  list,
  listByDegree
};
