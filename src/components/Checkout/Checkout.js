import './Checkout.css';
import { Link, useHistory } from 'react-router-dom';

const Checkout = () => {
    const history = useHistory();
    const details = history.location.state;
    const order = Object.keys(details).map( e => details[e] );

    return (
        <div className='CheckoutContainer'>
            <h4>Thank you for your purchase!</h4>
            <h3>Your order ID: {order[4]}</h3>
            <Link to={`/`} className='ReturnLink'><button className='ReturnHome'>Back to home</button></Link>
        </div>
    );
}

export default Checkout;
