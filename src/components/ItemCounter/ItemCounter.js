import './ItemCounter.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const ItemCounter = ( {item} ) => {
    const { cart, onAddItem } = useContext(CartContext);
    const stockInCart = cart.find( result => result.id === item.id );
    const stockAvailable = item.stock - ( stockInCart?.quantity || 0 );
    const [ count, setCount ] = useState( stockAvailable > 0 ? 1 : 0 );
    
    return (
        <div className='ItemCounter'>
            <div className='CounterButtons'>
                <button className='Counter' onClick={ () => count > 1 ? setCount (count - 1) : setCount (count) }>-</button>
                <h4>{ count }</h4>
                <button className='Counter' onClick={ () => count < stockAvailable ? setCount (count + 1) : setCount (count) }>+</button>
            </div>
            <Link to={`/cart`}><button className='AddCart' onClick={ () => onAddItem(item, count) }>Add to cart</button></Link>
        </div>
    );
}

export default ItemCounter;
