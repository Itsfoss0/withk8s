const express = require("express");
const { PORT } = require("./config/secrets.config");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi, you made it");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
