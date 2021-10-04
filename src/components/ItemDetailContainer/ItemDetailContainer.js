import ItemDetail from '../ItemDetail/ItemDetail';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { db } from '../../services/firebase/firebase';
import { doc, getDoc } from '@firebase/firestore';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        setLoading(true);
        getDoc( doc( db, 'items', id)).then( (querySnapshot) => {
            const product = { id: querySnapshot.id, ...querySnapshot.data() }
            console.log(product);
            setProduct(product);
        }).catch( (error) => {
            console.log(error);
        }).finally( () => {
            setLoading(false);
        });
        return ( () => {
            setProduct(undefined);
        });
        
    }, [id] );
    
    return (
        <>
            { loading ? <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2> : <ItemDetail item={ product } /> }
        </>
    );
}

export default ItemDetailContainer;
