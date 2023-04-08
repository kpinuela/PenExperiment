import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import {getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAzBF_JfXehi1fBlacAM6DmAhVV1vRbl4s",
    authDomain: "pen-project-cs490.firebaseapp.com",
    projectId: "pen-project-cs490",
    storageBucket: "pen-project-cs490.appspot.com",
    messagingSenderId: "811429852206",
    appId: "1:811429852206:web:075d91ccdb5bc239a31bbf",
    measurementId: "G-QXYG4HQWTM"
});
console.log("hello");
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, user =>{
    if(user != null){
        console.log("Logged in");
    }else{
        console.log("No User");
    }
});