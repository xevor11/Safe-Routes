import React from 'react';
import LoginButton from './login-button';
import SignupButton from './signup-button';
import { useAuth0 } from '@auth0/auth0-react';
import {Button} from "@mui/material";
import ReactDropdown from "react-dropdown";

const UserSettingButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleMenuOne = () => {
        // do stuff
        setOpen(false);
    };

    const handleMenuTwo = () => {
        // do stuff
        setOpen(false);
    };
    return (
        isAuthenticated && (
            <Button variant="contained" color="primary"
                    //onClick={() => ()}
            >
                Options
            </Button>
        )

    );
};
const Dropdown = ({ open, trigger, menu }) => {
    return (
        <Button className="Options">
            {trigger}
            {open ? (
                <ul className="menu">
                    {menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">{menuItem}</li>
                    ))}
                </ul>
            ) : null}
        </Button>
    );
};
export default UserSettingButton;