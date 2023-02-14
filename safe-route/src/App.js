import React from 'react';
import './App.css';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';
import MapCont from './components/mapcontainer';
import SignupButton from './components/signup-button';

function App() {


  return (
    
    <>
      <LoginButton/>
      <LogoutButton/>
      <SignupButton/>
      <MapCont/>
    </>
  );  
}

export default App;