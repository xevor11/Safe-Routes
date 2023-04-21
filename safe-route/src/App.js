import { Stack } from '@mui/system';
import { React } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
import Submit from './datatest';
import { LocationContextProvider } from './components/LocationProvider';
import { ThemeContextProvider } from './components/theme';
import { RegionContextProvider } from './components/region';

function App() {

  return (

    <ThemeContextProvider>
      <LocationContextProvider>
        <RegionContextProvider>
          <Stack direction="column" >
            <Stack direction="row">
              <SearchBar />
              <TopBar />
            </Stack>
            <>
              <MapCont />
            </>
          </Stack>
        </RegionContextProvider>
      </LocationContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
