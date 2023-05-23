import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage/HomePage.js';
import SelectOrder from './SelectOrderPage/SelectOrder.js';
import VoiceOrder from './VoiceOrderPage/VoiceOrder.js';
import BrewCoffee from './BrewCoffee/BrewCoffee.js';




function App() {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-order" element={<SelectOrder />} />

          <Route path="/brew_coffee" element={<BrewCoffee backgroundImg="coffe.png" info="Coffee text"/>} />

          {/* Add espresso page */}
          <Route path="/brew_espresso" element={<BrewCoffee backgroundImg="coffe.png" info="Espresso text"/>} />

           {/* Add coffee milk page */}
           <Route path="/brew_coffee_milk" element={<BrewCoffee backgroundImg="coffe.png" info="Coffee milk text"/>} />
          <Route path="/brew_capucino" element={<BrewCoffee backgroundImg="capucino.png" info="Capuccino text"/>} />

           {/* Add Chocolate Coffee page */}
           <Route path="/brew_chocolate_coffee" element={<BrewCoffee backgroundImg="coffe.png" info="Chocolate Coffee text"/>} />

          {/* Add Chocolate Milk page */}
          <Route path="/brew_chocolate_milk" element={<BrewCoffee backgroundImg="coffe.png" info="Chocolate milk text"/>} />

           {/* Add double espresso page */}
           <Route path="/brew_double_espresso" element={<BrewCoffee backgroundImg="coffe.png" info="Double espresso text"/>} />
          <Route path="/brew_late" element={<BrewCoffee backgroundImg="late_machiato.png" info="Late Machiato text"/>} />

           {/* Add Wiener Melange page */}
          <Route path="/brew_wiener_Melange" element={<BrewCoffee backgroundImg="coffe.png" info="Wiener Melange text"/>} />
          <Route path="/voice_order" element={<VoiceOrder />} />
        </Routes>
      </Router>
    );
}

export default App;
