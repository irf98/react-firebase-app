import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getProducts } from '../../services/firebase/firebase';
import { FadeLoader } from 'react-spinners';

const ItemListContainer = () => {
    const { categories } = useParams();
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        setLoading(true);
        getProducts( 'genre', '==', categories ).then( products => {
            setProducts(products);
        }).catch( (error) => {
            console.log(error);
        }).finally( () => {
            setLoading(false);
        });
        return ( () => {
            setLoading(true);
            setProducts([]);
        });
    }, [categories] );

    return (
        <>
            { loading ? <FadeLoader color={ '#F3CE13' } size={ 20 } loading={ loading } /> : <ItemList items={ products } /> }
        </>
    );
}

export default ItemListContainer;
