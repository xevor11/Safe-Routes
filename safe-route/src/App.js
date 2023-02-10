import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer} from "react-leaflet";
import 'node_modules/leaflet-geosearch/dist/geosearch.css';

export default function App() {
  return (
    <MapContainer center={[43.038429, -87.897491]} zoom={12} style={{width:"100%", height:"100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    </MapContainer>
  );
}
