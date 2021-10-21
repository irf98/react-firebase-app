import './Checkout.css';
import { Link, useHistory } from 'react-router-dom';

const Checkout = () => {
    const history = useHistory();
    const details = history.location.state;

    return (
        <div className='CheckoutContainer'>
            <h4>Thank you for your purchase!</h4>
            <h3>Your order ID: {details.id}</h3>
            <Link to={`/`} className='ReturnLink'><button className='ReturnHome'>Back to home</button></Link>
        </div>
    );
}

export default Checkout;
