/*
const express = require("express");
var myparser = require("body-parser");
const app = express();

app.get("/", (req, res)=>{

    res.send("Qualtrics Id retriving!");
})
app.use(myparser.urlencoded({extended : true}));
app.post("/", function(request, response){
    console.log(request.body);
})

app.listen(8080,()=>{
    console.log("Node Server started on port 8080\n");
})

*/
const http = require('http');
var survey_ids = new Set();
const fs = require('fs');

var content = 'This is the text to be written to the file\n';




const server = http.createServer((req, res) => {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      //console.log(body.length);
      var item = parseInt(body);
      console.log("**********");
      if(body.length != 0){
        console.log(item);
        if(survey_ids.has(item) == false){
          //only adds to file if survey has the specific number
          var temp= item.toString() + "\n";
          fs.access('Qualtrics_IDs.txt', fs.constants.F_OK, (err) => {
          if (err) {
            console.log('File does not exist');
            fs.writeFile('Qualtrics_IDs.txt', temp,function(err){
              if (err) throw err;
              console.log("Content written to created file");
              })
          } else {
            console.log('File exists');
            fs.appendFile("Qualtrics_IDs.txt", temp, function (err) {
              if(err) throw err;
              console.log("Content appended to file");
            })
          }
          });
        }
        survey_ids.add(item);
      }
      
      //can currently add to a file but adds each entry mutliple times
      for (const entry of survey_ids) {
        console.log("Set has this item:");
        console.log(entry);
        
        /*
        fs.appendFile('myfile.txt', entry, err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('File has been written!');
        });
        */
      }
      
      
      
      
      // Process the data here
      //res.writeHead(200, {'Content-Type': 'text/plain'});
      //res.end('Data received');
    });
  });
  
  server.listen(8080, () => {
    console.log('Server started on port 8080');
  });
  