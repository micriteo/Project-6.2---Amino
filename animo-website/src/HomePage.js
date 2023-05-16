import React from 'react';
import './HomePage.css';
import backgroundImage from './Assets/background.jpg';
import logo from './Assets/Logo.png';

function HomePage() {
    return (
        <div className="home-container">
            <img className="background-image" src={backgroundImage} alt="Background" />
            <h1 className="title">Welcome to your Animo</h1>
            <img className="logo" src={logo} alt="Logo" />
            <div className="button-container">
                <button className="voice-button">Order via Voice</button>
                <button className="select-button">Order via Selecting</button>
            </div>
        </div>
    );
}

export default HomePage;
