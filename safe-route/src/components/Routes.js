import { useState, useEffect } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { destinationIcon } from "./icons/dest-icon";
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

    instance.on('routeselected',function(e){
      var allpoints = e.route;
      // alert(allpoints.coordinates[0].lat);
        for(let i = 0; i < allpoints.coordinates.length; i++)
        {
          var checklat = JSON.stringify(allpoints.coordinates[i].lat);
          var checklng = JSON.stringify(allpoints.coordinates[i].lng);
          var pair = ("["+checklat.concat(", ", checklng)+"]");
          console.log(pair);

        }
        
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

