import React from 'react';
import {Settings} from "./pages/settings";
import {Login} from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './style.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
