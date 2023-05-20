import React from 'react';
import './PlaceOrderCoffee.css'; // This is where your CSS will go
import headerImage from './Images/Left.png'; // path to your header image


const OrderCoffee = () => {
    return (
        <div className="order-coffee">
            <img src={headerImage} className="header-image" alt="header" />
            <div className="header">Cappuccino</div>
            <div className="container">
                <label className="label">Sugar</label>
                <div className="button-group">
                    <button className="button black">No Sugar</button>
                    <button className="button white">Normal</button>
                    <button className="button white">Sweet</button>
                </div>
                <label className="label">Milk</label>
                <div className="button-group">
                    <button className="button black">No Milk</button>
                    <button className="button white">Normal</button>
                    <button className="button white">Sweet</button>
                </div>
                <label className="label">About</label>
                <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className="brew-button">Brew</button>
            </div>
        </div>
    );
};

export default OrderCoffee;