import { Stack } from '@mui/system';
import { React } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
//import Submit from './datatest';
import { LocationContextProvider } from './components/LocationProvider';
import { ThemeContextProvider } from './components/theme';
import { RegionContextProvider } from './components/region';
import CenterButton from './components/center-button';

function App() {

  return (
    <RegionContextProvider>
      <ThemeContextProvider>
        <LocationContextProvider>
          <Stack direction="column" >
            <Stack direction="row">
              <SearchBar />
              <TopBar />
            </Stack>
            <>                            
              <CenterButton/>
              <MapCont />          
            </>
          </Stack>
        </LocationContextProvider>
      </ThemeContextProvider>
    </RegionContextProvider>
  );
}

export default App;
