import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage.js';
import SelectOrder from './SelectOrder.js';


function App() {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-order" element={<SelectOrder />} />
        </Routes>
      </Router>
    );
}

export default App;
