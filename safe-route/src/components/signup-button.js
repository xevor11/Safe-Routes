import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const SignupButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <button
                className='loginbutton'
                onClick={ () => 
                    loginWithRedirect({
                        screen_hint: 'signup',
                    })
                }
            >
                Sign Up
            </button>
        )
    );
}

export default SignupButton;