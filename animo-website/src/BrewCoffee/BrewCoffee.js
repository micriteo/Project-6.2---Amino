import React, {useState} from 'react';
import './BrewCoffee.css'; // This is where your CSS will go
import {useNavigate} from 'react-router-dom';


function BrewCoffe({backgroundImg, info, name}) {
    const navigate = useNavigate();

    const [selectedSugarOption, setSelectedSugarOption] = useState('');
    const [selectedMilkOption, setSelectedMilkOption] = useState('');

    const handleBack = () => {
        navigate('/select-order');
    };

    const [order, setOrder] = useState({
        coffee: name || 'Regular', sugar: 'No Sugar', milk: 'No Milk',
    });

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

    const handleSubmit = () => {
        console.log(order);
        fetch ('/process_order', {
            method: 'POST', body: JSON.stringify(order), headers: { 'Content-Type': 'application/json' },
        }).then(async response => {
            if (response.ok) {
                console.log('HTTP-Response: ' + await response.text());
            } else {
                console.log('HTTP-Error: ' + response.status);
            }
        });
    }



    return (<div className='brew_Container'>
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