import { Stack } from '@mui/system';
import { React, useState, useContext, createContext } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
import { LocationProvider } from './components/LocationProvider';


function App() {

  return (

    <LocationProvider>
      <Stack direction="column" >
        <Stack direction="row">
          <SearchBar />
          <TopBar />
        </Stack>
        <MapCont />
      </Stack>
    </LocationProvider>
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