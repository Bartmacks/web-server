const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1eef50d84c916ae5470ef16db4f68bc1&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.message === "") {
      callback("This place doesnt exist. Please try another one.", undefined);
    } else {
      callback(undefined,{
        location: body.current.location,
        w_desc: body.current.weather_descriptions[0],
        w_temp: body.current.temperature,
        w_feels: body.current.feelslike ,
        imgSrc: body.current.weather_icons,
      });
    }
  });
};

module.exports = forecast;
