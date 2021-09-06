import './NavBar.css';
import './CartWidget.js';
import CartWidget from './CartWidget.js';

const NavBar = () => {
    return (
        <nav className='NavBar'>
            <div className='NavLogo'>
                <h1 className='LogoName'>Web Store</h1>
            </div>
            <div className='LeftNav'>
                <div className='NavOptionsLeft'>
                    <button className='Option'>Home</button>
                    <button className='Option'>About</button>
                    <button className='Option'>Wishlist</button>
                </div>
            </div>
            <div className='RightNav'>
                <div className='NavOptionsRight'>
                    <button className='Option'>Sign In</button>
                    <button className='Option'>Sign Up</button>
                    <CartWidget/>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
