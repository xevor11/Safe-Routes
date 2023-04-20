import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const SignupButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <Button variant="contained" color="primary"
                onClick={ () => 
                    loginWithRedirect({
                        screen_hint: 'signup',
                    })
                }
            >
                Sign Up
            </Button>
        )
    );
}

export default SignupButton;