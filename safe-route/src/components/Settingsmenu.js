import { useState } from 'react';
import React from 'react';
import { useThemeUpdate } from './theme';
import { Menu, MenuItem, IconButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium'


const SettingsMenu = () => {

    const [anchor, setAnchor] = useState(null);
    
    const open = Boolean(anchor);    

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null)
    };

    const ToggleTheme = useThemeUpdate()

    return (
        <>
            <IconButton
                aria-label="Menu"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <DensityMediumIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={ToggleTheme}>Change Theme</MenuItem>
            </Menu>
        </>
    );
};

export default SettingsMenu;