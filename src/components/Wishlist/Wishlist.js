import './Wishlist.css';
import { useContext } from "react";
import { useAuth } from '../../context/UserContext';
import { Link } from "react-router-dom";
import CartContext from '../../context/CartContext';

const Wishlist = () => {
    const { wish, onRemoveWish, onAddWishToCart } = useContext(CartContext);
    const { user } = useAuth();

    if ( user && wish.length === 0 ) {
        return (
            <>
                <h2 className='EmptyWishlistMessage'>Your Wishlist it's currently empty.</h2>
                <Link to={`/`}><button className='BackButton'>Back to the Catalogue</button></Link>
            </>
        );
    }

    return (
        <>
            { !user ?
                <h2 className='NoLoginMessage'><Link to={`/signin`}>Sign In</Link> or <Link to={`/signup`}>Sign Up</Link> to start saving your products.</h2>
                :
                <div className='WishlistContainer'>
                    { wish.map( item => (
                        <div className='WishlistDisplay' key={item.id}>
                            <img className='ItemWishImg' src={`../../${item.pictureUrl}`} title={item.title} alt='Poster'/>
                            <h5 className='WishTitle'>{item.title}</h5>
                            <h4 className='WishPrice'>${item.price}</h4>
                            <h4 className='WishQuantity'>{item.quantity}</h4>
                            <button className='WishRemove' title='Remove from wishlist' onClick={ () => onRemoveWish(item) }>X</button>
                            <button className='AddWishToCart' onClick={ () => onAddWishToCart( item ) }>Add to cart</button>
                        </div>
                    ))}
                </div>
            }     
        </>
    );
}

export default Wishlist;
