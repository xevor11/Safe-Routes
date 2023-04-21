import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useLocation } from "./LocationProvider";
import {regioncheck} from "./RegionCross";

function append(lat, lon){  
  this.lat = lat;
  this.lon = lon;

}

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

    regioncheck(instance);
    // instance.on('routeselected',function(e){
    //  // var coordarr = new Array();
    //   var allpoints = e.route;
    //   // alert(allpoints.coordinates[0].lat);
    //     for(let i = 0; i < allpoints.coordinates.length; i++)
    //     {
    //       var checklat = JSON.stringify(allpoints.coordinates[i].lat);
    //       var checklng = JSON.stringify(allpoints.coordinates[i].lng);
    //       var pair = ("["+checklat.concat(", ", checklng)+"]");
    //       //console.log(pair);
    //      // coordarr.push(new append(checklat, checklng));

    //     }
    //     //console.log(coordarr[0].lat);
    // });


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

