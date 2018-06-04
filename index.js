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
  var city = req.body.queryResult.parameters['geo-city'];
  var name = req.body.queryResult.parameters['name'];
  // var antwoord = "Allright " + name + ", the Cappucino is free today in " + city;

  https.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=86840a75efc34f51aaa130030182905&q=Eindhoven&format=json&num_of_days=5', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
 let response = JSON.parse(data);
 let forecast = response['data']['weather'][0];

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    // console.log(JSON.parse(data).data);
     return res.json({
    fulfillmentText: forecast
  });
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 
  

 
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

