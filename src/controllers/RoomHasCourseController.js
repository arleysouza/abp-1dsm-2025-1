const db = require("./db");

/*
Para retornar os dados no formato JSON, com os objetos degree e professor aninhados
dentro de cada course. Foi necessário construir os objetos explicitamente no SQL usando json_build_object.
*/
async function list(req, res) {
  try {
    const result = await db.query(`
        SELECT 
          a.begin,
          a.finish,
          a.day_of_week,
          json_build_object(
            'number', b.number,
            'level', b.level,
            'description', b.description
          ) AS room,
          json_build_object(
            'idcourse', c.idcourse,
            'name', c.name,
            'semester', c.semester
          ) AS course
        FROM room_has_course AS a
        LEFT JOIN room AS b ON a.room = b.number
        LEFT JOIN course AS c ON a.idcourse = c.idcourse
        ORDER BY a.room, a.day_of_week, a.begin
      `);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

async function listByCourseSemester(req, res) {
  const {iddegree, semester} = req.params;
  try {
    const result = await db.query(`
        SELECT 
          a.begin,
          a.finish,
          a.day_of_week,
          json_build_object(
            'number', c.number,
            'description', c.description
          ) AS room,
          json_build_object(
            'idcourse', b.idcourse,
            'name', b.name
          ) AS course
        FROM room_has_course AS a, course as b, room as c
        WHERE a.idcourse = b.idcourse 
        AND a.room = c.number
        AND b.iddegree = $1 
        AND b.semester = $2
        ORDER BY a.day_of_week, a.begin
      `,[iddegree,semester]);
    res.json(result.rows);
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: "Erro ao processar a requisição" });
  }
}

module.exports = {
  list,
  listByCourseSemester
};
