const { Router } = require("express");
const { list, listByDegree } = require("../controllers/CourseController");

const routes = Router();

routes.get("/", list);
routes.get("/:iddegree", listByDegree);

routes.use(function (req, res) {
  res.status(404).json({ message: "Recurso inexistente" });
});

module.exports = routes;
