import './NavBar.css';
import { IoSearch, IoStar } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const Catalogue = [

    {id: 'star-wars', title: 'Star Wars', price: 19, genre: 'Science Fiction', stock: 7 , pictureUrl: './img/star-wars.png'},
    {id: 'pulp-fiction', title: 'Pulp Fiction', price: 14, genre: 'Crime', stock: 9 , pictureUrl: './img/pulp-fiction.png'},
    {id: 'halloween', title: 'Halloween', price: 17, genre: 'Horror', stock: 4 , pictureUrl: './img/halloween.png'},
    {id: 'die-hard', title: 'Die Hard', price: 9, genre: 'Action', stock: 13 , pictureUrl: './img/die-hard.png'}

];

const NavBar = () => {
    return (
        <nav className='NavBar'>
            <Link to={`/`} className='NavLogo'><h1 className='LogoName'>Movies Store</h1></Link>
            <div className='LeftNav'>
                <div className='NavOptionsLeft'>
                    <div className='DropdownMenu'>
                        <button className='CategoriesButton'>Categories</button>
                        <div className='DropCategories'>
                            { Catalogue.map( item =>
                                <Link to={`/categories/${item.genre.replace(' ', '-').toLowerCase()}`} className='DropItem' key={item.id}>{item.genre}</Link>
                            )}
                        </div>
                    </div>
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
