import './NavBar.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/firebase/firebase';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
    const [ categories, setCategories ] = useState([]);
    const { user, signOut } = useAuth();

    useEffect( () => {
        getProducts().then( products => {
            const temp = {};
            products.forEach( e => {
                temp[e.genre] = e.id;
            });
            setCategories(Object.keys(temp).sort((a,b) => a.localeCompare(b)).map( e => {
                return { id: temp[e], category: e }
            }));
        }).catch( (error) => {
            console.log(error);
        });
    }, [] );

    const handleSignOut = () => {
        return new Promise( (resolve, reject) => {
            signOut().then( () => {
                resolve('Success');
            }).catch( (error) => {
                reject(error);
            });
        });
    }

    return (
        <nav className='NavBar'>
            <Link to={`/`} className='NavLogo'><h1 className='LogoName'>Movies Store</h1></Link>
            <div className='LeftNav'>
                <div className='NavOptionsLeft'>
                    <div className='DropdownMenu'>
                        <button className='CategoriesButton'>Categories</button>
                        <div className='DropCategories'>
                            { categories.map( e =>
                                <Link to={`/categories/${e.category}`} className='DropItem' key={e.id}>{e.category}</Link>
                            )}
                        </div>
                    </div>
                    <Link to={`/wishlist`} className='WishLink'><button className='Wishlist' title='Wishlist'>Wishlist</button></Link>
                    <Link to={`/aboutus`} className='AboutLink'><button className='AboutUs'>About Us</button></Link>
                </div>
            </div>
            <div className='RightNav'>
                { !user ?
                    <div className='NavOptionsRight'>
                        <Link className='SignLink' to={`/signin`}><button className='Option'>Sign In</button></Link>
                        <Link className='SignLink' to={`/signup`}><button className='Option'>Sign Up</button></Link>
                        <CartWidget />
                    </div>
                    :
                    <div className='NavOptionsRight'>
                        <Link className='SignLink' to={`/signin`}><button className='SignOut' onClick={ () => handleSignOut() }>Sign Out</button></Link>
                        <CartWidget />
                    </div> 
                }
            </div>
        </nav>
    );
}

export default NavBar;
