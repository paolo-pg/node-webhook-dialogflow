"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var city = req.body.queryResult.parameters['userCity'];
  var name = req.body.queryResult.parameters['userName'];
  var antwoord = "Allright " + name + ", the Cappucino is free today in " + city; 
  

  return res.json({
    fulfillmentText: antwoord
  });
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

