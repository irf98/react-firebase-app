import './ItemList.css';
import Item from './Item.js';
import { useState, useEffect } from 'react';

const loadItems = () => {
    return new Promise( (resolve, reject) => {
        const Catalogue = [

            {id: 'star-wars', title: 'Star Wars', price: 19, genre: 'Science Fiction', stock: 7 , pictureUrl: './img/star-wars.png'},
            {id: 'pulp-fiction', title: 'Pulp Fiction', price: 14, genre: 'Crime', stock: 9 , pictureUrl: './img/pulp-fiction.png'},
            {id: 'halloween', title: 'Halloween', price: 17, genre: 'Horror', stock: 4 , pictureUrl: './img/halloween.png'},
            {id: 'die-hard', title: 'Die Hard', price: 9, genre: 'Action', stock: 13 , pictureUrl: './img/die-hard.png'}

        ];
        setTimeout( () => resolve(Catalogue), 2000 );
    });
}

const ItemList = () => {
    const [ itemList, setItemList] = useState([]);

    useEffect( () => {
        const getLoadedItems = loadItems();
        getLoadedItems.then( info => { setItemList(info) } );
    }, [] );
    
    if ( itemList.length === 0 ) {
        return <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2>
    }

    return (
        <div className='ItemContainer'>
            { itemList.map( items => (
                <Item key={items.id} items={items}/>
            ))}
        </div>
    );
}

export default ItemList;
