import { React, useState }from 'react';
import './App.css';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';
import MapCont from './components/mapcontainer';
import SignupButton from './components/signup-button';

function App() {

  const [coords, setCoords] = useState([43.075647, -87.886633]);

  const successCallback = (position) => {
    setCoords([position.coords.latitude, position.coords.longitude])
  }
  
  const errorCallback = (error) => {
    console.log(error);
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
  }

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  }

  return (
      <MapCont lat={coords[0]} lng={coords[1]}/>
  );  
}

export default App;