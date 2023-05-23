import React from 'react';
import './BrewLate.css'; // This is where your CSS will go


function BrewLate() 
{ 
  //Define what should happen when the div is clicked
  
  return (
    <div className='brew_Container'>
        <div className = "Place_Order_App">
            <header className = "coffee_background" >
                <button className="ellipse">
                    <p className="back">&lt;</p> 
                </button> 
                <div className="drink_name">
                    <p className="drink_type">Late Machiato</p> 
                </div>
            </header>
            <div className='main'>
                <div className='order_Detail_Sugar'>
                        <h1 className='sugar_Text'>Sugar</h1>
                        <div className='sugar_Container'>
                            <button className="no_Sugar_Button">No sugar</button>
                            <button className="normal_Sugar_Button">Normal</button>
                            <button className="sweet_Sugar_Button">Sweet</button>
                        </div>

                        <h1 className='milk_Text'>Milk </h1>
                        <div className='milk_Container'>
                            <button className="no_Milk_Button">No Milk</button>
                            <button className="normal_Milk_Button">Normal</button>
                            <button className="milk_Button">MILK!</button>
                        </div>

                    <div className='about_text'> 
                        <h2 className ="about"> About </h2>
                            <p className ="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Id ipsum vivamus velit lorem amet. Tincidunt cras volutpat aliquam porttitor molestie. 
                            Netus neque, habitasse id vulputate proin cras. Neque, vel duis sit vel pellentesque tempor.
                            A commodo arcu tortor arcu, elit.</p>  
                    </div>
                    <button className="brew_Order">Brew</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BrewLate;