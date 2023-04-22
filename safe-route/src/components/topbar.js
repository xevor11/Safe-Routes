import AuthenticationButton from './authentication-button'
import './topbar.css'
import SettingsMenu from "./Settingsmenu";

export default function TopBar() {

    return (
        <nav className="bar">SafeRoute

            <SettingsMenu className="menu"></SettingsMenu>

            <AuthenticationButton />
        </nav>
    )
}