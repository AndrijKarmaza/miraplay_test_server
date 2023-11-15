const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());

app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
