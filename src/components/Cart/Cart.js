import './Cart.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDoc, doc, Timestamp, writeBatch } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase';
import CartContext from '../../context/CartContext';

const Cart = () => {
    const { cart, onRemoveItem, onClearCart, onCalculateTotal } = useContext(CartContext);
    const [ total, setTotal ] = useState();
    const [ user, setUser ] = useState({
        firstname: '', surname: '', email: '', phone: ''
    });

    const setInfo = (x) => {
        return ( {target: {value}} ) => {
            setUser( info => ( {...info, [x]: value} ));
        }
    }
    
    useEffect( () => {
        setTotal(onCalculateTotal)
    }, [onCalculateTotal] );

    const confirmOrder = () => {

        const objOrder = {
            buyer: user,
            items: cart,
            total: total,
            date: Timestamp.fromDate( new Date() )
        }

        console.log(objOrder);

        const batch = writeBatch(db);
        const outOfStock = [];

        objOrder.items.forEach( (item, i) => {
            getDoc( doc( db, 'items', item.id ) ).then( DocumentSnapshot => {
                if ( DocumentSnapshot.data().stock >= objOrder.items[i].quantity ) {
                    batch.update( doc( db, 'items', DocumentSnapshot.id ), {
                        stock: DocumentSnapshot.data().stock - objOrder.items[i].quantity
                    });
                } else {
                    outOfStock.push( {...DocumentSnapshot.data(), id: DocumentSnapshot.id} );
                }
            });
        });

        if ( outOfStock.length === 0 ) {
            addDoc( collection( db, 'orders'), objOrder ).then( () => {
                batch.commit().then( () => {
                    console.log('Order successful');
                });
            }).catch( (error) => {
                console.log(error);
            }).finally( () => {
                onClearCart();
                setTotal(0);
            });
        }
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
                <form className='SubmitOrder'>
                    <input className='BuyerInput' type='text' placeholder='First name' value={user.firstname} onChange={ setInfo('firstname') }/>
                    <input className='BuyerInput' type='text' placeholder='Last name' value={user.surname} onChange={ setInfo('surname') }/>
                    <input className='BuyerInput' type='email' placeholder='Email' value={user.email} onChange={ setInfo('email') }/>
                    <input className='BuyerInput' type='tel' placeholder='Phone' value={user.phone} onChange={ setInfo('phone') }/>
                </form>
                <button className='ConfirmBuy' onClick={ () => confirmOrder() }>Buy Now</button>
            </div>
        </>
    );
}

export default Cart;
