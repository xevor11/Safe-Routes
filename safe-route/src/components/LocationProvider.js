import { useState, useContext, createContext } from "react";

const LocationContext = createContext();
const UpdateLocationContext = createContext();

export function useLocation() {
    return useContext(LocationContext)
}

export function useLocationUpdate() {
    return useContext(UpdateLocationContext)
}

export function LocationProvider({ children }) {
    const [coords, setCoords] = useState([43.075647, -87.886633]);

    function updateCoords() {
        const successCallback = (position) => {
            setCoords([position.coords.latitude, position.coords.longitude]);
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

    if(navigator.geolocation) {
        updateCoords()
    }

    return (
        <LocationContext.Provider value={coords}>
            <UpdateLocationContext.Provider value={updateCoords}>
                {children}
            </UpdateLocationContext.Provider>
        </LocationContext.Provider>
    )
}