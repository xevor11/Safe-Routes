import { useState, useEffect } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useUserLocation } from "./LocationProviders/UserLocationProvider";
import { useDestLocation } from "./LocationProviders/DestLocationProvider";
import { destinationIcon } from "./icons/dest-icon";

// Error boundary component
class RoutesErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const Routes = ({ map }) => {
  const userCoords = useUserLocation();
  const destCoords = useDestLocation();

  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (Object.keys(destCoords).length !== 0 && userCoords) {
      const waypoints = [
        L.latLng(userCoords[0], userCoords[1]),
        L.latLng(destCoords[0], destCoords[1])
      ];

      const newInstance = L.Routing.control({
        waypoints,
        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        createMarker: function (i, wp, nWps) {
          if (i === nWps - 1) {
            return L.marker(wp.latLng, {
              icon: destinationIcon,
              draggable: true
            });
          }
          return null;
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
      });
      
      // Add routing to map if it exists
      if (map) {
        newInstance.addTo(map);
      }
      
      setInstance(newInstance);
    } else {
      if (instance) {
        instance.removeFrom(map);
      }
      setInstance(null);
    }
    
    // Clean up function to remove routing when unmounted
    return () => {
      if (instance) {
        instance.removeFrom(map);
      }
    };
  }, [userCoords, destCoords, map, instance]);

  return null;
};

const RoutingMachine = createControlComponent(Routes);

export default function ErrorBoundaryRoutes(props) {
  return (
    <RoutesErrorBoundary>
      <RoutingMachine {...props} />
    </RoutesErrorBoundary>
  );
}