import React from 'react';
import { Button } from '@mui/material';
import { useLocation } from './LocationProvider';
import { useCenterLocationUpdate } from './LocationProvider';


const CenterButton = () => {

    const getLocationHook = useLocation()
    //extrapolate object from useContext hook
    const location = getLocationHook.location
    const useCenterContext = useCenterLocationUpdate()

    function UpdateCoords() {
        useCenterContext(location.userCoords)
    }

    return (
    <Button
        className="centerButton"
        onClick={UpdateCoords}
    >
        Recenter
    </Button>
    );

}

export default CenterButton;