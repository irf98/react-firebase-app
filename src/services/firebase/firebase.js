import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where, doc, getDoc, writeBatch, addDoc, Timestamp } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC0oICYq48CDr69YDjmrCjWR-DoKb5YwaA",
    authDomain: "react-proyect-fb.firebaseapp.com",
    projectId: "react-proyect-fb",
    storageBucket: "react-proyect-fb.appspot.com",
    messagingSenderId: "945947132455",
    appId: "1:945947132455:web:32da407abe583e2f904402"
};

const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => { return app }
export const db = getFirestore(app);
export const auth = getAuth();

/*
export const createUser = (user) => {
    return new Promise( (resolve, reject) => {
        user = {
            ...user
        }
        const batch = writeBatch(db);
        addDoc( collection( db, 'users' ), user ).then( () => {
            batch.commit().then( () => {
                resolve('Success');
            }).catch( (error) => {
                reject(error);
            });
        });
    });
}
*/

export const getProducts = ( key, operator, value ) => {
    return new Promise( (resolve, reject) => {
        const collectionQuery = key && operator && value ? query( collection( db, 'items' ), where( key, operator, value ) ) : collection( db, 'items' );
        getDocs(collectionQuery).then( (querySnapshot) => {
            const products = querySnapshot.docs.map( doc => {
                return { id: doc.id, ...doc.data() }
            });
            resolve(products);
        }).catch( (error) => {
            reject(error);
        });
    });
}

export const getProductById = (id) => {
    return new Promise( (resolve, reject) => {
        getDoc( doc( db, 'items', id ) ).then( (querySnapshot) => {
            const product = { id: querySnapshot.id, ...querySnapshot.data() }
            resolve(product);
        }).catch( (error) => {
            reject(error);
        });
    });
}

export const createOrder = (objOrder) => {
    return new Promise( (resolve, reject) => {
        objOrder = {
            ...objOrder,
            date: Timestamp.fromDate( new Date() )
        }
        const batch = writeBatch(db);
        const outOfStock = [];

        objOrder.items.forEach( (prod, i) => {
            getDoc( doc( db, 'items', prod.id ) ).then( DocumentSnapshot => {
                if ( DocumentSnapshot.data().stock >= objOrder.items[i].quantity ) {
                    batch.update( doc( db, 'items', DocumentSnapshot.id ), {
                        stock: DocumentSnapshot.data().stock - objOrder.items[i].quantity
                    });
                } else {
                    outOfStock.push( {...DocumentSnapshot.data(), id: DocumentSnapshot.id} );
                }
            });
        });
        if ( outOfStock.length === 0 ) {
            addDoc( collection( db, 'orders' ), objOrder ).then( () => {
                batch.commit().then( () => {
                    resolve('Success');
                }).catch( (error) => {
                    reject(error);
                });
            });
        }
    });
}

export const getOrderDetails = () => {
    return new Promise( (resolve, reject) => {
        const collectionQuery = collection( db, 'orders' );
        getDocs(collectionQuery).then( (querySnapshot) => {
            const order = querySnapshot.docs.map( doc => {
                return { id: doc.id, ...doc.data() }
            });
            resolve(order);
        }).catch( (error) => {
            reject(error);
        });
    });
}
