import React, { useState, useEffect, useContext } from "react";
import { auth } from "../services/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "@firebase/auth";

const UserContext = React.createContext();

export const useAuth = () => {
    return useContext(UserContext);
}

export const UserContextProvider = ( {children} ) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState({
        firstname: '', surname: '', email: '', phone: ''
    });

    const setInfo = ( x ) => {
        return ( { target: {value} } ) => {
            setUser( info => ( {...info, [x]: value} ) );
        }
    }

    useEffect( () => {
        const unsuscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsuscribe;
    }, [] );

    const signUp = ( email, password ) => {
        return createUserWithEmailAndPassword( auth, email, password );
    }
    
    const signIn = ( email, password ) => {
        return signInWithEmailAndPassword( auth, email, password );
    }

    const signOut = () => {
        return auth.signOut();
    }

    const resetPassword = ( email ) => {
        return sendPasswordResetEmail( auth, email );

    }

    return (
        <UserContext.Provider value={{ 
            user, 
            currentUser,
            setInfo, 
            signUp, 
            signIn, 
            signOut, 
            resetPassword 
        }}>
            { !loading && children }
        </UserContext.Provider>
    );
}
