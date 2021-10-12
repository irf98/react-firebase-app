import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getProducts } from '../../services/firebase/firebase';

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
            { loading ? <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2> : <ItemList items={products} /> }
        </>
    );
}

export default ItemListContainer;
