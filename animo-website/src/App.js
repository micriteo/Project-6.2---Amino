import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage/HomePage.js';
import SelectOrder from './SelectOrderPage/SelectOrder.js';
import VoiceOrder from './VoiceOrderPage/VoiceOrder.js';
import BrewCapucino from './BrewCappucino/BrewCapucino.js';
import BrewCoffee from './BrewCoffee/BrewCoffee.js';
import BrewLate from './BrewLate/BrewLate.js';



function App() {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-order" element={<SelectOrder />} />
          <Route path="/brew_capucino" element={<BrewCapucino />} />
          <Route path="/brew_coffee" element={<BrewCoffee />} />
          <Route path="/brew_late" element={<BrewLate />} />
          <Route path="/voice_order" element={<VoiceOrder />} />
        </Routes>
      </Router>
    );
}

export default App;
