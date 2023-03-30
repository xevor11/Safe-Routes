import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useUserLocation } from "./UserLocationProvider";


const createRoutineMachineLayer = (props) => {;


    const instance = L.Routing.control({
      waypoints: [
        L.latLng(42.843544541244476, -88.34077580556942),
        L.latLng(43.0, -87.88195787327174)
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,      
    });
    

    return instance;
  };
  
  const RoutingMachine = createControlComponent(createRoutineMachineLayer);
  
  export default RoutingMachine;