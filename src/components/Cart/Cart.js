import './Cart.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createOrder } from '../../services/firebase/firebase';
import { useAuth } from '../../context/UserContext';
import CartContext from '../../context/CartContext';

const Cart = () => {
    const { cart, onRemoveItem, onClearCart, onCalculateTotal } = useContext(CartContext);
    const { user, userData, setInfo } = useAuth();
    const [ total, setTotal ] = useState();
    const [ visible, setVisible ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const history = useHistory();

    useEffect( () => {
        setTotal( onCalculateTotal );
    }, [ onCalculateTotal ] );    
    
    useEffect( () => {
        setValid( 
            userData.displayName.trim() !== '' &&
            userData.email.trim() !== '' && 
            userData.phoneNumber.trim() !== ''
        );
    }, [ userData ] );

    const confirmOrder = (e) => {
        e.preventDefault();

        if ( user !== null ) {
            userData.displayName = user.displayName
            userData.email = user.email
        }

        const objOrder = {
            buyer: userData,
            items: cart,
            total: total
        }

        createOrder(objOrder).then( (objOrder) => {
            setLoading(true);
            onClearCart();
            history.push( '/checkout', objOrder );
        }).catch( error => {
            console.log(error);
        });
    }

    const cancelOrder = () => {
        setVisible( !visible );
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
                <h4 className='TotalPrice'>Cart total: ${ total }</h4>
                <button className='EmptyCartButton' onClick={ () => onClearCart() }>Empty cart</button>
                <button className='CheckoutButton' onClick={ () => setVisible(!visible) }>Proceed to checkout</button>
            </div>
            { visible &&
                <div className='CartConfirm'>
                    { !user ?
                        <form className='OrderForm' onSubmit={ confirmOrder }>
                            <h3 className='FormInfo'>Continue your purchase without an account or Sign In.</h3>
                            <input className='BuyerInput' type='text' placeholder='Full name' value={ userData.displayName } onChange={ setInfo('displayName') } required/>
                            <input className='BuyerInput' type='email' placeholder='Email' value={ userData.email } onChange={ setInfo('email') } required/>
                            <input className='BuyerInput' type='tel' placeholder='Phone' value={ userData.phoneNumber } onChange={ setInfo('phoneNumber') } required/>
                            <div className='FormButtons'>
                                <button className='CancelBuy' type='button' onClick={ () => cancelOrder() }>Cancel</button>
                               <button className='ConfirmBuy' disabled={ !loading && !valid }>Buy Now</button>
                            </div>    
                            <Link to={`/signin`} className='SignOption'>Sign In</Link>
                        </form>
                        :
                        <form className='FormButtons' onSubmit={ confirmOrder }>
                            <button className='CancelBuy' type='button' onClick={ () => cancelOrder() }>Cancel</button>
                            <button className='ConfirmBuy'>Buy Now</button>
                        </form>
                    }
                </div>
            }
        </>
    );
}

export default Cart;
