import { Stack } from '@mui/system';
import { React } from 'react';
import './App.css';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';
import { LocationContextProvider } from './components/LocationProvider';
import { ThemeContextProvider } from './components/theme';
import ThemeToggle from './components/theme-switch';

function App() {

  return (
    <ThemeContextProvider>
      <LocationContextProvider>
        <Stack direction="column" >
          <Stack direction="row">
            <SearchBar />
            <TopBar />
            <ThemeToggle></ThemeToggle>
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
