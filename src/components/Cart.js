import './Cart.css';
import { useState, useEffect } from 'react';

const LoadCart = () => {
    return new Promise( (resolve, reject) => {
        const Load = [1];
        setTimeout( () => resolve(Load), 2000 );
    });
}

const Cart = () => {
    const [ shopCart, setShopCart] = useState([]);

    useEffect( () => {
        const getCart = LoadCart();
        getCart.then( info => { setShopCart(info) } );
    }, [] );
    
    if ( shopCart.length === 0 ) {
        return <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2>
    }

    return (
        <h2 style={ {color: 'rgb(214, 207, 207)'} }>Your Cart it's currently empty.</h2>
    );
}

export default Cart;
