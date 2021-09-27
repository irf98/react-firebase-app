import './Item.css'
import { Link } from 'react-router-dom';

const Item = ( {item} ) => {
    return (
        <Link className='ItemDisplay' key={item.id} to={`/product/${item.id}`}>
            <img src={item.pictureUrl} alt='Poster'/>
            <h5>{item.title}</h5>
            <h4>${item.price}</h4>
        </Link>
    );
}

export default Item;
