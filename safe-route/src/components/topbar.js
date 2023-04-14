import AuthenticationButton from './authentication-button'
import './topbar.css'
import UserSettingButton from "./usersetting-button";

export default function TopBar() {

    return (
        <nav className="bar">SafeRoute

            <UserSettingButton></UserSettingButton>

            <AuthenticationButton />
        </nav>
    )
}