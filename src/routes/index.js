const { Router } = require("express");
const course = require("./course");
const degree = require("./degree");
const professor = require("./professor");
const room = require("./room");
const roomHasCourse = require("./roomHasCourse");

const routes = Router();

routes.use("/course", course);
routes.use("/degree", degree);
routes.use("/professor", professor);
routes.use("/room", room);
routes.use("/roomHasCourse", roomHasCourse);

routes.use(function (req, res) {
  res.status(404).json({ message: "Recurso inexistente" });
});

module.exports = routes;
