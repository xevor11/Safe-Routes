import React, { useState } from "react"
import AuthenticationButton from './authentication-button'
import './topbar.css'
import { IconButton, Menu, MenuItem, ToggleButton } from "@mui/material"
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useThemeUpdate } from "./theme";

export default function TopBar() {

    const options = [
        'test',
        'test',
        'test',
    ]

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
        <nav className="bar">SafeRoute

                <IconButton
                    aria-label="Menu"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <DensityMediumIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby' : 'long-button',                        
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
            
            <AuthenticationButton />
        </nav>
    )
}