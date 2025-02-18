const PORT = process.env.PORT
const express = require("express");
const logger = require("morgan");


const app = express();

let request = -1;

app.use(logger("dev"));
app.get("/pingpong", (req, res) => {
  const now = new Date().toISOString();
  request += 1;
  res.json({ message: `pong ${request}`, time: now });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
