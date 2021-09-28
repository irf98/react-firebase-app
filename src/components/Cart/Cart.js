import './Cart.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const LoadCart = () => {
    return new Promise( (resolve, reject) => {
        const Load = [1];
        setTimeout( () => resolve(Load), 2000 );
    });
}

const Cart = () => {
    const { cart, onRemoveItem, onClearCart } = useContext(CartContext);
    const [ shopCart, setShopCart ] = useState([]);

    useEffect( () => {
        const getCart = LoadCart();
        getCart.then( info => { setShopCart(info) } );
    }, [] );
    
    if ( shopCart.length === 0 ) {
        return <h2 className='LoadingMessage'>Loading...</h2>
    }

    if ( cart.length === 0 ) {
        return (
            <>
                <h2 className='EmptyCartMessage'>Your Cart it's currently empty.</h2>
                <Link to={`/`}><button className='BackButton'>Back to the Catalogue</button></Link>
            </>
        ) 
    }
    
    return (
        <>
            <div className='CartHeader'>
                <h5 className='Movie'>Movie</h5>
                <h5 className='Price'>Price</h5>
                <h5 className='Quantity'>Quantity</h5>
                <h5 className='Total'>Total</h5>
            </div>
            <div className='CartContainer'>
                { cart.map( item => (
                    <div className='CartDisplay' key={item.id}>
                        <div className='ItemSelected'>
                            <button className='RemoveButton' onClick={ () => onRemoveItem(item) }>Remove</button>
                            <img className='ItemCartImg' src={`../../${item.pictureUrl}`} title={item.title} alt='Poster'/>
                            <span className='ItemTitle'>{item.title}</span>
                            <span className='ItemPrice'>${item.price}</span>
                            <span className='ItemQuantity'>{item.quantity}</span>
                            <span className='ItemTotal'>${item.quantity * item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='CartOptions'>
                <h4 className='TotalPrice'>Cart total: $$$</h4>
                <button className='EmptyCartButton' onClick={ () => onClearCart() }>Empty cart</button>
                <button className='CheckoutButton'>Proceed to checkout</button>
            </div>
        </>
    );
}

export default Cart;
