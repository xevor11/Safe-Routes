import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useLocation } from "./LocationProvider";
import { regioncheck } from "./RegionCross";
import { destinationIcon } from "./icons/dest-icon";

var instance;

const Routes = () => {

  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location

  if (location.destCoords.lat) {
    instance = L.Routing.control({
      waypoints: [
        L.latLng(location.userCoords.lat, location.userCoords.lng),
        L.latLng(location.destCoords.lat, location.destCoords.lng)
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      createMarker: function () {
        return L.marker(L.latLng(location.destCoords.lat, location.destCoords.lng), { icon: destinationIcon });
      },
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
    });
    regioncheck(instance);

    return instance;
  }
};

const RoutingMachine = createControlComponent(Routes);
export { instance };
export default RoutingMachine;
