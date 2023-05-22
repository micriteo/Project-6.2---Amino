import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage.js';
import SelectOrder from './SelectOrder.js';
import VoiceOrder from './VoiceOrder.js';
import BrewCoffe from './BrewCofeePage/BrewCoffe.js';


function App() {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-order" element={<SelectOrder />} />
          <Route path="/brew_coffee" element={<BrewCoffe />} />
          <Route path="/voice_order" element={<VoiceOrder />} />
        </Routes>
      </Router>
    );
}

export default App;
