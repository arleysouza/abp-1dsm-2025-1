const { Router } = require("express");
const { list } = require("../controllers/ProfessorController");

const routes = Router();

routes.get("/", list);

routes.use(function (req, res) {
  res.status(404).json({ message: "Recurso inexistente" });
});

module.exports = routes;