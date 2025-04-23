const { Router } = require("express");
const { insert, select, remove, update } = require("../controllers/DegreeController");

const routes = Router();

routes.post("/", insert);
routes.get("/", select);
routes.delete("/:id", remove);
routes.put("/:id", update);

module.exports = routes;