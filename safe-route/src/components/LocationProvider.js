import { useState, useContext, createContext, useEffect } from "react";

const LocationContext = createContext();
export function useLocation() {
    return useContext(LocationContext)
}

export function LocationContextProvider({ children }) {
    const [location, setLocation] = useState({
        userCoords: [43.075647, -87.886633],
        destCoords: []
    });

    useEffect(() => {
        if (navigator.geolocation) {
            const successCallback = (position) => {
                setLocation(prevState => ({ ...prevState, userCoords: [position.coords.latitude, position.coords.longitude] }));
            }

            const errorCallback = (error) => {
                console.log(error);
            }

            const options = {
                enableHighAccuracy: false,
                timeout: 100000,
            }

            navigator.geolocation.watchPosition(successCallback, errorCallback, options);
        }
    }, []);

    function updateUserCoords(newCoords) {
        setLocation(prevState => ({ ...prevState, userCoords: newCoords }));
    }

    function updateDestCoords(newCoords) {
        setLocation(prevState => ({ ...prevState, destCoords: newCoords }));
    }

    return (
        <LocationContext.Provider value={{ location, updateDestCoords, updateUserCoords }}>
            {children}
        </LocationContext.Provider>
    )
}