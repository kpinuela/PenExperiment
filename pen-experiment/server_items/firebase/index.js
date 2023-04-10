import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import {getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
import { getDatabase, ref, set, onValue} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAzBF_JfXehi1fBlacAM6DmAhVV1vRbl4s",
    authDomain: "pen-project-cs490.firebaseapp.com",
    projectId: "pen-project-cs490",
    storageBucket: "pen-project-cs490.appspot.com",
    messagingSenderId: "811429852206",
    appId: "1:811429852206:web:075d91ccdb5bc239a31bbf",
    measurementId: "G-QXYG4HQWTM",
    databaseURL: "https://pen-project-cs490-default-rtdb.firebaseio.com/"
});
// to run this do serve firebase
//if serve is not recognized do npm isntall serve
//If there is a policy issue, in your terminal enter command:
// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
console.log("hello");
const auth = getAuth(firebaseApp);


//Check to see if firebase is running/ working
onAuthStateChanged(auth, user =>{
    if(user != null){
        console.log("Logged in");
    }else{
        console.log("No User");
    }
});

function writeSurveyData(userId){
    const database = getDatabase(firebaseApp);
    set(ref(database, 'Participants/' + userId), {
        participantID: userId
    });
}
/*
receive data to write to db way #1
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/data', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(xhr.responseText); // response data
  } else {
    console.log('Request failed.  Returned status of ' + xhr.status);
  }
};

xhr.send();
*/

/*
Way #2 to receive data

fetch('http://localhost:3000/data')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));
*/

