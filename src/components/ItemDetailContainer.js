import ItemDetail from './ItemDetail.js';
import { useState } from 'react';

const Catalogue = [

    {id: 'movie1', title: 'Star Wars', price: 19, genre: 'Science Fiction', pictureUrl: './img/star-wars.png'},
    //{id: 'movie2', title: 'Pulp Fiction', price: 14, genre: 'Crime', pictureUrl: './img/pulp-fiction.png'},
    //{id: 'movie3', title: 'Halloween', price: 17, genre: 'Horror', pictureUrl: './img/halloween.png'},
    //{id: 'movie4', title: 'Die Hard', price: 9, genre: 'Action', pictureUrl: './img/die-hard.png'}

];

const ItemDetailContainer = () => {
    const [itemDetail, setItemDetail] = useState([]);

    const data = new Promise( (resolve, reject ) => {
        setTimeout( () => resolve (Catalogue), 2000 );
    });
    data.then( info => { setItemDetail(info) } );

    return (
        <>
            {itemDetail.map(items => (
                <ItemDetail key={items.id} items={items}/>
            ))}
        </>
    );
}

export default ItemDetailContainer;
