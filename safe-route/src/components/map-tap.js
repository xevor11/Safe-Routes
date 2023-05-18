import { useMap } from "react-leaflet";
import {useLocation, useCenteredUpdate, useCenterLocationUpdate } from "./LocationProvider";


const MapTap = () => {
    const map = useMap()
    const getLocationHook = useLocation()
    //extrapolate object from useContext hook
    const location = getLocationHook.location
    const useCenter = useCenteredUpdate()
    const useCenterUpdate = useCenterLocationUpdate()

    function OnClick() {
        const center = map.getCenter()        
        useCenterUpdate(center)
        useCenter(false)
    }

    map.on("click drag touchstart touchmove touchend", OnClick)
    return null;
}

export default MapTap