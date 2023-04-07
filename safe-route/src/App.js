import { Stack } from '@mui/system';
import { React } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
import { LocationContextProvider } from './components/LocationProvider';
import { ThemeContextProvider } from './components/theme';

function App() {

  return (
    <ThemeContextProvider>
      <LocationContextProvider>
        <Stack direction="column" >
          <Stack direction="row">
            <SearchBar />
            <TopBar />
          </Stack>
          <>
            <MapCont />
          </>
        </Stack>
      </LocationContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
