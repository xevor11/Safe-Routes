import { useState, useContext, createContext } from "react";

const DestLocationContext = createContext();
const UpdateDestLocationContext = createContext();

export function useDestLocation() {
    return useContext(DestLocationContext)
}

export function useDestLocationUpdate() {
    return useContext(UpdateDestLocationContext)
}

export function DestLocationProvider({ children }) {
    
    const [destCoords, setDestCoords] = useState([10.00, 10.00]);

    function updateDestCoords( newCoords ) {
        setDestCoords(newCoords)
    }

    return (
        <DestLocationContext.Provider value={destCoords}>
            <UpdateDestLocationContext.Provider value={updateDestCoords}>
                {children}
            </UpdateDestLocationContext.Provider>
        </DestLocationContext.Provider>
    )
}