import './Cart.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../../services/firebase/firebase';
import { useAuth } from '../../context/UserContext';
import CartContext from '../../context/CartContext';

const Cart = () => {
    const { cart, onRemoveItem, onClearCart, onCalculateTotal } = useContext(CartContext);
    const { user, currentUser, setInfo } = useAuth();
    const [ total, setTotal ] = useState();
    const [ visible, setVisible ] = useState(false);
    
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

    const cancelOrder = () => {
        setVisible(!visible);
        onClearCart();
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
                <button className='CheckoutButton' onClick={ () => setVisible(!visible) }>Proceed to checkout</button>
            </div>
            { visible &&
                <div className='CartConfirm'>
                    { !currentUser ?
                        <form className='OrderForm'>
                            <h3 className='FormInfo'>Continue your purchase without an account or Sign In.</h3>
                            <input className='BuyerInput' type='text' placeholder='First name' value={user.firstname} required onChange={ setInfo('firstname') }/>
                            <input className='BuyerInput' type='text' placeholder='Last name' value={user.surname} required onChange={ setInfo('surname') }/>
                            <input className='BuyerInput' type='email' placeholder='Email' value={user.email} required onChange={ setInfo('email') }/>
                            <input className='BuyerInput' type='tel' placeholder='Phone' value={user.phone} required onChange={ setInfo('phone') }/>
                            <div className='FormButtons'>
                                <button className='CancelBuy' onClick={ () => cancelOrder() }>Cancel</button>
                                <button className='ConfirmBuy' onClick={ () => confirmOrder() }>Buy Now</button>
                            </div>    
                            <Link to={`/signin`} className='SignOption'>Sign In</Link>
                        </form>
                        :
                        <div className='FormButtons'>
                            <button className='CancelBuy' onClick={ () => cancelOrder() }>Cancel</button>
                            <button className='ConfirmBuy' onClick={ () => confirmOrder() }>Buy Now</button>
                        </div> 
                    }
                </div>
            }
        </>
    );
}

export default Cart;
