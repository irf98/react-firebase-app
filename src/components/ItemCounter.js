import './ItemCounter.css';
import { useState } from 'react';

const ItemCounter = () => {

    const Stock = 7;
    const [count, setCount] = useState(0);

    return (
        <div className='CounterButtons'>
            <h4>Quantity: {count}</h4>
            <button className='Counter' onClick={() => count > 0 ? setCount (count - 1) : setCount (count)}>-</button>
            <button className='Counter' onClick={() => count < Stock ? setCount (count + 1) : setCount (count)}>+</button>
        </div>
    );
}

export default ItemCounter;
