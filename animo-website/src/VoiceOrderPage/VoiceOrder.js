import React from 'react'
import './VoiceOrder.css'

function VoiceOrder() {
    return (
      <div className="OrderCoffee">
        <h2>Order a coffee or try one of these:</h2>
        <div className="button-container">
          <button className="button">Coffee</button>
          <button className="button">Hot Water</button>
          <button className="button">Hot Chocolate</button>
        </div>
        <div className="dialog-box">
        <a href="/place_order_coffee"><button className="button1">Do you want to place an order?</button></a>
        </div>
        <div className="logo" />
      </div>
    );
  }
  
  export default VoiceOrder;
