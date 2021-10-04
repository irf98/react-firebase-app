import './ItemList.css';
import Item from '../Item/Item';

const ItemList = ( {items} ) => {
    return (
        <div className='ItemContainer'>
            { items.map( item => (
                <Item key={item.id} item={item}/>
            ))}
        </div>
    );
}

export default ItemList;
