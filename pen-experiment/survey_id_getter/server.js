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
  //dates.push(Date());
  
  //console.log(dates);
  var jsonifiy = JSON.stringify(dates);
  //console.log(jsonifiy);
  const { data, error } = await supabase.from('Game_Info').insert([{ id: identity , game_data: null}]);
  if (error) {
    console.error(error);
  } else {
    //console.log('Game info inserted successfully');
  }
}
async function insertGameInfo2(identity) {
  //dates.push(Date());
  
  //console.log(dates);
  var jsonifiy = JSON.stringify(dates);
  //console.log(jsonifiy);
  const { data, error } = await supabase.from('Game_Info').insert([{ id: identity , game_data: null}]);
  if (error) {
    console.error(error);
  } else {
    //console.log('Game info inserted successfully');
  }
}
//prints out database item
async function iterateGameInfo() {
  const { data, error } = await supabase.from('Game_Data').select('*');
  if (error) {
    console.error(error);
  } else {
    console.log('Game info retrieved successfully');
    data.forEach(row => {
      console.log(row);
    });
  }
}
async function updateIDItems(player_info) {
  //console.log(randomInt);
  var stats = [];
  //var place = Number(player.survey_id);
  //stats.push(player);
  var jsonifiy = JSON.stringify(stats);
  const { data, error} = await supabase.from('Game_Info').update({game_data: jsonifiy}).eq('id',player_info);
  if (error) {
    console.error(error);
  } else {
    //console.log("Survey Id info has been updated");
  }
}

async function updateSettings(){
  var currentUpdate = Date();
  console.log(currentUpdate);
  var sets = ["true", "false", "true"];
  var jsonifiy = JSON.stringify(sets);
  const {data, error} = await supabase.from('Game_settings').insert([{Time_set: currentUpdate.toString(), settings: jsonifiy}]);
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
  
  //var num = parseInt(number);
  //console.log('Received number:', number);
  if(survey_ids.has(number) == false){
    insertGameInfo(number);
    survey_ids.add(number);
  } else {
    survey_ids.add(number);
  }
  //updateSettings();
  //updateIDItems();
  //iterateGameInfo();
  res.send('Number received');
});

app.listen(port, () => console.log(`Qualtrics Survey ID getter app is now listening on port ${port}!`))