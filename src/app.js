const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.get("/help", (req, res) => {
  res.send([
    {
      name: "Andrew",
    },
    { name: "Sarah" },
  ]);
});

app.get("/about", (req, res) => {
  res.send("<title>About</title>");
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
