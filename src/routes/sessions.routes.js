const { Router } = require("express");

const SessionController = require("../controllers/SessionController");
const sessionController = new SessionController();

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionController.create);

module.exports = sessionsRoutes;