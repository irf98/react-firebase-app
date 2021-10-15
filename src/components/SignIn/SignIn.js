import './SignIn.css';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const SignIn = () => {
    const [ loading, setLoading ] = useState(false);
    const { signIn } = useAuth();
    const returnHome = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        /*
        if ( passwordRef.current.value ) {
            return('Passwords do not match');
        }
        */
        return new Promise( (resolve, reject) => {
            signIn( emailRef.current.value, 
                    passwordRef.current.value 
                ).then( () => {
                resolve('Success');
                setLoading(true);
                console.log('Logged in');
                returnHome.push('/');
            }).catch( (error) => {
                reject(error);
                console.log(error);
            });
        });
    }

    return (
        <div className='SignUp'>
            <form className='SignForm' onSubmit={ handleSubmit }>
                <input className='SignInput' type='email' placeholder='Email' ref={emailRef} required/>
                <input className='SignInput' type='text' placeholder='Password' ref={passwordRef} required/>
                <button className='ConfirmUser' type='submit' disabled={loading}>Sign In</button>
            </form>
            <h5>Don't have an account?</h5><Link to={`/signup`}>Sign Up</Link>
        </div>
    );
}

export default SignIn;
