import './ItemCounter.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { IoStar } from "react-icons/io5";
import CartContext from '../../context/CartContext';

const ItemCounter = ( {item} ) => {
    const { cart, onAddItem, onAddWish } = useContext(CartContext);
    const { currentUser } = useAuth();
    const stockInCart = cart.find( result => result.id === item.id );
    const stockAvailable = item.stock - ( stockInCart?.quantity || 0 );
    const [ count, setCount ] = useState( stockAvailable > 0 ? 1 : 0 );
    
    return (
        <>
            { stockAvailable ? 
                <div className='ItemCounter'>
                    <div className='CounterButtons'>
                        <button className='Counter' onClick={ () => count > 1 ? setCount (count - 1) : setCount (count) }>-</button>
                        <h4>{ count }</h4>
                        <button className='Counter' onClick={ () => count < stockAvailable ? setCount (count + 1) : setCount (count) }>+</button>
                    </div>
                    { !currentUser ? 
                        <Link to={`/cart`}><button className='AddCart' title='Add to cart' onClick={ () => onAddItem(item, count) }>Add to cart</button></Link>
                    :
                        <>
                            <button className='AddWish' title='Add to wishlist' onClick={ () => onAddWish(item, count) }><IoStar /></button>
                            <Link to={`/cart`}><button className='AddCart' title='Add to cart' onClick={ () => onAddItem(item, count) }>Add to cart</button></Link>
                        </>
                    }
                </div>
                :
                <h3>Out of stock.</h3>
            }
        </>
    );
}

export default ItemCounter;
