import './Item.css'

const Item = ({items}) => {
    return (
        <div className='ItemDisplay' key={items.id}>
            <img src={items.pictureUrl} alt='Poster'/>
            <h5>{items.title}</h5>
            <h4>${items.price}</h4>
        </div>
    );
}

export default Item;
