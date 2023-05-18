import React from 'react';
import { Button, styled } from '@mui/material';
import { useLocation } from './LocationProvider';
import { useCenterLocationUpdate } from './LocationProvider';


const ButtonContainer = styled('div')({
    position: 'fixed',
    bottom: '10vh',
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

    function UpdateCoords() {
        useCenterContext(location.userCoords)
    }

    return (
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