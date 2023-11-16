require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());

app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;