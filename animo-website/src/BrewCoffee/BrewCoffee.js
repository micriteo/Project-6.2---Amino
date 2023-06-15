// Import necessary dependencies and CSS
import React, {useState} from 'react';
import './BrewCoffee.css'; // This is where your CSS will go
import {useNavigate} from 'react-router-dom';

// Component definition
function BrewCoffe({backgroundImg, info, name}) {
// Using the useNavigate hook to get the navigate function
    const navigate = useNavigate();

 // State hooks for selected sugar and milk options
    const [selectedSugarOption, setSelectedSugarOption] = useState('');
    const [selectedMilkOption, setSelectedMilkOption] = useState('');
// Event handler to navigate back
    const handleBack = () => {
        navigate('/select-order');
    };

// State hook for the order
    const [order, setOrder] = useState({
        coffee: name || 'Regular', sugar: 'No Sugar', milk: 'No Milk',
    });

// Event handlers for changing order options
    const handleCoffeeOption = (option) => {
        setOrder((prevOrder) => ({
            ...prevOrder, coffee: option,
        }));
    };

    const handleSugarOption = (option) => {
        setSelectedSugarOption(option);
        setOrder((prevOrder) => ({
            ...prevOrder, sugar: option,
        }));
    };

    const handleMilkOption = (option) => {
        setSelectedMilkOption(option);
        setOrder((prevOrder) => ({
            ...prevOrder, milk: option,
        }));
    };

// Event handler for submitting the order
    const handleSubmit = () => {
        console.log(order);

// Make a POST request to '/process_order' with the order as the request body        
        fetch ('/process_order', {
            method: 'POST', body: JSON.stringify(order), headers: { 'Content-Type': 'application/json' },
        }).then(async response => {

// Check the response and log the resul            
            if (response.ok) {
                console.log('HTTP-Response: ' + await response.text());
            } else {
                console.log('HTTP-Error: ' + response.status);
            }
        });
    }

return (
<div className='brew_Container'>
    <div className="Place_Order_App">
        <header className="coffee_background" style={{backgroundImage: `url(${backgroundImg})`}}>
            <button className="ellipse" onClick={handleBack}>
                <p className="back">&lt;</p>
            </button>
            <div className="drink_name">
                <p className="drink_type">{name}</p>
            </div>
        </header>
        <div className='main'>
            <div className='order_Detail_Sugar'>
                <h1 className='sugar_Text'>Sugar</h1>
                <div className='sugar_Container'>
                    <button onClick={() => handleSugarOption('No Sugar')} className={`no_Sugar_Button ${selectedSugarOption === 'No Sugar' ? 'clicked' : ''}`}>
                            No sugar
                    </button>
                    <button onClick={() => handleSugarOption('Normal')} className={`normal_Sugar_Button ${selectedSugarOption === 'Normal' ? 'clicked' : ''}`}> 
                    Normal
                    </button>
                    <button onClick={() => handleSugarOption('Sweet')} className={`sweet_Sugar_Button ${selectedSugarOption === 'Sweet' ? 'clicked' : ''}`}>
                    Sweet
                    </button>
                </div>

                <h1 className='milk_Text'>Milk </h1>
                <div className='milk_Container'>
                    <button onClick={() => handleMilkOption('No Milk')} className={`no_Milk_Button  ${selectedMilkOption === 'No Milk' ? 'clicked' : ''}`}> No Milk
                    </button>
                    <button onClick={() => handleMilkOption('Normal')} className={`normal_Milk_Button  ${selectedMilkOption === 'Normal' ? 'clicked' : ''}`}> Normal
                    </button>
                    <button onClick={() => handleMilkOption('MILK!')} className={`milk_Button  ${selectedMilkOption === 'MILK!' ? 'clicked' : ''}`}>MILK! </button>
                </div>

                <div className='about_text'>
                    <h2 className="about"> About </h2>
                    <p className="info">{info}</p>
                </div>
                <button  className="brew_Order" onClick={handleSubmit} >Brew</button>
            </div>
        </div>
    </div>
</div>);
    
}

export default BrewCoffe;