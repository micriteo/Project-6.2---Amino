import React from 'react';
import './HomePage.css';
import backgroundImage from '../Assets/background.jpg';
import logo from '../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';


// Function component definition
function HomePage() {

// Using the useNavigate hook to get the navigate function
const navigate = useNavigate();

// Event handler for the "Order via selecting" button
const handleSelectOrderButtonClick = () => 
{

// Navigate to the '/select-order' route when this button is clicked
    navigate('/select-order');
};

// Event handler for the "Order via voice" button
const handleVoiceButton = () => 
{
    navigate('/voice_order');
};
return (
    <div className="home-container">
        <header className="App-header">
            <img className="background-image" src={backgroundImage} alt="Background"/>
            <div className="logo-title-container">
                <h1 className="title">Welcome to your Animo</h1>
                <img className="logo" src={logo} alt="Logo"/>
            </div>
            <div className="button-container">
                <button className="voice-button" onClick={handleVoiceButton}>Order via voice</button>
                <button className="select-button" onClick={handleSelectOrderButtonClick} >Order via selecting</button>
            </div>
        </header>
    </div>
);
}
//Exporting the HomePage component as the default export
export default HomePage;
