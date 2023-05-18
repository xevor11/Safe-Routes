import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, styled } from '@mui/material';


const StyledButton = styled(Button)({
  width: '3vw',
})


const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (      
      <StyledButton variant="contained" color="primary"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
      Log Out
    </StyledButton>
    )
  );
}

export default LogoutButton;