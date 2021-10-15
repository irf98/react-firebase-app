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
        
        return new Promise( (resolve, reject) => {
            signIn( emailRef.current.value, 
                    passwordRef.current.value 
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
                <input className='SignInput' type='email' placeholder='Email' ref={emailRef} required/>
                <input className='SignInput' type='password' placeholder='Password' ref={passwordRef} required/>
                <button className='ConfirmLogin' type='submit' disabled={loading}>Sign In</button>
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
