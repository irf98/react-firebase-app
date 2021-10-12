import ItemDetail from '../ItemDetail/ItemDetail';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getProductById } from '../../services/firebase/firebase';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        setLoading(true);
        getProductById(id).then( product => {
            setProduct(product);
        }).catch( (error) => {
            console.log(error);
        }).finally( () => {
            setLoading(false);
        });
        return ( () => {
            setLoading(true);
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
