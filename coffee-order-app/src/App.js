import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderCoffee from './OrderCoffee';
import PlaceOrderCoffee from './PlaceOrderCoffee';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/order_coffee" component={OrderCoffee} />
                <Route path="/place_order_coffee" component={PlaceOrderCoffee} />
                {/* Other routes go here */}
            </Switch>
        </Router>
    );
};

export default App;