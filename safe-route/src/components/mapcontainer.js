import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polygon,Popup } from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import RoutingMachine from './Routes';
import { useLocation } from './LocationProvider';
import appsettings from './../appsettings.json';
import { useTheme } from './theme';
import { useRegion } from './region';
import MapTap from './map-tap';



const MapCont = () => {
  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location
  const themeContext = useTheme()
  const theme = themeContext()
  const getRegion = useRegion()
  const region = getRegion()

  if (location.destCoords.lat) {
    return (
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "100vh", zIndex: 0, position: "fixed" }} >
        <TileLayer
          attribution={theme.attribution}
          url={theme.url}
          accessToken={appsettings.jawg_key}
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ><Popup>You are here!</Popup></Marker>
        <Recenter lat={location.centerCoords.lat} lng={location.centerCoords.lng}></Recenter>
        <Polygon positions={region} pathOptions={{ color: "red", safetyIndex: location.safetyIndex }} />
        <MapTap></MapTap>
        <RoutingMachine></RoutingMachine>
      </MapContainer>
    );
  } else {
    return (
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "100vh", zIndex: 0, position: "fixed" }}>
        <TileLayer
          attribution={theme.attribution}
          url={theme.url}
          accessToken={appsettings.jawg_key}
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ><Popup>You are here!</Popup></Marker>
        <Recenter lat={location.centerCoords.lat} lng={location.centerCoords.lng}></Recenter>
        <Polygon positions={region} pathOptions={{ color: "red", safetyIndex: location.safetyIndex }} />
        <MapTap></MapTap>
      </MapContainer>
    );
  }

}

export default MapCont;
