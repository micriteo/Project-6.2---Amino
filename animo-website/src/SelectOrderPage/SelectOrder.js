import './SelectOrder.css';
import animo_logo from '../Assets/Select_Order_Assets/animo_logo.jpg';
import coffe_vector from '../Assets/Select_Order_Assets/capucino_vector.svg';
import tea_vector from '../Assets/Select_Order_Assets/tea_vector.svg';
import hot_water_vector from '../Assets/Select_Order_Assets/hot_water_vector.svg';
import background from '../Assets/Select_Order_Assets/background_animo.jpeg';
import { useNavigate } from 'react-router-dom';


function SelectOrder() 
{ 

  const navigate = useNavigate();


  const handleBrewCoffee = () => 
  {
      navigate('/brew_coffee');
  };

  const handleBrewEspresso = () => 
  {
      navigate('/brew_espresso');
  };

  const handleBrewCoffeeMilk = () => 
  {
      navigate('/brew_coffee_milk');
  };

  const handleBrewCapucino = () => 
  {
      navigate('/brew_capucino');
  };

  const handleBrewChocoCoffee = () => 
  {
      navigate('/brew_chocolate_coffee');
  };

  const handleBrewChocoMilk = () => 
  {
      navigate('/brew_chocolate_milk');
  };

  const handleBrewDoubleEspresso = () => 
  {
      navigate('/brew_double_espresso');
  };

  const handleBrewLate = () => 
  {
      navigate('/brew_late');
  };

  const handleBrewWiener = () => 
  {
      navigate('/brew_wiener_Melange');
  };

  const handleMainScreen = () => 
  {
      navigate('/');
  };


  return (
    <div className='select-container'>
    <div className="App">
      <header className="Select_Order_Header">
        <h1>Welcome to your Animo!</h1>
        <img src= {animo_logo} alt="Animo" className="logo-img" onClick={handleMainScreen} />
      </header>
      
        <p className = "header_campaign">The new way of ordering in safety! </p>
        <div className = 'main2'>
          <div className='coffe_selection_container'>
          
          <div className="coffee-item">
            <div className="item-image"  style={{backgroundImage: `url(Assets/coffee.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Coffee</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewCoffee}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
          </div>

          <div className="espresso-item">
            <div className="item-image" style={{backgroundImage: `url(Assets/espresso.png)`}}></div> { /* background added via CSS */}
             <p className = "item-text">Espresso</p>
              <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewEspresso}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
          </div>

          <div className="milk_coffee-item">
          <div className="item-image" style={{backgroundImage: `url(Assets/milk_coffee.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Milk Coffee</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewCoffeeMilk}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
          </div>

          <div className="capucino-item">
          <div className="item-image"  style={{backgroundImage: `url(Assets/capucino.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Capucino</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewCapucino}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
         </div>

         <div className="chocolate_milk-item">
         <div className="item-image" style={{backgroundImage: `url(Assets/chocolate_milk.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Chocolate Milk</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewChocoMilk}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
          </div>

          <div className="chocolate_coffee-item">
          <div className="item-image" style={{backgroundImage: `url(Assets/chocolate_coffee.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Chocolate coffee</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewChocoCoffee}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
         </div>

         <div className="double_espresso-item">
         <div className="item-image"  style={{backgroundImage: `url(Assets/coffee.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Double espresso</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewCoffee}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
         </div>

         <div className="late_machiato-item">
         <div className="item-image"  style={{backgroundImage: `url(Assets/late_machiato.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Late machiato</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewLate}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
         </div>

         <div className="wiener_melange-item">
         <div className="item-image" style={{backgroundImage: `url(Assets/wiener.png)`}}></div> { /* background added via CSS */}
            <p className = "item-text">Wiener melange</p>
            <p className = "item-price"> Free</p>
            <button className="ellipse2" onClick={handleBrewWiener}>
              <p className="plus">+</p> {/* New "+" text inside the ellipse */}
            </button>
         </div>

      </div>
    </div> 
  </div>
  </div>
  );
}

export default SelectOrder;