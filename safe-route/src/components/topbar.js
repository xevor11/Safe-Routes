import React, { useState } from "react"
import AuthenticationButton from './authentication-button'
import './topbar.css'
import { IconButton, Menu, MenuItem, ToggleButton } from "@mui/material"
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useThemeUpdate } from "./theme";
import UserSettingButton from "./usersetting-button";

export default function TopBar() {

    return (
        <nav className="bar">SafeRoute

            <UserSettingButton></UserSettingButton>
            
            <AuthenticationButton />
        </nav>
    )
}