import { Stack } from '@mui/system';
import { React, useState } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';


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

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback, options);
  }

  return (

    <>
      <Stack direction="column" >
        <Stack direction="row">
          <SearchBar />
          <TopBar />
        </Stack>
        <MapCont lat={coords[0]} lng={coords[1]} />
      </Stack>
    </>
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