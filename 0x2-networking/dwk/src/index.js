const express = require("express");
const { PORT } = require("./config/secrets.config");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello from Kubernetes</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
