const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events_controller");

router.route("/");

module.exports = router;