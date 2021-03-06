import './SignUp.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const [ loading, setLoading ] = useState(false);
    const [ agree, setAgree ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ password, setPassword ] = useState( { password: '', confirmPassword: '' } );
    const [ errorMessage, setErrorMessage ] = useState(null);
    const { signUp, setInfo, userData, saveUserInfo } = useAuth();
    const history = useHistory();
    
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
            userData.email.trim() !== '' &&
            userData.displayName.trim() !== '' &&
            password.password !== '' &&
            password.confirmPassword !== ''
        );
    }, [ userData, password ] );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(null);

        if ( password.password !== password.confirmPassword ) {
            return setErrorMessage('Passwords do not match');
        }

        signUp( userData.email, 
                password.password
            ).then( () => {
            saveUserInfo();
            setLoading(true);
            history.push('/');
        }).catch( (error) => {
            console.error(error);
        });
    }

    return (
        <div className='SignUp'>
            <h3>Welcome to Movies Store! Sign Up by filling the form.</h3>
            <form className='SignForm' onSubmit={ handleSubmit }>
            { errorMessage && <h4 className='ErrorMessage'>{ errorMessage }</h4> }
                <input className='SignInput' type='text' placeholder='Full name' onChange={ setInfo('displayName') } required/>
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
