import { useState, useContext, createContext } from "react";
import { counties } from "./counties"

const RegionContext = createContext();
const UseUpdateRegionContext = createContext();

const RegionOptions = {
    noRegion: [],
    region: counties,
}

export function useRegion() {
    return useContext(RegionContext)
}

export function useRegionUpdate() {
    return useContext(UseUpdateRegionContext)
}

export function RegionContextProvider({ children }) {
    const [region, setRegion] = useState(false);

    function getRegion() {
        console.log(RegionOptions.region)
        return region ? RegionOptions.region : RegionOptions.noRegion
    }

    function updateRegionContext() {
        setRegion((region) => !region)
        console.log(region)
    }

    return (
        <RegionContext.Provider value={{ getRegion }}>
            <UseUpdateRegionContext.Provider value={updateRegionContext}>
                    {children}
            </UseUpdateRegionContext.Provider>
        </RegionContext.Provider>
    )
}