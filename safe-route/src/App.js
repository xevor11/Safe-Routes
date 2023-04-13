import { Stack } from '@mui/system';
import { React } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
import Submit from './datatest';
import { LocationContextProvider } from './components/LocationProvider';

function App() {

  return (
    <LocationContextProvider>
      <Stack direction="column" >
        <Stack direction="row">
          <SearchBar></SearchBar>
     
          <TopBar />
        </Stack>
        <>
          <MapCont />
        </>
       
      </Stack>
    </LocationContextProvider>
  );
}

export default App;
