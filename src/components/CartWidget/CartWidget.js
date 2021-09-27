import './CartWidget.css';
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

const CartWidget = () => {
    return (
        <Link to={`/cart`} className='CartWidget'>
            <button className='CartText'>Cart <span>0 </span>
                <IoCartOutline />
            </button>
        </Link>
    );
}

export default CartWidget;
