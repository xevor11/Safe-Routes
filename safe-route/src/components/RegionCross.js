import collect from '@turf/collect';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turf from '@turf/turf';
import { json } from './GeoJSonOBJ';
function intersect(point1,point2, polygon, index){

  var coordinate = turf.point([point2,point1]);
  if(polygon.type == "MultiPolygon")
  {
    
    var poly = turf.multiPolygon(polygon.coordinates);
    var check = turf.booleanPointInPolygon(coordinate, poly);
     if(check == true)
     {
      console.log(json.features[index].properties.MuniName);

    }
    
  }
  else
  {

      var poly = turf.polygon(polygon.coordinates);
      var check = turf.booleanPointInPolygon(coordinate, poly)
  
          if(check == true)
          {
            console.log(json.features[index].properties.MuniName);
          }
  }
 
}

export function regioncheck (instance){

 var result = instance.on('routeselected',function(e){

  
console.log("length of array features = "+ json.features.length);
      var allpoints = e.route;
        for(let i = 0; i < allpoints.coordinates.length; i+=10)
        {
        
          var checklat = JSON.stringify(allpoints.coordinates[i].lat);
          var checklng = JSON.stringify(allpoints.coordinates[i].lng);
          var pair = ("["+checklat.concat(", ", checklng)+"]");

           for (let j = 0; j < 259; j++)
          {
           
           intersect(allpoints.coordinates[i].lat,allpoints.coordinates[i].lng,json.features[j].geometry, j);
         
         }

        }

    });

return(result);

}
