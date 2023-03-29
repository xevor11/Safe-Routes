import { React, useState, useEffect, useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import SearchBar from './search-bar';
import Routes from "./Routes";
import { useUserLocation } from './UserLocationProvider';

const MapCont = () => {

  const coords = useUserLocation()

  return (

      <MapContainer center={[coords[0], coords[1]]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords[0], coords[1]]} icon={currentLocIcon} ></Marker>
        <Recenter lat={coords[0]} lng={coords[1]}></Recenter>
        <Routes></Routes>
      </MapContainer>

  );
}

export default MapCont;