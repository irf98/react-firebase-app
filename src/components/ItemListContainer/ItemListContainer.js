import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { db } from '../../services/firebase/firebase';
import { collection, getDocs, query, where } from '@firebase/firestore';

const ItemListContainer = () => {
    const { categories } = useParams();
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        if ( !categories ) {
            setLoading(true);
            getDocs( collection( db, 'items' )).then( (querySnapshot) => {
                const products = querySnapshot.docs.map( doc => {
                    return { id: doc.id, ...doc.data() }
                });
                setProducts(products);
                console.log(products);
            }).catch( (error) => {
                console.log(error);
            }).finally( () => {
                setLoading(false);
            });
        } else {
            setLoading(true);
            getDocs( query( collection( db, 'items' ), where( 'genre', '==', categories ))).then( (querySnapshot) => {
                const products = querySnapshot.docs.map( doc => {
                    return { id: doc.id, ...doc.data() }
                });
                setProducts(products);
                console.log(products);
            }).catch( (error) => {
                console.log(error);
            }).finally( () => {
                setLoading(false);
            });
        }
    }, [categories] );

    return (
        <>
            { loading ? <h2 style={ {color: 'rgb(214, 207, 207)'} }>Loading...</h2> : <ItemList items={products} /> }
        </>
    );
}

export default ItemListContainer;
