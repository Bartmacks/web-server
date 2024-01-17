const path = require("path")
const express = require("express");

const publicDirectoryPath = path.join(__dirname, '../public')
const app = express();

app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It's 0°C outside.",
    location: "Your location is Karlsruhe.",
  });
});

app.listen(2000, () => {
  console.log("Server is up on port 2000");
});
