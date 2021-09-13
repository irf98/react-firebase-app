import './Item.css'
import ItemCounter from './ItemCounter';

const Item = ({items}) => {
    return (
        <div className='ItemDisplay' key={items.id}>
            <img src={items.pictureUrl} alt='Poster'/>
            <h5>{items.title}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacinia ex, eget ullamcorper mi. Sed mi purus, volutpat eget diam id, laoreet aliquam quam. Fusce efficitur sapien sed sem malesuada, et ultricies mi ultricies.</p>
            <h4>${items.price}</h4>
            <ItemCounter />
            <button className='AddCart'>Add to cart</button>
        </div>
    );
}

export default Item;
