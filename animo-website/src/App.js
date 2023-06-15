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
        <Route path="/home_page" element={<HomePage />} />

        <Route path="/brew_coffee" element={<BrewCoffee backgroundImg="Assets/coffee.png" name = "Coffee" info="Coffee text"/>} />

        {/* Add espresso page */}
        <Route path="/brew_espresso" element={<BrewCoffee backgroundImg="Assets/espresso.png" name = "Espresso" info="Espresso text"/>} />

          {/* Add coffee milk page */}
          <Route path="/brew_coffee_milk" element={<BrewCoffee backgroundImg="Assets/milk_coffee.png" name = "Milk Coffee" info="Coffee milk text"/>} />
        <Route path="/brew_capucino" element={<BrewCoffee backgroundImg="Assets/capucino.png" name = "Cappuccino" info="Capuccino text"/>} />

          {/* Add Chocolate Coffee page */}
          <Route path="/brew_chocolate_coffee" element={<BrewCoffee backgroundImg="Assets/chocolate_coffee.png" name = "Chocolate Coffee" info="Chocolate Coffee text"/>} />

        {/* Add Chocolate Milk page */}
        <Route path="/brew_chocolate_milk" element={<BrewCoffee backgroundImg="Assets/chocolate_milk.png" name = "Chocolate Milk" info="Chocolate milk text"/>} />

          {/* Add double espresso page */}
          <Route path="/brew_double_espresso" element={<BrewCoffee backgroundImg="Assets/coffe.png" name = "Double espresso" info="Double espresso text"/>} />
        <Route path="/brew_late" element={<BrewCoffee backgroundImg="Assets/late_machiato.png" name = "Latte Macchiatto" info="Late Machiato text"/>} />

          {/* Add Wiener Melange page */}
        <Route path="/brew_wiener_Melange" element={<BrewCoffee backgroundImg="Assets/wiener.png" name = "Wiener melange" info="Wiener Melange text"/>} />
        <Route path="/voice_order" element={<VoiceOrder />} />
      </Routes>
    </Router>
  );
}
export default App;