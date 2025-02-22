const PORT = process.env.PORT || 3000;
const express = require("express");
const logger = require("morgan");
const { writeFile } = require("fs/promises");

const app = express();

const savePingPongs = async (fileName, data) => {
  try {
    await writeFile(fileName, data);
  } catch (err) {
    console.error(`Could not save ping/pongs ${err.message}`);
  }
};

let request = -1;

app.use(logger("dev"));
app.get("/pingpong", (req, res) => {
  const now = new Date().toISOString();
  request += 1;
  res.json({ message: `pong ${request}`, time: now });
  return savePingPongs("/var/log/pingpong.log", `Ping / Pongs: ${request}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
