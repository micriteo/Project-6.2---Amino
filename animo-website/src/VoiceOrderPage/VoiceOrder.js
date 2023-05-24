import React from 'react'
import './VoiceOrder.css'
import { useNavigate } from 'react-router-dom';


function VoiceOrder() {

  const navigate = useNavigate();


    const handleBack = () => 
    {
        navigate('/select-order');
    };

    return (
      <div className="OrderCoffee">
        <h2>Order a coffee or try one of these:</h2>
        <div className="button-container">
          <button className="button">Coffee</button>
          <button className="button">Hot Water</button>
          <button className="button">Hot Chocolate</button>
        </div>
        <div className="dialog-box">
          <button className="button1" onClick={handleBack} >Do you want to place an order?</button>
        </div>
        <div className="logo" />
      </div>
    );
  }
  
  export default VoiceOrder;
