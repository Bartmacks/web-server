const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 2000;

// Define paths for  Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Andrew Mead",
    message: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "There must be an Address provided.",
    });
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
      if (error) {
        return res.send(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast: forecastData.w_desc,
          location,
          address: req.query.address,
          w_desc: forecastData.w_desc,
          w_temp: forecastData.w_temp,
          w_feels: forecastData.w_feels,
          imgSrc: forecastData.imgSrc,
        });
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  req.query;
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Page",
    name: "Andrew Mead",
    message: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    message: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
