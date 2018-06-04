"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  // var city = req.body.queryResult.parameters['geo-city'];
  // var name = req.body.queryResult.parameters['name'];
  // var antwoord = "Allright " + name + ", the Cappucino is free today in " + city;

  https.get('https://api.worldweatheronline.com/premium/v1/weather.ashx?key=86840a75efc34f51aaa130030182905&q=Eindhoven&format=json&date=today', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    fulfillmentText: JSON.parse(data).data.request[0].query
     return res.json({
    fulfillmentText: JSON.parse(data).data.current_condition[0].temp_C
  });
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 
  

 
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

