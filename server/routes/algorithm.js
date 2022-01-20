const express = require("express");

const { assignSeats } = require("../Controllers/tableSeatingAlg.js");

const router = express.Router();

router.get("/algorithm", assignSeats);

module.exports = router;
