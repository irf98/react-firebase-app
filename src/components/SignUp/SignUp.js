import './SignUp.css';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const [ loading, setLoading ] = useState(false);
    const { signUp, setInfo, user } = useAuth();
    const returnHome = useHistory();
    const firstNameRef = useRef();
    const surnameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( passwordRef.current.value !== confirmPasswordRef.current.value ) {
            return('Passwords do not match');
        }

        return new Promise( (resolve, reject) => {
            signUp( emailRef.current.value, 
                    passwordRef.current.value, 
                    firstNameRef.current.value, 
                    surnameRef.current.value, 
                    phoneRef.current.value 
                ).then( () => {
                resolve(user);
                setLoading(true);
                returnHome.push('/');
            }).catch( (error) => {
                reject(error);
            });
        });
    }

    return (
        <div className='SignUp'>
            <form className='SignForm' onSubmit={ handleSubmit }>
                <input className='SignInput' type='text' placeholder='First name' ref={firstNameRef} required onChange={ setInfo('firstname') }/>
                <input className='SignInput' type='text' placeholder='Last name' ref={surnameRef} required onChange={ setInfo('surname') }/>
                <input className='SignInput' type='tel' placeholder='Phone' ref={phoneRef} required onChange={ setInfo('phone') }/>
                <input className='SignInput' type='email' placeholder='Email' ref={emailRef} required onChange={ setInfo('email') }/>
                <input className='SignInput' type='text' placeholder='Password' ref={passwordRef} required/>
                <input className='SignInput' type='text' placeholder='Confirm password' ref={confirmPasswordRef} required/>
                <button className='ConfirmUser' type='submit' disabled={loading}>Sign Up</button>
            </form>
            <h5>Already have an account?</h5><Link to={`/signin`}>Sign In</Link>
        </div>
    );
}

export default SignUp;
