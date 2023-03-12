import React from "react"
import SearchBar from "./search-bar"
import AuthenticationButton from './authentication-button'
import './topbar.css'


export default function TopBar() {
    return (
        <nav className="bar">SafeRoute
            <ul>
                <li className="search">
                    <SearchBar/>   
                </li>
                <li>
                    <div><AuthenticationButton/></div>
                </li>
            </ul>
        </nav>
    )
}