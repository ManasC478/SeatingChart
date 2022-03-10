const express = require("express");
const cors = require("cors");

const algorithmRouter = require("./routes/algorithm.js");

const app = express();

const corsOption = {
  origin: [
    process.env.APP_URL,
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(corsOption));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("", algorithmRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT} ...`));
