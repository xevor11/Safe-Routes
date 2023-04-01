import { useState, useContext, createContext, useEffect } from "react";

const LocationContext = createContext();
const UpdateUserLocationContext = createContext();
const UpdateDestLocationContext = createContext();

export function useLocation() {
    return useContext(LocationContext)
}

export function useUserLocationUpdate() {
    return useContext(UpdateUserLocationContext)
}

export function useDestLocationUpdate() {
    return useContext(UpdateDestLocationContext)
}

export function LocationContextProvider({ children }) {
    const [location, setLocation] = useState({
        userCoords: {lat: 43.075647,
                     lng: -87.886633 },
        destCoords: {lat: null,
                     lng: null }
    });

    useEffect(() => {
        if (navigator.geolocation) {
            const successCallback = (position) => {
                setLocation(prevState => ({ ...prevState, userCoords: { lat: position.coords.latitude, lng: position.coords.longitude } }));
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
        <LocationContext.Provider value={{ location }}>
            <UpdateUserLocationContext.Provider value={updateUserCoords}>
                <UpdateDestLocationContext.Provider value={updateDestCoords}>
                    {children}
                </UpdateDestLocationContext.Provider>
            </UpdateUserLocationContext.Provider>
        </LocationContext.Provider>
    )
}