import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polygon,} from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import RoutingMachine from './Routes';
import { useLocation } from './LocationProvider';
import appsettings from './../appsettings.json'
import { useTheme } from './theme';
import { counties } from './counties';


const MapCont = () => {

  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location
  const themeContext = useTheme()
  const theme = themeContext()


  if (location.destCoords.lat && location.safetyIndex !== null) {
    return (
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }} >
        <TileLayer
          attribution={theme.attribution}
          url={theme.url}
          accessToken={appsettings.jawg_key}
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ></Marker>
        <Recenter lat={location.userCoords.lat} lng={location.userCoords.lng}></Recenter>
        <Polygon positions={counties} pathOptions={{ color: "red", safetyIndex: location.safetyIndex }}/>
        <RoutingMachine></RoutingMachine>
      </MapContainer>
    );
  } else {
    return (
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }}>
        <TileLayer
          attribution={theme.attribution}
          url={theme.url}
          accessToken={appsettings.jawg_key}
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ></Marker>
        <Recenter lat={location.userCoords.lat} lng={location.userCoords.lng}></Recenter>
      </MapContainer>
    );
  }

}

export default MapCont;