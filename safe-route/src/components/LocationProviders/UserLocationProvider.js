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
    
    const [userCoords, setUserCoords] = useState([43.075647, -87.886633]);

    function updateUserCoords( newCoords ) {
        const successCallback = (position) => {
            setUserCoords([position.coords.latitude, position.coords.longitude]);
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
            setUserCoords(newCoords)
        } 
        
    }

    if(navigator.geolocation) {
        updateUserCoords()
    }

    return (
        <UserLocationContext.Provider value={userCoords}>
            <UpdateUserLocationContext.Provider value={updateUserCoords}>
                {children}
            </UpdateUserLocationContext.Provider>
        </UserLocationContext.Provider>
    )
}