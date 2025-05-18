const { Router } = require("express");
const { list, listByCourseSemester } = require("../controllers/RoomHasCourseController");

const routes = Router();

routes.get("/", list);
routes.get("/:iddegree/:semester", listByCourseSemester);

routes.use(function (req, res) {
  res.status(404).json({ message: "Recurso inexistente" });
});

module.exports = routes;
