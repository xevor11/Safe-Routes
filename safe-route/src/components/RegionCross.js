import collect from '@turf/collect';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turf from '@turf/turf';
import { json } from './GeoJSonOBJ';


var safetyrate = 0;
var counter = 0;

function intersect(point1,point2, polygon, index){

  var coordinate = turf.point([point2,point1]);
  if(polygon.type == "MultiPolygon")
  {
    
    var poly = turf.multiPolygon(polygon.coordinates);
    var check = turf.booleanPointInPolygon(coordinate, poly);
     if(check == true)
     {
      console.log(json.features[index].properties.MuniName);
      counter +=1;
      safetyrate +=json.features[index].properties.SafetyIndex

    }
    
  }
  else
  {

      var poly = turf.polygon(polygon.coordinates);
      var check = turf.booleanPointInPolygon(coordinate, poly)
  
          if(check == true)
          {
            console.log(json.features[index].properties.MuniName);
            counter +=1;
            safetyrate +=json.features[index].properties.SafetyIndex
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

           for (let j = 0; j < json.features.length; j++)
          {
           
           intersect(allpoints.coordinates[i].lat,allpoints.coordinates[i].lng,json.features[j].geometry, j);
         
          }

        }
        console.log("Number of Cities entered: " + counter);
        if(safetyrate == 0)
        {
          alert("Your route must travel through the Milwaukee area in order for a safety index to be calculated.");
        }
        else alert("Your Safety Index for this route is: " + (Math.round(safetyrate/counter*100)/100));
        safetyrate = 0;
        counter = 0;

    });

return(result);

}
