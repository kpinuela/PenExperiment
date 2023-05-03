const express = require("express"); //import express module to run a server
const bodyParser = require('body-parser'); //used to parse through post request body
require('dotenv').config(); // used to get secret information on .env
const { createClient } = require('@supabase/supabase-js'); //imports supabase libraries to get and receive data
//random num gen to test out updating items
const min = 1;
const max = 100;
const randomInt = Math.floor(Math.random() * (max - min + 1) + min);

//allows CORS which allows for websites to send request to webpage
const cors = require('cors');
const app = express(); // starts webserver 
const port = process.env.PORT || 8080; //sets port
const sbURL = process.env.supabaseUrl; //sets URL for database 
const sbkey= process.env.supabaseKey; //gets the key in order to access supabase database
var survey_ids = new Set();
var dates = [];

const supabase = createClient(sbURL, sbkey);
// functions to send data to supabase/ receive items to supabase
async function insertGameInfo(identity) {
  dates.push(Date());
  //console.log(dates);
  var jsonifiy = JSON.stringify(dates);
  //console.log(jsonifiy);
  const { data, error } = await supabase.from('surveyInfo2').insert([{ id: identity , count: 0, click_at: jsonifiy}]);
  if (error) {
    console.error(error);
  } else {
    //console.log('Game info inserted successfully');
  }
}
//prints out database item
async function iterateGameInfo() {
  const { data, error } = await supabase.from('surveyInfo2').select('*');
  if (error) {
    console.error(error);
  } else {
    console.log('Game info retrieved successfully');
    data.forEach(row => {
      console.log(row);
    });
  }
}
async function updateIDItems(identity) {
  //console.log(randomInt);
  const { data, error} = await supabase.from('surveyInfo2').update({count: randomInt}).eq('id','77765');
  if (error) {
    console.error(error);
  } else {
    //console.log("Survey Id info has been updated");
  }
}

app.use(express.json());
app.use(cors());
app.get(["/", "/:name"], (req, res) => {
  greeting = "<h1>Hello From Qualtrics Survey ID getter AP!</h1>";
  name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});
app.post('/surveyids', (req, res) => {
  const number = req.body.number;
  
  var num = parseInt(number);
  //console.log('Received number:', number);
  if(survey_ids.has(num) == false){
  insertGameInfo(num);
  survey_ids.add(num);
  } else {
    survey_ids.add(num);
  }
  //updateIDItems();
  //iterateGameInfo();
  res.send('Number received');
});

app.listen(port, () => console.log(`Qualtrics Survey ID getter app is now listening on port ${port}!`))