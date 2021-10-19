import './Checkout.css';
import { useEffect, useState } from 'react';
import { getOrderDetails } from '../../services/firebase/firebase';

const Checkout = () => {
    const [ loading, setLoading ] = useState(true);
    const [ order, setOrder ] = useState([]);

    useEffect( () => {
        setLoading(true);
        getOrderDetails().then( order => {
            setOrder(order);
        }).catch( (error) => {
            console.log(error);
        }).finally( () => {
            setLoading(false);
        });
    }, [] );

    console.log(order);

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
