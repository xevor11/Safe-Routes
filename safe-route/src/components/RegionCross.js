import collect from '@turf/collect';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turf from '@turf/turf';
import { json } from './GeoJSonOBJ';
function intersect(point1,point2, polygon){


    
    var coordinate = turf.point([point1,point2]);
    console.log("lat" + point1)
    console.log("lon" + point2)
    // alert(coordinate);
    // console.log("Polygon inside intersect: "+ polygon)

    // console.log(test)
     var poly = turf.polygon(polygon);
    //  console.log("Turf poly = " + (poly));
   

 var check = turf.booleanPointInPolygon(coordinate, poly)
    
    

    if(check == true)
    {
      //  console.log(data.features[1].Muniname(index));
        alert("its inside a polygon");
    }
else console.log("no");

}


export function regioncheck (instance){



 var result = instance.on('routeselected',function(e){
  //  const data = require('./GeoJSonOBJ');
  //  var data1 = JSON.stringify(data);
  //  console.log(data.features[1].properties.Muniname[0]);
 //   alert(data.features[0].geometry.coordinates[0]);
 //var test = eval(data.features[0].geometry.coordinate);
    
    // console.log("This is Polygon Features1:" + pol);
console.log("length of array features = "+ json.features.length);
     // var coordarr = new Array();
      var allpoints = e.route;
      console.log(json.features[0].geometry.coordinates);
      // alert(allpoints.coordinates[0].lat);
        for(let i = 0; i < allpoints.coordinates.length; i++)
        {
        
          var checklat = JSON.stringify(allpoints.coordinates[i].lat);
          var checklng = JSON.stringify(allpoints.coordinates[i].lng);
          var pair = ("["+checklat.concat(", ", checklng)+"]");
          //console.log(pair);
         // coordarr.push(new append(checklat, checklng));
            
           for (let j = 0; j < 2; j++)
          {
           
           intersect(allpoints.coordinates[i].lat,allpoints.coordinates[i].lng,json.features[j].geometry.coordinates);
             
         }

        }
        //console.log(coordarr[0].lat);
    });

return(result);

}
