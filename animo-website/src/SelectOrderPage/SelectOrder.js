import './SelectOrder.css';
import animo_logo from '../Assets/Select_Order_Assets/animo_logo.jpg';
import coffe_vector from '../Assets/Select_Order_Assets/capucino_vector.svg';
import tea_vector from '../Assets/Select_Order_Assets/tea_vector.svg';
import hot_water_vector from '../Assets/Select_Order_Assets/hot_water_vector.svg';
import background from '../Assets/Select_Order_Assets/background_animo.jpeg';
import { useNavigate } from 'react-router-dom';


function SelectOrder() 
{ 
  //Define what should happen when the div is clicked
  const handleButtonClick = () =>
  {
    alert("Button clicked!");
  }

  const navigate = useNavigate();


  const handleBrewCapucino = () => 
    {
        navigate('/brew_capucino');
    };

  const handleBrewCoffee = () => 
  {
      navigate('/brew_coffee');
  };

  const handleBrewLate = () => 
  {
      navigate('/brew_late');
  };

  return (
    <div className='select-container'>
    <div className="App">
      <header className="Select_Order_Header">
        <h1>Welcome to your Animo!</h1>
        <img src= {animo_logo} alt="Animo" className="logo-img" />
      </header>
      
        <p className = "header_campaign">The new way of ordering in safety! </p>
        <div className = 'main2'>
        <div className="rounded-rectangle-wrapper"> 
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={coffe_vector} alt="Capuccino" className="capuccino-img" />
            <p className = "capucino-text">Capucino </p>
          </div>
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={tea_vector} className="capuccino-img" />
            <p className = "capucino-text">Hot chocolate </p>
          </div>
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={hot_water_vector} alt="How water" className="capuccino-img" />
            <p className = "capucino-text">Hot water </p>
          </div>
        </div>
        <div className='coffe_selection_container'>
          
          <div className="coffee-selection1">
            <div className="coffee-image"></div> { /* background added via CSS */}
            <p className = "coffe-text">Coffee</p>
            <p className = "coffe-price"> Free</p>
            <div className="ellipse2" onClick={handleBrewCoffee}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </div>
          </div>
          <div className="coffee-selection2">
          <div className="hot_chocolate-image"></div> {/* The background image will be added via CSS */}
          <p className = "coffe-text">Capucino</p>
          <p className = "coffe-price"> Free</p>
          <div className="ellipse2" onClick={handleBrewCapucino }>
            <p className="plus">+</p> {/* New "+" text inside the ellipse */}
          </div>
         </div>
          <div className="coffee-selection3">
          <div className="capucino-image"></div> {/* The background image will be added via CSS */}
          <p className = "coffe-text">Late Machiato</p>
          <p className = "coffe-price"> Free</p>
          <div className="ellipse2" onClick={handleBrewLate}>
            <p className="plus">+</p> {/* New "+" text inside the ellipse */}
          </div>
        </div>
      </div>
    </div> 
  </div>
  </div>
  );
}

export default SelectOrder;