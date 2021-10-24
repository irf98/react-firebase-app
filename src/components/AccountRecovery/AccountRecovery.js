import './AccountRecovery.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const AccountRecovery = () => {
    const [ loading, setLoading ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ check, setCheck ] = useState( { email: '' } );
    const [ errorMessage, setErrorMessage ] = useState(null);
    const { resetPassword } = useAuth();
    const history = useHistory();

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
        setErrorMessage(null);
        
        resetPassword( check.email ).then( () => {
            setLoading(true);
            history.push('/');
        }).catch( (error) => {
            setErrorMessage(`The email address that you've entered doesn't match any account.`, error);
        });
    }

    return (
        <div className='AccountRecovery'>
            <h3>Please fill the form with your email address.</h3>
            { errorMessage && <h4 className='ErrorMessage'>{ errorMessage }</h4>}
            <form className='RecoveryForm' onSubmit={ handleRecovery }>
                <input className='RecoveryInput' type='email' placeholder='Email' onChange={ checkEmail( 'email' ) } required/>
                <button className='ConfirmSend' disabled={ !loading && !valid }>Send</button>
            </form>
            <Link to={`/signin`}>Sign In</Link>
        </div>
    );
}

export default AccountRecovery;
