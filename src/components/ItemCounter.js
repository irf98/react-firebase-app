import './ItemCounter.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCounter = ( {stock} ) => {
    const Available = stock;
    const [ count, setCount ] = useState(0);

    return (
        <div className='ItemCounter'>
            <div className='CounterButtons'>
                <button className='Counter' onClick={ () => count > 0 ? setCount (count - 1) : setCount (count) }>-</button>
                <h4>{ count }</h4>
                <button className='Counter' onClick={ () => count < Available ? setCount (count + 1) : setCount (count) }>+</button>
            </div>
            <Link to={`/cart`}>
                <button className='AddCart'>Add to cart</button>
            </Link>
        </div>
    );
}

export default ItemCounter;
