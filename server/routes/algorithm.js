const express = require("express");

const { assignTableSeats } = require("../Controllers/tableSeatingAlg.js");
// const { assignRandomSeats } = require("../Controllers/randomSeating.js");

const router = express.Router();

// rename the functions and import them here
router.get("/randomize", assignSeats);
router.get("/optimize", assignSeats);

module.exports = router;