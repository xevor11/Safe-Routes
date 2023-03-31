import { useState, useEffect } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useUserLocation } from "./LocationProviders/UserLocationProvider";
import { destinationIcon } from "./icons/dest-icon";
import { useDestLocation } from "./LocationProviders/DestLocationProvider";
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import { useUserLocation } from "./UserLocationProvider";


const Routes = () => {
  const coords = useUserLocation()
  const destCoords = useDestLocation()

  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (Object.keys(destCoords).length !== 0) {
      const newInstance = L.Routing.control({
        waypoints: [
          L.latLng(coords[0], coords[1]),
          L.latLng(destCoords[0], destCoords[1])
        ],
        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        createMarker: function () { return null; },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
      });
      setInstance(newInstance);
    } else {
      setInstance(null);
    }
  }, [coords, destCoords]);

  return instance;
};

const RoutingMachine = createControlComponent(Routes);

export default RoutingMachine;