const http = require('http');
const { createClient } = require('@supabase/supabase-js');
var survey_ids = new Set();
const fs = require('fs');
const min = 1;
const max = 100;
const randomInt = Math.floor(Math.random() * (max - min + 1) + min);

var content = 'This is the text to be written to the file\n';
const supabaseUrl = 'https://xjpvvjxoyqhwdfqjsflk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHZ2anhveXFod2RmcWpzZmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NDgyNTAsImV4cCI6MTk5NzAyNDI1MH0.Bfuvo_ahI2VGNdcBdDMIC2Cnt0WpfIBRGfrZ03bi98w';

const supabase = createClient(supabaseUrl, supabaseKey);
async function insertGameInfo(identity) {
  const { data, error } = await supabase.from('surveyInfo').insert([{ id: identity , count: 0}]);
  if (error) {
    console.error(error);
  } else {
    console.log('Game info inserted successfully');
  }
}
async function iterateGameInfo() {
  const { data, error } = await supabase.from('surveyInfo').select('*');
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
  const { data, error} = await supabase.from('surveyInfo').update({count: randomInt}).eq('id','18202');
  if (error) {
    console.error(error);
  } else {
    console.log("Survey Id info has been updated");
  }
}



const server = http.createServer( async (req, res) => {
    let body = '';
    if(req.method == 'POST'){
        console.log("A wild psot request appears!")
    }
  
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
          insertGameInfo(item);
          survey_ids.add(item);
          var temp= item.toString() + "\n";
        }
        survey_ids.add(item);
      }
      
      //can currently add to a file but adds each entry mutliple times
      updateIDItems();
      iterateGameInfo();
    });
  });
  
  server.listen(8080, () => {
    console.log('Server started on port 8080');
  });