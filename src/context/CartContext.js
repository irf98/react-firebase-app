import { createContext, useState } from "react";

const Context = createContext();

export const CartContextProvider = ( {children} ) => {
    const [ cart, setCart ] = useState([]);
    const [ wish, setWish ] = useState([]);

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
    
    const onRemoveItem = ( product ) => {
        const target = cart.find( (item) => item.id === product.id );
        if ( target.quantity === 1 ) {
            setCart( cart.filter( (item) => item.id !== product.id) );
        } else {
            setCart(
                cart.map( (item) =>
                item.id === product.id ? { ...target, quantity: target.quantity - 1 } : item )
            );
        }
    }

    const onAddWish = ( product, count ) => {
        const updatedWishlist = [...wish];
        const itemInList = updatedWishlist.find(
            item => item.id === product.id
        );
        if ( !itemInList ) {
            updatedWishlist.push( {...product, quantity: count} );
        } else {
            itemInList.quantity+=count;
        }
        setWish(updatedWishlist);
    }

    const onRemoveWish = ( product ) => {
        const target = wish.find( (item) => item.id === product.id );
        if ( target.quantity === 1 ) {
            setWish( wish.filter( (item) => item.id !== product.id) );
        } else {
            setWish(
                wish.map( (item) =>
                item.id === product.id ? { ...target, quantity: target.quantity - 1 } : item )
            );
        }
    }

    const onAddWishToCart = ( product ) => {
        const updatedCart = [...cart];
        const itemInCart = updatedCart.find(
            item => item.id === product.id
        );
        if ( !itemInCart ) {
            updatedCart.push( {...product } );
        }
        setCart(updatedCart);
        setWish([]);
    }

    const onClearCart = () => {
        setCart([]);
    }

    const onCalculateTotal = cart.reduce( ( total, item ) => {
        return total + (item.quantity * item.price)
    }, 0);

    return(
        <Context.Provider value={{
            cart,
            wish,
            onAddItem,
            onRemoveItem,
            onAddWish,
            onRemoveWish,
            onAddWishToCart,
            onClearCart,
            onCalculateTotal
        }}>
            { children }
        </Context.Provider>
    );
}

export default Context;
