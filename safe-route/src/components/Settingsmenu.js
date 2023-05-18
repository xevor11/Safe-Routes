import { useState } from 'react';
import React from 'react';
import { useThemeUpdate } from './theme';
import { Menu, MenuItem, IconButton, styled } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import { useRegionUpdate } from './region'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '3vw',
        height: '3vh',
        padding: '0.5em',
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '0.5rem', // Adjust the padding as desired
    display: 'block',
    width: '100%',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  }));

const SettingsMenu = () => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const ToggleTheme = useThemeUpdate();
    const ToggleRegion = useRegionUpdate();

    return (
        <>
            <StyledIconButton
                aria-label="Menu"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <DensityMediumIcon sx={{ color: 'white' }} />
            </StyledIconButton>
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
                        background: "#333",
                    },
                }}
            >
                <StyledMenuItem onClick={ToggleTheme}>Change Theme</StyledMenuItem>
                <StyledMenuItem onClick={ToggleRegion}>Toggle regions</StyledMenuItem>
            </Menu>
        </>
    );
};

export default SettingsMenu;