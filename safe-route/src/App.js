import { React, useState } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
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
    <div className='root'>
      <TopBar />
      <MapCont lat={coords[0]} lng={coords[1]} />
    </div>
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