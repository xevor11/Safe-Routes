import React, { useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import RoutingMachine from './Routes';
import { useLocation } from './LocationProvider';
import {Milwaukee} from "./data";
import { counties } from './counties';
const MapCont = () => {
  const blackOptions = { color: 'black' }
  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location

  if (location.destCoords.lat) {
    return (
      <MapContainer center={[location.userCoords.lat, location.userCoords.lng]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.userCoords.lat, location.userCoords.lng]} icon={currentLocIcon} ></Marker>
        <Recenter lat={location.userCoords.lat} lng={location.userCoords.lng}></Recenter>
        <Polygon positions={counties} pathOptions={{color:'blue'}}/>
      </MapContainer>
    );
  }

}

export default MapCont;