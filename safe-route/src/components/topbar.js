import React from "react"
import SearchBar from "./search-bar"
import AuthenticationButton from './authentication-button'
import './topbar.css'
import UserSettingButton from "./usersetting-button";


export default function TopBar() {
    return (
        <nav className="bar">SafeRoute
            
                {/* <li className="search">
                    <SearchBar/>   
                </li> */}
                    <UserSettingButton/>
                    <AuthenticationButton/>
                
            
        </nav>
    )
}