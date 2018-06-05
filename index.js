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

  console.log(req.body.queryResult.intent.displayName);
   var totalCity = req.body.queryResult.outputContexts[0].parameters['geo-city'];
   var city = req.body.queryResult.parameters['geo-city'];
   var name = req.body.queryResult.parameters['name'];

   var drinks = ['Americano', 'Espresso', 'Cappuccino', 'Cafe Latte', 'Flat White'];
   var rand = drinks[Math.floor(Math.random() * drinks.length)];

  if (req.body.queryResult.intent.displayName == "user.name.location") {
    https.get('https://api.worldweatheronline.com/premium/v1/weather.ashx?key=86840a75efc34f51aaa130030182905&q=Eindhoven&format=json&date=today', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        var weatherOutput = JSON.parse(data).data.current_condition[0].weatherDesc[0].value
        var weatherDescription  = weatherOutput.toLowerCase();
        return res.json({
          // fulfillmentText: "Allright " + name + ". I would the describe the weather as " + weatherDescription + " in " + city + " today. Would you like to order something?" 
          fulfillmentText: "Allright " + name + ". because the weather is " + weatherDescription + " in " + city + " today, i've got a special offer for you. Do you want to know what the special offer is?" 
        });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    }); 
  }

  if (req.body.queryResult.intent.displayName == "user.name.location - yes") {
    return res.json({
          // fulfillmentText: "Allright " + name + ". I would the describe the weather as " + weatherDescription + " in " + city + " today. Would you like to order something?" 
          fulfillmentText: "Great! The special offer in  " + totalCity + " today is: a free" + rand + " ! Would you like to have one " + name + "?"
        });
  };

});





restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

