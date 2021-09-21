import './Item.css'
import { Link } from 'react-router-dom';

const Item = ( {items} ) => {
    return (
        <Link className='ItemDisplay' key={items.id} to={`/product/${items.id}`}>
            <img src={items.pictureUrl} alt='Poster'/>
            <h5>{items.title}</h5>
            <h4>${items.price}</h4>
        </Link>
    );
}

export default Item;
