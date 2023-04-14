import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useLocation } from "./LocationProvider";

const Routes = () => {

  const getLocationHook = useLocation()
  //extrapolate object from useContext hook
  const location = getLocationHook.location

  if (location.destCoords.lat) {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(location.userCoords.lat, location.userCoords.lng),
        L.latLng(location.destCoords.lat, location.destCoords.lng)
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
    return instance;
  }
};

const RoutingMachine = createControlComponent(Routes);

export default RoutingMachine;
// const RoutingMachine = () =>{

//   const [routes, setRoutes] = useState(Routes);

//   useEffect(() => {
//     if(routes !== undefined || routes !== null){
//       createControlComponent(Routes);
//     }
//     else {
//       return null;
//     }
//   }, [routes]);
  
// } 

