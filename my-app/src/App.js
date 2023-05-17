import logo from './logo.svg';
import './App.css';
import animo_logo from './animo_logo.jpg';
import coffe_vector from './capucino_vector.svg';
import tea_vector from './tea_vector.svg';
import hot_water_vector from './hot_water_vector.svg';
import background from './background_animo.jpeg';


function App() 
{ //Define what should happen when the div is clicked
  const handleButtonClick = () =>
  {
    alert("Button clicked!");
  }
  return (
    <div className="App">

      <header className="App-header">
        <h1>Welcome to your Animo!</h1>
        <img src= {animo_logo} alt="Animo" className="logo-img" />
      </header>

      <main>
        <p className = "header_campaign">The new way of ordering in safety! </p>

        <div className="rounded-rectangle-wrapper">  {/* New wrapper div */}
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={coffe_vector} alt="Capuccino" className="capuccino-img" />
            <p className = "capucino-text">Capucino </p>
          </div>
          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={tea_vector} className="capuccino-img" />
            <p className = "capucino-text">Tea </p>
          </div>

          <div className="rounded-rectangle" onClick={handleButtonClick}>
            <img src={hot_water_vector} alt="Capuccino" className="capuccino-img" />
            <p className = "capucino-text">Hot water </p>
          </div>
        </div>

      <div className="coffee-selection">
        <div className="coffee-image">
          {/* The background image will be added via CSS */}
        </div>

        <p className = "coffe-text">Capucino</p>
        <p className = "coffe-price"> Free</p>
        <div className="ellipse" onClick={handleButtonClick}>
          <p className="plus">+</p> {/* New "+" text inside the ellipse */}

        </div>

      </div>

      <div className="coffee-selection">
        <div className="hot_chocolate-image">
          {/* The background image will be added via CSS */}
        </div>

        <p className = "coffe-text">Capucino</p>
        <p className = "coffe-price"> Free</p>
        <div className="ellipse" onClick={handleButtonClick}>
          <p className="plus">+</p> {/* New "+" text inside the ellipse */}

        </div>

      </div>

      <div className="coffee-selection">
        <div className="capucino-image">
          {/* The background image will be added via CSS */}
        </div>

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

export default App;
