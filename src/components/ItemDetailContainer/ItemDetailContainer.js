import ItemDetail from '../ItemDetail/ItemDetail';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getProductById } from '../../services/firebase/firebase';
import { FadeLoader } from 'react-spinners';

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
            { loading ? <FadeLoader color={ '#F3CE13' } size={ 20 } loading={ loading } /> : <ItemDetail item={ product } /> }
        </>
    );
}

export default ItemDetailContainer;
