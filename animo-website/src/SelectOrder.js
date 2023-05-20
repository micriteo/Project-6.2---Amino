import './SelectOrder.css';
import animo_logo from './Assets/Select_Order_Assets/animo_logo.jpg';
import coffe_vector from './Assets/Select_Order_Assets/capucino_vector.svg';
import tea_vector from './Assets/Select_Order_Assets/tea_vector.svg';
import hot_water_vector from './Assets/Select_Order_Assets/hot_water_vector.svg';
import background from './Assets/Select_Order_Assets/background_animo.jpeg';


function SelectOrder() 
{ 
  //Define what should happen when the div is clicked
  const handleButtonClick = () =>
  {
    alert("Button clicked!");
  }

  return (
    <div className="App">
      <header className="Select_Order_Header">
        <h1>Welcome to your Animo!</h1>
        <img src= {animo_logo} alt="Animo" className="logo-img" />
      </header>

      <main>
        <p className = "header_campaign">The new way of ordering in safety! </p>
        <div className="rounded-rectangle-wrapper"> 
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={coffe_vector} alt="Capuccino" className="capuccino-img" />
            <p className = "capucino-text">Capucino </p>
          </div>
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={tea_vector} className="capuccino-img" />
            <p className = "capucino-text">Tea </p>
          </div>
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={hot_water_vector} alt="How water" className="capuccino-img" />
            <p className = "capucino-text">Hot water </p>
          </div>
        </div>
        <div className="coffee-selection">
          <div className="coffee-image"></div> { /* background added via CSS */}
          <p className = "coffe-text">Capucino</p>
          <p className = "coffe-price"> Free</p>
          <div className="ellipse" onClick={handleButtonClick}>
            <p className="plus">+</p> {/* New "+" text inside the ellipse */}
          </div>
        </div>
      <div className="coffee-selection">
        <div className="hot_chocolate-image"></div> {/* The background image will be added via CSS */}
        <p className = "coffe-text">Capucino</p>
        <p className = "coffe-price"> Free</p>
        <div className="ellipse" onClick={handleButtonClick}>
          <p className="plus">+</p> {/* New "+" text inside the ellipse */}
        </div>
      </div>
      <div className="coffee-selection">
        <div className="capucino-image"></div> {/* The background image will be added via CSS */}
        <p className = "coffe-text">Capucino</p>
        <p className = "coffe-price"> Free</p>
        <div className="ellipse" onClick={handleButtonClick}>
          <p className="plus">+</p> {/* New "+" text inside the ellipse */}
        </div>
      </div>
    </main> 
  </div>
  );
}

export default SelectOrder;