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

  https.get('http://www.omdbapi.com/?i=tt3896198&apikey=e65e58b8', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).Title);
    return res.json({
    fulfillmentText: JSON.parse(data).Title
  });
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 
  
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

