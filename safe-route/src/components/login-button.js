import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './button.css'

const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
        <button
            className="loginbutton"
            onClick={() => loginWithRedirect()}
        >
            Login
        </button>
        )
        
    );
}

export default LoginButton;