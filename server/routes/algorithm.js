const express = require("express");

const { assignTableSeats } = require("../Controllers/tableSeatingAlg.js");
// const { assignRandomSeats } = require("../Controllers/randomSeating.js");

const router = express.Router();

router.get("/algorithm", assignTableSeats);
// router.get("/algorithm", assignRandomSeats);

module.exports = router;
