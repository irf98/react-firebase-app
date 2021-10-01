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
    
    const onRemoveItem = ( product ) => {
        const target = cart.find( (item) => item.id === product.id );
        if ( target.quantity === 1 ) {
            setCart(cart.filter( (item) => item.id !== product.id) );
        } else {
            setCart(
                cart.map( (item) =>
                item.id === product.id ? { ...target, quantity: target.quantity - 1 } : item )
            );
        }
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
            onAddItem,
            onRemoveItem,
            onClearCart,
            onCalculateTotal,
        }}>
            { children }
        </Context.Provider>
    );
}

export default Context;
