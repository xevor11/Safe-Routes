import React from 'react';
import { Button, styled } from '@mui/material';
import { useLocation } from './LocationProvider';
import { useCenterLocationUpdate, useCenteredUpdate } from './LocationProvider';


const ButtonContainer = styled('div')({
    position: 'fixed',
    bottom: '3vh',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});


const CenterButton = () => {

    const getLocationHook = useLocation()
    //extrapolate object from useContext hook
    const location = getLocationHook.location
    const useCenterContext = useCenterLocationUpdate()
    const useCenteredContext = useCenteredUpdate()

    function UpdateCoords() {
        useCenteredContext(true)
        useCenterContext({lat: location.userCoords.lat, lng: location.userCoords.lng})
    }

    return location.centered ? null : (
        <ButtonContainer>
            <Button variant="contained" color="primary"
                onClick={UpdateCoords}
            >
                Center
            </Button>
        </ButtonContainer>
    );
}

export default CenterButton;