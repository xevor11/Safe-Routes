import { useState, useEffect, useContext } from 'react';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { currentLocIcon } from './icons/loc-icon';
import Recenter from './recenter';
import SearchBar from './search-bar';
import RoutingMachine from './Routes';
import { useUserLocation } from './LocationProviders/UserLocationProvider';
import { useDestLocation } from './LocationProviders/DestLocationProvider';

const MapCont = () => {

  const coords = useUserLocation();
  const destCoords = useDestLocation();
  
  if (Object.keys(destCoords).length != 0) {
    return (
      <MapContainer center={[coords[0], coords[1]]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords[0], coords[1]]} icon={currentLocIcon} ></Marker>
        <Recenter lat={coords[0]} lng={coords[1]}></Recenter>
        <RoutingMachine></RoutingMachine>
      </MapContainer>
    );
  } else {
    return (
      <MapContainer center={[coords[0], coords[1]]} zoom={12} style={{ width: "100%", height: "93vh", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords[0], coords[1]]} icon={currentLocIcon} ></Marker>
        <Recenter lat={coords[0]} lng={coords[1]}></Recenter>
      </MapContainer>
    );
  }
}

export default MapCont;