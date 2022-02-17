const express = require("express");

const { assignTableSeats } = require("../Controllers/tableSeatingAlg.js");
const { assignRandomSeats } = require("../Controllers/randomSeating.js");

const router = express.Router();

router.get("/randomize", assignRandomSeats);
router.get("/optimize", assignTableSeats);

module.exports = router;