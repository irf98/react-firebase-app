import './AccountRecovery.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const AccountRecovery = () => {
    const [ loading, setLoading ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ check, setCheck ] = useState( { email: '' } );
    const { resetPassword } = useAuth();
    const returnHome = useHistory();

    useEffect( () => {
        setValid( 
            check.email.trim() !== ''
        );
    }, [ check ] );

    const checkEmail = ( x ) => {
        return ( { target: {value} } ) => {
            setCheck( info => ( {...info, [x]: value} ) );
        }
    }

    const handleRecovery = (e) => {
        e.preventDefault();
        
        return new Promise( (resolve, reject) => {
            resetPassword( check.email ).then( () => {
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
                <input className='RecoveryInput' type='email' placeholder='Email' onChange={ checkEmail( 'email' ) } required/>
                <button className='ConfirmSend' disabled={ !loading && !valid }>Send</button>
            </form>
            <Link to={`/signin`}>Sign In</Link>
        </div>
    );
}

export default AccountRecovery;
