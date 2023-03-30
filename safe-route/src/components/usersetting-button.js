import React from 'react';
import LoginButton from './login-button';
import SignupButton from './signup-button';
import { useAuth0 } from '@auth0/auth0-react';
import {Button} from "@mui/material";

const UserSettingButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Button variant="contained" color="primary"
                    //onClick={}
            >
                Options
            </Button>
        )

    );
};

export default UserSettingButton;