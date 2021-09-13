import './ItemList.css';
import Item from './Item.js';
import { useState } from 'react';

const Catalogue = [

    {id: 'movie1', title: 'Star Wars', price: 19, pictureUrl: './img/star-wars.png'},
    {id: 'movie2', title: 'Pulp Fiction', price: 14, pictureUrl: './img/pulp-fiction.png'},
    {id: 'movie3', title: 'Halloween', price: 17, pictureUrl: './img/halloween.png'},
    {id: 'movie4', title: 'Die Hard', price: 9, pictureUrl: './img/die-hard.png'}

];

const ItemList = () => {
    
    const [itemList, setItemList] = useState([]);

    const data = new Promise( (resolve, reject) => {
        setTimeout( () => resolve (Catalogue), 2000);
    });
    data.then(info => {
        setItemList(info);
    });

    return (
        <div className='ItemContainer'>
            {itemList.map(items => (
                <Item key={items.id} items={items}/>
            ))}
        </div>
    );
}

export default ItemList;
