import React from 'react';
import './HomePage.css';
import backgroundImage from './Assets/background.jpg';
import logo from './Assets/Logo.png';

function HomePage() {
    return (
        <div className="home-container">
            <header className="App-header">
                <img className="background-image" src={backgroundImage} alt="Background"/>
                <div className="logo-title-container">
                    <h1 className="title">Welcome to your Animo</h1>
                    <img className="logo" src={logo} alt="Logo"/>
                </div>
                <div className="button-container">
                    <button className="voice-button">Order via voice</button>
                    <button className="select-button">Order via selecting</button>
                </div>
            </header>
        </div>
    );
}

export default HomePage;
