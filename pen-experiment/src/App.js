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
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
   </BrowserRouter> 
  );
}

export default App;
