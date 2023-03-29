import { useState, useContext, createContext } from "react";

const UserLocationContext = createContext();
const UpdateUserLocationContext = createContext();

export function useUserLocation() {
    return useContext(UserLocationContext)
}

export function useUserLocationUpdate() {
    return useContext(UpdateUserLocationContext)
}

export function UserLocationProvider({ children }) {
    const [coords, setCoords] = useState([43.075647, -87.886633]);

    function updateCoords( newCoords ) {
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

        if(newCoords){
            setCoords(newCoords)
        } 
        
    }

    if(navigator.geolocation) {
        updateCoords()
    }

    return (
        <UserLocationContext.Provider value={coords}>
            <UpdateUserLocationContext.Provider value={updateCoords}>
                {children}
            </UpdateUserLocationContext.Provider>
        </UserLocationContext.Provider>
    )
}