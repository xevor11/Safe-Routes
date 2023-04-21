import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
const UpdateThemeContext = createContext();

const themeOptions = {
    light: {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}'
    },
    dark: {
        attribution: '<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors',
        url: 'https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=TRn9STvPIYmh0g4k5C3R4CEWeU72bxzAav0aeu1TANhjmYPbdJRoTpUSehgZW1At'
    }
}

export function useTheme() {
    return useContext(ThemeContext)
}

export function useThemeUpdate() {
    return useContext(UpdateThemeContext)
}


export function ThemeContextProvider({ children }) {

    const [theme, setTheme] = useState(true)

    function updateTheme() {

        setTheme((theme) => !theme)
        console.log(theme)
    }

    function getTheme() {
        if (theme) {
            return themeOptions.light
        }
        else {
            return themeOptions.dark
        }
    }

    return (
        <ThemeContext.Provider value={getTheme}>
            <UpdateThemeContext.Provider value={updateTheme}>
                {children}
            </UpdateThemeContext.Provider>
        </ThemeContext.Provider>
    )
}