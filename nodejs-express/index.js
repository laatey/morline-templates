const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGINS?.split(",") ?? "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ service: "nodejs-express-template", status: "running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
