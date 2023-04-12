import { FormControlLabel, Switch } from "@mui/material"
import { useThemeUpdate } from "./theme"
import zIndex from "@mui/material/styles/zIndex"

const ThemeToggle = () => {

    const themeUpdate = useThemeUpdate()


    function handleChange() {
        themeUpdate()
    }

    return (
        <FormControlLabel control={<Switch            
            onChange={handleChange} />} 
            style={{zIndex:5}}/>
    )
}

export default ThemeToggle;