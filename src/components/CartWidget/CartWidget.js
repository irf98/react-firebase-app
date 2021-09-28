import './CartWidget.css';
import { Link } from 'react-router-dom';
//import { useState, useContext } from 'react';
import { IoCartOutline } from "react-icons/io5";
//import CartContext from '../../context/CartContext';

const CartWidget = () => {
    //const { cart } = useContext(CartContext);
    //const [ count, setCount ] = useState();

    
    

    



    return (
        <Link to={`/cart`} className='CartWidget'>
            <button className='CartText'>Cart <span>0 </span>
                <IoCartOutline />
            </button>
        </Link>
    );
}

export default CartWidget;
