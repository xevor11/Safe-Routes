import React, { useState } from "react"
import AuthenticationButton from './authentication-button'
import './topbar.css'
import { IconButton, Menu } from "@mui/material"


export default function TopBar() {

    const [anchor, setAnchor] = useState(null);
    
    const open = Boolean(anchor);    

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null)
    };


    return (
        <nav className="bar">SafeRoute
            {/* <>
                <IconButton
                    aria-label="Menu"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby' : 'long-button',                        
                    }}
                    anchorEl={anchor}
                    open={open}

                >

                </Menu>
            </> */}
            <AuthenticationButton />
        </nav>
    )
}