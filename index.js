"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

var WatchJS = require("melanke-watchjs")
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  console.log("Hieronder try");
  console.log(req.body.queryResult.intent.displayName);
   // try {
   //      if (req.body && req.body.queryResult) {
   //          var body = req.body;

   //          if (body.queryResult.fulfillment) {
   //              console.log(body.queryResult.fulfillmentText);
   //          }

   //          if (body.queryResult.action && currentAction.action != body.queryResult.action) {
   //              console.log("Updating action to: " + body.queryResult.action);
   //              currentAction.action = body.queryResult.action;
   //              res.sendStatus(200);
   //          } else {
   //              return res.status(400).json({
   //                  status: {
   //                      code: 400,
   //                      failedAction: body.queryResult.action
   //                  }
   //              });
   //          }
   //      }

   //  } catch (err) {
   //      console.error("Can't process request", err);

   //      return res.status(400).json({
   //          status: {
   //              code: 400,
   //              errorType: err.message
   //          }
   //      });
   //  }




  var city = req.body.queryResult.parameters['geo-city'];
  var name = req.body.queryResult.parameters['name'];
  // var antwoord = "Allright " + name + ", the Cappucino is free today in " + city;

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
      fulfillmentText: "Allright " + name + ". because the weather is " + weatherDescription + " in " + city + " today, i've got a special offer for you. Do you want to know what special offer i have for you?" 
    });
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 
  

 
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

