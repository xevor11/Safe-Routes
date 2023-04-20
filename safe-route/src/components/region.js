import { useState, useContext, createContext } from "react";

const RegionContext = createContext();
const UseUpdateRegionContext = createContext();

export function useRegion() {
    return useContext(RegionContext)
}

export function useRegionUpdate() {
    return useContext(UseUpdateRegionContext)
}

export function RegionContextProvider({ children }) {
    const [region, setRegion] = useState(false);



    function updateRegionContext(newRegion) {
        if(newRegion)
            {setRegion((region) => region = !region)}
    }

    return (
        <RegionContext.Provider value={{ region }}>
            <UseUpdateRegionContext.Provider value={updateRegionContext}>
                    {children}
            </UseUpdateRegionContext.Provider>
        </RegionContext.Provider>
    )
}