import React, { useState, useEffect, useContext } from "react";
import { auth } from "../services/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, updateProfile } from "@firebase/auth";

const UserContext = React.createContext();

export const useAuth = () => {
    return useContext(UserContext);
}

export const UserContextProvider = ( {children} ) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ userData, setUserData ] = useState({
        displayName: '', email: '', phoneNumber: ''
    });

    const user = auth.currentUser;

    const setInfo = ( x ) => {
        return ( { target: {value} } ) => {
            setUserData( info => ( {...info, [x]: value} ) );
        }
    }

    const saveUserInfo = () => {
        updateProfile( auth.currentUser, {
            displayName: userData.displayName
        }).then( () => {
            console.log('profile updated');
        }).catch( (error) => {
            console.log(error);
        });
    }

    useEffect( () => {
        const unsuscribe = onAuthStateChanged( auth, (user) => {
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
            userData,
            saveUserInfo,
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
