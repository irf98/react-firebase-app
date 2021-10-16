import './SignUp.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const [ loading, setLoading ] = useState(false);
    const [ agree, setAgree ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ password, setPassword ] = useState( { password: '', confirmPassword: '' } );
    const { signUp, setInfo, user } = useAuth();
    const returnHome = useHistory();
    
    const handleCheckbox = () => {
        setAgree(!agree);
    }

    const setCheck = ( x ) => {
        return ( { target: {value} } ) => {
            setPassword( info => ( {...info, [x]: value} ) );
        }
    }

    useEffect( () => {
        setValid( 
            user.email.trim() !== '' &&
            user.firstname.trim() !== '' && 
            user.surname.trim() !== '' && 
            user.phone.trim() !== '' && 
            password.password !== '' &&
            password.confirmPassword !== ''
        );
    }, [ user, password ] );

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( password.password !== password.confirmPassword ) {
            return window.location.reload();
        }

        return new Promise( (resolve, reject) => {
            signUp( user.email, 
                    password.password, 
                    user.firstname, 
                    user.surname, 
                    user.phone 
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
            <h3>Welcome to Movies Store! Sign Up by filling the form.</h3>
            <form className='SignForm' onSubmit={ handleSubmit }>
                <input className='SignInput' type='text' placeholder='First name' onChange={ setInfo('firstname') } required/>
                <input className='SignInput' type='text' placeholder='Last name' onChange={ setInfo('surname') } required/>
                <input className='SignInput' type='tel' placeholder='Phone' onChange={ setInfo('phone') } required/>
                <input className='SignInput' type='email' placeholder='Email' onChange={ setInfo('email') } required/>
                <input className='SignInput' type='password' placeholder='Password' onChange={ setCheck('password') } required/>
                <input className='SignInput' type='password' placeholder='Confirm password' onChange={ setCheck('confirmPassword') } required/>
                <div className='TermsAndConditions'>
                    <input className='CheckBox' type='checkbox' id='AgreeTerms' onChange={ handleCheckbox }/>
                    <label htmlFor='AgreeTerms'>I agree the terms and conditions and the privacy policy.</label>
                </div>
                <button className='ConfirmUser' type='submit' disabled={ !loading && ( !agree || !valid ) }>Sign Up</button>
            </form>
            <h5>Already have an account?</h5><Link to={`/signin`}>Sign In</Link>
        </div>
    );
}

export default SignUp;
