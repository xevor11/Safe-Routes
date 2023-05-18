import { useState, useContext, createContext, useEffect } from "react";

const LocationContext = createContext();
const UpdateUserLocationContext = createContext();
const UpdateCenterLocationContext = createContext();
const UpdateDestLocationContext = createContext();

export function useLocation() {
    return useContext(LocationContext)
}

export function useCenterLocationUpdate() {
    return useContext(UpdateCenterLocationContext)
}

export function useUserLocationUpdate() {
    return useContext(UpdateUserLocationContext)
}

export function useDestLocationUpdate() {
    return useContext(UpdateDestLocationContext)
}

export function LocationContextProvider({ children }) {
    const [location, setLocation] = useState({
        userCoords: { lat: 43.075647, lng: -87.886633 },
        destCoords: { lat: null, lng: null },
        centerCoords: { lat: 43.075647, lng: -87.886633 },
        safetyIndex: null // add the safetyIndex attribute
    });

    useEffect(() => {
        if (navigator.geolocation) {
            const successCallback = (position) => {
                if ((location.centerCoords.lat === location.userCoords.lat) && (location.centerCoords.lng === location.userCoords.lng)) {
                    setLocation(prevState => ({ ...prevState, userCoords: { lat: position.coords.latitude, lng: position.coords.longitude }, centerCoords: { lat: position.coords.latitude, lng: position.coords.longitude } }));
                } else {
                    setLocation(prevState => ({ ...prevState, userCoords: { lat: position.coords.latitude, lng: position.coords.longitude } }));
                }
            }

            const errorCallback = (error) => {
                console.log(error);
            }

            const options = {
                enableHighAccuracy: false,
                timeout: 10000000,
            }

            navigator.geolocation.watchPosition(successCallback, errorCallback, options);
        }
    }, [location]);

    function updateCenterCoords(newCoords) {        
        setLocation(prevState => ({ ...prevState, centerCoords: newCoords }));        
    }

    function updateUserCoords(newCoords) {
        setLocation(prevState => ({ ...prevState, userCoords: newCoords }));
    }

    function updateDestCoords(newCoords) {
        setLocation(prevState => ({
            ...prevState,
            destCoords: newCoords,
            safetyIndex: 0 // set a default value for safetyIndex
        }));
    }

    return (
        <LocationContext.Provider value={{ location }}>

            <UpdateUserLocationContext.Provider value={updateUserCoords}>
                <UpdateDestLocationContext.Provider value={updateDestCoords}>
                    <UpdateCenterLocationContext.Provider value={updateCenterCoords}>
                        {children}
                    </UpdateCenterLocationContext.Provider>
                </UpdateDestLocationContext.Provider>
            </UpdateUserLocationContext.Provider>

        </LocationContext.Provider>
    )
}