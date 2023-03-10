import React from "react"
import SearchBar from "./search-bar"
import LoginButton from "./login-button"
import LogoutButton from "./logout-button"
import SignupButton from "./signup-button"
import './topbar.css'


export default function TopBar() {
    return (
        <nav className="bar">SafeRoute
            <ul>
                <li className="search">
                    <SearchBar/>   
                </li>
                <li>
                    <div><LoginButton/></div>
                </li>
            </ul>
        </nav>
    )
}