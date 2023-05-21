import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderCoffee from './OrderCoffee';
import PlaceOrderCoffee from './PlaceOrderCoffee';

function App() {
    return (
        <div>
            <PlaceOrderCoffee />
        </div>
    );
}


export default App;