const http = require('http');
const { createClient } = require('@supabase/supabase-js');
var survey_ids = new Set();
const fs = require('fs');

var content = 'This is the text to be written to the file\n';
const supabaseUrl = 'https://xjpvvjxoyqhwdfqjsflk.supabase.co';
//this key beolow should not be shared publically only privavetly, it bypass RLS
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHZ2anhveXFod2RmcWpzZmxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MTQ0ODI1MCwiZXhwIjoxOTk3MDI0MjUwfQ.QEh_IRx17HaP4ET1ZwEzWFKKfEHAea7giF_17LZxIXU';

const supabase = createClient(supabaseUrl, supabaseKey);
async function insertGameInfo(identity) {
  const { data, error } = await supabase.from('gameInfo').insert([{ id: identity }]);
  if (error) {
    console.error(error);
  } else {
    console.log('Game info inserted successfully');
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