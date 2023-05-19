import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Order a coffee or try one of these:</h2>
      <div className="button-container">
        <button className="button">Coffee</button>
        <button className="button">Hot Water</button>
        <button className="button">Hot Chocolate</button>
      </div>
      <div className="dialog-box">
        Do you want to place an order?
      </div>
      <div className="logo" />
    </div>
  );
}

export default App;