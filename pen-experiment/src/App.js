import React from 'react';
import {Settings} from "./pages/settings";
import {Login} from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Game from "./pages/game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
