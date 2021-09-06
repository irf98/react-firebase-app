import './CartWidget.css';
import { IoCartOutline } from "react-icons/io5";

const CartWidget = () => {
    return (
        <div className='CartWidget'>
            <button className='CartText'>Cart <span>0 </span>
                <IoCartOutline/>
            </button>
        </div>
    );
}

export default CartWidget;
