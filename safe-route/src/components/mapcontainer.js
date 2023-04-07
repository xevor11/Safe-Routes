import React, { useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import RoutingMachine from './Routes';
import { useLocation } from './LocationProvider';
import appsettings from './../appsettings.json'
import { useTheme } from './theme';

const MapCont = () => {

  // attribution= '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // url = 'https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}'
  // attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location
  const themeContext = useTheme()
  const theme = themeContext()


  if (location.destCoords.lat) {
    return (
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }}>
        <TileLayer
          attribution={theme.attribution}
          url={theme.url}
          accessToken={appsettings.jawg_key}
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ></Marker>
        <Recenter lat={location.userCoords.lat} lng={location.userCoords.lng}></Recenter>
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