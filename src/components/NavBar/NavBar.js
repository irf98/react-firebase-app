import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget';
import { IoSearch, IoStar } from "react-icons/io5";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='NavBar'>
            <Link to={`/`} className='NavLogo'>
                <h1 className='LogoName'>Movies Store</h1>
            </Link>
            <div className='LeftNav'>
                <div className='NavOptionsLeft'>
                    <button className='CategoriesButton'>Categories</button>    
                    <form className='NavSearch'>
                        <input className='NavSearchInput' type='search' placeholder=' search a movie by title...' />
                        <button className='SearchButton' type='submit' title='Search'><IoSearch /></button>
                    </form>
                    <Link to={`/wishlist`} className='WishLink'>
                        <button className='Wishlist' title='Wishlist'><IoStar /></button>
                    </Link>
                </div>
            </div>
            <div className='RightNav'>
                <div className='NavOptionsRight'>
                    <button className='Option'>Sign In</button>
                    <button className='Option'>Sign Up</button>
                    <CartWidget />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
