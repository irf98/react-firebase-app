import { useState, useEffect } from "react";

const LoadWishlist = () => {
    return new Promise( (resolve, reject) => {
        const Load = [1];
        setTimeout( () => resolve(Load), 2000 );
    });
}

const Wishlist = () => {
    const [ wish, setWish] = useState([]);

    useEffect( () => {
        const getWish = LoadWishlist();
        getWish.then( info => { setWish(info) } );
    }, [] );
    
    if ( wish.length === 0 ) {
        return <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2>
    }

    return (
        <h2 style={ {color: 'rgb(214, 207, 207)'} }>Your Wishlist it's currently empty.</h2>
    );
}

export default Wishlist;
