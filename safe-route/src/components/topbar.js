import React from "react"
import SearchBar from "./search-bar"
import LoginButton from "./login-button"
import LogoutButton from "./logout-button"
import './topbar.css'


export default function TopBar() {
    return (
        <nav className="bar">SafeRoute
            <ul>
                <li className="search">
                    <SearchBar/>   
                </li>
                <li>
                    <div><LoginButton/><LogoutButton/></div>
                </li>
            </ul>
        </nav>
    )
}