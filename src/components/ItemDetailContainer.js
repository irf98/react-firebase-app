import ItemDetail from './ItemDetail.js';
import { useState } from 'react';
import { useParams } from 'react-router';

const loadItems = () => {
    return new Promise( (resolve, reject) => {
        const Catalogue = [

            {id: 'star-wars', title: 'Star Wars', price: 19, genre: 'Science Fiction', pictureUrl: './img/star-wars.png'},
            {id: 'pulp-fiction', title: 'Pulp Fiction', price: 14, genre: 'Crime', pictureUrl: './img/pulp-fiction.png'},
            {id: 'halloween', title: 'Halloween', price: 17, genre: 'Horror', pictureUrl: './img/halloween.png'},
            {id: 'die-hard', title: 'Die Hard', price: 9, genre: 'Action', pictureUrl: './img/die-hard.png'}

        ];
        setTimeout( () => resolve(Catalogue), 2000 );
    });
}

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [ itemDetail, setItemDetail ] = useState();

    const getItemDetail = loadItems();
    getItemDetail.then( result => {
        const itemDetail = result.find( data => data.id === id );
        setItemDetail(itemDetail);
    });
    
    return (
        <>
            { itemDetail ? <ItemDetail items={ itemDetail } /> : <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2> }
        </>
    );
}

export default ItemDetailContainer;
