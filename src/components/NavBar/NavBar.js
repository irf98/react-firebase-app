import './NavBar.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/firebase/firebase';
import { Link } from 'react-router-dom';
import { IoSearch, IoStar } from "react-icons/io5";
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
    const [ products, setProducts ] = useState([]);

    useEffect( () => {
        getProducts().then( products => {
            setProducts(products);
        }).catch( (error) => {
            console.log(error);
        });
        return ( () => {
            setProducts([]);
        });
    }, [] );

    return (
        <nav className='NavBar'>
            <Link to={`/`} className='NavLogo'><h1 className='LogoName'>Movies Store</h1></Link>
            <div className='LeftNav'>
                <div className='NavOptionsLeft'>
                    <div className='DropdownMenu'>
                        <button className='CategoriesButton'>Categories</button>
                        <div className='DropCategories'>
                            { products.map( item =>
                                <Link to={`/categories/${item.genre}`} className='DropItem' key={item.id}>{item.genre}</Link>
                            )}
                        </div>
                    </div>
                    <form className='NavSearch'>
                        <input className='NavSearchInput' type='search' placeholder=' search a movie by title...'/>
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
