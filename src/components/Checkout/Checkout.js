import './Checkout.css';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Checkout = () => {
    const [ loading, setLoading ] = useState(true);
    const history = useHistory();
    const objOrder = history.location.state;

    return (
        <div className='CheckoutContainer'>
            {loading}
            <h3>Your order resume.</h3>
            <div className='OrderDisplay'>
                <h3 className='CheckItem'>Order by:</h3>
                <h3 className='CheckItem'>Email:</h3>
                <h3 className='CheckItem'>Date:</h3>
                <h3 className='CheckItem'>Order ID:</h3>
                <h3 className='CheckItem'>Products:</h3>
            </div>
        </div>
    );
}

export default Checkout;
