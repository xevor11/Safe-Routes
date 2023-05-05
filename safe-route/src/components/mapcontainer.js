import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polygon, } from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import RoutingMachine from './Routes';
import { useLocation } from './LocationProvider';
import appsettings from './../appsettings.json';
import { useTheme } from './theme';
import { useRegion } from './region';
import CenterButton from './center-button';

const MapCont = () => {

  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location
  const themeContext = useTheme()
  const theme = themeContext()
  const getRegion = useRegion()
  const region = getRegion()

  if (location.destCoords.lat && location.safetyIndex !== null) {
    return (
      location.userCoords === location.centerCoords ? <CenterButton /> : null,
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "100vh", zIndex: 0 }} >
        <TileLayer
          attribution={theme.attribution}
          url={theme.url}
          accessToken={appsettings.jawg_key}
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ></Marker>
        <Recenter lat={location.centerCoords.lat} lng={location.centerCoords.lng}></Recenter>
        <Polygon positions={region} pathOptions={{ color: "red", safetyIndex: location.safetyIndex }} />
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
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ></Marker>
        <Recenter lat={location.centerCoords.lat} lng={location.centerCoords.lng}></Recenter>
        <Polygon positions={region} pathOptions={{ color: "red", safetyIndex: location.safetyIndex }} />
      </MapContainer>
    );
  }

}

export default MapCont;
