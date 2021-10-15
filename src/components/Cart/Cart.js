import './Cart.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../../services/firebase/firebase';
import { useAuth } from '../../context/UserContext';
import CartContext from '../../context/CartContext';

const Cart = () => {
    const { cart, onRemoveItem, onClearCart, onCalculateTotal } = useContext(CartContext);
    const [ total, setTotal ] = useState();
    const { user, setInfo } = useAuth();
    
    console.log(user);

    useEffect( () => {
        setTotal(onCalculateTotal)
    }, [onCalculateTotal] );

    const confirmOrder = (e) => {
        e.preventDefault();

        const objOrder = {
            buyer: user,
            items: cart,
            total: total
        }
        createOrder(objOrder).then( () => {
            console.log('Success');
        }).catch( error => {
            console.log(error);
        }).finally( () => {
            onClearCart();
            setTotal(0);
        });
    }

    if ( cart.length === 0 ) {
        return (
            <>
                <h2 className='EmptyCartMessage'>Your Cart it's currently empty.</h2>
                <Link to={`/`}><button className='BackButton'>Back to the Catalogue</button></Link>
            </>
        );
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
                <h4 className='TotalPrice'>Cart total: ${total}</h4>
                <button className='EmptyCartButton' onClick={ () => onClearCart() }>Empty cart</button>
                <button className='CheckoutButton'>Proceed to checkout</button>
            </div>
            <div className='CartConfirm'>
                { Object.values(user).every( x => x === null || x === '' ) ?
                <form className='SubmitOrder' onSubmit={ confirmOrder }>
                    <input className='BuyerInput' type='text' placeholder='First name' value={user.firstname} onChange={ setInfo('firstname') }/>
                    <input className='BuyerInput' type='text' placeholder='Last name' value={user.surname} onChange={ setInfo('surname') }/>
                    <input className='BuyerInput' type='email' placeholder='Email' value={user.email} onChange={ setInfo('email') }/>
                    <input className='BuyerInput' type='tel' placeholder='Phone' value={user.phone} onChange={ setInfo('phone') }/>
                    <button className='ConfirmBuy'>Buy Now</button>
                </form>
                : <button className='ConfirmBuy' onClick={ () => confirmOrder() }>Buy Now</button> }
            </div>
        </>
    );
}

export default Cart;
