import './AccountRecovery.css';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const AccountRecovery = () => {
    const [ loading, setLoading ] = useState(false);
    const { resetPassword } = useAuth();
    const emailRef = useRef();
    const returnHome = useHistory();

    const handleRecovery = (e) => {
        e.preventDefault();
        
        return new Promise( (resolve, reject) => {
            resetPassword( emailRef.current.value
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
        <div className='AccountRecovery'>
            <h3>Please fill the form with your email address.</h3>
            <form className='RecoveryForm' onSubmit={ handleRecovery }>
                <input className='RecoveryInput' type='email' placeholder='Email' ref={emailRef} required/>
                <button className='ConfirmSend' type='submit' disabled={loading}>Send</button>
            </form>
            <Link to={`/signin`}>Sign In</Link>
        </div>
    );
}

export default AccountRecovery;
