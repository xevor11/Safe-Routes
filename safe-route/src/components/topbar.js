import AuthenticationButton from './authentication-button'
import './topbar.css'
import SettingsMenu from "./Settingsmenu";
import { useMediaQuery } from '@mui/material';



export default function TopBar() {

    const media = useMediaQuery('(max-width:600px)');



    const safeRoute = media ? '' : 'SafeRoute';

    return (

        
        <nav className="bar">{safeRoute}
            <SettingsMenu className="menu"></SettingsMenu>
            
            <AuthenticationButton id="authButton"/>
        </nav>
    )
}