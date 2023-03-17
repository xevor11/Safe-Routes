import { Stack } from '@mui/system';
import { React, useState, useContext, createContext } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
import LocationContext from './components/LocationContext';


function App() {

  const [coords, setCoords] = useState([43.075647, -87.886633]);

  const successCallback = (position) => {
    setCoords([position.coords.latitude, position.coords.longitude]);
  }

  const errorCallback = (error) => {
    console.log(error);
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 100000,
  }

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback, options);
  }

  return (

    <LocationContext.Provider value={coords}>
      <Stack direction="column" >
        <Stack direction="row">
          <SearchBar />
          <TopBar />
        </Stack>
        <MapCont/>
      </Stack>
    </LocationContext.Provider>
  );

}

export default App;


{/* <div
      style={{
        display:"flex",
        flexDirection:"column",
        width:"auto",
        height:"100%",
      }}>
      <nav style={{width:"20%", height:"10%", justifyContent:"space-between", display:"flex"}}>
        <SearchBar/>
        <LoginButton/>
      </nav>
      <div>
        <MapCont/>
      </div>
    </div> */}