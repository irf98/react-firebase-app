import './SignIn.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const SignIn = () => {
    const [ loading, setLoading ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ check, setCheck ] = useState( { user: '', password: '' } );
    const { signIn } = useAuth();
    const returnHome = useHistory();

    useEffect( () => {
        setValid( 
            check.user.trim() !== '' &&
            check.password.trim() !== ''
        );
    }, [ check ] );

    const checkLogin = ( x ) => {
        return ( { target: {value} } ) => {
            setCheck( info => ( {...info, [x]: value} ) );
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        return new Promise( (resolve, reject) => {
            signIn( check.user, 
                    check.password 
                ).then( () => {
                resolve('Success');
                setLoading(true);
                returnHome.push('/');
            }).catch( (error) => {
                reject(error);
                window.location.reload();
            });
        });
    }

    return (
        <div className='SignIn'>
            <h3>Welcome back! Sign In with email and password.</h3>
            <form className='SignForm' onSubmit={ handleSubmit }>
                <input className='SignInput' type='email' placeholder='Email' onChange={ checkLogin( 'user' ) } required/>
                <input className='SignInput' type='password' placeholder='Password' onChange={ checkLogin( 'password' ) } required/>
                <button className='ConfirmLogin' disabled={ !loading && !valid }>Sign In</button>
            </form>
            <h5>Don't have an account?</h5>
            <div className='RecoveryLinks'>
                <Link className='RedirectLink' to={`/signup`}>Sign Up</Link>
                <span>or</span>
                <Link className='ForgotMessage' to={`/accountrecovery`}>Forgot password?</Link>
            </div>
        </div>
    );
}

export default SignIn;
