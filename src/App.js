import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import SinglePlayer from './pages/Singleplayer'; 
import MultiPlayer from './pages/Multiplayer'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleplayer" element={<SinglePlayer/>} />
        <Route path="/multiplayer" element={<MultiPlayer/>} />
      </Routes>
    </Router>
  );
}

export default App;
