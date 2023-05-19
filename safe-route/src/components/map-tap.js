import { useMap } from "react-leaflet";
import { useCenteredUpdate, useCenterLocationUpdate } from "./LocationProvider";


const MapTap = () => {
    const map = useMap()
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