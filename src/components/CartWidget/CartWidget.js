import './CartWidget.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { IoCartOutline } from "react-icons/io5";
import CartContext from '../../context/CartContext';

const CartWidget = () => {
    const { cart } = useContext(CartContext);

    const CartNumbers = cart.reduce( ( total, item ) => {
        return total + item.quantity
    }, 0);

    return (
        <Link to={`/cart`} className='CartWidget'>
            <button className='CartText' title='Cart'>Cart <span>{CartNumbers} </span>
                <IoCartOutline />
            </button>
        </Link>
    );
}

export default CartWidget;
