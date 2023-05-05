import { useMap } from "react-leaflet";
import {useLocation, useCenterLocationUpdate } from "./LocationProvider";


const MapTap = () => {
    const map = useMap()
    const getLocationHook = useLocation()
    //extrapolate object from useContext hook
    const location = getLocationHook.location
    const useCenter = useCenterLocationUpdate()

    function OnClick() {
        const center = map.getCenter()

        console.log(center)
    }

    map.on('click drag', () => {
        OnClick();
    });
    return null;
}

export default MapTap