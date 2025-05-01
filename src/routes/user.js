const { Router } = require("express");
const { insert, login } = require("../controllers/UserController");

const routes = Router();

routes.post("/register", insert);
routes.post("/login", login);

module.exports = routes;