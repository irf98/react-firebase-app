import './NavBar.css';
import CartWidget from './CartWidget.js';
import { IoSearch, IoStar } from "react-icons/io5";

const NavBar = () => {
    return (
        <nav className='NavBar'>
            <div className='NavLogo'>
                <h1 className='LogoName'>Movies Store</h1>
            </div>
            <div className='LeftNav'>
                <div className='NavOptionsLeft'>
                    <form className='NavSearch'>
                        <input className='NavSearchInput' type='search' placeholder='Search...' />
                        <button className='SearchButton' type='submit' title='Search'><IoSearch /></button>
                        <button className='Wishlist' title='Wishlist'><IoStar /></button>
                    </form>
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
