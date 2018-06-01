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

// restService.post("/echo", function(req, res) {
//   var city = req.body.queryResult.parameters['geo-city'];
//   var name = req.body.queryResult.parameters['name'];
//   var antwoord = "Allright " + name + ", the Cappucino is free today in " + city; 
  

//   return res.json({
//     fulfillmentText: antwoord
//   });
// });

restService.post("/echo", function(req, res) {
  if(request.body.result.parameters['top-rated']) {
        var req = unirest("GET", "http://www.omdbapi.com/?i=tt3896198&apikey=e65e58b8");
            req.query({
                "page": "1"
            });
            req.send("{}");
            req.end(function(res) {
              if(res.error) {
                    res.json({
                      fulfillmentText: "Error, try again"
                    });
                } else if(res.body.results.length > 0) {
                    let result = res.body.results;
                    let output = '';
                    for(let i = 0; i<result.length;i++) {
                        output += result[i].title;
                        output+="\n"
                    }
                    res.json({
                      fulfillmentText: output
                    });
                }
            });
    }
  
  

//   return res.json({
//     fulfillmentText: antwoord
//   });
// });




// server.post('/getMovies',function (request,response)  {
//     if(request.body.result.parameters['top-rated']) {
//         var req = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");
//             req.query({
//                 "page": "1",
//                 "language": "en-US",
//                 "api_key": ""
//             });
//             req.send("{}");
//             req.end(function(res) {
//                 if(res.error) {
//                     response.setHeader('Content-Type', 'application/json');
//                     response.send(JSON.stringify({
//                         "speech" : "Error. Can you try it again ? ",
//                         "displayText" : "Error. Can you try it again ? "
//                     }));
//                 } else if(res.body.results.length > 0) {
//                     let result = res.body.results;
//                     let output = '';
//                     for(let i = 0; i<result.length;i++) {
//                         output += result[i].title;
//                         output+="\n"
//                     }
//                     response.setHeader('Content-Type', 'application/json');
//                     response.send(JSON.stringify({
//                         "speech" : output,
//                         "displayText" : output
//                     })); 
//                 }
//             });
//     }
// }





restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

