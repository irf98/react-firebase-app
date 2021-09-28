import { createContext, useState } from "react";

const Context = createContext();

export const CartContextProvider = ( {children} ) => {
    const [ cart, setCart ] = useState([]);

    const onAddItem = ( product, count ) => {
        const updatedCart = [...cart];
        const itemInCart = updatedCart.find(
            item => item.id === product.id
        );
        if ( !itemInCart ) {
            updatedCart.push( {...product, quantity: count} );
        } else {
            itemInCart.quantity+=count;
        }
        setCart(updatedCart);
    }
    
    const onRemoveItem = ( itemId ) => {
        const updatedCart = [...cart];
        const itemInCart = updatedCart.find(
            item => item.id === itemId
        );
        const updatedItem = {
            ...updatedCart[itemInCart]
        }
        updatedItem.quantity--;
        if ( updatedItem !== -1 ) {
            updatedCart.splice( itemInCart, 1 );
        } else {
            updatedCart[itemInCart] = updatedItem;
        }
        setCart(updatedCart);
        console.log(updatedCart);
    }

    const onClearCart = () => {
        setCart([]);
    }

    return(
        <Context.Provider value={{
            cart,
            onAddItem,
            onRemoveItem,
            onClearCart,
        }}>
            { children }
        </Context.Provider>
    );
}

export default Context;

/*

const onRemoveItem = ( itemId ) => {
    const updatedCart = [...cart];
    const itemInCart = updatedCart.find(
        item => item.id === itemId
    );
    const updatedItem = {
        ...updatedCart[itemInCart]
    }
    updatedItem.quantity--;
    if ( updatedItem.quantity <= 0 ) {
        updatedCart.splice( itemInCart, 1 );
    } else {
        updatedCart[itemInCart] = updatedItem;
    }
    setCart(updatedCart);
    console.log(updatedCart);
}

 const onRemoveItem = ( itemId ) => {
        const updatedCart = [...cart];
        const itemInCart = updatedCart.find(
            item => item.id === itemId
        );
        const updatedItem = {
            ...updatedCart[itemInCart]
        }
        updatedItem.quantity--;
        if ( updatedItem !== -1 ) {
            updatedCart.splice( itemInCart, 1 );
        } else {
            updatedCart[itemInCart] = updatedItem;
        }
        setCart(updatedCart);
        console.log(updatedCart);
    }

*/